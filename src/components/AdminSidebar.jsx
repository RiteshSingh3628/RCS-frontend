import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  Email,
  Assessment,
  Archive,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminSidebar = ({
  mobileOpen,
  onDrawerToggle,
  activeTab,
  setActiveTab,
}) => {
    const navigate = useNavigate();
    const handleLogOut= ()=>{
        localStorage.removeItem('user');
        navigate('/')
    }
  const drawer = (
    <div className="h-full bg-gray-50">
      <Toolbar className="flex items-center justify-center h-20">
        <Avatar
          alt="Company Logo"
          src="/logo.png"
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="h6" className="ml-2 font-bold">
          FeedbackPro
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: "Dashboard", icon: <Dashboard />, tab: "dashboard" },
          { text: "Manual Email", icon: <Email />, tab: "email" },
          { text: "Statistics", icon: <Assessment />, tab: "stats" },
          { text: "Archive", icon: <Archive />, tab: "archive" },
          { text: "Settings", icon: <Settings />, tab: "settings" },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            selected={activeTab === item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            <ListItemIcon
              className={activeTab === item.tab ? "text-blue-600" : ""}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key="Logout" onClick={handleLogOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
