
const orderController = require('./orderController');

test('Testing Open Orders Fetching', (done) => {
  const callback = (err, success) => {
    expect(success).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  orderController.getOrders('mock', callback);
});
