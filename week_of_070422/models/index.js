const User = require('./User');
const Metahuman = require('./Metahuman');
const Team = require('./Team');
const Power = require('./Power');
const Metapower = require('./Metapower');

Team.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Team, {
    foreignKey: "user_id"
});

Team.hasMany(Metahuman, {
    foreignKey: "team_id"
});

Metahuman.belongsTo(Team, {
    foreignKey: "team_id"
});

Metahuman.belongsToMany(Power, {
    through: Metapower,
    as: "power_of_meta",
    foreignKey: "metahuman_id"
});

Power.belongsToMany(Metahuman, {
    through: Metapower,
    as: "powered_meta",
    foreignKey: "power_id"
});

module.exports = { User, Team, Metahuman, Power, Metapower };