# react-mool

react-mool is a Yarn Workspaces and Lerna monorepo containing the core packages for the React Mool ecosystem, along with an example application used for local development.

## Packages

- `@react-mool/core`: core logic and shared admin utilities.
- `@react-mool/eui`: Elastic UI based components built on top of the core package.
- `@react-mool/i18n-it`: Italian localization package.
- `react-mool`: aggregated package that re-exports the main public modules.
- `example`: local application used to test and develop the packages.

## Requirements

- Node.js (version in `.nvmrc`, run `nvm use`)
- Yarn

## Getting started

Install all workspace dependencies from the repository root:

```bash
yarn
```

## Common commands

Run the workspace development processes in parallel:

```bash
yarn dev
```

Format changed files with Prettier:

```bash
yarn pretty
```

Build a specific package from the repository root:

```bash
yarn workspace @react-mool/core build
yarn workspace @react-mool/eui build
yarn workspace @react-mool/i18n-it build
yarn workspace react-mool build
```

## Working on the example app

The example app lives in `packages/example` and can be used to validate changes locally.

Start the mock GraphQL API:

```bash
yarn workspace example start-api
```

Start the example frontend:

```bash
yarn workspace example start
```

If you need to regenerate the GQless client:

```bash
yarn workspace example generate
```

## Publishing to npm

### Prerequisites

- Your npm account must have two-factor authentication enabled (npmjs.com → Account → Two-Factor Authentication). If npm only offers a passkey or security key (no authenticator app), register one of those. Store the recovery codes somewhere safe, such as a password manager.
- You must be an owner of the packages (`npm owner ls @react-mool/core`).
- Use the Node.js version from `.nvmrc`:

```bash
nvm use
```

### Log in

Log in with the web flow (no access token needed):

```bash
npm login --auth-type web
npm whoami
```

If publishing later fails with an authentication error, run `npm login --auth-type web` again.

### Publish

```bash
yarn lerna publish --no-verify-access --yes
```

Lerna creates the version commit and Git tag, pushes them, then publishes every changed package. For each package npm asks for a one-time password and prints a link: open it, confirm with your passkey, and paste the code shown on the page into the terminal. Each code can be used only once, so get a new one for every package.

### If publishing fails halfway

When the version commit and tag already exist but some packages were not published, first discard the `gitHead` field Lerna leaves in the `package.json` files:

```bash
git checkout -- packages/*/package.json
```

Then retry. `from-package` publishes only the packages whose current version is not on npm yet (`from-git` would try to publish all of them again and fail on the ones already published):

```bash
yarn lerna publish from-package --no-verify-access --yes
```

Alternatively, publish the missing packages one by one with npm, in dependency order (`core`, `eui`, `i18n-it`, `react-mool`). Build first, because `--ignore-scripts` skips the `prepublishOnly` build:

```bash
yarn lerna run build
cd packages/core && npm publish --ignore-scripts
```

Check what is on npm with `npm view <package> version`.
