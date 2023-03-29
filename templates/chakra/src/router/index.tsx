import Error404 from '@elements/Error404'
import RouteError from '@elements/RouteError'
import Layout from '@src/Layout'
import { useClientContext } from '@vocdoni/react-components'
import { lazy } from 'react'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { SuspenseLoader } from './SuspenseLoader'

const Home = lazy(() => import('@elements/Home'))
const Vote = lazy(() => import('@elements/Vote'))

export const RoutesProvider = () => {
  const { client } = useClientContext()
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<RouteError />}>
        <Route
          index
          element={
            <SuspenseLoader>
              <Home />
            </SuspenseLoader>
          }
        />
        <Route
          element={
            <SuspenseLoader>
              <Vote />
            </SuspenseLoader>
          }
          path='/process/:pid'
          loader={async ({ params }) => await client.fetchElection(params.pid)}
        />
        <Route path='*' element={<Error404 />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}