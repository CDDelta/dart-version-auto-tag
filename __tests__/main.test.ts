import { GitHub } from '@actions/github';
import getPubspecVersion from '../src/getPubspecVersion';
import checkTagExists from '../src/checkTagExists';

let client: GitHub;

beforeEach(() => {
  const authToken = process.env.GITHUB_TOKEN;
  if (!authToken) throw Error('GITHUB_TOKEN is undefined');

  client = new GitHub(authToken);
});

test('read pubspec version', async () => {
  const version = await getPubspecVersion(client, 'pubspec.yaml');
  expect(version).toBeDefined();
});

test('check tag exists', async () => {
  const realTagExists = checkTagExists(client, 'v0.9.0');
  expect(realTagExists).toBe(true);

  const fakeTagExists = checkTagExists(client, '12345');
  expect(fakeTagExists).toBe(false);
});
