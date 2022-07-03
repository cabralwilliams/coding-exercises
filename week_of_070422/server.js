//Import modules
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const helpers = require("./lib/helpers");
const hbs = exphbs.create({ helpers });


const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: process.env.SESSION_PASSWORD,
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
//Allow usage of javascript and stylesheets folders
app.use(express.static(path.join(__dirname + "/public")));

//Change to force: true if you want to recreate database; otherwise, keep force: false
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});