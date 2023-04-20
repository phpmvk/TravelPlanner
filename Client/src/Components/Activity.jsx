import { Link } from 'react-router-dom';
import { postActivity } from "../api.service";
import { parseISO } from 'date-fns'


function Activity() {

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
        }
    
        const res= await postActivity(newActivity)
        
        e.target.reset()
    }
  
    return (
      <div className="Activity">
        <form onSubmit={handleSubmit}> 
            <h1>Create a new Journey</h1>
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

       <Link to="/post">
            <button className="button">Cancel Activity</button>
        </Link>
      </div>
    )
  }
  
  export default Activity