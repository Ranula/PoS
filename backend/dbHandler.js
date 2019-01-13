var config = require('./config.json') ;
var nano = require('nano')(config.dbString);


exports.CreateDB = function () {
    nano.db.create("mylibrary", function (err, body, header) { 
        if (err) {  
            console.log("Database creation failed. " + err + "\n"); 
        } else { 
            console.log("Database created. Response: " + JSON.stringify(body) + "\n"); 
        } 
    }); 
}

