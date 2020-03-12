import { context, GitHub } from '@actions/github';

export default async function createTag(
  client: GitHub,
  tag: string
): Promise<void> {
  await client.git.createTag({
    tag,
    message: '',
    object: '',
    type: 'commit',
    ...context.repo
  });
}
