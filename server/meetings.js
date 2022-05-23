const express = require('express');
const meetingsRouter = express.Router();

// import helper functions
const { createMeeting, getAllFromDatabase, getFromDatabaseById,
    addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    const foundMeetingsArray = getAllFromDatabase('meetings');
    if (foundMeetingsArray) {
        res.send(foundMeetingsArray);
    } else {
        res.status(404).send();
    }
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    if (newMeeting) {
        const createdMeeting = addToDatabase('meetings', newMeeting);
        res.status(201).send(createdMeeting);
    } else {
        res.status(400).send();
    }
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    try {
        deleteAllFromDatabase('meetings');
        res.status(204).send();
    } catch {
        res.status(404).send();
    }
});

module.exports = meetingsRouter;