//Import express router
const router = require('express').Router();
const homeRoutes = require('./home-routes');
const teamRoutes = require('./team-routes');
const metahumanRoutes = require('./metahuman-routes');

router.use("/",homeRoutes);
router.use("/teams",teamRoutes);
router.use("/metahumans",metahumanRoutes);

module.exports = router;