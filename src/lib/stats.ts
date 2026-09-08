/**
 * Build-time coding stats with graceful static fallback.
 * GitHub REST (no auth) + LeetCode GraphQL, each with a short timeout.
 * Never throws — falls back to resume figures so the build can't break.
 */

export type CodingStats = {
  githubRepos: { value: string; live: boolean };
  githubFollowers: { value: string; live: boolean };
  leetcodeSolved: { value: string; live: boolean };
  leetcodeRating: { value: string; live: boolean };
};

const FALLBACK: CodingStats = {
  githubRepos: { value: "10+", live: false },
  githubFollowers: { value: "—", live: false },
  leetcodeSolved: { value: "500+", live: false },
  leetcodeRating: { value: "1900+", live: false },
};

async function fetchJson(url: string, init: RequestInit, timeoutMs: number) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<unknown>;
}

async function githubStats(): Promise<Pick<CodingStats, "githubRepos" | "githubFollowers">> {
  try {
    const data = (await fetchJson(
      "https://api.github.com/users/freakinrkb",
      { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 86400 } },
      6000
    )) as { public_repos?: number; followers?: number };
    return {
      githubRepos: {
        value: typeof data.public_repos === "number" ? String(data.public_repos) : FALLBACK.githubRepos.value,
        live: typeof data.public_repos === "number",
      },
      githubFollowers: {
        value: typeof data.followers === "number" ? String(data.followers) : FALLBACK.githubFollowers.value,
        live: typeof data.followers === "number",
      },
    };
  } catch {
    return { githubRepos: FALLBACK.githubRepos, githubFollowers: FALLBACK.githubFollowers };
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
  const [gh, lc] = await Promise.all([githubStats(), leetcodeStats()]);
  return { ...gh, ...lc, leetcodeRating: FALLBACK.leetcodeRating };
}
