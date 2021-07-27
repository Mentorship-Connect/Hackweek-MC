//TODO: add if else for authentication if not authenticated, show register option
import React from 'react';
import useStyles from '../styles';
import { Link } from 'react-router-dom';
import { Tooltip, AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@material-ui/core';
import { MeetingRoom as MeetingRoomIcon, Assignment as AssignmentIcon, SettingsInputComponent as ConnectIcon, Search as SearchIcon, AccountCircle, MoreVert as MoreIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'

export default function HeaderTest() {
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
  );

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
        <MenuItem
          component={Link}
          to="/register"
        >
          <IconButton color="inherit">
            <AssignmentIcon />
          </IconButton>
            <p>Register</p>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/login"
        >
          <IconButton color="inherit">
            <MeetingRoomIcon />
          </IconButton>
            <p>Login</p>
        </MenuItem>

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
          <IconButton color="inherit">
              <ExitToAppIcon />
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
            <Link to={"/"} style={{textDecoration: 'none', color: 'white'}}><ConnectIcon /></Link>
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
          <Tooltip title="Register">
              <IconButton color="inherit">
              <Link to={"/register"} style={{textDecoration: 'none', color: 'white'}}><AssignmentIcon /></Link>
              </IconButton> 
            </Tooltip>
          
          <Tooltip title="Login">
              <IconButton color="inherit">
              <Link to={"/login"} style={{textDecoration: 'none', color: 'white'}}><MeetingRoomIcon /></Link>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign Out">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
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