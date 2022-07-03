//Import express router
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require("./html");

router.use('/api',apiRoutes);
router.use("/",homeRoutes);

module.exports = router;