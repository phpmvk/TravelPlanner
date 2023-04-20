import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'


function Result() {
    const [tripArr, setTripArr] = useState([])

  
    useEffect(()=>{
        getForms().then((arr)=>{
            setTripArr(arr)
        })
      },[])

    return (
      <div className="Result">
       {/* <h1>Result</h1>
       {tripArr.map((trip)=>(
        return (

        ) */}
       {/* ))} */}
       <Link to="/">
            <button className="button">Home</button>
        </Link>
      </div>
    )
  }
  
  export default Result