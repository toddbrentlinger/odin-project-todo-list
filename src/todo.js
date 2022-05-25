import Priority from "./priority.js";

/**
 * Factory function to create single instance of ToDo object.
 * @param {String} title 
 * @param {String} description 
 * @param {Datetime} dueDateTime 
 * @param {Priority} priority 
 * @returns {Object}
 */
export default function ToDo(title, description, dueDateTime, priority) {
    return {
        getTitle: () => title,
        setTitle: newTitle => {
            title = newTitle;
        },
        getDescription: () => description,
        setDescription: newDescription => {
            description = newDescription;
        },
        getDueDate: () => dueDateTime,
        setDueDate: newDueDateTime => {
            // Check if Datetime type
            dueDateTime = newDueDateTime;
        },
        getPriority: () => priority,
        setPriority: newPriority => {
            // Check if Priority type
            priority = newPriority;
        },
        print: () => {
            console.log(`Title: ${title} - DueDateTime: ${dueDateTime} - Priority: ${priority}`);
        },
    };
}