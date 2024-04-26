class Cache {
    constructor(Model, maxMemoryUsage) {
        this.maxMemoryUsage = maxMemoryUsage;
        this.cache = new Map();
        this.memoryUsage = 0;
        this.Model = Model;
    }

    addToCache(key, value) {
        if (this.maxMemoryUsage === 0) return;
        const sizeOfValue = Buffer.byteLength(JSON.stringify(value), 'utf8');
        if (sizeOfValue > this.maxMemoryUsage) return;
        if (sizeOfValue + this.memoryUsage > this.maxMemoryUsage) {
            this.clearCache();
        }
        this.cache.set(key, value);
        this.memoryUsage += sizeOfValue;
        console.log("in addToCache after adding Cache size:", this.memoryUsage);
    }
    
    removeFromCache(key) {
        const value = this.cache.get(key);
        if (value) {
            const sizeOfValue = Buffer.byteLength(JSON.stringify(value), 'utf8');
            this.cache.delete(key);
            this.memoryUsage -= sizeOfValue;
        }
    }

    clearCache() {
        this.cache.clear();
        this.memoryUsage = 0;
    }

    getFromCache(key) {
        return this.cache.get(key);
    }

    updateCache(key, value) {
        this.removeFromCache(key);
        this.addToCache(key, value);
    }

    disableCache() {
        this.maxMemoryUsage = 0;
        this.clearCache();
    }

    generateCacheKey(route, queryParams) {
        // console.log( "cache Key ", `${route}-${JSON.stringify(queryParams)}`);
        return `${route}-${JSON.stringify(queryParams)}`;
    }

    getCachedData(route, queryParams) {
        const key = this.generateCacheKey(route, queryParams);
        const cachedData = this.getFromCache(key);
        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData);
                // Apply filtering, sorting, and limiting to the parsed data
                let filteredData = parsedData.filter(item => {
                    // Apply filtering based on queryParams
                    // Add your filter logic here
                    return true; // Placeholder for actual filter logic
                });
                // Apply sorting based on queryParams
                // Add your sorting logic here
                // filteredData.sort((a, b) => a.field - b.field); // Example sorting by a field

                // Apply limiting based on queryParams
                // const limit = queryParams.limit || defaultLimit;
                // filteredData = filteredData.slice(0, limit);

                return filteredData;
            } catch (error) {
                console.error(`Error parsing cached data: ${error}`);
                return null;
            }
        }
        else {
            console.log("getCachedData No data in cache for key", key);
        }
        return null;
    }
    cacheData(key, data) {
        // console.log("caching data ", data, "with key ", key);
        this.addToCache(key, data);
    }
    updateRecord(recordId, updatedData) {
        for (const [key, value] of this.cache.entries()) {
            if (value instanceof Array) {
                // Check if the value is an array (cached data from find method)
                const recordIndex = value.findIndex(record => record._id.toString() === recordId.toString());
                if (recordIndex !== -1) {
                    // If updatedData is null, remove the record from the array
                    if (updatedData === null) {
                        value.splice(recordIndex, 1);
                    } else {
                        // Update the record in the array
                        value[recordIndex] = updatedData;
                    }
                    this.updateCache(key, value);
                }
            } else if (value._id && value._id.toString() === recordId.toString()) {
                // Check if the value is a single record (cached data from findById method)
                if (updatedData === null) {
                    // If updatedData is null, remove the record from the cache
                    this.removeFromCache(key);
                } else {
                    // Otherwise, update the record in the cache
                    this.updateCache(key, updatedData);
                }
            }
        }
    }
}

export default Cache;
