import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getAllTrips } from '../api.service'


function Result() {
    const [tripArr, setTripArr] = useState([])

  
    useEffect(()=>{
        getAllTrips().then((arr)=>{
            setTripArr(arr)
        })
        // const res = getAllTrips().then()
        // console.log("hola", res);
      },[])

    return (
      <div className="Result">
       <h1>Result</h1>
       {tripArr.map(trip => <p> {trip.name} </p> )}
       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Result