const router = require('express').Router();
const { Dashboard, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      
      const dashboardData = await Dashboard.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const dashboards = dashboardData.map((dashboard) => dashboard.get({ plain: true }));
  
      res.render('login', { 
        dashboards, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/dashboard/:id', async (req, res) => {
    try {
      const dashboardData = await Dashboard.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const dashboard = dashboardData.get({ plain: true });
  
      res.render('dashboard', {
        ...dashboard,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//withAuth will prevent access
router.get('/profile', withAuth, async (req, res) => {
    try {
    
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Dashboard }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Route to profile if logged in, else route to login
  router.get('/login', (req, res) => {

    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;