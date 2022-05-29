export function RepeatType(name) {
    return {
        getName: () => name,
        setName: newName => {
            name = newName;
        },
        toString: () => name,
    };
}

export const Repeat = (function() {
    const _repeatTypes = [
        RepeatType('once'),
        RepeatType('daily'),
        RepeatType('weekly'),
        RepeatType('monthly'),
        RepeatType('yearly'),
    ];

    return {
        addRepeatType: newRepeatType => {
            if (newRepeatType instanceof RepeatType) {
                _repeatTypes.push(newRepeatType);
            }
        },
        getRepeatTypeByName: name => {
            return _repeatTypes.find(repeatType => repeatType.getName() === name);
        },
        getAllRepeatTypes: () => _repeatTypes,
    };
})();