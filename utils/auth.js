const withAuth = (req, res, next) => {
    // Send user to the login route 
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;