const express = require("express");
const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    getEventById
} = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management routes
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Conference 2025"
 *               description:
 *                 type: string
 *                 example: "An event about the latest in technology."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-15"
 *               eventType:
 *                 type: string
 *                 enum: ["image", "video"]
 *                 example: "image"
 *               eventFile:
 *                 type: string
 *                 format: binary
 *               attendeeList:
 *                 type: string
 *                 format: binary
 *               eventLink:
 *                 type: string
 *                 example: "https://example.com"
 *               location:
 *                 type: string
 *                 example: "New York, USA"
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", protect, upload.fields([
    { name: "eventFile", maxCount: 1 },
    { name: "attendeeList", maxCount: 1 }
]), createEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events with pagination and search
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of events per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by event name
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date filter
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 */
router.get("/", getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protect, getEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tech Conference"
 *               description:
 *                 type: string
 *                 example: "Updated description of the event."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-10"
 *               eventType:
 *                 type: string
 *                 enum: ["image", "video"]
 *                 example: "video"
 *               eventFile:
 *                 type: string
 *                 format: binary
 *               attendeeList:
 *                 type: string
 *                 format: binary
 *               eventLink:
 *                 type: string
 *                 example: "https://updated-example.com"
 *               location:
 *                 type: string
 *                 example: "Los Angeles, USA"
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, upload.fields([
    { name: "eventFile", maxCount: 1 },
    { name: "attendeeList", maxCount: 1 }
]), updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, deleteEvent);

module.exports = router;
