const checkMillionDollarIdea = (req, res, next) => {
    const { id, name, description, numWeeks, weeklyRevenue } = req.body;
    if (Number(numWeeks) * Number(weeklyRevenue) >= 1000000) {
        next();
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
