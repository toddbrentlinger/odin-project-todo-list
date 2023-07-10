import { addDays, getDate, getDay, getMonth, isAfter, isBefore, isSameDay, isValid } from "date-fns";

export function RepeatType(name, checkDateCallback) {
    this._name = name;
    this._checkDateCallback = checkDateCallback;
}

RepeatType.prototype.getName = function() {
    return this._name;
}
RepeatType.prototype.setName = function(newName) {
    if (typeof newName === 'string') {
        this._name = newName;
    }
};
RepeatType.prototype.checkDate = function(dueDate, startDate, endDate) {
    return this._checkDateCallback(dueDate, startDate, endDate);
};
RepeatType.prototype.toString = function() {
    return this._name;
}
RepeatType.prototype.toJSON = function() {
    return this._name;
} 

export const Repeat = (function() {
    const _repeatTypes = [
        // isSameDay(dueDate, startDate)
        new RepeatType('once', (dueDate, startDate, endDate) => {
            // Check if dueDate matches any of startDate-to-endDate range

            // Return false if dates are NOT valid
            if (!isValid(dueDate) || !isValid(startDate) || (endDate !== undefined && !isValid(endDate))) { return false; }
            //if (!isValid(dueDate) || !isValid(startDate) || !isValid(endDate)) { return false; }

            // If endDate is undefined, set to same date as startDate
            if (endDate === undefined) {
                endDate = startDate;
            }

            // While startDate is before OR equal to endDate
            while (!isAfter(startDate, endDate)) {
                // Return true if dueDate is same day as startDate
                if (isSameDay(dueDate, startDate)) {
                    return true;
                }

                // Increment startDate by one day
                startDate = addDays(startDate, 1);
            }

            // If reach here, no matching weekday
            return false;
        }),
        // isBefore(dueDate, startDate)
        new RepeatType('daily', (dueDate, startDate, endDate) => {
            // Return false if dates are NOT valid
            if (!isValid(dueDate) || !isValid(startDate) || (endDate !== undefined && !isValid(endDate))) { return false; }
            //if (!isValid(dueDate) || !isValid(startDate) || !isValid(endDate)) { return false; }

            // If endDate is undefined, set to same date as startDate
            if (endDate === undefined) {
                endDate = startDate;
            }

            return isBefore(dueDate, endDate) || isSameDay(dueDate, endDate);
        }),
        new RepeatType('weekly', (dueDate, startDate, endDate) => {
            // Check if weekday of dueDate matches any of startDate-to-endDate range

            // Return false if dates are NOT valid
            if (!isValid(dueDate) || !isValid(startDate) || (endDate !== undefined && !isValid(endDate))) { return false; }
            //if (!isValid(dueDate) || !isValid(startDate) || !isValid(endDate)) { return false; }

            // If endDate is undefined, set to same date as startDate
            if (endDate === undefined) {
                endDate = startDate;
            }

            // Return false if dueDate is later than endDate
            if (isAfter(dueDate, endDate)) { return false; }

            const dueDateWeekday = getDay(dueDate);

            // While startDate is before OR equal to endDate
            while (!isAfter(startDate, endDate)) {
                // Return true if weekday is same
                if (dueDateWeekday === getDay(startDate)) {
                    return true;
                }

                // Increment startDate by one day
                startDate = addDays(startDate, 1);
            }

            // If reach here, no matching weekday
            return false;
        }),
        new RepeatType('monthly', (dueDate, startDate, endDate) => {
            // Check if day of month of dueDate matches any of startDate-to-endDate range

            // Return false if dates are NOT valid
            if (!isValid(dueDate) || !isValid(startDate) || (endDate !== undefined && !isValid(endDate))) { return false; }
            //if (!isValid(dueDate) || !isValid(startDate) || !isValid(endDate)) { return false; }

            // If endDate is undefined, set to same date as startDate
            if (endDate === undefined) {
                endDate = startDate;
            }

            // Return false if dueDate is later than endDate
            if (isAfter(dueDate, endDate)) { return false; }

            const dueDateMonthDay = getDate(dueDate);
            
            // While startDate is before OR equal to endDate
            while (!isAfter(startDate, endDate)) {
                // Return true if day of the month is same
                if (dueDateMonthDay === getDate(startDate)) {
                    return true;
                }

                // Increment startDate by one day
                startDate = addDays(startDate, 1);
            }

            // If reach here, no matching weekday
            return false;
        }),
        new RepeatType('yearly', (dueDate, startDate, endDate) => {
            // Check if month AND day of month of dueDate matches any of startDate-to-endDate range

            // Return false if dates are NOT valid
            if (!isValid(dueDate) || !isValid(startDate) || (endDate !== undefined && !isValid(endDate))) { return false; }
            //if (!isValid(dueDate) || !isValid(startDate) || !isValid(endDate)) { return false; }

            // If endDate is undefined, set to same date as startDate
            if (endDate === undefined) {
                endDate = startDate;
            }

            const dueDateData = [
                getMonth(dueDate), // month
                getDate(dueDate), // day of month
            ];
            const dueDateMonth = getMonth(dueDate);
            const dueDateMonthDay = getDate(dueDate);

            // While startDate is before OR equal to endDate
            while (!isAfter(startDate, endDate)) {
                // Return true if month and day of the month is same
                if ((dueDateMonth === getMonth(startDate)) && (dueDateMonthDay === getDate(startDate))) {
                    return true;
                }

                // Increment startDate by one day
                startDate = addDays(startDate, 1);
            }

            // If reach here, no matching weekday
            return false;
        }),
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