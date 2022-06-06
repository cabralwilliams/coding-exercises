//Use path so that static files can be used
const path = require('path');
const router = require('express').Router();
const { HTML, DbQuery } = require('../utils');
let heroDB;

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/index.html"));
});

//Will contain the form to add the new hero
router.get("/addHero", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/addHero.html"));
});

router.get("/friends", (req, res) => {
    heroDB = require('../db/heroDB.json');
    console.log(heroDB);
    const htmlPage =HTML.writeFriends(heroDB.heroes);
    heroDB = null;
    res.send(htmlPage);
});

router.get("/friends/:heroId", (req, res) => {
    heroDB = require('../db/heroDB.json');
    const heroArray = heroDB.heroes;
    const hero = DbQuery.getHeroById(heroArray, parseInt(req.params.heroId));
    if(hero === null) {
        res.send(`Friend not found!`);
    } else {
        res.send(HTML.writeFriendPage(hero));
    }
});

router.get("/reset", (req, res) => {
    res.sendFile(path.join(__dirname, '../static/reset.html'));
});

module.exports = router;