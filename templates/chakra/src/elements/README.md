What are elements?
==================

Elements are components used by react-router, meaning they have specific
dependencies and can only be executed as react-router route elements.

Some, like `Vote.tsx` receive dependencies using hooks like `useLoaderData`.
Others, like `Home.tsx`, use specific react-router calls like `useNavigate`.

See the documentation
[about Routes](https://reactrouter.com/en/main/components/routes) and
[about errorElement](https://reactrouter.com/en/main/route/error-element)
