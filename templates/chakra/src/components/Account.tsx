import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BiChevronDown, BiLogOut } from 'react-icons/bi'
import { useAccount, useDisconnect } from 'wagmi'

import '@rainbow-me/rainbowkit/styles.css'
import { useClient } from '@vocdoni/react-providers'

const addressTextOverflow = (address: string) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`

export const Account = () => {
  const { clear } = useClient()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    return <ConnectButton chainStatus='none' showBalance={false} label='Connect' />
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
        {addressTextOverflow(address as string)}
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<BiLogOut />}
          onClick={() => {
            clear()
            disconnect()
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
