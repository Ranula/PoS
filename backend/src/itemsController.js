const config = require('../config.json');
const nano = require('nano')(config.dbString);
// Function to get items from the database
exports.getItems = (res, callback) => {
  nano
    .use(config.itemDB)
    .list({ include_docs: true })
    .then((doc) => {
      const items = [];
      // Filtering to send only the required parameters
      doc.rows.forEach((item) => {
        const allowed = ['item_name', 'item_price', 'item_id'];
        const filtered = Object.keys(item.doc)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = item.doc[key];
            return obj;
          }, {});
        items.push(filtered);
      });
      callback(null, items);
    })
    .catch((err) => {
      callback(err, null);
    });
};
