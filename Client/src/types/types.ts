export interface Trip {
  id?: number, 
  name: string,
  user: string,
  depCity: string,
  arrCity: string,
  budget: number,
  duration?: number,
  start?: Date,
  end?: Date,
  journeys: Journey[],
  activities: Activity[],
}

export interface Journey {
  id?: number,
  start:Date,
  end: Date,
  depCity: string,
  arrCity: string,
  price: number,
  transportType: string,
  trip: Trip
  idTrip: number,
}

export interface Activity {
  id?: number,
  start: Date,
  end: Date,
  depCity: string,
  arrCity?: string,
  price: number,
  activityType: string,
  additionalInfo?: string,
  trip: Trip,
  idTrip: number
}