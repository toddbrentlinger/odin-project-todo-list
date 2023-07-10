import { Priority, PriorityLevel } from "./priorityLevel.js";
import { Repeat, RepeatType } from "./repeatType.js";
import { format, formatISO } from "date-fns";
import { ToDoProjectItem, ToDoProjectNew } from "./todoProject.js";
import ToDoLocalStorage from "./todoLocalStorage.js";
import {v4 as uuidv4} from 'uuid';

export function ToDoItem(title, description, dueDate, priorityLevel = Priority.getPriorityLevelByValue(0), repeatType = Repeat.getRepeatTypeByName('once'), project = ToDoProjectNew.getProjectByName('default'), id = uuidv4()) {
    this._isComplete = false;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priorityLevel = priorityLevel;
    this._repeatType = repeatType;
    this._project = project;
    this._id = id;

    // Save ToDo instance to localStorage
    ToDoLocalStorage.saveToDo(this);
}

ToDoItem.prototype.getId = function() {
    return this._id;
};
ToDoItem.prototype.getTitle = function() {
    return this._title;
};
ToDoItem.prototype.setTitle = function(newTitle) {
    this._title = newTitle;
};
ToDoItem.prototype.getDescription = function() {
    return this._description;
};
ToDoItem.prototype.setDescription = function(newDescription) {
    this._description = newDescription;
};
ToDoItem.prototype.getDueDate = function() {
    return this._dueDate;
};
ToDoItem.prototype.setDueDate = function(newDueDate) {
    // Check type is Date AND valid
    if (newDueDate instanceof Date && !isNaN(newDueDate)) {
        this._dueDate = newDueDate;
    }
};
ToDoItem.prototype.getDueDateAsString = function() {
    return format(this._dueDate, "iii MMM d, yyyy h:mm a");
};
ToDoItem.prototype.getDueDateDatetimeAttribute = function() {
    return formatISO(this._dueDate);
};
ToDoItem.prototype.getPriorityLevel = function() {
    return this._priorityLevel;
};
ToDoItem.prototype.setPriorityLevel = function(newPriorityLevel) {
    // Check if Priority 
    if (newPriorityLevel instanceof PriorityLevel) {
        this._priorityLevel = newPriorityLevel;
    }
};
ToDoItem.prototype.getRepeatType = function() {
    return this._repeatType;
};
ToDoItem.prototype.setRepeatType = function(newRepeatType) {
    if (newRepeatType instanceof RepeatType) {
        this._repeatType = newRepeatType;
    }
};
ToDoItem.prototype.getProject = function() {
    return this._project;
};
ToDoItem.prototype.setProject = function(newProject) {
    if (newProject instanceof ToDoProjectItem) {
        this._project = newProject;
    }
};
ToDoItem.prototype.getIsComplete = function() {
    return this._isComplete;
};
ToDoItem.prototype.setIsComplete = function(bIsComplete) {
    // If parameter NOT boolean, convert it
    if (typeof bIsComplete !== 'boolean') {
        bIsComplete = Boolean(bIsComplete);
    }
    this._isComplete = bIsComplete;
};
ToDoItem.prototype.toString = function() {
    return `Title: ${this._title} - DueDate: ${format(this._dueDate, "iii MMM d, yyyy")} - PriorityLevel: ${this._priorityLevel.toString()} - Repeat: ${this._repeatType.toString()}`;
};
ToDoItem.prototype.toJSON = function() {
    return {
        id: this._id,
        title: this._title,
        description: this._description,
        dueDate: this._dueDate.toJSON(),
        priority: this._priorityLevel.toJSON(),
        repeat: this._repeatType.toJSON(),
        project: this._project.getName(),
    };
};

/**
 * Factory function to create single instance of ToDo object.
 * @param {String} title 
 * @param {String} description 
 * @param {Date} dueDate
 * @param {PriorityLevel} priorityLevel
 * @param {RepeatType} repeatType
 * @param {ToDoProjectItem} project
 * @returns {Object}
 */
export function ToDo(title, description, dueDate, priorityLevel = Priority.getPriorityLevelByValue(0), repeatType = Repeat.getRepeatTypeByName('once'), project = ToDoProjectNew.getProjectByName('default'), id = uuidv4()) {
    const todoItem = new ToDoItem(title, description, dueDate, priorityLevel, repeatType, project, id);

    // Save ToDo instance to localStorage
    ToDoLocalStorage.saveToDo(todoItem);

    return todoItem;
}

export default ToDo