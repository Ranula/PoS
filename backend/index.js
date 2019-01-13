
var express = require("express"),
  http = require("http"),
  port = 5500,
  app = require("express")(),
  server = http.createServer(app),
  bodyParser = require("body-parser"),
  dbController = require('./dbHandler'),
  userController = require('./userController')


dbController.CreateDB()
console.log("Server started");


app.all("/*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", function (req, res) {
  res.send(" Real time POS web app running.");
});



app.post('/login', function (req, res) {
  userController.authenticate(req.body,
    (err, match) => {
      if (err) {
        console.log(err)
        res.end(JSON.stringify(err));
      } else if (match) {
        console.log(match)
        userController.signToken(req.body, res)
      }
      else {
        console.log(match)
        res.end(JSON.stringify(match));
      }
    }
  )
});



app.post('/signup', function (req, res) {
  userController.createUser(req.body, (err, success) => {
    if (err) {
      console.log(err)
      res.end(JSON.stringify(err));
    } else {
      console.log(success)
      res.end(JSON.stringify(success));
    }
  })
});

app.get("/isAuthenticated", function (req, res) {
  console.log("recieved")
  userController.verifyToken(req.query.token, res)
});

server.listen(port, () => console.log(`Listening on port ${port}`));