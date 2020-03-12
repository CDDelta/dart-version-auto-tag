import { GitHub, context } from '@actions/github';

export default async function checkTagExists(
  client: GitHub,
  tag: string,
): Promise<boolean> {
  try {
    await client.git.getTag({
      tag_sha: tag,
      ...context.repo,
    });

    return true;
  } catch (err) {
    if (err.code === 404) return false;
    throw err;
  }
}
