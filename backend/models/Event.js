const mongoose = require("mongoose");
const cryptoJS = require("crypto-js");

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    eventType: { type: String, enum: ["image", "video"], required: true },
    eventFile: { type: String, required: true },
    attendeeList: { type: String },
    eventLink: { type: String },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
