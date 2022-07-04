//Import express router
const router = require('express').Router();
//Import models
const { User, Team, Metahuman, Power, Metapower } = require("../../models");

router.get("/", (req, res) => {
    Metahuman.findAll({
        include: [
            {
                model: Team,
                attributes: ["team_name","id"]
            }
        ]
    })
    .then(metahumanData => {
        let plainMetahumans = metahumanData.map(metahuman => metahuman.get({ plain: true }));
        //This console log is here because I want you to realize that at times, I have no idea what is going
        //wrong with a particular application, so I have to use console logs to make sure that I'm not
        //going crazy when something isn't working as I think it should
        console.log(plainMetahumans);
        res.render("metahumans", {
            metahumanData: plainMetahumans
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Metahuman.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Team
            },
            {
                model: Power,
                as: "power_of_meta"
            }
        ]
    })
    .then(metahumandData => {
        let plainMetahuman = metahumandData.get({ plain: true });
        //Check to see if the metahuman has a secret identity and has a biography
        plainMetahuman.hasSecretIdentity = !(plainMetahuman.secret_identity === null);
        plainMetahuman.hasBiography = !(plainMetahuman.biography === null);
        console.log(plainMetahuman);
        res.render("single-metahuman", {
            metahuman: plainMetahuman
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;