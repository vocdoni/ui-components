import { Box, Grid, Stack } from '@chakra-ui/react'
import { Account } from '@components/Account'
import { ColorModeSwitcher } from '@components/ColorModeSwitcher'
import { Balance } from '@vocdoni/chakra-components'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <Box>
    <Grid p={3}>
      <Stack direction='row' justifySelf='flex-end' alignItems='center' mb={3}>
        <Balance />
        <Account />
        <ColorModeSwitcher />
      </Stack>
      <Outlet />
    </Grid>
  </Box>
)

export default Layout
