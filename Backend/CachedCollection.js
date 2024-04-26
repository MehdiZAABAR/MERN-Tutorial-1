import Cache from './Cache.js'

class CachedCollection {
    constructor(Model, maxMemoryUsage) {
        this.cache = new Cache(Model, maxMemoryUsage);
    }

    async create(data) {
        try {
            const newRecord = await this.cache.Model.create(data);
            if (!newRecord || typeof newRecord !== 'object') {
                throw new Error('Invalid data returned from database');
            }
            const key = `${newRecord._id}`;
            this.cache.addToCache(key, newRecord);
            return newRecord;
        } catch (error) {
            console.error(`Error creating record: ${error}`);
            throw new Error(`Failed to create record: ${error.message}`);
        }
    }

    // find(query = {}) {
    //     // Generate cache key based on the route and query parameters
    //     const key = this.cache.generateCacheKey('find', query);
    //     console.log( this.getCollectionName().name, "find(",query,") key is ", key);
    
    //     // Try to fetch data from the cache
    //     const cachedData = this.cache.getFromCache(key);
    
    //     if (cachedData) {
    //         return Promise.resolve(cachedData);
    //     } else {
    //         return this.cache.Model.find(query)
    //             .then(data => {
    //                 console.log( "Find returning after", this.getCollectionName().name," db fetching key = ", key);
    //                 // Cache the retrieved data
    //                 this.cache.cacheData(key, data);
    //                 return data;
    //             })
    //             .catch(error => {
    //                 // Handle any errors that occur during database query
    //                 console.error(`Error fetching data from database: ${error}`);
    //                 throw error; // Rethrow the error to be handled by the caller
    //             });
    //     }
    // }
    find({filter = {}, sort = null, limit = null}) {
        // Generate cache key based on the route and query parameters
        const key = this.cache.generateCacheKey('find', filter);
        // Try to fetch data from the cache
        const cachedData = this.cache.getFromCache(key);
    
        if (cachedData) {
            return Promise.resolve(cachedData);
        } else {
            let findQuery = this.cache.Model.find(filter);
            if (sort) {
                console.log( "sort arg = ", sort);
                findQuery = findQuery.sort(JSON.parse(sort));
            }
            if (limit) {
                findQuery = findQuery.limit(limit);
            }
            return findQuery
                .then(data => {
                    // console.log("Find returning after", this.getCollectionName().name, "db fetching query = ");
                    // Cache the retrieved data
                    this.cache.cacheData(key, data);
                    return data;
                })
                .catch(error => {
                    // Handle any errors that occur during database query
                    console.error(`Error fetching data from database: ${error}`);
                    throw error; // Rethrow the error to be handled by the caller
                });
        }
    }
    
    findById(id) {
        // Try to fetch data from the cache using the id as the key
        const cachedData = this.cache.getFromCache(id);
    
        if (cachedData) {
            // Return cached data if available
            return Promise.resolve(cachedData);
        } else {
            // Fetch data from the database
            return this.cache.Model.findById(id)
                .then(data => {
                    // Cache the retrieved data
                    this.cache.cacheData(id, data);
                    return data;
                })
                .catch(error => {
                    // Handle any errors that occur during database query
                    console.error(`Error fetching data from database: ${error}`);
                    throw error; // Rethrow the error to be handled by the caller
                });
        }
    }
    findByIdAndUpdate(id, update) {
        console.log( "Entering CachecCollection findById method");
        // First, update the data in the database
        return this.cache.Model.findByIdAndUpdate(id, update, { new: true })
            .then(updatedData => {
                // Update the cache with the new data
                this.cache.updateRecord(id, updatedData);
                return updatedData;
            })
            .catch(error => {
                // Handle any errors that occur during database update
                console.error(`Error updating data in database: ${error}`);
                throw error; // Rethrow the error to be handled by the caller
            });
    }

    findByIdAndDelete(id) {
        // First, delete the data from the database
        return this.cache.Model.findByIdAndDelete(id)
            .then(deletedData => {
                if (!deletedData) {
                    // If no data was deleted, return null
                    return null;
                }
                // Remove the data from the cache
                this.cache.updateRecord(id, null);
                return deletedData;
            })
            .catch(error => {
                // Handle any errors that occur during database delete
                console.error(`Error deleting data from database: ${error}`);
                throw error; // Rethrow the error to be handled by the caller
            });
    }

    getCollectionName() {
        return {
            name: this.cache.Model.collection.name
        };
    }
}

export default CachedCollection;
