import ToDoProject from "./todoProject.js";

export default function ToDoApp() {
    let _todoProjects = [];

    return {
        addProject: (...newProjects) => {
            // Check if type is ToDoProject
            _todoProjects.push(...newProjects);
        },
        print: () => {
            _todoProjects.forEach(project => {
                console.log(project.print());
            });
        }, 
    };
}