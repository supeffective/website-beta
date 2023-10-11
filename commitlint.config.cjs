const fs = require('fs')

const folderNamesUnderPackages = fs
  .readdirSync('./packages')
  .filter((file) => fs.statSync(`./packages/${file}`).isDirectory())

/**
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 100],
    'type-empty': [1, 'never'],
    'type-enum': [2, 'always', ['chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'style', 'cs', 'test']],
    // 'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
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
        // packages:
        ...folderNamesUnderPackages,
      ],
    ],
  },
  ignores: [(commit) => commit.includes('update deps')],
}
