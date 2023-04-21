import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getAllTrips } from '../../api.service'

import './Result.css'

function Result({searchedTrips}) {

    return (
      <div className="Result">
       <h1>Result</h1>
       {searchedTrips.map(trip => <p> {trip.name} </p> )}
       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Result