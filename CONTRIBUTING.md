# Splain Contributing Guide

## Issue Reporting Guidelines

- Always search for your issue first. It may have already been answered, planned or fixed in some branch.

- Create a declarative title and describe clearly the steps necessary to reproduce the issue.

- Label the issue appropriately for instance use `bug` for defects and `enhancement` for suggestions.

- Do not demand a fix, this is a free and open source library so any demands will not be met with a link on how to get started contributing.

## Pull Request Guidelines

- The `master` should be kept stable and so development should be done in dedicated and relevantly named branches. **Do not submit PRs against the `master` branch.**

- Changes should be made in lib and any new files should have respective test files.

- Make small commits as you work on the PR. They will be automatically squashed before merging.

- If fixing a bug please try and create a test first that proves the defect exists. 

- Unless absolutely necessary try and stay away from any dependencies that aren't dev specific (e.g. build tools)

- Dont forget to update relevant docs! 



## Development Setup

You will need [Node.js](http://nodejs.org)

After cloning the repo, run:

`npm install` to install

`npm build` to bundle with webpack;

`npm test` to run all the tests. (`npm lint-fix` will fix minor eslint issues such as spacing)
