const express = require('express');
const minionsRouter = express.Router();

// import helper functions
const { createMeeting, getAllFromDatabase, getFromDatabaseById,
    addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    const foundMinionsArray = getAllFromDatabase('minions');
    if (foundMinionsArray) {
      res.send(foundMinionsArray);
    } else {
      res.status(404).send();
    }
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    if (newMinion) {
        const createdMinion = addToDatabase('minions', newMinion);
        res.status(201).send(createdMinion);
    } else {
        res.status(400).send();
    }
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    if (foundMinion) {
        res.send(foundMinion);
    } else {
        res.status(404).send();
    }
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    const { id, name, title, weaknesses, salary } = req.body;
    if (id && name && title && weaknesses && salary && foundMinion) {
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    if (foundMinion) {
        const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
        if (deletedMinion) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;
