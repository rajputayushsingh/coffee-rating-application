const express = require("express");
const Coffee = require("../model/coffee");

const router = express.Router();

// GET all coffees
router.get("/", async (req, res) => {
    try {
        const coffees = await Coffee.find().sort({ votes: -1 });

        res.json(coffees);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch coffees",
            error: error.message
        });
    }
});

// POST vote
router.post("/:id/vote", async (req, res) => {
    try {
        const coffee = await Coffee.findByIdAndUpdate(
            req.params.id,
            { $inc: { votes: 1 } },
            { new: true }
        );

        if (!coffee) {
            return res.status(404).json({
                message: "Coffee not found"
            });
        }

        res.json(coffee);

    } catch (error) {
        res.status(500).json({
            message: "Failed to vote",
            error: error.message
        });
    }
});

module.exports = router;