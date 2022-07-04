const sequelize = require('./config/connection');
const { User, Metahuman, Metapower, Power, Team } = require('./models');

const users = [
    {
        "username": "johnSmith",
        "email": "johnSmith@yagle.com",
        "password": "password"
    },
    {
        "username": "janeSmith",
        "email": "janeSmith@yagle.com",
        "password": "password"
    },
    {
        "username": "jamesJohnson",
        "email": "jamesJohnson@yagle.com",
        "password": "password"
    }
];

const teams = [
    {
        "team_name": "Super Friends",
        "are_heroic": true,
        "user_id": 1
    },
    {
        "team_name": "Justice Society",
        "are_heroic": true,
        "user_id": 2
    },
    {
        "team_name": "Justice Society of America",
        "are_heroic": true,
        "user_id": 3
    },
    {
        "team_name": "Legion of Doom",
        "are_heroic": false,
        "user_id": 1
    },
    {
        "team_name": "Injustice Society",
        "are_heroic": false,
        "user_id": 2
    },
    {
        "team_name": "Guild of Calamitous Intent",
        "are_heroic": false,
        "user_id": 3
    }
];

const powers = [
    {
        "power_name": "flight",
        "power_description": "The ability to defy the law of gravity at will"
    },
    {
        "power_name": "super speed",
        "power_description": "The ability to run at speeds far exceeding those of normal human limits"
    },
    {
        "power_name": "invisibility",
        "power_description": "Transparent to all electromagnetic radiation in the human visible spectrum"
    },
    {
        "power_name": "teleportation",
        "power_description": "The ability to move vast distances instantaneously"
    },
    {
        "power_name": "super strength",
        "power_description": "Possessing physical strength far in excess of that of a normal human being"
    },
    {
        "power_name": "reality warping",
        "power_description": "The ability to shift reality as the user wishes"
    },
    {
        "power_name": "time manipulation",
        "power_description": "The ability to move through time at will and alter the normal flow of time"
    }
];

const metahumans = [
    {
        "code_name": "The Blur",
        "secret_identity": "William Swift",
        "biography": "The man who would become The Blur, William Swift, was born as a rather pedestrian runner.  After losing many races to elementary aged children once he reached early adulthood, he was blessed by the god of Speed with the ability to run like the wind, the ability to defeat all elementary aged children.",
        "team_id": 1
    },
    {
        "code_name": "Eagle Woman",
        "secret_identity": "Laura Sky",
        "biography": "Laura Sky fell from the grasp of a parent while being held near the top of one of the world's highest skyscrapers.  She was rescued by an eagle, who conferred upon her the ability to fly.  Then, she devoured the entirety of the convocation of eagles, gaining their strengths in the process.",
        "team_id": 2
    },
    {
        "code_name": "Kaiser Concrete",
        "secret_identity": null,
        "biography": null,
        "team_id": 4
    },
    {
        "code_name": "Ultra Ion",
        "secret_identity": null,
        "biography": null,
        "team_id": 3
    }
];

const metapowers = [
    {
        "metahuman_id": 1,
        "power_id": 2
    },
    {
        "metahuman_id": 2,
        "power_id": 1
    },
    {
        "metahuman_id": 2,
        "power_id": 5
    },
    {
        "metahuman_id": 3,
        "power_id": 5
    },
    {
        "metahuman_id": 4,
        "power_id": 6
    },
    {
        "metahuman_id": 4,
        "power_id": 4
    }
];

const seedUsers = async () => {
    for(let i = 0; i < users.length; i++) {
        await User.create(users[i]);
    }
};

const seedTeams = async () => Team.bulkCreate(teams);
const seedPowers = async () => Power.bulkCreate(powers);
const seedMetahumans = async () => Metahuman.bulkCreate(metahumans);
const seedMetapowers = async () => Metapower.bulkCreate(metapowers);

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n------ Users Seeded ------\n');

    await seedTeams();
    console.log('\n------ Teams Seeded ------\n');

    await seedPowers();
    console.log('\n------ Powers Seeded -----\n');

    await seedMetahumans();
    console.log('\n---- Metahumans Seeded ----\n');

    await seedMetapowers();
    console.log('\n---- Metapowers Seeded ----\n');
};

seedAll();