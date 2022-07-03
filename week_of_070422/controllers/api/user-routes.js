const router = require('express').Router();
const { User, Metahuman, Team, Power, Metapower } = require("../../models");

router.get("/", (req, res) => {
    User.findAll({
        attributes: {
            exclude: ["password"]
        },
        include: [
            {
                model: Team,
                include: [
                    {
                        model: Metahuman,
                        include: [
                            {
                                model: Power,
                                as: "power_of_meta",
                                attributes: ["power_name","power_description"]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(allUsers => {
        res.json(allUsers);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ["password"]
        },
        include: [
            {
                model: Team,
                include: [
                    {
                        model: Metahuman,
                        include: [
                            {
                                model: Power,
                                as: "power_of_meta",
                                attributes: ["power_name","power_description"]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;