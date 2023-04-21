const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const controller = {};

controller.getAllTrips = async (req, res) => {
  try {
    console.log("I am inside the getallTrips");
    //   const trips = await prisma.trip.findMany({ include: { activities: true } });
    const trips = await prisma.trip.findMany({});
    const response = res.json(trips);
    res.send(response);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.getSearchTrips = async (req, res) => {
  try {
    const a = req.query;

    const searchItemsArr = a.activities;
    const budget = a.budget;

    console.log("searchItemsArr", searchItemsArr);
    console.log("budget", a.budget);

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
    });

    const results = getTrips.filter((trip) => trip.budget <= budget);
    // const res2 = results.filter((trip) => trip.budget <= budget);
    // dependiendo de los otros filtros, modificaremos esta array
    // console.log("res2", res2);
    console.log("gettrips", getTrips);

    res.json(results);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.getTripById = async (req, res) => {
  console.log("function getTripById called");
  const { id } = req.params;
  try {
    const trips = await prisma.trip.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(trips);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.createTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.create({
      data: {
        name: req.body.name,
        user: req.body.user,
        depCity: req.body.depCity,
        arrCity: req.body.arrCity,
        budget: req.body.budget,
        duration: req.body.duration,
      },
    });
    res.json(trip);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.createJourney = async (req, res) => {
  try {
    const journey = await prisma.journey.create({
      data: {
        start: req.body.start,
        end: req.body.end,
        depCity: req.body.depCity,
        arrCity: req.body.arrCity,
        price: req.body.price,
        transportType: req.body.transportType,
        trip: { connect: { id: req.body.idTrip } },
      },
    });
    res.json(journey);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.createActivity = async (req, res) => {
  try {
    const activity = await prisma.activity.create({
      data: {
        start: req.body.start,
        end: req.body.end,
        depCity: req.body.depCity,
        arrCity: req.body.arrCity,
        price: req.body.price,
        activityType: req.body.activityType,
        additionalInfo: req.body.additionalInfo,
        trip: { connect: { id: req.body.idTrip } },
      },
    });
    res.json(activity);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = controller;
