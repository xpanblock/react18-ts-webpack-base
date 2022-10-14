import { Box, CssBaseline, Paper, Typography } from '@mui/material'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <h1>
        Dashboard - {process.env.NODE_ENV} - {process.env.name}
      </h1>
      <CssBaseline />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={3}
          sx={{ padding: '1rem', backgroundColor: 'secondary.light' }}
        >
          <Typography color="primary.dark" variant="h1">
            Starter App
          </Typography>
        </Paper>
      </Box>
    </>
  )
}

export default Dashboard
