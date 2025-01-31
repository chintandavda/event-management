import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
                >
                    Event Management
                </Typography>

                {user ? (
                    <>
                        <Button color="inherit" component={Link} to="/events">
                            Events
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/add-event"
                        >
                            Add Event
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
