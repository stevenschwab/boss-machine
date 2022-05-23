const express = require('express');
const ideasRouter = express.Router();
// import checkMillionDollarIdea
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// import helper functions
const { createMeeting, getAllFromDatabase, getFromDatabaseById,
    addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    const foundIdeasArray = getAllFromDatabase('ideas');
    if (foundIdeasArray) {
        res.send(foundIdeasArray);
    } else {
        res.status(404).send();
    }
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    if (newIdea) {
        const createdIdea = addToDatabase('ideas', newIdea);
        res.status(201).send(createdIdea);
    } else {
        res.status(400).send();
    }
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
    if (foundIdea) {
        res.send(foundIdea);
    } else {
        res.status(404).send();
    }
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
    const idea = req.body;
    if (idea && foundIdea) {
        const updatedIdea = updateInstanceInDatabase('ideas', idea);
        res.send(updatedIdea);
    } else {
        res.status(404).send();
    }
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
    if (foundIdea) {
        const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
        if (deletedIdea) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(404).send();
    }
});

module.exports = ideasRouter;