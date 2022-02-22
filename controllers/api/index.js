const router = require('express').Router();
const homepageRoutes = require('./homepageRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/homepage', homepageRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;