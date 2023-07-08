@vocdoni/rainbowkit-wallets
==========================

Rainbowkit wallets & wagmi connectors for easily extending web3 connectivity.

Installing
----------

You'll first need to have a project with Rainbowkit <= 0.12 installed and configured. Follow
their [official documentation](https://www.rainbowkit.com/docs/installation) in order to do so.

After that, you can add the required dependencies:

~~~bash
yarn add @vocdoni/rainbowkit-wallets
~~~

Usage
-----

Add the inputsWallet and/or the oAuthWallet connector to your wallet connectors list:

~~~tsx
import { inputsWallet } from "@vocdoni/rainbowkit-wallets";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      inputsWallet({ chains, name: "Your Preferred Name" }),
      oAuthWallet({
        chains,
        name: "OAuth",
        options: { oAuthServiceUrl: "http://oauth.vocdoni.io" },
      }),
    ],
  },
]);
~~~

LICENSE
-------

This components library is licensed under the [GNU Affero General Public License
v3.0][license].

    Vocdoni UI React Components
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

[chakra getting started]: https://chakra-ui.com/getting-started
[license]: ./LICENSE
[theming]: #theming
[theming components]: #theming-components
[chakra theming]: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-component-styles
[advanced theming]: https://chakra-ui.com/docs/styled-system/advanced-theming
[multipart components]: https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components
[questions]: #questions
[theme path]: ./src/theme
[chakra template]: ../../templates/chakra/src/theme
[css props]: #styling-via-props
[sdk environments]: https://github.com/vocdoni/vocdoni-sdk#environment
[translations file]: ./src/i18n/translations.ts
