export function PriorityLevel(value, color) {
    return {
        getValue: () => value,
        setValue: newVal => {
            value = newVal;
        },
        getColor: () => color,
        setColor: newColor => {
            // Check if correct type
            color = newColor;
        },
        toString: () => `Value: ${value} - Color: ${color}`,
    };
}

/** Module to handle different priority levels. */
export const Priority = (function() {
    const _priorityLevelArr = [
        PriorityLevel(0, 'white'),
        PriorityLevel(1, 'yellow'),
        PriorityLevel(2, 'orange'),
        PriorityLevel(3, 'red')
    ];

    return {
        addPriorityLevel: newPriorityLevel => {
            // Check newPriorityLevel type 
            // Check if newPriorityLevel value has duplicate value OR color
            _priorityLevelArr.forEach(priorityLevel => {
                // Value
                if (priorityLevel.getValue() === newPriorityLevel.getValue()) {
                    // Throw error about duplicate value
                }
                // Color
                if (priorityLevel.getColor() === newPriorityLevel.getColor()) {
                    // Throw error about duplicate color
                }
            });
            _priorityLevelArr.push(newPriorityLevel);
        },
        removePriorityLevel: priorityLevelToRemove => {
            const index = _priorityLevelArr.findIndex(priorityLevel => priorityLevel === priorityLevelToRemove);
            if (index > -1) {
                return _priorityLevelArr.splice(index, 1);
            }
            // Similar to splice, return empty array if item was NOT found (index === -1)
            return [];
        },
        getPriorityLevelByValue: val => _priorityLevelArr.find(priorityLevel => priorityLevel.getValue() === val),
    };
})();