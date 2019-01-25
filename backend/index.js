/* eslint-disable no-tabs */
const express = require('express');
const http = require('http');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const userController = require('./src/userController');
const orderController = require('./src/orderController');
const itemsController = require('./src/itemsController');


const app = express();


// swagger definition
const swaggerDefinition = {
  info: {
    title: 'PoS API',
    version: '1.0.0',
    description: 'PoS API Documentation',
  },
  host: 'localhost:5500',
  basePath: '/',
};
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['index.js'],
};


// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const port = 5500;
const server = http.createServer(app);

console.log('Server started');

// Cross Origin
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

// serve swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Server Info
 *     description: Returns Server Info
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Real time POS web app running.
 */


app.get('/', (req, res) => {
  res.send(' Real time POS web app running.');
});

/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 * 		 usermail:
 * 		   type: string
 */


/**
 * @swagger
 * definition:
 *   order:
 *     properties:
 *       id:
 *         type: number
 * 		 item_id:
 * 			type: number
 */

/**
 * @swagger
 * definition:
 *   orderObj:
 *     properties:
 *       orderID:
 *         type: string
 *       payload:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   query:
 *     properties:
 *       token:
 *         type: string
 */
/**
 * @swagger
 * definition:
 *   success:
 *         type: boolean
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - user
 *     description: Login to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post('/login', (req, res) => {
  userController.authenticate(req.body,
    (err, match) => {
      if (err) {
        res.end(JSON.stringify(err));
      } else if (match) {
        userController.signToken(req.body, res);
      } else {
        res.end(JSON.stringify(match));
      }
    });
});

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - user
 *     description: Sign up to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: User successfully created
 */
app.post('/signup', (req, res) => {
  userController.createUser(req.body, (err, success) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(success));
    }
  });
});

/**
 * @swagger
 * /isAuthenticated:
 *   get:
 *     tags:
 *       - user
 *     description: Authenticate an user based on the token
 *     produces:
 *       - application/json
 * 	   parameters:
 * 		 - name: token
 * 		   description: token
 * 		   in: token
 * 		   required: true
 * 		   schema:
 * 			 $ref: #/definitions/query
 *     responses:
 *       200:
 *         description: boolean value
 *         schema:
 *           $ref: '#/definitions/success'
 */
app.get('/isAuthenticated', (req, res) => {
  userController.verifyToken(req.query.token, res);
});

/**
 * @swagger
 * /openOrders:
 *   get:
 *     tags:
 *       - order
 *     description: get all open orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: array of open orders
 */
app.get('/openOrders', (req, res) => {
  orderController.getOrders(res, (err, success) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(success.docs));
    }
  });
});

/**
 * @swagger
 * /getItems:
 *   get:
 *     tags:
 *       - items
 *     description: get all the items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: array of items
 */
app.get('/getItems', (req, res) => {
  itemsController.getItems(res, (err, success) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(success));
    }
  });
});

/**
 * @swagger
 * /updateOrder:
 *   post:
 *     tags:
 *       - order
 *     description: Update the order according to the object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/orderObj'
 *     responses:
 *       200:
 *         description: Open orders Array Returned
 */
app.post('/updateOrder', (req, res) => {
  console.log('Update Order with', req.body);
  orderController.updateOrder(req, res, (err, success) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(success));
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
