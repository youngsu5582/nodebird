exports.isLoggedIn = (req, res, next) => {
    console.log('Login중!');
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
  };

exports.isNotLoggedIn = (req, res, next) => {
    console.log('Not Login중!');
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  };