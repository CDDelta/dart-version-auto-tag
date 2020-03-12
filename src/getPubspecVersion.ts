import { GitHub, context } from '@actions/github';
import * as yaml from 'js-yaml';

export default async function getPubspecVersion(
  client: GitHub,
  path: string,
): Promise<string | null> {
  const pubspecRes = (await client.repos.getContents({
    path,
    ref: context.ref,
    ...context.repo,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any;
  const pubspecYaml = pubspecRes.data['content'];

  const pubspec = yaml.safeLoad(pubspecYaml);
  return pubspec['version'];
}
