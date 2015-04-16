[![Build Status](https://travis-ci.org/please-beer/webapp-stripe.svg?branch=master)](https://travis-ci.org/please-beer/webapp-stripe)
[![Coverage Status](https://img.shields.io/coveralls/please-beer/webapp-stripe.svg)](https://coveralls.io/r/please-beer/webapp-stripe?branch=master)
[![Dependency Status](https://david-dm.org/please-beer/webapp-stripe.svg)](https://david-dm.org/please-beer/webapp-stripe)
[![devDependency Status](https://david-dm.org/please-beer/webapp-stripe/dev-status.svg)](https://david-dm.org/please-beer/webapp-stripe#info=devDependencies)

# webapp-stripe

Stripe µService

## How to start developing

Clone the repository and run `npm install` to install dependencies.

To start developing, run `npm run dev`. This command will start `gulp` (the
build tool used by this project), which performs the following tasks:

- lint source code ([what is linting?](http://stackoverflow.com/questions/8503559/what-is-linting))
- run unit tests
- calculate code coverage

Each time a javascript file (source code or test) changes, `gulp` re-runs the
three tasks above (the whole process takes just a handful of milliseconds).
Results are displayed in the terminal console, but html reports are also
generated and can be viewed at:

- **lint report** -> [localhost:8080/jscs/index.html](http://localhost:8080/jscs/index.html)
- **unit tests report** -> [localhost:8080/tests/index.html](http://localhost:8080/tests/index.html)
- **code coverage report** -> [localhost:8080/coverage/lcov-report/index.html](http://localhost:8080/coverage/lcov-report/index.html)

Report pages are automatically reloaded when re-generated.

## How to contribute

We follow github's git flow ([info about it](https://guides.github.com/introduction/flow/)).

The gist of it is:

- never commit to master
- branch from master and develop on that branch
- issue a pull request (PR) from that branch to master
- when the PR is ready to be merged, merge it to master (possibly asking a
  teammate to review your code beforehand).

We also use [zenhub](https://zenhub.io), which integrates with github's issues,
to manage the project's tasks.

## Continuous integration

When pushing a branch to the github remote, a git hook triggers the travis-ci
build for the project, which performs the same three tasks `gulp` performs
during development (`coveralls` is used for code coverage). Results are
displayed in the badges at the top of this readme, allowing to see at a glance
the build status of the project.

`travis-ci` and `coveralls` integrate nicely with github: for instance, when a
pull request is opened, they run on the proposed changes and display inline
build results and code coverage delta, allowing the developer to see if it's
safe to merge ([example](https://github.com/mondora/asteroid/pull/27)).
