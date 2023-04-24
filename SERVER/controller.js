const { PrismaClient } = require("@prisma/client");
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
    console.log("Calling getallTrips");
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
    console.log("Calling getActivitiesList");
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
    if (typeof a.activities === "string") {
      a.activities = a.activities.split(" ");
    }

    const searchItemsArr = a.activities.map(lowerCase).map(putCapLet);
    const budgetTrip = a.budget;
    const depCityTrip = putCapLet(lowerCase(a.depCity));

    console.log("searchItemsArr", searchItemsArr);
    console.log("budgetTrip", budgetTrip);

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
      .filter((trip) => trip.depCity === depCityTrip);

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
  } else if (req.query.idtrip) {
    const id = req.query.idtrip;
    console.log(req.query);
    console.log("id received", id);
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
      res.status(400);
    }
  }
};

controller.modifyTrip = async (req, res) => {
  console.log("modifyTrip called");
  console.log(req.query);
  const id = req.query.idtrip2;
  console.log(id, "id");
  const { name, user, depCity, arrCity, budget, duration } = req.body;

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
        duration: parseInt(duration),
      },
    });
    res.json(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating trip" });
  }
};

module.exports = controller;
