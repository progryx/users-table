import React from 'react'
import { Container, AppBar, Typography, Toolbar } from '@material-ui/core'
import { UsersTableContainer } from './components/UsersTableContainer'

export const RootApp = () => (
  <React.Fragment>
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Users table</Typography>
        </Toolbar>
      </AppBar>
      <UsersTableContainer />
    </Container>
  </React.Fragment>
)
