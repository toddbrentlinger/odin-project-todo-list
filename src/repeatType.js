export function RepeatType(name) {
    return {
        getName: () => name,
        setName: newName => {
            name = newName;
        },
    };
}

export const Repeat = (function() {
    const _repeatTypes = [
        RepeatType('once'),
        RepeatType('weekly'),
        RepeatType('monthly'),
        RepeatType('yearly'),
    ];

    return {
        
    };
})();