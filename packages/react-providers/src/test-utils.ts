// workaround for https://github.com/testing-library/react-testing-library/issues/1233#issuecomment-1686160909
export const onlyProps = (props: any) => {
  const {
    children: {
      props: { renderCallbackProps },
    },
  } = props

  return {
    ...renderCallbackProps,
  }
}

export const properProps = (props: any) => ({
  ...onlyProps(props),
  children: props.children,
})

export const CensusUrls = {
  dev: 'https://census3.dev.vocdoni.net/api',
  stg: 'https://census3.stg.vocdoni.net/api',
  prod: 'https://census3.vocdoni.net/api',
}
export const ApiUrl = {
  dev: 'https://api-dev.vocdoni.net/v2',
  stg: 'https://api-stg.vocdoni.net/v2',
  prod: 'https://api.vocdoni.net/v2',
}
