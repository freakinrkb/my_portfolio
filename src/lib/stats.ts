/**
 * Build-time coding stats with graceful static fallback.
 * GitHub REST (no auth): profile + trailing-24h public commit count from
 * the public events API. LeetCode GraphQL for solved count.
 * Each source has a short timeout and never throws — resume figures
 * stand in so the build can't break.
 */

export type CodingStats = {
  githubRepos: { value: string; live: boolean };
  commits30d: { value: string; live: boolean; scope: "all" | "public" };
  leetcodeSolved: { value: string; live: boolean };
};

const FALLBACK: CodingStats = {
  githubRepos: { value: "10+", live: false },
  commits30d: { value: "—", live: false, scope: "public" },
  leetcodeSolved: { value: "500+", live: false },
};

const GITHUB_USER = "freakinrkb";

/**
 * Optional read-only token (env GITHUB_TOKEN, never committed).
 * With it, GitHub returns your own events including private pushes —
 * without it, only public events are visible.
 */
function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchJson(url: string, init: RequestInit, timeoutMs: number) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<unknown>;
}

async function githubProfile(): Promise<Pick<CodingStats, "githubRepos">> {
  try {
    const data = (await fetchJson(
      `https://api.github.com/users/${GITHUB_USER}`,
      { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 86400 } },
      6000
    )) as { public_repos?: number };
    return {
      githubRepos:
        typeof data.public_repos === "number"
          ? { value: String(data.public_repos), live: true }
          : FALLBACK.githubRepos,
    };
  } catch {
    return { githubRepos: FALLBACK.githubRepos };
  }
}

type PublicEvent = {
  type?: string;
  created_at?: string;
  repo?: { name?: string };
  payload?: { before?: string; head?: string };
};

/**
 * Count commits authored in the trailing 30 days.
 * PushEvent payloads no longer carry commit lists, so each in-window
 * push is counted via the compare API (before...head → total_commits).
 * Authenticated requests (GITHUB_TOKEN) include private pushes via
 * /users/:u/events; otherwise only public events are visible.
 * Capped at 25 pushes to bound API calls.
 */
async function commitsLast30Days(): Promise<Pick<CodingStats, "commits30d">> {
  try {
    const authed = Boolean(process.env.GITHUB_TOKEN);
    const headers = githubHeaders();
    const endpoint = authed
      ? `https://api.github.com/users/${GITHUB_USER}/events?per_page=100`
      : `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`;
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;

    const pushes: { repo: string; before: string; head: string }[] = [];
    for (let page = 1; page <= 3 && pushes.length < 25; page++) {
      const events = (await fetchJson(
        `${endpoint}&page=${page}`,
        { headers, next: { revalidate: 21600 } },
        8000
      )) as PublicEvent[];
      if (!Array.isArray(events) || events.length === 0) break;
      let oldest = Infinity;
      for (const e of events) {
        if (e.type !== "PushEvent" || !e.created_at || !e.repo?.name) continue;
        const time = new Date(e.created_at).getTime();
        oldest = Math.min(oldest, time);
        if (time < cutoff) continue;
        const before = e.payload?.before ?? "";
        const head = e.payload?.head ?? "";
        if (!before || !head || /^0+$/.test(before)) continue;
        pushes.push({ repo: e.repo.name, before, head });
        if (pushes.length >= 25) break;
      }
      if (oldest < cutoff) break;
    }

    const counts = await Promise.all(
      pushes.map(async (p) => {
        try {
          const cmp = (await fetchJson(
            `https://api.github.com/repos/${p.repo}/compare/${p.before}...${p.head}`,
            { headers, next: { revalidate: 21600 } },
            8000
          )) as { total_commits?: number };
          return typeof cmp.total_commits === "number" ? cmp.total_commits : 0;
        } catch {
          return 0;
        }
      })
    );
    const count = counts.reduce((a, b) => a + b, 0);
    return { commits30d: { value: String(count), live: true, scope: authed ? "all" : "public" } };
  } catch {
    return { commits30d: FALLBACK.commits30d };
  }
}

async function leetcodeStats(): Promise<Pick<CodingStats, "leetcodeSolved">> {
  try {
    const data = (await fetchJson(
      "https://leetcode.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "my_portfolio/1.0",
        },
        body: JSON.stringify({
          query: `query($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal { acSubmissionNum { difficulty count } }
            }
          }`,
          variables: { username: "ra7nak" },
        }),
        next: { revalidate: 86400 },
      },
      8000
    )) as { data?: { matchedUser?: { submitStatsGlobal?: { acSubmissionNum?: { count?: number }[] } } } };
    const all = data.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(
      (d) => typeof d.count === "number"
    );
    const solved = all?.count;
    return {
      leetcodeSolved:
        typeof solved === "number" && solved > 0
          ? { value: `${solved}`, live: true }
          : FALLBACK.leetcodeSolved,
    };
  } catch {
    return { leetcodeSolved: FALLBACK.leetcodeSolved };
  }
}

export async function getCodingStats(): Promise<CodingStats> {
  const [profile, commits, lc] = await Promise.all([githubProfile(), commitsLast30Days(), leetcodeStats()]);
  return { ...profile, ...commits, ...lc };
}
