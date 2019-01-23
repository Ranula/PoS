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

const setOrderItems = (obj, callback) => {
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

exports.updateOrder = (req, res, callback) => {
  // console.log(req.body);


  const q = {
    selector: {
      details_id: { $eq: req.body.orderID },
    },
    // fields: ['_', 'details_id', 'status', 'items'],
  };
  nano.use('orders').find(q).then((doc) => {

    setOrderItems(req.body, (newOrderobj) => {
      let dummyObj = newOrderobj;
      dummyObj._rev = doc.docs[0]._rev;
      dummyObj.status = doc.docs[0].status;
      dummyObj.details_id = doc.docs[0].details_id;
      dummyObj.customer = doc.docs[0].customer;

      // console.log('newOrderobj printedddd', dummyObj);


      nano.use('orders').insert(dummyObj, doc.docs[0]._id, (err, body) => {
        if (err) {
          // callback(err, null);
          console.log("Insert Error",err);
        } else {
          // callback(null, body);
          console.log("insert success", body);



          const q1 = {
            selector: {
              status: { $eq: 1 },
            },
            fields: ['customer', 'details_id', 'status', 'items'],
          };
          nano.use('orders').find(q1).then((doc1) => {
            callback(null, doc1);
          }).catch((err1) => {
            callback(err1, null);
          });
        }
      });
    });
  }).catch((err) => {
    // callback(err, null);
  });
};
