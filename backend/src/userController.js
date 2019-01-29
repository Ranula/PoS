// eslint-disable-next-line import/order
const config = require('../config.json');
const nano = require('nano')(config.dbString);
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SECRET = 'shush';

exports.createUser = (newUser, callback) => {
  bycrypt.genSalt(10, (err, salt) => {
    bycrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      nano
        .use('mylibrary')
        .insert(newUser, newUser.usermail, (err, body, header) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, body);
          }
        });
    });
  });
};

const comparePassword = (candidatePassword, hash, cb) => {
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
  nano
    .use('mylibrary')
    .get(user.username)
    .then((body) => {
      // console.log(body);
      comparePassword(user.password, body.password, callback);
    })
    .catch((err) => {
      callback(err, null);
    });
};

// const getUser = (user, callback) => {
//   // this.comparePassword("a","b",callback)
//   nano
//     .use('mylibrary')
//     .get(user.username)
//     .then((body) => {
//       console.log(body);
//     })
//     .catch((err) => {
//       callback(err, null);
//     });
// };

exports.signToken = (user, callback) => {
  jwt.sign(user, SECRET, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, token);
    }
  });
};

exports.verifyToken = (token, callback) => {
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
};
