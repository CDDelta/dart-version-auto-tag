import { GitHub, context } from '@actions/github';

export default async function checkTagExists(
  client: GitHub,
  tag: string
): Promise<boolean> {
  const tagRes = await client.git.getTag({
    tag_sha: tag,
    ...context.repo
  });

  return tagRes.data != null;
}
