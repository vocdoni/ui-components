import { Box, Grid, Stack } from '@chakra-ui/react'
import { ColorModeSwitcher } from '@components/ColorModeSwitcher'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Balance } from '@vocdoni/chakra-components'
import { Outlet } from 'react-router-dom'

import '@rainbow-me/rainbowkit/styles.css'

const Layout = () => (
  <Box>
    <Grid p={3}>
      <Stack direction='row' justifySelf='flex-end' alignItems='center'>
        <Balance />
        <ConnectButton />
        <ColorModeSwitcher />
      </Stack>
      <Outlet />
    </Grid>
  </Box>
)

export default Layout
