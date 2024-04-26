import CachedCollection from "../CachedCollection.js";

export const CreateCRUDRoutes = (router, Model, ValidateData, maxMemoryUsage) => {
    // Initialize CachedCollection
    router.cachedCollection = new CachedCollection(Model, maxMemoryUsage);

    // Route to create a new record
    router.post('/', async (request, response) => {
        try {
            if (!ValidateData(request.body))
                return response.status(400).send(`Post all required fields of ${Model.collection.name} ${JSON.stringify(Model.schema.obj)}`);
            const newRec = request.body;
            const mRec = await router.cachedCollection.create(newRec);
            return response.status(201).send(mRec);
        } catch (error) {
            console.log(`Post Error: ${error}`);
            response.status(500).send({ message: error.message });
        }
    });

    // Route for getting all records from database
    router.get('/', async (request, response) => {
        console.log( "GET /", router.cachedCollection.cache.Model);
        try {
            const { filter, sort, limit } = request.query;
            // Fetch data from cachedCollection
            const mrecs = await router.cachedCollection.find(request.query);
            return response.status(200).json({
                count: mrecs.length,
                data: mrecs
            });
        } catch (error) {
            console.log( error);
            response.status(500).send({ message: "Backend error", error: error.message });
        }
    });

    // Route for getting one record from database by id
    router.get('/:id', async (request, response) => {
        console.log( "GET by ID", router.cachedCollection.cache.Model);
        try {
            const { id } = request.params;
            const mrec = await router.cachedCollection.findById(id);
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
        console.log("PUT by ID query = ", request.query, "to collection", router.cachedCollection.cache.Model);
        try {
            if (!ValidateData(request.body))
                return response.status(400).send("Post all required record fields");
            const { id } = request.params;
            const mRecord = await router.cachedCollection.findByIdAndUpdate(id, request.body);
            if (!mRecord)
                return response.status(404).json({ message: 'id not found' });
            return response.status(200).send({ message: 'Record updated successfully !' });
        } catch (error) {
            console.log(`Generic router Update a record ${error}`);
            response.status(500).send({ message: error.message });
        }
    });

    // Route to delete a record with id
    router.delete('/:id', async (request, response) => {
        try {
            const { id } = request.params;
            const result = await router.cachedCollection.findByIdAndDelete(id);
            if (!result)
                return response.status(404).json({ message: 'id not found' });
            return response.status(200).send({ message: 'Record deleted successfully!' });

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
            const updatedRec = await router.cachedCollection.findByIdAndUpdate(id, { slots }, { new: true });

            // Return the updated tray
            res.json(updatedRec);
        } catch (error) {
            console.error("Error updating record:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};
