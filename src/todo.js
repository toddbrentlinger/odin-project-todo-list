import { Priority, PriorityLevel } from "./priorityLevel.js";
import { Repeat, RepeatType } from "./repeatType.js";
import { format, formatISO } from "date-fns";

/**
 * Factory function to create single instance of ToDo object.
 * @param {String} title 
 * @param {String} description 
 * @param {Date} dueDate 
 * @param {PriorityLevel} priorityLevel
 * @param {RepeatType} repeatType
 * @returns {Object}
 */
export default function ToDo(title, description, dueDate, priorityLevel = Priority.getPriorityLevelByValue(0), repeatType = Repeat.getRepeatTypeByName('once')) {
    let _isComplete = false;

    return {
        getTitle: () => title,
        setTitle: newTitle => {
            title = newTitle;
        },
        getDescription: () => description,
        setDescription: newDescription => {
            description = newDescription;
        },
        getDueDate: () => dueDate,
        setDueDate: newDueDate => {
            // Check type is Date AND valid
            if (newDueDate instanceof Date && !isNaN(newDueDate)) {
                dueDate = newDueDate;
            }
        },
        getDueDateAsString: () => format(dueDate, "iii MMM d, yyyy"),
        getDueDateDatetimeAttribute: () => formatISO(dueDate),
        getPriorityLevel: () => priorityLevel,
        setPriorityLevel: newPriorityLevel => {
            // Check if Priority 
            if (newPriorityLevel instanceof PriorityLevel) {
                priorityLevel = newPriorityLevel;
            }
        },
        getRepeatType: () => repeatType,
        setRepeatType: newRepeatType => {
            if (newRepeatType instanceof RepeatType) {
                repeatType = newRepeatType;
            }
        },
        getIsComplete: () => _isComplete,
        setIsComplete: bIsComplete => {
            // If parameter NOT boolean, convert it
            if (typeof bIsComplete !== 'boolean') {
                bIsComplete = Boolean(bIsComplete);
            }
            _isComplete = bIsComplete;
        },
        toString: () => {
            return `Title: ${title} - DueDate: ${format(dueDate, "iii MMM d, yyyy")} - PriorityLevel: ${priorityLevel.toString()} - Repeat: ${repeatType.toString()}`;
        },
    };
}