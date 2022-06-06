//fs used to rewrite the json data file
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
//Import the heroDB
let heroDB;
let maleHeroes, femaleHeroes;

const { DbQuery } = require('../utils');

router.get("/", (req, res) => {
    heroDB = require('../db/heroDB.json');
    res.json(heroDB.heroes);
});

router.get("/male", (req, res) => {
    heroDB = require('../db/heroDB.json');
    maleHeroes = heroDB.heroes.filter(hero => hero.gender === "male");
    res.json(maleHeroes);
});

router.get("/female", (req, res) => {
    heroDB = require('../db/heroDB.json');
    femaleHeroes = heroDB.heroes.filter(hero => hero.gender === "female");
    res.json(femaleHeroes);
});

router.get("/info", (req, res) => {
    heroDB = require('../db/heroDB.json');
    console.log(heroDB);
    res.json(heroDB);
});

router.post("/", (req, res) => {
    //Check to see if information is valid
    if(!req.body.codeName || !req.body.secretIdentity) {
        res.status(400).json({ message: "You must provide a code name and secret identity for the hero."});
    }
    heroDB = require('../db/heroDB.json');
    const newHero = req.body;
    newHero.heroId = heroDB.heroCount + 1;
    const updatedHeroes = heroDB;
    updatedHeroes.heroCount++;
    updatedHeroes.heroes.push(newHero);
    fs.writeFileSync(path.join(__dirname, '../db/heroDB.json'), JSON.stringify(updatedHeroes,null,4), err => {
        if(err) {
            console.error(err);
        } else {
            console.log(`Hero added!`);
        }
    });
    res.json({ message: "Hero successfully added!"});
});

router.put('/friends/:heroId', (req, res) => {
    //Check to see if information is valid
    if(!req.body.codeName || !req.body.secretIdentity) {
        res.status(400).json({ message: "You must provide a code name and secret identity for the hero."});
    }
    heroDB = require('../db/heroDB.json');
    const updatedHero = req.body;
    updatedHero.heroId = parseInt(req.params.heroId);
    const dbQueryResult = DbQuery.findByIdAndUpdate(heroDB.heroes,parseInt(req.params.heroId),updatedHero);
    heroDB.heroes = dbQueryResult.heroArray;
    fs.writeFileSync(path.join(__dirname, '../db/heroDB.json'), JSON.stringify(heroDB,null,4), err => {
        if(err) {
            console.error(err);
        } else {
            console.log(`Hero updated!`);
        }
    });
    res.json({ message: "Hero successfully updated!"});
});

router.delete("/friends/:heroId", (req, res) => {
    heroDB = require('../db/heroDB.json');
    const dbQueryResult = DbQuery.findByIdAndDelete(heroDB.heroes,parseInt(req.params.heroId));
    heroDB.heroes = dbQueryResult.heroes;
    fs.writeFileSync(path.join(__dirname, '../db/heroDB.json'), JSON.stringify(heroDB,null,4), err => {
        if(err) {
            console.error(err);
        } else {
            console.log(`Hero deleted!`);
        }
    });
    if(dbQueryResult.success) {
        res.status(200).json({ message: dbQueryResult.message });
    } else {
        res.status(400).json({ message: dbQueryResult.message });
    }
});

router.post("/reset", (req, res) => {
    const resetDB = require('../db/defaultDb.json');
    console.log(resetDB);
    fs.writeFileSync(path.join(__dirname, '../db/heroDB.json'), JSON.stringify(resetDB,null,4), err => {
        if(err) {
            console.error(err);
        } else {
            console.log(`Hero deleted!`);
        }
    });
    res.status(200).json({ message: "Database reset"});
});

module.exports = router;