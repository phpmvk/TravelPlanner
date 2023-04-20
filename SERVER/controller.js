const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const controller = {};

controller.getAllTrips = async (req, res) => {
  try {
    //   const trips = await prisma.trip.findMany({ include: { activities: true } });
    const trips = await prisma.trip.findMany({});
    res.json(trips);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.getTripById = async (req, res) => {
  console.log("function called");
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

        // activities: {
        //   create: req.body.activities,
        // },
      },
      //   include: { activities: true },
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
