import React from 'react'

const CleanupRecords = ( {records, parentField, childrenField, collectionSchema} ) => {


    console.log( "records", records, "parentField", parentField, "childrenField", childrenField, "collection", collectionSchema);
    const FindOrphans = async (records, parentField, childrenField, collectionSchema) => {
        try {
            const orphans = [];
            console.log( "records", records, "parentField", parentField, "childrenField", childrenField, "collection", collectionSchema);
            if( !records || (records.length === 0) || !parentField || !collectionSchema)
                return null;

            // Iterate over each record
            for (const record of records) {
                // Check if the parent field exists in the record
                if (!record.hasOwnProperty(parentField) || record[parentField] === null || record[parentField] === '') {
                    // If the parent field is absent or empty, add the record to the orphans array
                    orphans.push(record);
                }
            }
    
            return orphans;
        } catch (error) {
            // Handle any errors
            console.error("Error finding orphans:", error);
            throw error;
        }
    };
    const FindChildless = async() =>
    {

    }
    const RepairParentField = async( record, parentField, parent, collectionSchema) => 
    {

    }
    const RepairChildrenField = async() => 
    {
        
    }
    console.log( "Orphans", FindOrphans( records, parentField, childrenField, collectionSchema));
  return (
    <div>CleanupRecords</div>
  )
}

export default CleanupRecords