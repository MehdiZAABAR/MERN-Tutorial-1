export function CopyObjectWithSchemaFields(schema, object) {
    const newCopy = {};
    Object.keys(schema.paths).forEach(field => {
        if (!field.startsWith('_'))
            newCopy[field] = object[field];
    });
    return newCopy;
}