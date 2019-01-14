const config = require('../config.json');
const nano = require('nano')(config.dbString);


exports.CreateDB = () => {
  nano.db.create('mylibrary', (err, body, header) => {
    if (err) {
      console.log(`Database creation failed. ${err}\n`);
    } else {
      console.log(`Database created. Response: ${JSON.stringify(body)}\n`);
    }
  });
};
