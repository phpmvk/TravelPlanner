const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const controller = {};

function lowerCase(string) {
  return string.toLowerCase();
}

controller.getAllTrips = async (req, res) => {
  try {
    console.log("I am inside the getallTrips");
    //   const trips = await prisma.trip.findMany({ include: { activities: true } });
    const trips = await prisma.trip.findMany({});
    // const response = res.json(trips);
    res.json(trips);
    // res.send(response);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.getSearchTrips = async (req, res) => {
  try {
    const a = req.query;
    if (typeof a.activities === "string") {
      a.activities = a.activities.split(" ");
    }

    const searchItemsArr = a.activities.map(lowerCase);
    const budget = lowerCase(a.budget);
    const depCity = lowerCase(a.depCity);

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

    const results = getTrips
      .filter((trip) => trip.budget <= budget)
      .filter((trip) => trip.depCity === depCity);

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
        depCity: lowerCase(req.body.depCity),
        arrCity: lowerCase(req.body.arrCity),
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
        depCity: lowerCase(req.body.depCity),
        arrCity: lowerCase(req.body.arrCity),
        price: req.body.price,
        transportType: lowerCase(req.body.transportType),
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
        depCity: lowerCase(req.body.depCity),
        arrCity: lowerCase(req.body.arrCity),
        price: req.body.price,
        activityType: lowerCase(req.body.activityType),
        additionalInfo: lowerCase(req.body.additionalInfo),
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

controller.getTripByUser = async (req, res) => {
  console.log("function getTripByUser called");
  const { user } = req.query;
  try {
    const trips = await prisma.trip.findMany({
      where: {
        user: user,
      },
      include: {
        journeys: true,
        activities: true,
      },
    });
    res.json(trips);
    console.log(trips);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

controller.deleteItem = async (req, res) => {
  if (req.query.idjourney) {
    const id = req.query.idjourney;
    console.log(req.query);
    console.log("id received", id);
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
      res.status(400);
    }
  } else if (req.query.idactivity) {
    const id = req.query.idactivity;
    console.log(req.query);
    console.log("id received", id);
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
      res.status(400);
    }
  }
};

module.exports = controller;
