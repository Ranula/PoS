const jwt = require('jsonwebtoken');
const userController = require('./userController');
// const request = require('supertest');


const SECRET = 'shush';

const user = {
  username: 'a@b',
  password: '123',
};

const newUser = {
  username: 'a@b3',
  password: '1233',
};


let tokenCheck = null;

beforeAll((done) => {
  const self = this;
  jwt.sign(user, SECRET, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      self.tokenCheck = err;
      done();
    } else {
      self.tokenCheck = token;
      done();
    }
  });
});


test('Authentication should be successful', (done) => {
  const callback = (err, success) => {
    expect(success).toBe(true);
    expect(err).toBe(null);
    done();
  };
  userController.authenticate(user, callback);
});

test('Signing tokens', (done) => {
  const callback = (err, token) => {
    expect(token).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  userController.signToken(user, callback);
});

test('Verifying tokens', (done) => {
  const callback = (err, token) => {
    expect(token).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  userController.verifyToken(this.tokenCheck, callback);
});

test('Testing Add User', (done) => {
  const callback = (err, token) => {
    expect(token).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  userController.createUser(newUser, callback);
});
