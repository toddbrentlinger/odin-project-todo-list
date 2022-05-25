/**
 * Factory function to create single instance of ToDoProject
 * @param  {...ToDo} todos 
 * @returns {Object}
 */
export default function ToDoProject(name, ...todos) {
    const _todos = todos || [];
    
    return {
        addToDo: newToDo => {
            _todos.push(newToDo);
        },
        removeToDo: toDoToRemove => {
            const toDoIndex = _todos.findIndex(toDoToRemove);
            if (toDoIndex > -1) {
                return _todos.splice(toDoIndex, 1);
            }
            // Like array splice() method, return empty array if ToDo is not found
            return [];
        },
        print: () => {
            _todos.forEach(todo => {
                console.log(todo.print());
            });
        },
    };
}