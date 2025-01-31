import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to Event Management
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
                Manage and explore exciting events with ease!
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/events"
                    sx={{ mx: 2 }}
                >
                    View Events
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/login"
                    sx={{ mx: 2 }}
                >
                    Get Started
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
