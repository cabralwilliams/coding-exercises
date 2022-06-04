
const express = require('express');
const PORT = 3010;
const app = express();
const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.use(express.json());

app.use("/",routes);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});