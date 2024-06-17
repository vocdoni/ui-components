<p align="center" width="100%">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_blank.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
      <img alt="Star History Chart" src="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
  </picture>
</p>

<p align="center" width="100%">
    <a href="https://github.com/vocdoni/ui-components/commits/main/"><img src="https://img.shields.io/github/commit-activity/m/vocdoni/ui-components" /></a>
    <a href="https://github.com/vocdoni/ui-components/issues"><img src="https://img.shields.io/github/issues/vocdoni/ui-components" /></a>
    <a href="https://github.com/vocdoni/ui-components/actions/workflows/test.yml/"><img src="https://github.com/vocdoni/ui-components/actions/workflows/test.yml/badge.svg" /></a>
    <a href="https://discord.gg/xFTh8Np2ga"><img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" /></a>
    <a href="https://twitter.com/vocdoni"><img src="https://img.shields.io/twitter/follow/vocdoni.svg?style=social&label=Follow" /></a>
</p>


  <div align="center">
    Vocdoni is the first universally verifiable, censorship-resistant, anonymous, and self-sovereign governance protocol. <br />
    Our main aim is a trustless voting system where anyone can speak their voice and where everything is auditable. <br />
    We are engineering building blocks for a permissionless, private and censorship resistant democracy.
    <br />
    <a href="https://developer.vocdoni.io/"><strong>Explore the developer portal »</strong></a>
    <br />
    <h3>More About Us</h3>
    <a href="https://vocdoni.io">Vocdoni Website</a>
    |
    <a href="https://vocdoni.app">Web Application</a>
    |
    <a href="https://explorer.vote/">Blockchain Explorer</a>
    |
    <a href="https://law.mit.edu/pub/remotevotingintheageofcryptography/release/1">MIT Law Publication</a>
    |
    <a href="https://chat.vocdoni.io">Contact Us</a>
    <br />
    <h3>Key Repositories</h3>
    <a href="https://github.com/vocdoni/vocdoni-node">Vocdoni Node</a>
    |
    <a href="https://github.com/vocdoni/vocdoni-sdk/">Vocdoni SDK</a>
    |
    <a href="https://github.com/vocdoni/ui-components">UI Components</a>
    |
    <a href="https://github.com/vocdoni/ui-scaffold">Application UI</a>
    |
    <a href="https://github.com/vocdoni/census3">Census3</a>
  </div>

# ui-components

This repository aims to ease the creation of voting interfaces for user-facing applications. The purpose is to allow developers to easily integrate a variety of voting flow components and style these components as desired.

## Included Packages

| Component | Description |
| ---: | --- |
| [![chakra-components badge]][`@vocdoni/chakra-components`] | Voting-related react components built with chakra for easy integration with Vocdoni. |
| [![rainbowkit-wallets badge]][`@vocdoni/rainbowkit-wallets`] | A set of custom wallets for rainbowkit. |
| [![react-providers badge]][`@vocdoni/react-providers`] | React providers and hooks, where most of the Vocdoni protocol integration happens (required by `@vocdoni/chakra-components`) |
| [![extended-sdk badge]][`@vocdoni/extended-sdk`] | Package extending our SDK functionalities (for advanced usage). |

The best place to learn about using ui-components packages is the [developer portal](https://developer.vocdoni.io/ui-components).

### Table of Contents
- [Getting Started](#getting-started)
- [Reference](#reference)
- [Examples](#examples)
- [Preview](#preview)
- [Disclaimer](#disclaimer)
- [Contributing](#contributing)
- [License](#license)


## Getting Started

Each of these packages can be used in a typescript/javascript project by importing them, eg. `yarn add @vocdoni/chakra-components`. Follow the developer documentation, or go to each individual package's readme file, for further details.

Each of the packages has a typescript file configured as an entrypoint, so you should be able to just run `yarn dev` on the included chakra template to start developing any of the included packages.

If you link (via npm/yarn link) any of the included packages to your project, your project MUST be able to run typescript code. Otherwise it will fail.

Turbo was initially configured for the development process, but its usage is minimal; still, you can use it for some global commands:

- `yarn build`: will build every package in the monorepo (including templates)
- `yarn clean`: removes `dist`, `.turbo` and `node_modules` folders in the
  entire monorepo.
- `yarn lint`: runs the linter of each package (may vary per package, but
  usually prettier & tsc).
- `yarn test`: runs all the tests in the monorepo. Note these are configured globally in the monorepo (testing dependencies are in the base `package.json` file)

## Reference

The developer portal includes a [reference](https://developer.vocdoni.io/ui-components) for the `@vocdoni/chakra-components` package that also incorporates the full functionality of `@vocdoni/react-providers`.

## Examples

You can find mock-functional examples of each of the chakra components in the ui-components [documentation](https://developer.vocdoni.io/ui-components/Election). There is also real-world usage of many of the components and providers from this library in the [code](https://github.com/vocdoni/ui-scaffold) for the Vocdoni application front-end.

## Preview

In addition to the live examples in the documentation, you can see many of the components in use at https://app.vocdoni.io/

## Disclaimer

This project is a WIP and is subject to continuous changes during its
development. We encourage you to review this repository and the developer portal for any changes.

## Contributing

While we welcome contributions from the community, we do not track all of our issues on Github and we may not have the resources to onboard developers and review complex pull requests. That being said, there are multiple ways you can get involved with the project.

Please review our [development guidelines](https://developer.vocdoni.io/development-guidelines).

## License

This repository is licensed under the [GNU Affero General Public License v3.0.](./LICENSE)

    Vocdoni UI React Components
    Copyright (C) 2024 Vocdoni Association

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

[`@vocdoni/chakra-components`]: ./packages/chakra-components/README.md
[`@vocdoni/rainbowkit-wallets`]: ./packages/rainbowkit-wallets/README.md
[`@vocdoni/react-providers`]: ./packages/react-providers/README.md
[`@vocdoni/extended-sdk`]: ./packages/extended-sdk/README.md

[chakra-components badge]: https://img.shields.io/npm/v/%40vocdoni%2Fchakra-components?label=%40vocdoni%2Fchakra-components
[rainbowkit-wallets badge]: https://img.shields.io/npm/v/%40vocdoni%2Frainbowkit-wallets?label=%40vocdoni%2Frainbowkit-wallets
[react-providers badge]: https://img.shields.io/npm/v/%40vocdoni%2Freact-providers?label=%40vocdoni%2Freact-providers
[extended-sdk badge]: https://img.shields.io/npm/v/%40vocdoni%2Freact-providers?label=%40vocdoni%2Fextended-sdk
