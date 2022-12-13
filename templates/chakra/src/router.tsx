import Error404 from '@elements/Error404'
import Home from '@elements/Home'
import RouteError from '@elements/RouteError'
import Vote from '@elements/Vote'
import Layout from '@src/Layout'
import { EnvironmentInitialitzationOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        element={<Vote />}
        errorElement={<RouteError />}
        path='/process/:pid'
        loader={async ({params}) =>
          await new VocdoniSDKClient({
            env: EnvironmentInitialitzationOptions.DEV,
            electionId: params.pid,
          }).fetchElection()
        }
      />
      <Route path='*' element={<Error404 />} />
    </Route>
  )
)

export default router
