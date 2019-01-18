
const express = require('express');


const http = require('http');


const port = 5500;


const app = require('express')();


const server = http.createServer(app);


const bodyParser = require('body-parser');


const dbController = require('./src/dbHandler');


const userController = require('./src/userController');

const orderController = require('./src/orderController');

dbController.CreateDB();
console.log('Server started');


app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Accept,X-Access-Token,X-Key',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send(' Real time POS web app running.');
});


app.post('/login', (req, res) => {
  userController.authenticate(req.body,
    (err, match) => {
      if (err) {
        console.log(err);
        res.end(JSON.stringify(err));
      } else if (match) {
        console.log(match);
        userController.signToken(req.body, res);
      } else {
        console.log(match);
        res.end(JSON.stringify(match));
      }
    });
});


app.post('/signup', (req, res) => {
  userController.createUser(req.body, (err, success) => {
    if (err) {
      console.log(err);
      res.end(JSON.stringify(err));
    } else {
      console.log(success);
      res.end(JSON.stringify(success));
    }
  });
});

app.get('/isAuthenticated', (req, res) => {
  console.log('recieved');
  userController.verifyToken(req.query.token, res);
});

app.get('/openOrders', (req, res) => {
  orderController.getOrders(res, (err, success) => {
    if (err) {
      console.log(err);
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(success.docs));
    }
  });
  // const openOrders = [{ id: '1', name: 'bob' }, { id: '2', name: 'alice' }];
  // res.send(JSON.stringify(openOrders));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
