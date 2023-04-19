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

module.exports = controller;
