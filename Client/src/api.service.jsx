import axios from "axios";

const url = "http://localhost:3001/";

export const postTrip = async (trip) => {
  try {
    // console.log("posting a Trip");
    const response = await fetch(url + "post", {
      method: "POST",
      // body:trip,
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

export const getSearchedTrips = async () => {
  try {
    const response = await fetch(url + "result");
    const res = response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

// export { postTrip, postJourney, postActivity, getTrip, getAllTrips }
