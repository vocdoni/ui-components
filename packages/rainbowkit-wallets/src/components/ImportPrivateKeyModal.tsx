import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import localStorageWallet from '../lib/localStorageWallet'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999999999,
    maxWidth: '300px',
  },
  overlay: { zIndex: 9999999999 },
}

type ICreateWalletProps = {
  onSubmit: (data: any) => void
  onExit: () => void
}

export function ImportPrivateKeyModal(props: ICreateWalletProps): React.JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [pk, setPk] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [onlyPass, setOnlyPass] = useState<boolean>(false)

  function closeModal() {
    setModalIsOpen(false)
    props.onExit()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    if (pk.length && !localStorageWallet.isValidEthereumPrivateKey(pk)) {
      setError('Invalid private key')
      return false
    }

    setModalIsOpen(false)
    props.onSubmit({ pk, password })
  }

  useEffect(() => {
    if (!modalIsOpen) return

    // read info from localstorage to check for a stored key
    if (localStorageWallet.isAwaitingPassword()) {
      setOnlyPass(true)
      return
    }
    setOnlyPass(false)
    // localStorage
  }, [modalIsOpen])

  const intro = onlyPass
    ? 'Please, specify the password of the stored private key'
    : 'Please, fill in your private key and set a password for it'

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Private Key Import Modal'
      ariaHideApp={false}
    >
      <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{intro}</h2>
      <form onSubmit={handleSubmit}>
        {!onlyPass && (
          <>
            <label htmlFor='pk'>Private Key</label>
            <input
              type='password'
              style={{
                display: 'block',
                border: '1px solid #CCC',
                borderRadius: '8px',
                height: '35px',
                width: '100%',
                padding: '10px',
              }}
              id='pk'
              value={pk}
              onChange={(e) => setPk(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </>
        )}

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          style={{
            display: 'block',
            border: '1px solid #CCC',
            borderRadius: '8px',
            height: '35px',
            width: '100%',
            padding: '10px',
          }}
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type='submit'
          value='Connect'
          style={{
            cursor: 'pointer',
            display: 'block',
            background: '#9526FC',
            paddingRight: '14px',
            paddingLeft: '14px',
            height: '40px',
            fontWeight: 700,
            borderRadius: '8px',
            color: 'white',
            marginTop: '20px',
          }}
        />
        {onlyPass && (
          <button
            onClick={() => {
              localStorageWallet.deleteWallet()
              setOnlyPass(false)
            }}
          >
            Or reset and specify a new one
          </button>
        )}
      </form>
    </Modal>
  )
}
