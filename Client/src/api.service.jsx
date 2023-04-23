import axios from "axios";

const url = "http://localhost:3001/";

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
    console.log("posting a Journey");
    const response = await fetch(url + "journey", {
      method: "POST",
      body: JSON.stringify(journey),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
    const journeys = await response.json();
    console.log(journeys);
    return journeys;
  } catch (error) {
    console.log(error);
  }
};

export const postActivity = async (activity) => {
  try {
    console.log("posting");
    const response = await fetch(url + "activity", {
      method: "POST",
      body: JSON.stringify(activity),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
    const activitys = await response.json();
    console.log(activitys);
    return activitys;
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

export const deleteJourney = async (journeyId) => {
  try {
    console.log("deleting a journey")
    const response = await fetch(`${url}modify?idjourney=${journeyId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    // console.log(response);
    const journeys = await response.json();
    console.log(journeys);
    return journeys;
  } catch (error) {
    console.log(error);
  }
};

export const deleteActivity = async (activityId) => {
  try {
    console.log("deleting an activity")
    const response = await fetch(`${url}modify?idactivity=${activityId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    // console.log(response);
    const activities = await response.json();
    console.log(activities);
    return activities;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTrip = async (tripId) => {
  try {
    console.log("deleting a trip")
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
  console.log(trip);
  const response = await fetch(`${url}modify?idtrip2=${trip.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trip)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error updating trip');
  }
  return data;
};


// export const getActivitiesByTripId = async (id) => {
//   const activities = await prisma.activity.findMany({
//     where: { idTrip: id },
//     // orderBy: { start: 'asc' },
//   })
//   return activities
// }

// export { postTrip, postJourney, postActivity, getTrip, getAllTrips }
