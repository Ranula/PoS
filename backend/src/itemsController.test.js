
const itemsController = require('./itemsController');

test('Testing Item Fetching', (done) => {
  const callback = (err, success) => {
    expect(success).not.toBe(null);
    expect(err).toBe(null);
    done();
  };
  itemsController.getItems('mock', callback);
});
