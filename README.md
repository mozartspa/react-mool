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
yarn release
```

Lerna asks for the new version, creates the version commit and Git tag, and pushes them. The script then builds the packages and publishes the ones whose version is not on npm yet, in dependency order.

Each package needs its own confirmation:

- With a passkey or security key, npm prints a link: open it and confirm in the browser.
- With an authenticator app, npm asks for the 6-digit code. Each code can be used only once, so wait for a new one for every package.

Do not use `lerna publish`: Lerna only accepts a typed one-time password and does not handle the browser confirmation.

### If publishing fails halfway

When the version commit and tag already exist but some packages were not published, resume without creating a new version:

```bash
yarn release:publish
```

Packages already on npm are skipped. Check what is on npm with `npm view <package> version`.
