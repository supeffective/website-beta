# Contributing Guide

Thanks for your interest to contribute to this project. Please take a moment and read through this guide:

## Repository

- We use Node v20 and `bun` as package manager together with `turbo` as script runner.
- We use [Convention Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

## Developing

The different packages can be found in `packages/*`, and that's where you'll be mainly working.

### Quick Start

Here are the basic commands you'll need to get started:

```sh

# Install dependencies
bun install

# Start the dev server
bun run dev

# Build dist files
bun build

# Run tests
bun test

# Run tests with coverage
bun test:coverage

# Lint (formatter and linter)
bun lint

# Format (fixes linting and formatting issues)
bun lint-fix

# Type check
bun typelint

# Run all quality checks (prettier-check, type-check, lint, build, publint, test)
bun quality-checks

```

## Testing

We use `bun` to run tests. You can run all tests with:

```sh
bun test
```

Tests ending with `*.test.tsx` or `*.dom.test.ts` are considered browser tests and will be run in a browser-like
environment.

Tests ending with `*.test.ts` (except `*.dom.test.ts`) are considered universal tests and will be run in all
environments.
