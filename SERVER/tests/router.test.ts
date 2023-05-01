const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const { server, app } = require('../index');
const prisma = new PrismaClient();

const {
  tripData,
  journeyData,
  activityData,
  updatedTripData,
  badTripData,
  badJourneyData,
  badUpdatedTripData,
  badActivityData,
} = require('./mocks');

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await prisma.$disconnect(); // Close the Prisma client
  server.close(); // Close the Express server
});

describe('UNIT TESTS', () => {
  describe('GET /result - getSearchTrips', () => {
    it('Should return an array of trips with status 200', async () => {
      const res = await request(app).get('/result').query({
        activities: 'hiking',
        budget: 100,
        depCity: 'Los Angeles',
        duration: 7,
      });

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
    it('Should return status 400 if query is empty', async () => {
      const res = await request(app).get('/result').query({});

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /post - createTrip', () => {
    // Test createTrip route
    it('Should create a new trip and return the created trip with status 201', async () => {
      const res = await request(app).post('/post').send(tripData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', tripData.name);
      expect(res.body).toHaveProperty('user', tripData.user);
      expect(res.body).toHaveProperty('depCity', tripData.depCity);
      expect(res.body).toHaveProperty('arrCity', tripData.arrCity);
      expect(res.body).toHaveProperty('budget', tripData.budget);
      expect(res.body).toHaveProperty('duration', tripData.duration);
    });
    it('Should return status 400 if required input field is missing', async () => {
      const res = await request(app).post('/post').send(badTripData);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /journey - createJourney', () => {
    // Test createJourney route
    it('Should create a new journey and return the created journey with status 200', async () => {
      const resTrip = await request(app).post('/post').send(tripData);
      const idTrip = resTrip.body.id;
      journeyData.idTrip = idTrip;
      const res = await request(app).post('/journey').send(journeyData);

      expect(res.statusCode).toEqual(201);
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
    it('Should return status 400 if required input field is missing', async () => {
      const res = await request(app).post('/journey').send(badJourneyData);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /activity - createActivity', () => {
    // Test createActivity route
    it('Should create a new activity and return the created activity with status 200', async () => {
      const resTrip = await request(app).post('/post').send(tripData);
      const idTrip = resTrip.body.id;
      activityData.idTrip = idTrip;
      const res = await request(app).post('/activity').send(activityData);

      expect(res.statusCode).toEqual(201);
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
    it('Should return status 400 if required input field is missing', async () => {
      const res = await request(app).post('/activity').send(badActivityData);

      expect(res.statusCode).toEqual(400);
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
    it('Should return 404 if trip is not found', async () => {
      const res = await request(app).get(`/trip/420blazeit`);

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /modify - getTripByUser', () => {
    // Test getTripByUser route
    it('Should return an array of trips with the specified user and status 200', async () => {
      await request(app).post('/post').send(tripData);

      const user = 'Test User';
      const res = await request(app).get('/modify').query({ user });

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach((trip) => {
        expect(trip).toHaveProperty('user', user);
      });
    });
    it('Should return status 400 if required input field is missing', async () => {
      const res = await request(app).get('/modify').query({});

      expect(res.statusCode).toEqual(400);
    });
    it('Should return status 404 if trip does not exist', async () => {
      const idTrip = 9999999;
      const res = await request(app).get('/modify').query({ idTrip });

      expect(res.statusCode).toEqual(404);
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

    it('Should delete a journey with the specified ID and return the deleted journey with status 200', async () => {
      const resTrip = await request(app).post('/post').send(tripData);
      const idTrip = resTrip.body.id;
      journeyData.idTrip = idTrip;

      const resJourney = await request(app).post('/journey').send(journeyData);

      const idjourney = resJourney.body.id;
      const res = await request(app).delete('/modify').query({ idjourney });

      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(idjourney);
    });

    it('Should delete an activity with the specified ID and return the deleted activity with status 200', async () => {
      const resTrip = await request(app).post('/post').send(tripData);
      const idTrip = resTrip.body.id;
      activityData.idTrip = idTrip;

      const resActivity = await request(app)
        .post('/activity')
        .send(activityData);

      const idactivity = resActivity.body.id;

      const res = await request(app).delete('/modify').query({ idactivity });

      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(idactivity);
    });

    it('Should return status 400 if required input field is missing', async () => {
      const res = await request(app).delete('/modify').query({});

      expect(res.statusCode).toEqual(400);
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
    it('Should return status 400 if required input field is missing', async () => {
      const res = await request(app).put('/modify').query({});

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /explore - getActivitiesList', () => {
    // Test getActivitiesList route
    it('Should return an array of all activities with status 200', async () => {
      const res = await request(app).get('/explore');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
