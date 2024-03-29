import axios from 'axios';
import BackendURL from '../components/BackendURL';

const ComputeStatsSeedsInTrays = async (Tray, Seeds) => {
    const trayStats = {
        trayUsage: 0,
        traySlots: [],
        error: null,
    };

    // console.log( `ComputeStatsSeedsInTrays = async (${trayId}, ${JSON.stringify(Seeds)})`);
    if (!Tray || !Tray._id || !Seeds || Seeds.length < 1) {
        trayStats.error = 'Invalid Tray or Seeds data';
        return trayStats;
    }

    try {
        const response = await axios.get(`${BackendURL}/Slots/tray${Tray._id}`);
        //  console.log( `Rsp to get tray ${BackendURL}/Slots/tray${Tray._id} slots = `, response.data);
        trayStats.traySlots = response.data?.data || [];
        const totalSlots = trayStats.traySlots.length;
        const totalCells = Tray.nbCols * Tray.nbRows;
        trayStats.traySlotsCreation = (totalSlots * 100) / totalCells;
        const usedSlots = trayStats.traySlots.filter(slot => slot.used).length;
        trayStats.trayUsage = (usedSlots * 100) / totalCells;

        // Gather seeds used in the tray's slots and count their occurrences
        trayStats.traySeeds = [];
        // Iterate over each slot in the tray
        trayStats.traySlots.forEach((slot) => {
            // Check if the slot is used and has a valid seed associated with it
            if (slot.used && slot.seed) {
                const seedId = slot.seed;
                // Check if the seed has already been counted
                const counted = trayStats.traySeeds.find((seed) => seed.id === seedId);
                if (!counted) 
                 {
                    // Count how many times the seed appears in the tray slots
                    const count = trayStats.traySlots.filter((s) => s.seed === seedId).length;
                    // Find the seed object from the Seeds array
                    const theSeed = Seeds.find((s) => s._id === seedId);
                    if (theSeed) {
                        // Extract the seed properties
                        const { _id: id, propId, easyName } = theSeed;
                        // Add a new seed object to the traySeeds array
                        trayStats.traySeeds.push({ id, propId, easyName, count });
                    }
                }
        }})
    } catch (error) {
        console.error(`Error fetching slots for Tray ${Tray._id} :`, error);
        trayStats.error = `Error fetching slots: ${error.message}`;
    }
    return trayStats;
};

export default ComputeStatsSeedsInTrays;