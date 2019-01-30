const config = require('../config.json');
const nano = require('nano')(config.dbString);

// Get orders which are open
exports.getOrders = (res, callback) => {
  const q = {
    selector: {
      status: { $eq: 1 },
    },
    fields: ['customer', 'details_id', 'status', 'items'],
  };
  nano
    .use(config.orderDB)
    .find(q)
    .then((doc) => {
      callback(null, doc);
    })
    .catch((err) => {
      callback(err, null);
    });
};

// Support function to perform a update in couchDB (Data Processing function)
exports.setOrderItems = (obj, callback) => {
  const itemsArray = obj.payload.map(({ item_id, quantity }) => {
    const minItemArray = [];
    minItemArray.push(String(item_id));
    minItemArray.push(String(quantity));
    return minItemArray;
  });

  const newOrderobj = {
    items: itemsArray,
  };
  callback(newOrderobj);
};

// Update Order and send updated open orders

exports.updateOrder = (req, res, callback) => {
  const query = {
    selector: {
      details_id: { $eq: req.body.orderID },
    },
  };
  // Performing a find to capture the _rev
  nano
    .use(config.orderDB)
    .find(query)
    .then((doc) => {
      // console.log(doc);
      this.setOrderItems(req.body, (newOrderobj) => {
        const dummyObj = newOrderobj;
        dummyObj._rev = doc.docs[0]._rev;
        dummyObj.status = doc.docs[0].status;
        dummyObj.details_id = doc.docs[0].details_id;
        dummyObj.customer = doc.docs[0].customer;
        const orderId = doc.docs[0]._id;
        // Inserting new order details
        nano.use(config.orderDB).insert(dummyObj, orderId, (err, body) => {
          if (err) {
            callback(err, null);
          } else {
            const query1 = {
              selector: {
                status: { $eq: 1 },
              },
              fields: ['customer', 'details_id', 'status', 'items'],
            };
            // Retriving and sending new orders which are open
            nano
              .use(config.orderDB)
              .find(query1)
              .then((doc1) => {
                callback(null, doc1);
              })
              .catch((err1) => {
                callback(err1, null);
              });
          }
        });
      });
    })
    .catch((err) => {
      callback(err, null);
    }); 
};


// Add Order and send new open orders

exports.addOrder = (req, res, callback) => {
  const dummyObj = {
    customer: req.body.customer,
    details_id: req.body.orderID,
    status: 1,
    items: [],
  };
  nano.use(config.orderDB).insert(dummyObj, dummyObj.details_id, (err, body) => {
    if (err) {
      callback(err, null);
    } else {
      const query1 = {
        selector: {
          status: { $eq: 1 },
        },
        fields: ['customer', 'details_id', 'status', 'items'],
      };
        // Retriving and sending new orders which are open
      nano
        .use(config.orderDB)
        .find(query1)
        .then((doc1) => {
          callback(null, doc1);
        })
        .catch((err1) => {
          callback(err1, null);
        });
    }
  });
};
