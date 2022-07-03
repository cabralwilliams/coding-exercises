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
                attributes: ["code_name"]
            }
        ]
    })
    .then(teams => {
        //Convert the database data into an array of useable objects
        //Remember to convert to plain!
        const plainTeams = teams.map(team => team.get({ plain: true }));
        for(let i = 0; i < plainTeams.length; i++) {
            plainTeams[i].hasMembers = plainTeams[i].metahumans.length > 0;
        }
        res.render('home', {
            teams: plainTeams
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;