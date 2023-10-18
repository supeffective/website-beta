/**
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 100],
    'type-empty': [1, 'never'],
    'type-enum': [
      2,
      'always',
      ['chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'style', 'cs', 'test', 'perf', 'sec'],
    ],
    // 'scope-empty': [2, 'never'],
    'scope-enum': [
      1,
      'always',
      [
        'build',
        'lint',
        'ci',
        'docs',
        'cs',
        'style',
        'tests',
        'releases',
        'deps',
        'config',
        'setup',
        'readme',
        'tools',
        'workflow',
        'ui',
        'app',
        'cli',
      ],
    ],
  },
  ignores: [(commit) => commit.includes('update deps')],
}
