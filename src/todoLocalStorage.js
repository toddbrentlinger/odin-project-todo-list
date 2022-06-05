/** Module to save ToDo objects to localStorage. */
const ToDoLocalStorage = (function(){
    return {
        /**
         * Copied from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
         * @returns {Boolean}
         */
        isStorageAvailable: () => {
            var storage;
            try {
                storage = window['localStorage'];
                var x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch(e) {
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        },
        /**
         * Save ToDo instance to localStorage.
         * @param {ToDo} todo 
         */
        saveToDo: todo => {
            try {
                localStorage.setItem(todo.getId(), JSON.stringify(todo));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('Local storage quota exceeded!');
                }
            }
        },
        /**
         * Remove ToDo instance from localStorage.
         * @param {ToDo} todo 
         */
        removeToDo: todo => {
            localStorage.removeItem(todo.getId())
        },
        getAllToDosAsJSON: () => {
            return Object.entries(localStorage).map(entry => {
                const id = entry[0];
                const parsedJSON = JSON.parse(entry[1]);
                return parsedJSON;
            });
        },
        getToDoByIdAsJSON: todoId => {
            const todoEntry = localStorage.getItem(todoId);
            if (todoEntry) {
                return JSON.parse(todoEntry);
            }
        },
        clearStorage: () => {
            localStorage.clear();
        },
    };
})();

export default ToDoLocalStorage;