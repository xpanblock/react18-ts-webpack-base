const Settings = (): JSX.Element => {
  return (
    <>
      <h1>
        Settings - {process.env.NODE_ENV} - {process.env.name}
      </h1>
    </>
  )
}

export default Settings
