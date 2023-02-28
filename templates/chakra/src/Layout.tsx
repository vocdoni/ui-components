import { Box, Grid, Stack } from '@chakra-ui/react'
import { ColorModeSwitcher } from '@components/ColorModeSwitcher'
import { Balance } from '@vocdoni/react-components'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <Box>
    <Grid p={3}>
      <Stack direction='row' justifySelf='flex-end' alignItems='center'>
        <Balance />
        <ColorModeSwitcher />
      </Stack>
      <Outlet />
    </Grid>
  </Box>
)

export default Layout
