import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
    const { id } = useParams(); // Get event ID from URL
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
        eventType: "image",
        eventFile: null,
        attendeeList: null,
        eventLink: "",
        location: "",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const { data } = await API.get(`/events/${id}`);
            setEventData({
                name: data.name,
                description: data.description || "",
                date: data.date.split("T")[0], // Format date for input field
                eventType: data.eventType,
                eventFile: data.eventFile,
                attendeeList: data.attendeeList || null,
                eventLink: data.eventLink || "",
                location: data.location,
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching event:", error);
        }
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(eventData).forEach((key) => {
            formData.append(key, eventData[key]);
        });

        try {
            await API.put(`/events/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/events");
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    if (loading) {
        return (
            <Typography variant="h5" sx={{ textAlign: "center", mt: 5 }}>
                Loading event details...
            </Typography>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Event
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Event Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={eventData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Event Date"
                        name="date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={eventData.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label="Event Type"
                        name="eventType"
                        select
                        fullWidth
                        margin="normal"
                        value={eventData.eventType}
                        onChange={handleChange}
                    >
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="video">Video</MenuItem>
                    </TextField>
                    <Typography variant="subtitle1">
                        Current Event File:{" "}
                        {eventData.eventFile &&
                            eventData.eventFile.split("/").pop()}
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload New Event File
                        <input
                            type="file"
                            name="eventFile"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Current Attendee List:{" "}
                        {eventData.attendeeList &&
                            eventData.attendeeList.split("/").pop()}
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Upload New Attendee List (Excel)
                        <input
                            type="file"
                            name="attendeeList"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    <TextField
                        label="Event Web Link"
                        name="eventLink"
                        fullWidth
                        margin="normal"
                        value={eventData.eventLink}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Location"
                        name="location"
                        fullWidth
                        margin="normal"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Update Event
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditEvent;
