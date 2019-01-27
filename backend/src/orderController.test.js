
const orderController = require('./orderController');

const dummyOrder = {
  body: {
    orderID: 2,
    payload: [{ item_id: 1, quantity: 2 }, { item_id: 3, quantity: 5 },
      { item_id: 5, quantity: 1 }],
  },
};

const dummyNewOrder = {
  body: {
    orderID: 90,
    customer: 'SLCMB',
  },
};

const dummyReturn = {
  items: [['1', '2'], ['3', '5'], ['5', '1']],
};

test('Testing Open Orders Fetching', (done) => {
  const callback = (err, success) => {
    expect(success).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  orderController.getOrders('mock', callback);
});

test('Testing Update Order Function', (done) => {
  const callback = (err, success) => {
    expect(success).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  orderController.updateOrder(dummyOrder, 'mock', callback);
});

test('Testing the support function Set Order Items', (done) => {
  const callback = (success) => {
    expect(success).toEqual(dummyReturn);
    done();
  };
  orderController.setOrderItems(dummyOrder.body, callback);
});


test('Testing Add Order Function', (done) => {
  const callback = (err, success) => {
    expect(success).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  orderController.addOrder(dummyNewOrder, 'mock', callback);
});
