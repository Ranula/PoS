const config = require('../config.json');
const nano = require('nano')(config.dbString);

exports.getOrders = (res, callback) => {
  const q = {
    selector: {
      status: { $eq: 1 },
    },
    fields: ['customer', 'details_id', 'status', 'items'],
  };
  nano.use('orders').find(q).then((doc) => {
    console.log('docs are printedddd', doc);
    callback(null, doc);
  }).catch((err) => {
    callback(err, null);
  });
};
