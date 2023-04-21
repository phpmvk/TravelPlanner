import { useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns'
import { useContext } from 'react';

import { postActivity } from "../../api.service";
import { TripContext } from '../../App';
import './Activity.css'


function Activity() {
    const { currentTrip } = useContext(TripContext);

    const navigate = useNavigate();

    function handleCancelActivity() {
        navigate(`/trip/${currentTrip.id}`);
      }

    const handleSubmit = async function(e){
        e.preventDefault()
        
        const start = parseISO(e.target[0].value)
        const end = parseISO(e.target[1].value)
        const price = parseFloat(e.target[4].value);
               
        const newActivity = {
            start: start,
            end: end,
            depCity: e.target[2].value,
            arrCity: e.target[3].value,
            price: price,
            activityType: e.target[5].value,
            additionalInfo: e.target[6].value,
            idTrip: currentTrip.id
        }
    
        const activityNew = await postActivity(newActivity)
        
        e.target.reset()

        navigate(`/trip/${currentTrip.id}`)
    }
  
    return (
      <div className="Activity">
        <h1>{currentTrip.name}</h1>
        <form onSubmit={handleSubmit}> 
                <h2>Create a new Acivity</h2>
                <h4>Start of the activity</h4>
            <input className="inputs" type="datetime-local" ></input>
                <h4>End of the activity</h4>
            <input className="inputs" type="datetime-local" ></input>
                <h4>Departure City</h4>
            <input className="inputs" placeholder="City"></input>
                <h4>Arrival City</h4>
            <input className="inputs" placeholder="City"></input>
                <h4>Price</h4>
            <input className="inputs" placeholder="Price"></input>
                <h4>Activity name</h4>
            <input className="inputs" placeholder="Name of the activity"></input>
                <h4>Additional Info?</h4>
            <input className="inputs" placeholder="..."></input>
                <button className="button" type="submit">Create</button>
        </form>

        <button className="button" onClick={handleCancelActivity}>
            Cancel activity
        </button>
      </div>
    )
  }
  
  export default Activity