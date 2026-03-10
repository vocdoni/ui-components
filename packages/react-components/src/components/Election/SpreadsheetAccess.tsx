import { Wallet } from '@ethersproject/wallet'
import { errorToString, useClient, useElection, walletFromRow } from '../../providers'
import { PublishedElection, VocdoniSDKClient } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useReactComponentsLocalize } from '../../i18n/localize'
import { useComponents } from '../context/useComponents'

type MetaSpecs = {
  [name: string]: {
    type?: string
    pattern?: { value: string; message: string }
    description?: string
    props?: { min?: number; max?: number }
  }
}

export type SpreadsheetAccessProps = {
  hashPrivateKey?: boolean
  className?: string
}

export const SpreadsheetAccess = ({ hashPrivateKey, className }: SpreadsheetAccessProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { SpreadsheetAccess: Slot } = useComponents()
  const localize = useReactComponentsLocalize()
  const { env } = useClient()
  const { connected, clearClient, election, client: cl, setClient, sikPassword, sikSignature } = useElection()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>()

  const shouldRender = election instanceof PublishedElection && election.get('census.type') === 'spreadsheet'
  const privkey = window.location.hash ? window.location.hash.split('#')[1] : ''

  useEffect(() => {
    ;(async () => {
      try {
        if (!shouldRender || !privkey) return
        const privKeyWallet = new Wallet(privkey)
        const client = new VocdoniSDKClient({ env, wallet: privKeyWallet, electionId: election?.id })
        setClient(client)
      } catch (error) {
        console.warn('Error trying to login with private key ', error)
        setClient(cl)
      }
    })()
  }, [election, env, shouldRender, privkey, setClient, cl])

  if (!shouldRender) return null

  const required = { value: true, message: localize('validation.required') }
  const minLength = { value: 8, message: localize('validation.min_length', { min: 8 }) }

  const specs: MetaSpecs = election.get('census.specs')
  const fields: string[] = election.get('census.fields')
  const fspecs = (field: string) => {
    if (!specs || typeof specs[field] === 'undefined') return
    const spec = specs[field]
    const rules: Record<string, any> = {}

    if (spec.pattern) {
      rules.pattern = {
        value: new RegExp(spec.pattern.value),
        message: spec.pattern.message,
      }
    }

    if (spec.props) {
      if (typeof spec.props.max !== 'undefined') rules.max = spec.props.max
      if (typeof spec.props.min !== 'undefined') rules.min = spec.props.min
    }

    return rules
  }
  const ispecs = (field: string) => {
    if (!specs || typeof specs[field] === 'undefined') return
    const spec = specs[field]
    const attrs: { type?: string; min?: number; max?: number } = {}

    if (spec.type) attrs.type = spec.type
    if (spec.props) {
      if (typeof spec.props.max !== 'undefined') attrs.max = spec.props.max
      if (typeof spec.props.min !== 'undefined') attrs.min = spec.props.min
    }

    return attrs
  }
  const description = (field: string) => {
    if (!specs || typeof specs[field] === 'undefined') return
    return specs[field].description
  }

  const onSubmit = async (vals: any) => {
    try {
      setLoading(true)

      let sikp: null | string = null
      if (election.electionType.anonymous) {
        sikp = vals.sik_password
        delete vals.sik_password
      }

      const hid = await cl.electionService.getNumericElectionId(election.id)
      const salt =
        election.get('census.salt') || (await cl.electionService.getElectionSalt(election.organizationId, hid))
      const wallet = walletFromRow(salt, Object.values(vals))
      const client = new VocdoniSDKClient({ env, wallet, electionId: election.id })

      if (!(await client.isInCensus())) {
        console.warn(localize('errors.wrong_data_description'))
        return
      }

      if (election.electionType.anonymous && sikp) {
        const signature = await client.anonymousService.signSIKPayload(wallet)
        const sik = await client.anonymousService.fetchAccountSIK(wallet.address).catch(() => false)
        const valid = await client.anonymousService.hasRegisteredSIK(wallet.address, signature, sikp)
        if (sik && !valid) {
          console.warn(localize('errors.wrong_data_description'))
          return
        }
        sikPassword(sikp)
        sikSignature(signature)
      }

      setClient(client)
      if (hashPrivateKey) {
        document.location.hash = wallet.privateKey
      }
      reset()
      setOpen(false)
    } catch (error) {
      console.warn(errorToString(error))
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    window.history.pushState({}, '', document.location.pathname)
    clearClient()
  }

  return (
    <Slot
      className={className}
      connected={connected}
      loading={loading}
      title={localize('spreadsheet.modal_title')}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => !loading && setOpen(false)}
      onLogout={logout}
      onSubmit={handleSubmit(onSubmit) as unknown as () => void}
      fields={fields.map((field, key) => ({
        id: key.toString(),
        label: field,
        description: description(field),
        error: errors[key]?.message?.toString(),
        inputProps: register(key.toString(), {
          required,
          ...fspecs(field),
        }),
        inputAttrs: ispecs(field),
      }))}
      anonymousField={
        election.electionType.anonymous
          ? {
              id: 'sik_password',
              label: localize('spreadsheet.anon_sik_label'),
              description: localize('spreadsheet.anon_sik_helper'),
              error: errors.sik_password?.message?.toString(),
              inputProps: register('sik_password', { required, minLength }),
              inputAttrs: { type: 'password' },
            }
          : undefined
      }
    />
  )
}
