//@ts-nocheck
import axios from "axios";
// import { duration } from "moment";

const url = "http://localhost:3001/";

export function diffMinutes(date1, date2) {
  if (date2 > date1) {
    const diff = Math.abs(date2 - date1);
    return Math.floor(diff / (1000 * 60));
  }
  const diff = Math.abs(date1 - date2);
  return Math.floor(diff / (1000 * 60));
}

function extractStartDates(trip) {
  const startDates = [];
  console.log("trip.activities", trip.activities);
  if (trip.activities.length) {
    trip.activities.forEach((activity) => {
      startDates.push(new Date(activity.start));
    });
  }
  if (trip.journeys.length) {
    trip.journeys.forEach((journey) => {
      startDates.push(new Date(journey.start));
    });
  }
  if (startDates.length) {
    startDates.sort((a, b) => a - b);
    return startDates;
  } else {
    return undefined;
  }
}

function extractEndDates(trip) {
  const endDates = [];
  if (trip.activities) {
    trip.activities.forEach((activity) => {
      endDates.push(new Date(activity.end));
    });
  }
  if (trip.journeys) {
    trip.journeys.forEach((journey) => {
      endDates.push(new Date(journey.end));
    });
  }
  if (endDates.length) {
    endDates.sort((a, b) => b - a);
    return endDates;
  } else {
    return undefined;
  }
}

export const postTrip = async (trip) => {
  try {
    // console.log("posting a Trip");
    const response = await fetch(url + "post", {
      method: "POST",
      body: JSON.stringify(trip),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("postTrip", response);
    const tripCreated = await response.json();
    console.log("response from postTrip", tripCreated);
    return tripCreated;
  } catch (error) {
    console.log(error);
  }
};

export const postJourney = async (journey) => {
  try {
    const trip = await getTripById(journey.idTrip);
    if (!trip[0].start || new Date(journey.start) < new Date(trip[0].start)) {
      trip[0].start = journey.start;
    }

    if (!trip[0].end || new Date(journey.end) > new Date(trip[0].end)) {
      trip[0].end = journey.end;
    }

    trip[0].duration = Number(
      diffMinutes(new Date(trip[0].start), new Date(trip[0].end))
    );
    updateTrip(trip[0]);

    const response = await fetch(url + "journey", {
      method: "POST",
      body: JSON.stringify(journey),
      headers: {
        "Content-type": "application/json",
      },
    });
    const journeys = await response.json();
    return journeys;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJourney = async (journey) => {
  try {
    console.log("deleting a journey");
    const response = await fetch(`${url}modify?idjourney=${journey.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const journeys = await response.json();

    const trip = await getTripById(journey.idTrip);
    let primerStart;
    if (extractStartDates(trip[0]) === undefined) {
      primerStart = undefined;
    } else {
      primerStart = extractStartDates(trip[0])[0];
    }

    let lastEnd;
    if (extractEndDates(trip[0]) === undefined) {
      lastEnd = undefined;
    } else {
      lastEnd = extractEndDates(trip[0])[0];
    }

    if (!primerStart) {
      trip[0].start = null;
    } else {
      trip[0].start = primerStart;
    }

    if (!lastEnd) {
      trip[0].end = null;
    } else {
      trip[0].end = lastEnd;
    }

    trip[0].duration = Number(
      diffMinutes(new Date(trip[0].start), new Date(trip[0].end))
    );
    updateTrip(trip[0]);

    return journeys;
  } catch (error) {
    console.log(error);
  }
};

export const deleteActivity = async (activity) => {
  try {

    const response = await fetch(`${url}modify?idactivity=${activity.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const activities = await response.json();

    const trip = await getTripById(activity.idTrip);

    let primerStart;
    if (extractStartDates(trip[0]) === undefined) {
      primerStart = undefined;
    } else {
      primerStart = extractStartDates(trip[0])[0];
    }

    let lastEnd;
    if (extractEndDates(trip[0]) === undefined) {
      lastEnd = undefined;
    } else {
      lastEnd = extractEndDates(trip[0])[0];
    }

    if (!primerStart) {
      trip[0].start = null;
    } else {
      trip[0].start = primerStart;
    }

    if (!lastEnd) {
      trip[0].end = null;
    } else {
      trip[0].end = lastEnd;
    }

    trip[0].duration = Number(
      diffMinutes(new Date(trip[0].start), new Date(trip[0].end))
    );
    updateTrip(trip[0]);

    return activities;
  } catch (error) {
    console.log(error);
  }
};

export const postActivity = async (activity) => {
  try {
    const trip = await getTripById(activity.idTrip);
    if (!trip[0].start || new Date(activity.start) < new Date(trip[0].start)) {
      trip[0].start = activity.start;
    }

    if (!trip[0].end || new Date(activity.end) > new Date(trip[0].end)) {
      trip[0].end = activity.end;
    }

    trip[0].duration = Number(
      diffMinutes(new Date(trip[0].start), new Date(trip[0].end))
    );
    updateTrip(trip[0]);

    const response = await fetch(url + "activity", {
      method: "POST",
      body: JSON.stringify(activity),
      headers: {
        "Content-type": "application/json",
      },
    });
    const activitys = await response.json();
    return activitys;
  } catch (error) {
    console.log(error);
  }
};

export const getTripById = async (idTrip) => {
  const url4 = `http://localhost:3001/modify?idTrip=${idTrip}`;
  console.log(url4);
  try {
    const response = await fetch(url4);
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTrip = async (id) => {
  try {
    // console.log("function get trip by id called inside front end");
    const response = await axios.get(`${url}trip/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTrips = async () => {
  try {
    const response = await fetch(url + "result");
    const res = response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchedTrips = async (url2) => {
  try {
    const response = await fetch(url2);
    const res = await response.json();
    console.log(response);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTripsByUser = async (url3) => {
  try {
    const response = await fetch(url3);
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTrip = async (tripId) => {
  try {
    console.log("deleting a trip");
    const response = await fetch(`${url}modify?idtrip=${tripId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    // console.log(response);
    const trip = await response.json();
    console.log(trip);
    return trip;
  } catch (error) {
    console.log(error);
  }
};

export const updateTrip = async (trip) => {
  console.log("TRIP DANS UPDATE", trip);
  const response = await fetch(`${url}modify?idtrip2=${trip.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error updating trip");
  }
  return data;
};

export const getActivitiesList = async () => {
  try {
    const response = await fetch(url + "explore");
    const res = response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

// export const getActivitiesByTripId = async (id) => {
//   const activities = await prisma.activity.findMany({
//     where: { idTrip: id },
//     // orderBy: { start: 'asc' },
//   })
//   return activities
// }

// export { postTrip, postJourney, postActivity, getTrip, getAllTrips }
