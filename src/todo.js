import { Priority, PriorityLevel } from "./priorityLevel.js";

/**
 * Factory function to create single instance of ToDo object.
 * @param {String} title 
 * @param {String} description 
 * @param {Date} dueDate 
 * @param {PriorityLevel} priorityLevel
 * @returns {Object}
 */
export default function ToDo(title, description, dueDate, priorityLevel = Priority.getPriorityLevelByValue(0)) {
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
            // Check if Date type
            dueDate = newDueDate;
        },
        getPriorityLevel: () => priorityLevel,
        setPriorityLevel: newPriorityLevel => {
            // Check if Priority type
            priorityLevel = newPriorityLevel;
        },
        toString: () => {
            return `Title: ${title} - DueDate: ${dueDate} - PriorityLevel: ${priorityLevel.toString()}`;
        },
    };
}