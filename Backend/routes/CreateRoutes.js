import express from "express";

export const CreateCRUDRoutes = (router, Model, Schema, ValidateData, label) => {
    // Route to create a new recordValidateData
    router.post('/', async (request, response) => {
        try {

            if (!ValidateData(request.body))
                return response.status(400).send(`Post all required fields of ${label} ${JSON.stringify(Schema)}`);
            const newRec = request.body;
            const mRec = await Model.create(newRec);
            return response.status(201).send(mRec);
        } catch (error) {
            console.log(`Post Error: ${error}`);
            response.status(500).send({ message: error.message });
        }
    });

    // Route for getting all records from database
    router.get('/', async (request, response) => {
        try {
            console.log( `Weird getAll ${JSON.stringify(Model)}`, request.params, request.body);
            const mrecs = await Model.find({});
            return response.status(200).json(
                {
                    count: mrecs.length,
                    data: mrecs
                }
            );
        } catch (error) {
            console.log(`Get all records Error: ${error}`);
            response.status(500).send({ message: error.message });
        }
    });

    // Route for getting one record from database by id
    router.get('/:id', async (request, response) => {
        try {
            const { id } = request.params;
            const mrec = await Model.findById(id);
            if (!mrec)
                return response.status(404).json({ message: `${id} not found` });
            return response.status(200).json(mrec);
        } catch (error) {
            console.log(`Get record by id Error: ${error}`);
            response.status(500).send({ message: error.message });
        }
    });

// Route to update a Record
router.put('/:id', async (request, response) => {
    console.log( "Patch / Update ");
    try {
        if (!ValidateData(request.body))
            return response.status(400).send("Post all required record fields");
        const { id } = request.params;
        const mRecord = await Model.findByIdAndUpdate(id, request.body);
        if (!mRecord)
            return response.status(404).json({ message: 'id not found' });
        return response.status(200).send({ message: 'Record updated successfully !' });
    } catch (error) {
        console.log(`Update a record ${error}`);
        response.status(500).send({ message: error.message });
    }
});
    // Route to delete a record with id
    router.delete('/:id', async (request, response) => {
        try {
            const { id } = request.params;
            const result = await Model.findByIdAndDelete(id);
            if (!result)
                return response.status(404).json({ message: 'id not found' });
            return response.status(200).send({ message: 'Record deleted successfully!' });
            console.log(`Delete ${id}`);

        } catch (error) {
            console.log(`Delete a record Error: ${error}`);
            response.status(500).send({ message: error.message });
        }
    });
    router.patch('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const { slots } = req.body;
      
          // Update the tray document with the new slot data
          const updatedRec = await Model.findByIdAndUpdate(id, { slots }, { new: true });
      
          // Return the updated tray
          res.json(updatedRec);
        } catch (error) {
          console.error("Error updating record:", error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
};

