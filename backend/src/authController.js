const jwt = require('jsonwebtoken');


const SECRET = 'shush';

exports.isAuthorized = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, SECRET, (err, data) => {
      if (err) {
        req.isAuthenticated = false;
        res.status(403).json('Forbidden');
        console.log('Forbidden Request');
      } else {
        req.isAuthenticated = true;
        req.user = data;
        console.log('Authorized Request');
      }
      next();
    });
  } else {
    req.isAuthenticated = false;
    res.status(401).json('Unauthorized');
    console.log('Unauthorized Request');
  }
};
