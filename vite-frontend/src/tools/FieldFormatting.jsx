export function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatInputDate(dateString) {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day).toISOString().split('T')[0];
}
export function renderField(fieldName, fieldType, fieldValue, handleChange) {
    if (fieldType === 'String') {
        return (
            <input
                type='text'
                id={fieldName}
                name={fieldName}
                value={fieldValue || ''}
                onChange={handleChange}
                className="border border-black px-2 py-1 w-4/5"
            />
        );
    } else if (fieldType === 'Number') {
        return (
            <input
                type='number'
                id={fieldName}
                name={fieldName}
                value={fieldValue || ''}
                onChange={handleChange}
                className="border border-black px-2 py-1 w-4/5"
            />
        );
    } else if (fieldType === 'Boolean') {
        return (
            <input
                type='checkbox'
                id={fieldName}
                name={fieldName}
                checked={fieldValue || false}
                onChange={handleChange}
                className="border border-black px-2 py-1 w-4/5"
            />
        );
    } else if (fieldType === 'Date') {
        return (
            <input
            type='date'
            id={fieldName}
            name={fieldName}
            value={formatDateForInput(fieldValue ? formatDateForInput(fieldValue) : formatDateForInput(new Date()))}
            onChange={(e) => {
                const formattedDate = formatInputDate(e.target.value);
                handleChange({ target: { name: fieldName, value: formattedDate }});
            }}
            className="border border-black px-2 py-1 w-4/5"
            />
        );
    } else if (Array.isArray(fieldValue)) {
        return (
            <input
                type='text'
                id={fieldName}
                name={fieldName}
                value={fieldValue.join(',')}
                onChange={handleChange}
                className="border border-black px-2 py-1 w-4/5"
            />
        );
    } else {
        // If fieldType is not recognized, display and edit it as text
        return (
            <input
                type='text'
                id={fieldName}
                name={fieldName}
                value={fieldValue || ''}
                onChange={handleChange}
                className="border border-black px-2 py-1 w-4/5"
            />
        );
    }
};    