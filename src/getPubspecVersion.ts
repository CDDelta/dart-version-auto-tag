import { GitHub, context } from "@actions/github";
import yaml from "js-yaml";
import fs from "fs";

export default async function getPubspecVersion(
  client: GitHub,
  path: string
): Promise<string | null> {
  const pubspecRes = (await client.repos.getContents({
    path,
    ref: context.ref,
    ...context.repo
  })) as any;
  const pubspecYaml = pubspecRes.data["content"];

  const pubspec = yaml.safeLoad(pubspecYaml);
  return pubspec["version"];
}
