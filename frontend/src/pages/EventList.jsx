import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Pagination,
} from "@mui/material";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, [page, search]);

    const fetchEvents = async () => {
        try {
            const { data } = await API.get(
                `/events?page=${page}&limit=6&search=${search}`
            );
            setEvents(data.events);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                All Events
            </Typography>
            <TextField
                label="Search Events"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearchChange}
            />
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event._id}>
                        <Card>
                            <CardMedia
                                component={
                                    event.eventType === "image"
                                        ? "img"
                                        : "video"
                                }
                                height="180"
                                image={`http://localhost:5000/${event.eventFile.replace(
                                    /\\/g,
                                    "/"
                                )}`}
                                controls={event.eventType === "video"}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {event.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {new Date(event.date).toDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() =>
                                        navigate(`/edit-event/${event._id}`)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={async () => {
                                        await API.delete(
                                            `/events/${event._id}`
                                        );
                                        fetchEvents();
                                    }}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, val) => setPage(val)}
                sx={{ mt: 3 }}
            />
        </Container>
    );
};

export default EventList;
