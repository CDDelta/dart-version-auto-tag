# dart-version-auto-tag

This action automatically creates tags in your repository when you update your pubspec.yaml version. Use it to trigger builds automatically.

# Usage

Create a workflow that triggers on commit to your release branch:

```yaml
name: Version tag
on:
  push:
    branches:
      - master
jobs:
  tag:
    runs-on: ubuntu-latest
    steps:
      - uses: CDDelta/dart-version-auto-tag@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

Create another workflow that is triggered when a tag is created.

```yaml
name: Build release
on:
  push:
    tags:
    - 'v*'
jobs:
  build:
    steps:
    ...
```

Now whenever you update your pubspec version field, a tag is automatically created.

# Inputs

| Input   | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| `path`  | The path to the pubspec file to track (default: `pubspec.yaml`). |
| `token` | The GitHub access token to create tags in the repository.        |
