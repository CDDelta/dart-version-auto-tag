import { GitHub, context } from '@actions/github';
import * as yaml from 'js-yaml';

export default async function getPubspecVersion(
  client: GitHub,
  path: string,
): Promise<string | null> {
  try {
    const pubspecRes = await client.repos.getContents({
      path,
      ref: context.ref || 'master',
      ...context.repo,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pubspecBase64 = (pubspecRes.data as any)['content'];
    const pubspecYaml = Buffer.from(pubspecBase64, 'base64').toString('utf8');

    const pubspec = yaml.safeLoad(pubspecYaml);
    return pubspec['version'];
  } catch (err) {
    if (err.code === 404) return null;
    throw err;
  }
}
