<div align="center">

![vocdoni logo]


[![GitHub commit activity (develop)][commit activity badge]][github commits]
[![GitHub issues][github issues badge]][github issues]
[![lint and test][lint and test badge]][lint and test]
[![Join Discord][discord badge]][discord invite]
[![Twitter Follow][twitter badge]][twitter follow]

</div>

Vocdoni's UI components
=======================

This project aims to ease the creation of voting user interfaces, allowing
developers to easily style everything as desired, and to chose from a variety of
different voting flow components.

This project is a WIP and is subject to continuous changes during its
development, and the SDK one (meaning we'll update this project every time the
SDK receives new updates too).

Project distribution
--------------------

For now, two different package folders have been created:

- [`packages`]: holds published packages. Most packages in this folder will be
  uploaded to npm registry and will be available to install with your package
  manager.
- [`templates`]: not published packages, used by developers to either test here
  the components, or to easily bootstrap a voting project of they liking.

Included packages
-----------------


| Component | Description |
| --- | --- |
| [![chakra-components badge]][`@vocdoni/chakra-components`] | Voting related react components built with chakra for easily integrating Vocdoni. |
| [![rainbowkit-wallets badge]][`@vocdoni/rainbowkit-wallets`] | A set of custom wallets for rainbowkit. |
| [![react-providers badge]][`@vocdoni/react-providers`] | React providers and hooks, where most of the magic of react apps happens (required by `@vocdoni/chakra-components`) |

Development
-----------

Every package has typescript files configured as entrypoints, so you should be
able to just run `yarn dev` on the included chakra template to start developing
any of the included packages.

Due to the above mentioned reason, if you link (via npm/yarn link) any of the
included packages to your project, your project MUST be able to run typescript
code, otherwise it will fail.

Turbo was initially configured for the development process, but its usage is
minimum; still, you can use it for some global commands:

- `yarn build`: will build every package in the monorepo (including templates)
- `yarn clean`: removes `dist`, `.turbo` and `node_modules` folders in the
  entire monorepo.
- `yarn lint`: runs the linter of each package (may vary per package, but
  usually prettier & tsc).
- `yarn test`: runs all the tests in the monorepo. Note these are configured
  globally in the monorepo (testing dependencies are in the base `package.json`
  file)

LICENSE
-------

The components libraries are licensed under the [GNU Affero General Public
License v3.0][license].

However, the templates folders are not licensed, so you can do whatever you want
with them.

    Vocdoni UI Components
    Copyright (C) 2023 Vocdoni Roots MCU

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

[license]: ./LICENSE
[`packages`]: ./packages
[`templates`]: ./templates
[`@vocdoni/chakra-components`]: ./packages/chakra-components/README.md
[`@vocdoni/rainbowkit-wallets`]: ./packages/rainbowkit-wallets/README.md
[`@vocdoni/react-providers`]: ./packages/react-providers/README.md

[vocdoni logo]: https://docs.vocdoni.io/Logotype.svg
[chakra-components badge]: https://img.shields.io/npm/v/%40vocdoni%2Fchakra-components?label=%40vocdoni%2Fchakra-components
[commit activity badge]: https://img.shields.io/github/commit-activity/m/vocdoni/ui-components
[discord badge]: https://img.shields.io/badge/discord-join%20chat-blue.svg
[github issues badge]: https://img.shields.io/github/issues/vocdoni/ui-components
[lint and test badge]: https://github.com/vocdoni/ui-components/actions/workflows/test.yml/badge.svg?branch=main
[rainbowkit-wallets badge]: https://img.shields.io/npm/v/%40vocdoni%2Frainbowkit-wallets?label=%40vocdoni%2Frainbowkit-wallets
[react-providers badge]: https://img.shields.io/npm/v/%40vocdoni%2Freact-providers?label=%40vocdoni%2Freact-providers
[twitter badge]: https://img.shields.io/twitter/follow/vocdoni?style=social&label=Follow

[discord invite]: https://discord.gg/xFTh8Np2ga
[twitter follow]: https://twitter.com/intent/user?screen_name=vocdoni
[lint and test]: https://github.com/vocdoni/ui-components/actions/workflows/test.yml
[github issues]: https://github.com/vocdoni/ui-components/issues
[github commits]: https://github.com/vocdoni/ui-components/commits/main
