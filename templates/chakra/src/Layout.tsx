import { Box, Grid } from '@chakra-ui/react'
import { ColorModeSwitcher } from '@components/ColorModeSwitcher'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <Box>
    <Grid p={3}>
      <ColorModeSwitcher justifySelf='flex-end' />
      <Outlet />
    </Grid>
  </Box>
)

export default Layout
