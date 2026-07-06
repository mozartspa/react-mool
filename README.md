# react-mool

react-mool is a Yarn Workspaces and Lerna monorepo containing the core packages for the React Mool ecosystem, along with an example application used for local development.

## Packages

- `@react-mool/core`: core logic and shared admin utilities.
- `@react-mool/eui`: Elastic UI based components built on top of the core package.
- `@react-mool/i18n-it`: Italian localization package.
- `react-mool`: aggregated package that re-exports the main public modules.
- `example`: local application used to test and develop the packages.

## Requirements

- Node.js
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

Publishing requires an npm access token generated from the npm web dashboard with the `bypass two-factor authentication` capability.

Create or update a local `.npmrc` file (for example in your home directory) with your token:

```bash
//registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN
```

Before publishing, verify that you are authenticated with npm:

```bash
npm whoami
```

Publish the packages with Lerna:

```bash
lerna publish --no-verify-access --yes
```

If the publish step fails after Lerna has already created the version and Git tag, retry from the existing tags:

```bash
lerna publish from-git --no-verify-access --yes
```
