const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../index');
const prisma = new PrismaClient();

const {
  tripData,
  journeyData,
  activityData,
  updatedTripData,
} = require('./mocks');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UNIT TESTS', () => {
  describe('GET /result - getSearchTrips', () => {
    it('Should return an array of trips with status 200', async () => {
      const res = await request(app).get('/result').query({
        activities: 'hiking',
        budget: 1000,
        depCity: 'New York',
        duration: 7,
      });

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /post - createTrip', () => {
    // Test createTrip route
    it('Should create a new trip and return the created trip with status 200', async () => {
      const res = await request(app).post('/post').send(tripData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', tripData.name);
      expect(res.body).toHaveProperty('user', tripData.user);
      expect(res.body).toHaveProperty('depCity', tripData.depCity);
      expect(res.body).toHaveProperty('arrCity', tripData.arrCity);
      expect(res.body).toHaveProperty('budget', tripData.budget);
      expect(res.body).toHaveProperty('duration', tripData.duration);
    });
  });

  describe('POST /journey - createJourney', () => {
    // Test createJourney route
    it('Should create a new journey and return the created journey with status 200', async () => {
      const res = await request(app).post('/journey').send(journeyData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({
        idTrip: journeyData.idTrip,
        depCity: journeyData.depCity,
        arrCity: journeyData.arrCity,
        price: journeyData.price,
        transportType: journeyData.transportType,
      });
      expect(new Date(res.body.start).getTime()).toBeCloseTo(
        new Date(journeyData.start).getTime(),
        -2
      );
      expect(new Date(res.body.end).getTime()).toBeCloseTo(
        new Date(journeyData.end).getTime(),
        -2
      );
    });
  });

  describe('POST /activity - createActivity', () => {
    // Test createActivity route
    it('Should create a new activity and return the created activity with status 200', async () => {
      const res = await request(app).post('/activity').send(activityData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({
        idTrip: activityData.idTrip,
        depCity: activityData.depCity,
        arrCity: null,
        price: activityData.price,
        activityType: activityData.activityType,
        additionalInfo: activityData.additionalInfo,
      });
      expect(new Date(res.body.start).getTime()).toBeCloseTo(
        new Date(activityData.start).getTime(),
        -2
      );
      expect(new Date(res.body.end).getTime()).toBeCloseTo(
        new Date(activityData.end).getTime(),
        -2
      );
    });
  });

  describe('GET /trip:id - getTripById', () => {
    // Test getTripById route
    it('Should return a trip with the specified ID and status 200', async () => {
      const id = 1;
      const res = await request(app).get(`/trip/${id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', id);
    });
  });

  describe('GET /modify - getTripByUser', () => {
    // Test getTripByUser route
    it('Should return an array of trips with the specified user and status 200', async () => {
      const user = 'Test User';
      const res = await request(app).get('/modify').query({ user });

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach((trip) => {
        expect(trip).toHaveProperty('user', user);
      });
    });
  });

  describe('DELETE /modify - deleteItem', () => {
    // Test deleteItem route (for trip)
    it('Should delete a trip with the specified ID and return the deleted trip with status 200', async () => {
      const postRes = await request(app).post('/post').send(tripData);
      let idtrip = postRes.body.id;

      const res = await request(app).delete('/modify').query({ idtrip });

      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(idtrip);
    });
  });

  describe('PUT /modify - modifyTrip', () => {
    // Test modifyTrip route
    it('Should update a trip with the specified ID and return the updated trip with status 200', async () => {
      const postRes = await request(app).post('/post').send(tripData);
      const idtrip2 = postRes.body.id;
      const res = await request(app)
        .put('/modify')
        .query({ idtrip2 })
        .send({ ...updatedTripData });

      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(idtrip2);

      expect(new Date(res.body.start).getTime()).toBeCloseTo(
        new Date(updatedTripData.start).getTime(),
        -2
      );
      expect(new Date(res.body.end).getTime()).toBeCloseTo(
        new Date(updatedTripData.end).getTime(),
        -2
      );
    });
  });

  describe('PUT /explore - getActivitiesList', () => {
    // Test getActivitiesList route
    it('Should return an array of all activities with status 200', async () => {
      const res = await request(app).get('/explore');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
