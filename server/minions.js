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

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const foundMinion = getFromDatabaseById('work', req.params.minionId);
    if (foundMinion) {
        const foundWorkArray = getAllFromDatabase('work').filter(work => work.minionId === req.params.minionId);
        if (foundWorkArray) {
            res.send(foundWorkArray);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(404).send();
    }
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    if (foundMinion) {
        const newWork = req.body;
        if (newWork) {
            const createdWork = addToDatabase('work', newWork);
            res.status(201).send(createdWork);
        } else {
            res.status(400).send();
        }
    } else {
        res.status(404).send();
    }
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (typeof req.params.workId !== 'number') {
        res.status(404).send();
    }
    const foundWorkByMinionId = getAllFromDatabase('work').filter(work => work.minionId === req.params.minionId);
    const foundWork = foundWorkByMinionId.findIndex(work => work.id === req.params.workId);
    const { id, title, description, hours, minionId } = req.body;
    if (id && title && description && hours && minionId && foundWork !== -1) {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        if (updatedWork) {
            res.send(updatedWork);
        } else {
            res.status(400).send();
        }
    } else if (foundWork === -1) {
        res.status(400).send();
    } else {
        res.status(404).send();
    }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const foundWork = getAllFromDatabase('work').filter(work => work.minionId === req.params.minionId).findIndex(work => work.id === req.params.workId);
    if (foundWork !== -1) {
        const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
        if (deletedWork) {
            res.status(204).send();
        } else {
            res.status(400).send();
        }
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;
