const request = require('supertest');
const { app, server } = require('./index');

let token = '';
const newUser = {
  username: 'test',
  password: '1233',
};
const dummyNewOrder = {
  orderID: 92,
  customer: 'SLCMB2',
};

const dummyOrder = {
  orderID: 92,
  payload: [{ item_id: 1, quantity: 2 }, { item_id: 3, quantity: 5 },
    { item_id: 5, quantity: 1 }],
};

beforeAll((done) => {
  request(app)
    .post('/login')
    .send({
      username: 'a@b',
      password: '123',
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

afterAll(() => {
  server.close();
});

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Test unavailable paths', () => {
  test('It should respond with the 404', () => request(app)
    .get('/returnFalse')
    .then((response) => {
      expect(response.statusCode).toBe(404);
    }));
});

describe('Test Forbidden paths', () => {
  test('It should response the GET method with 401', (done) => {
    request(app)
      .get('/getItems')
      .set({ Authorization: 'test token' })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
});

describe('Test sign up', () => {
  test('It should return status code 200', (done) => {
    request(app)
      .post('/signup')
      .send(newUser)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });
});

describe('Test Authentication', () => {
  test('It should response the GET method with 200', (done) => {
    request(app)
      .get(`/isAuthenticated?token=${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Test Getting Items', () => {
  test('It should response the GET method with 200 and return items', (done) => {
    request(app)
      .get('/getItems')
      .set({ Authorization: token })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });
});

describe('Test Getting Open Orders', () => {
  test('It should response the GET method with 200 and return orders', (done) => {
    request(app)
      .get('/openOrders')
      .set({ Authorization: token })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });
});

describe('Test Adding order', () => {
  test('It should return status code 200 and return updated list', (done) => {
    request(app)
      .post('/addOrder')
      .set({ Authorization: token })
      .send(dummyNewOrder)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });
});

describe('Test updating order', () => {
  test('It should return status code 200 and return updated list', (done) => {
    request(app)
      .post('/updateOrder')
      .set({ Authorization: token })
      .send(dummyOrder)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });
});
