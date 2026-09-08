/**
 * Build-time coding stats with graceful static fallback.
 * GitHub REST (no auth): profile + trailing-24h public commit count from
 * the public events API. LeetCode GraphQL for solved count.
 * Each source has a short timeout and never throws — resume figures
 * stand in so the build can't break.
 */

export type CodingStats = {
  githubRepos: { value: string; live: boolean };
  commits30d: { value: string; live: boolean };
  leetcodeSolved: { value: string; live: boolean };
};

const FALLBACK: CodingStats = {
  githubRepos: { value: "10+", live: false },
  commits30d: { value: "—", live: false },
  leetcodeSolved: { value: "500+", live: false },
};

const GITHUB_USER = "freakinrkb";

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
  payload?: { commits?: unknown[] };
};

/**
 * Count public commits authored in the trailing 30 days via the events API.
 * Up to 3 pages (300 events) to cover active months. Public only.
 */
async function commitsLast30Days(): Promise<Pick<CodingStats, "commits30d">> {
  try {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    let count = 0;
    for (let page = 1; page <= 3; page++) {
      const events = (await fetchJson(
        `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${page}`,
        { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 21600 } },
        8000
      )) as PublicEvent[];
      if (!Array.isArray(events) || events.length === 0) break;
      let oldest = Infinity;
      for (const e of events) {
        if (e.type !== "PushEvent" || !e.created_at) continue;
        const time = new Date(e.created_at).getTime();
        oldest = Math.min(oldest, time);
        if (time < cutoff) continue;
        const commits = Array.isArray(e.payload?.commits) ? e.payload.commits.length : 0;
        count += commits;
      }
      if (oldest < cutoff) break;
    }
    return { commits30d: { value: String(count), live: true } };
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
