import React, { useState } from 'react'
import { 
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Grid, MenuItem, Link 
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const pages = [
  {
    label: 'Home',
    url: '/'
  },
  {
    label: 'Create List',
    url: '/create/list'
  },
  {
    label: 'Lists',
    url: '/lists'
  }
]

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null)
    if (page != null) {
      window.open(page.url, '_self')
    }
  }

  return (
    <AppBar position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/" color="inherit">
              <img alt='Test App' src='/logo192.png' width={64} height={64} style={{ objectFit: 'contain', borderRadius:32, marginTop:10 }} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            onClick={() => {window.open('/', '_self')}}
          >
            <img alt='Test App' src='/logo192.png' width={40} height={40} style={{ objectFit: 'contain', borderRadius:20}} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Grid container justifyContent="flex-end">
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "inherit", display: 'block', fontWeight: 'bold' }}
              >
                {page.label}
              </Button>
            ))}
            </Grid>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header