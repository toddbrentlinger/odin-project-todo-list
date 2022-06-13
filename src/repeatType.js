export function RepeatType(name) {
    this._name = name;
}

RepeatType.prototype.getName = function() {
    return this._name;
}
RepeatType.prototype.setName = function(newName) {
    if (typeof newName === 'string') {
        this._name = newName;
    }
};
RepeatType.prototype.toString = function() {
    return this._name;
}
RepeatType.prototype.toJSON = function() {
    return this._name;
} 

export const Repeat = (function() {
    const _repeatTypes = [
        new RepeatType('once'),
        new RepeatType('daily'),
        new RepeatType('weekly'),
        new RepeatType('monthly'),
        new RepeatType('yearly'),
    ];

    return {
        addRepeatType: newRepeatType => {
            if (newRepeatType instanceof RepeatType) {
                _repeatTypes.push(newRepeatType);
                return newRepeatType;
            }
            // Throw error about wrong object type
        },
        getRepeatTypeByName: name => {
            return _repeatTypes.find(repeatType => repeatType.getName() === name);
        },
        getAllRepeatTypes: () => _repeatTypes,
    };
})();