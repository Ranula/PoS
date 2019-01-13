var config = require('./config.json');
var nano = require('nano')(config.dbString);
var bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const SECRET = 'shush';

const isAuth = (req, res, next) => {
      const token = req.get('token');
      if (token) {
            jwt.verify(token, SECRET, (err, data) => {
                  if (err) {
                        req.isAuthenticated = false;
                  } else {
                        req.isAuthenticated = true;
                        req.user = data;
                  }
                  next();
            });
      } else {
            req.isAuthenticated = false;
            next();
      }
}

exports.createUser = (newUser, callback) => {
      bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(newUser.password, salt, (err, hash) => {
                  newUser.password = hash;
                  nano.use("mylibrary").insert(newUser, newUser.usermail, function (err, body, header) {
                        if (err) {
                              callback(err, null);
                        } else {
                              callback(null, body);
                        }
                  });
            })
      });


};

comparePassword = (candidatePassword, hash, cb) => {
      bycrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) {
                  console.log(err);
            } else {
                  cb(null, isMatch);
            }
      });
};


exports.authenticate = (user, callback) => {
      // this.comparePassword("a","b",callback)
      nano.use("mylibrary").get(user.username).then((body) => {
            console.log(body)
            comparePassword(user.password, body.password, callback)
      }).catch((err) => {
            callback(err, null);
      })
}

getUser = (user, callback) => {
      // this.comparePassword("a","b",callback)
      nano.use("mylibrary").get(user.username).then((body) => {
            console.log(body)
      }).catch((err) => {
            callback(err, null);
      })
}



exports.signToken = (user, res) => {
      jwt.sign(user, SECRET, { expiresIn: '1m' }, (err, token) => {
            if (err) {
                  console.log(err);
                  res.end(JSON.stringify(err));
            } else {
                  console.log(token)
                  res.jsonp({ success: true, token: token });
            }
      });

}

exports.verifyToken = (token, res) =>{
      jwt.verify(token, SECRET , (err, decoded) => {
            if(err){
                  console.log(err)
                  res.send(false);
            }else{
                  console.log(decoded)
                  res.send(true);
            }          
      });
}

