//Import express router
const router = require('express').Router();
//Import routers from other files
const userRoutes = require('./user-routes');
const teamRoutes = require('./team-routes');

router.use("/users",userRoutes);
router.use("/teams",teamRoutes);

module.exports = router;