import { isThisWeek, isToday, isTomorrow, isWithinInterval, subDays } from "date-fns";

export function FilterType(name, callback) {
    return {
        getName: () => name,
        setName: newName => {
            name = newName;
        },
        callback,
    };
}

export const Filter = (function(){
    let _filterTypes = [
        FilterType('today', todo => isToday(todo.getDate())),
        FilterType('tomorrow', todo => isTomorrow(todo.getDate())),
        FilterType('this week', todo => isThisWeek(todo.getDate())),
        FilterType('upcoming', todo => {
            // Include two days before, and two days after, today
            return isThisWeek(
                todo.getDate(), 
                {weekStartsOn: subDays(Date.now(), 2).getDay()}
            );
        }),
    ];

    const _isFilterTypeValid = filterTypeToTest => {
        // Check if correct instance type
        if (!(filterTypeToTest instanceof FilterType))
            return false;

        // Check if 'name' attribute already exists in array of filter types
        if (_filterTypes.includes(filterType => filterType.getName() === filterTypeToTest.getName()))
            return false;

        // If reach here, filter type is valid
        return true;
    };

    return {
        getAllFilterTypes: () => _filterTypes,
        getFilterTypeByName: filterName => {
            return _filterTypes.find(filterType => filterType.getName() === filterName);
        },
        addFilterType: newFilterType => {
            if (_isFilterTypeValid(FilterType)) {
                _filterTypes.push();
            }
        },
        removeFilterType: filterTypeToRemove => {
            const index = _filterTypes.findIndex(filterTypeToRemove);
            if (index > -1) {
                return _filterTypes.splice(index, 1);
            }
            // Same as Array.splice(), return empty array if no elements removed
            return [];
        },
    };
})();