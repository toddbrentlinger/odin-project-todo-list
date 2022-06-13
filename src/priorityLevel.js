export function PriorityLevel(value, color) {
    this._value = value;
    this._color = color;
}

PriorityLevel.prototype.getValue = function() {
    return this._value;
};
PriorityLevel.prototype.setValue = function(newVal) {
    this._value = newVal;
};
PriorityLevel.prototype.getColor = function() {
    return this._color;
};
PriorityLevel.prototype.setColor = function(newColor) {
    // Check if correct type
    this._color = newColor;
};
PriorityLevel.prototype.toString = function() {
    return `Value: ${this._value} - Color: ${this._color}`;
};
PriorityLevel.prototype.toJSON = function() {
    return {
        value: this._value,
        color: this._color,
    };
};

/** Module to handle different priority levels. */
export const Priority = (function() {
    const _priorityLevelArr = [
        new PriorityLevel(0, 'white'),
        new PriorityLevel(1, 'yellow'),
        new PriorityLevel(2, 'orange'),
        new PriorityLevel(3, 'red')
    ];

    return {
        getAllPriorityLevels: () => _priorityLevelArr,
        addPriorityLevel: newPriorityLevel => {
            // Check newPriorityLevel type 
            if (!(newPriorityLevel instanceof PriorityLevel)) {
                return;
            }

            // Check if newPriorityLevel value has duplicate value OR color
            _priorityLevelArr.forEach(priorityLevel => {
                // Value
                if (priorityLevel.getValue() === newPriorityLevel.getValue()) {
                    // Throw error about duplicate value
                    return;
                }
                // Color
                if (priorityLevel.getColor() === newPriorityLevel.getColor()) {
                    // Throw error about duplicate color
                    return;
                }
            });
            _priorityLevelArr.push(newPriorityLevel);
            return newPriorityLevel;
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