import express from "express";

export const CreateCRUDRoutes = (router, Model, Schema, ValidateData, label) => {
    // Route to create a new recordValidateData
    router.post('/', async (request, response) => {
        try {
            // Just a quick validation of the inputs, rework it later
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

    // Route to update a record
    router.put('/:id', async (request, response) => {
        try {
            if (!ValidateData(request.body))
                return response.status(400).send("Post all required fields");
            const { id } = request.params;
            const mRec = await Model.findByIdAndUpdate(id, request.body);
            if (!mRec)
                return response.status(404).json({ message: 'id not found' });
            return response.status(200).send({ message: 'Record updated successfully!' });
        } catch (error) {
            console.log(`Update a record Error: ${error}`);
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
};

