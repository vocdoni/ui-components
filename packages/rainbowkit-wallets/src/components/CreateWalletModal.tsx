import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999999999,
  },
  overlay: { zIndex: 9999999999 },
}

type ICreateWalletProps = {
  onSubmit: (data: any) => void
  onExit: () => void
}

export function CreateWalletModal(props: ICreateWalletProps): React.JSX.Element {
  const [modalIsOpen, setIsOpen] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function closeModal() {
    setIsOpen(false)
    props.onExit()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpen(false)
    props.onSubmit({ username, password })
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        ariaHideApp={false}
      >
        <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Please, fill in your username and password:</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input
            style={{
              display: 'block',
              border: '1px solid #CCC',
              borderRadius: '8px',
              height: '35px',
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
            }}
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
        </form>
      </Modal>
    </div>
  )
}
