//Import express router
const router = require('express').Router();
//Import models
const { User, Team, Metahuman, Metapower, Power } = require("../../models");

router.get("/", (req, res) => {
    Team.findAll({
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Metahuman,
                attributes: ["code_name","id"]
            }
        ]
    })
    .then(allTeams => {
        const plainTeams = allTeams.map(team => {
            let plainTeam = team.get({ plain: true });
            plainTeam.hasMembers = plainTeam.metahumans.length > 0;
            return plainTeam;
        });
        res.render("teams", {
            teams: plainTeams
        });
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
                model: User,
                attributes: ["username"]
            },
            {
                model: Metahuman,
                attributes: ["id","code_name"],
                include: [
                    {
                        model: Power,
                        as: "power_of_meta",
                        attributes: ["power_name"]
                    }
                ]
            }
        ]
    })
    .then(teamData => {
        //Only one team returned so no mapping to plain needed
        let plainTeamData = teamData.get({ plain: true });
        res.render("individual-team", {
            teamData: plainTeamData
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;