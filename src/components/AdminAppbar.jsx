import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

const AdminAppBar = ({ activeTab, onDrawerToggle, isMobile }) => (
  <AppBar
    position="fixed"
    sx={{
      width: { md: `calc(100% - 240px)` },
      ml: { md: `240px` },
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 'none',
      borderBottom: '1px solid #e5e7eb'
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onDrawerToggle}
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" className="font-bold">
        {activeTab === 'dashboard' && 'Dashboard'}
        {activeTab === 'email' && 'Manual Email'}
        {activeTab === 'stats' && 'Statistics'}
        {activeTab === 'archive' && 'Archive'}
        {activeTab === 'settings' && 'Settings'}
      </Typography>
      <div className="flex-grow" />
      <IconButton color="inherit">
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Avatar alt="Admin User" src="/avatar.jpg" className="ml-2" />
    </Toolbar>
  </AppBar>
);

export default AdminAppBar;