import { Octokit } from "@octokit/rest";

import { siteData } from "@/site";

const octkit = new Octokit();

/**
 * Returns the commits of a file.
 */
export async function getFileCommits(path: string) {
  const [owner, repo] = siteData.githubRepo!.split("/");
  const commits = await octkit.rest.repos.listCommits({
    owner,
    repo,
    path,
  });

  return commits.data;
}

export type Commit = Awaited<ReturnType<typeof getFileCommits>>[number];
