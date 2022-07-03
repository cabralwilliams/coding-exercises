const router = require('express').Router();
const { User, Metahuman, Team, Power, Metapower } = require("../../models");

router.get("/", (req, res) => {
    Team.findAll({
        include: [
            {
                model: Metahuman,
                include: [
                    {
                        model: Power,
                        as: "power_of_meta",
                        attributes: ["power_name", "power_description"]
                    }
                ]
            }
        ]
    })
    .then(allTeams => {
        res.json(allTeams);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Team.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Metahuman,
                include: [
                    {
                        model: Power,
                        as: "power_of_meta",
                        attributes: ["power_name", "power_description"]
                    }
                ]
            }
        ]
    })
    .then(teamData => {
        res.json(teamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;