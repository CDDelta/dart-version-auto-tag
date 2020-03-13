import { context, GitHub } from '@actions/github';

export default async function createCommitTag(
  client: GitHub,
  tag: string,
  commitSha: string,
): Promise<void> {
  await client.git.createRef({
    ref: `refs/tags/${tag}`,
    sha: commitSha,
    ...context.repo,
  });
}
