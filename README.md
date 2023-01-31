Vocdoni UI components and other helpers
=======================================

This project aims to ease the creation of voting user interfaces, allowing
developers to easily style everything as desired, and to chose from a variety of
different voting flow components.

This project is a WIP and is subject to continuous changes during its
development, and the SDK one (meaning we'll update this project every time the
SDK receives new updates too).

Project distribution
--------------------

For now, two different package folders have been created:

- [`packages`]: holds published packages. Every package in this folder will be
  uploaded to npm registry and will be available to install with your package
  manager.
- [`templates`]: not published packages, used by developers to either test here
  the components, or to easily bootstrap a voting project of they liking.

Development
-----------

There's a `dev` script on every project, allowing you to watch for your changes,
and automatically refreshing the contents thanks to the hot module reload.

But the main repo has turborepo configured, so you can start everything by just
running `yarn dev` in the root folder.

Using this method you'll sometimes see errors in the console about not being
able to resolve `@vocdoni/react-components`. Just ignore it, since that's because
it's building the scripts in that moment.

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
