//TODO: add if else for authentication if not authenticated, show register option
import React, { Fragment, useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'

import useStyles from '../styles';
import { Tooltip, AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, Button } from '@material-ui/core';
import { SettingsInputComponent as ConnectIcon, Search as SearchIcon, AccountCircle, MoreVert as MoreIcon, ExitToApp } from '@material-ui/icons'

export default function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const { isAuthenticated, logout } = useContext(AuthContext)
  console.log(isAuthenticated)
  const location = useLocation()

  useEffect(() => {
      const token = user?.token

      if (token) {
        const decodedToken = decode(token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout()
        }
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, logout, user?.token])

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogoutAndMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    logout()
  };

  const menuId = 'primary-search-account-menu';
  //keeping here in case we want to use this elsewhere
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  ) 

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        
        <MenuItem onClick={handleProfileMenuOpen}>   
              <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              >
                  <AccountCircle />
              </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <ExitToApp />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to={"/"} style={{textDecoration: 'none', color: 'whitesmoke'}}><ConnectIcon /></Link>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Mentorship Connect
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="Profile">
              <IconButton aria-label="show 4 new mails" color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
            {user ? (
              <Tooltip title="Sign Out">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogoutAndMenuClose}
                color="inherit"
              >
                <ExitToApp />
              </IconButton>
              </Tooltip>
            ) : (
              <Fragment>
                <Button component={Link} to="/login">Login</Button>
                <Button component={Link} to="/register">Register</Button>
              </Fragment>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}