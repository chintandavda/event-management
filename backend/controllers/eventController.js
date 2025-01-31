const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, eventType, eventLink, location } = req.body;

        if (!req.files || !req.files["eventFile"]) {
            return res.status(400).json({ message: "Event media file is required" });
        }

        const eventFile = req.files["eventFile"][0].path;
        const attendeeList = req.files["attendeeList"] ? req.files["attendeeList"][0].path : null;

        const event = new Event({
            name,
            description,
            date,
            eventType,
            eventFile,
            attendeeList,
            eventLink,
            location
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("Error in Create Event:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Events with Pagination and Search
exports.getEvents = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", startDate, endDate } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const events = await Event.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select("-__v");

        const totalEvents = await Event.countDocuments(query);

        res.status(200).json({
            events,
            totalEvents,
            totalPages: Math.ceil(totalEvents / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        console.error("Error in Get Events:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update Event (Admin only)
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, date, eventType, eventLink, location } = req.body;

        const updateData = { name, description, date, eventType, eventLink, location };

        if (req.files && req.files["eventFile"]) {
            updateData.eventFile = req.files["eventFile"][0].path;
        }

        if (req.files && req.files["attendeeList"]) {
            updateData.attendeeList = req.files["attendeeList"][0].path;
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error("Error in Update Event:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Event (Admin only)
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error in Delete Event:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get Single Event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
