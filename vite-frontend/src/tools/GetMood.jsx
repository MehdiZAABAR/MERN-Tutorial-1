import BackendURL from "../components/BackendURL";
import axios from "axios";
export async function GetSlotRecentMood(slot) {
    let lastObsWMood = null;
    let mood = {};

    if (!slot || !slot.seed || slot.seed === null)
        return {};
    let query = {
        filter: {
            "slots": { $exists: true, $elemMatch: { $eq: `${slot._id}` } }
        },
        sort: '{"date": -1}', // Sort by date from newest to oldest
        limit: 3 // Limit the number of results to 10
    };
    await axios.get(`${BackendURL}/observations/`, { params: query })
        .then(response => {
            // Handle the response data
            if (response.data.count > 0)
                lastObsWMood = response.data.data.find(observation => observation.mood !== undefined && observation.mood !== null);
            // console.log( lastObsWMood);
            if (lastObsWMood != null)
                mood = lastObsWMood;
            else
                mood = response.data.data[0]; 
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching observations:', error);
            return {};
        });
        // console.log( `Mood of slot ${slot.name}`, lastObsWMood.mood);
    return mood;
}