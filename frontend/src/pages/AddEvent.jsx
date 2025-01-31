import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Grid,
} from "@mui/material";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
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

    const navigate = useNavigate();

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
            await API.post("/events", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/events");
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Add an Event
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
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Event File
                        <input
                            type="file"
                            name="eventFile"
                            hidden
                            onChange={handleFileChange}
                            required
                        />
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Upload Attendee List (Excel)
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
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddEvent;
