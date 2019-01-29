const request = require('supertest');
const { app, server } = require('./index');

afterAll(() => {
  server.close();
});

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});


describe('Test whether the unauthorized paths show error messages', () => {
  test('It should respond with the 404', () => request(app)
    .get('/returnFalse').then((response) => {
      expect(response.statusCode).toBe(404);
    }));
});

