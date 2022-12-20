Vocdoni UI components and other helpers
=======================================

This project aims to ease the creation of voting user interfaces, allowing
developers to easily style everything as desired, and to chose from a variety of
different voting flow components.

This project is a WIP and is subject to continuous changes during its development,
and the SDK one (meaning we'll update this project every time the
SDK receives new updates too).

Project distribution
--------------------

For now, two different package folders have been created:

- [`components`]: holds the proper libraries. Every package in this folder will
  be uploaded to npm registry and be available to install with your package manager.
- [`templates`]: not published packages, used by developers to either test here the
  components, or to easily bootstrap a voting project of they liking.

Development
-----------

There's a `dev` script on every project, allowing you to watch for your changes,
and automatically refreshing the contents thanks to the hot module reload.

If you want to work in any of the components library and, at the same time,
watching the changes in one of the `templates` repos, you only need to run a
`yarn dev` in both folders:

~~~bash
cd components/voting
yarn dev

# in another terminal, without closing the previous one
cd templates/chakra
yarn dev
~~~

Please note though, that using this approach sometimes may reload your page before
the entire compilation is done. In these cases you'll see your browser stuck at
loading, and you'll need to stop it (just by using <kbd>ESC</kbd> key), and
refresh it manually.

If you're not planing on making changes to any of the components libraries and,
instead, you only want to work on a template, you can replace the first `yarn dev`
with a `yarn build` and forget about it unless you make any changes to the
components library.

LICENSE
-------

The components libraries are licensed under the [GNU Affero General Public License
v3.0][license].

However, the templates folders are not licensed, so you can do whatever you want
with them.

    Vocdoni UI Components
    Copyright (C) 2022 Vocdoni Roots MCU

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
[`components`]: ./components
[`templates`]: ./templates
