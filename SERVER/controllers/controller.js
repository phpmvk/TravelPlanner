/* global require, module */
// const { prisma } = require('../prisma');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const controller = {};

function lowerCase(string) {
  return string.toLowerCase();
}

const putCapLet = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

controller.getAllTrips = async (req, res) => {
  try {
    console.log('Calling getallTrips');
    const trips = await prisma.trip.findMany({});
    res.json(trips);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.getActivitiesList = async (req, res) => {
  try {
    console.log('Calling getActivitiesList');
    const trips = await prisma.activity.findMany({});
    res.json(trips);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.getSearchTrips = async (req, res) => {
  try {
    const a = req.query;
    if (typeof a.activities === 'string') {
      a.activities = a.activities.split(' ');
    }
    if (!a.activities) {
      res.status(400).send();
      return;
    }

    const searchItemsArr = a.activities.map(lowerCase).map(putCapLet);
    const budgetTrip = a.budget;
    const depCityTrip = putCapLet(lowerCase(a.depCity));
    const durationTrip = a.duration;

    const getTrips = await prisma.trip.findMany({
      where: {
        activities: {
          some: {
            activityType: {
              in: searchItemsArr,
            },
          },
        },
      },
      include: {
        journeys: true,
        activities: true,
      },
    });

    const results = getTrips
      .filter((trip) => trip.budget <= budgetTrip)
      .filter((trip) => trip.depCity === depCityTrip)
      .filter((trip) => trip.duration <= durationTrip);
    res.json(results);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

controller.getTripById = async (req, res) => {
  console.log('function getTripById called');
  const { id } = req.params;
  try {
    const trips = await prisma.trip.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        journeys: true,
        activities: true,
      },
    });
    if (!trips) {
      res.status(404).send();
      return;
    }
    res.json(trips);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

controller.createTrip = async (req, res) => {
  try {
    const { name, user, depCity, arrCity, budget, duration } = req.body;
    if (!name || !user || !depCity || !budget) {
      res.status(400).send();
      return;
    }
    const trip = await prisma.trip.create({
      data: {
        name: name,
        user: user,
        depCity: depCity,
        arrCity: arrCity,
        budget: budget,
        duration: duration,
      },
    });
    res.status(201).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

controller.createJourney = async (req, res) => {
  try {
    const { start, end, depCity, arrCity, price, transportType, idTrip } =
      req.body;
    if (
      !start ||
      !end ||
      !depCity ||
      !arrCity ||
      !price ||
      !transportType ||
      !idTrip
    ) {
      res.status(400).send();
      return;
    }
    const journey = await prisma.journey.create({
      data: {
        start: start,
        end: end,
        depCity: depCity,
        arrCity: arrCity,
        price: price,
        transportType: transportType,
        trip: { connect: { id: idTrip } },
      },
    });
    res.status(201).json(journey);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

controller.createActivity = async (req, res) => {
  try {
    const {
      start,
      end,
      depCity,
      arrCity,
      price,
      activityType,
      additionalInfo,
      idTrip,
    } = req.body;
    if (!start || !end || !depCity || !price || !activityType || !idTrip) {
      res.status(400).send();
      return;
    }
    const activity = await prisma.activity.create({
      data: {
        start: start,
        end: end,
        depCity: depCity,
        arrCity: arrCity,
        price: price,
        activityType: activityType,
        additionalInfo: additionalInfo,
        trip: { connect: { id: idTrip } },
      },
    });
    res.status(201).json(activity);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

controller.getTripByUser = async (req, res) => {
  console.log('function getTripByUser called');
  if (req.query.user) {
    try {
      const user = req.query.user;
      const trips = await prisma.trip.findMany({
        where: {
          user: user,
        },
        include: {
          journeys: true,
          activities: true,
        },
      });
      if (trips.length < 1) {
        res.status(404).send();
        return;
      }
      res.json(trips);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else if (req.query.idTrip) {
    try {
      const idTrip = req.query.idTrip;
      if (!isNaN(idTrip)) {
        const trips = await prisma.trip.findMany({
          where: {
            id: parseInt(idTrip),
          },
          include: {
            journeys: true,
            activities: true,
          },
        });

        if (trips.length < 1) {
          res.status(404).send();
          return;
        }
        res.json(trips);
        res.status(200);
      } else {
        res.status(400).send();
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(400).send();
  }
};

controller.deleteItem = async (req, res) => {
  if (req.query.idjourney) {
    const id = req.query.idjourney;
    try {
      const deletedJourney = await prisma.journey.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json(deletedJourney);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else if (req.query.idactivity) {
    const id = req.query.idactivity;

    try {
      const deletedActivity = await prisma.activity.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json(deletedActivity);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else if (req.query.idtrip) {
    const id = req.query.idtrip;
    try {
      const deletedTrip = await prisma.trip.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json(deletedTrip);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(400).send();
  }
};

controller.modifyTrip = async (req, res) => {
  const id = req.query.idtrip2;
  if (!id) {
    res.status(400).send();
    return;
  }
  const { name, user, depCity, arrCity, budget, duration, start, end } =
    req.body;

  try {
    const updatedTrip = await prisma.trip.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        user,
        depCity,
        arrCity,
        budget: parseFloat(budget),
        duration: Number(duration),
        start,
        end,
      },
    });
    res.json(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating trip' });
  }
};

module.exports = controller;
