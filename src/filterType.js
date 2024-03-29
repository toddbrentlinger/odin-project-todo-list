import { addDays, endOfWeek, startOfWeek, subDays } from "date-fns";

export function FilterType(name, callback, headerName = 'default') {
    this._name = name;
    this._headerName = headerName;
    this.callback = callback;
}

FilterType.prototype.getName = function() {
    return this._name;
};
FilterType.prototype.setName = function(newName) {
    if (typeof newName === 'string') {
        this._name = newName;
    }
};
FilterType.prototype.getHeaderName = function() {
    return this._headerName;
};
FilterType.prototype.setHeaderName = function(newHeaderName) {
    if (typeof newHeaderName === 'string') {
        this._headerName = newHeaderName;
    }
};

export const Filter = (function(){
    const _createFilterByProjectCallback = projectName => {
        return (todo) => {
            const project = todo.getProject();
            if (!project) return false;
            return project.getName() === projectName;
        };
    };

    const createFilterByProjectType = projectName => {
        return new FilterType(projectName, _createFilterByProjectCallback(projectName), 'project');
    };

    let _filterTypes = [
        new FilterType('today', (todo) => {
            return todo.getRepeatType().checkDate(todo.getDueDate(), new Date());
        }),
        new FilterType('tomorrow', (todo) => {
            return todo.getRepeatType().checkDate(todo.getDueDate(), addDays(new Date(), 1));
        }),
        new FilterType('this week', (todo) => {
            return todo.getRepeatType().checkDate(todo.getDueDate(), startOfWeek(new Date()), endOfWeek(new Date()));
        }),
        new FilterType('upcoming', (todo) => {
            return todo.getRepeatType().checkDate(todo.getDueDate(), subDays(new Date(), 2), addDays(new Date(), 2));
        }),
        createFilterByProjectType('default'),
    ];

    const _isFilterTypeValid = filterTypeToTest => {
        // Check if correct instance type
        // if (!(filterTypeToTest instanceof FilterType))
        //     return false;

        // Check if 'name' attribute already exists in array of filter types
        if (_filterTypes.includes(filterType => filterType.getName() === filterTypeToTest.getName()))
            return false;

        // If reach here, filter type is valid
        return true;
    };

    return {
        createFilterByProjectType,
        getAllFilterTypes: () => _filterTypes,
        getFilterTypeByName: filterName => {
            return _filterTypes.find(filterType => filterType.getName() === filterName);
        },
        addFilterType: newFilterType => {
            if (_isFilterTypeValid(newFilterType)) {
                _filterTypes.push(newFilterType);
            }
        },
        removeFilterType: filterTypeToRemove => {
            const index = _filterTypes.findIndex(filterType => filterType === filterTypeToRemove);
            if (index > -1) {
                return _filterTypes.splice(index, 1);
            }
            // Same as Array.splice(), return empty array if no elements removed
            return [];
        },
    };
})();