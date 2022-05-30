import { Filter } from "./filterType.js";
import { ToDoApp } from "./todoApp.js";
import { createElement } from "./utilities.js";

import './sideNavComponent.scss';

export default function SideNavComponent() {
    const _createFilterTypeList = () => {
        const filterTypeListElement = createElement('ul', {id: 'filter-type'});

        Filter.getAllFilterTypes().forEach(filterType => {
            filterTypeListElement.appendChild(
                createElement('li', {}, 
                    createElement('a', {href: ''}, filterType.getName())
                )
            );
        });

        return filterTypeListElement;
    };

    const _createProjectsList = () => {
        const projectsListElement = createElement('ul', {id: 'projects'});

        ToDoApp.getAllProjects().forEach(project => {
            projectsListElement.appendChild(
                createElement('li', {}, 
                    createElement('a', {href: ''}, project.getName())
                )
            );
        });

        return projectsListElement;
    };

    return {
        render: () => {
            const sideNavComponent = createElement('nav', {id: 'sidenav'});

            // Filter Types
            sideNavComponent.appendChild(
                createElement('div', {id: 'filter-type-container'}, 
                    _createFilterTypeList()
                )
            );

            sideNavComponent.appendChild(document.createElement('hr'));

            // Projects
            sideNavComponent.appendChild(
                createElement('div', {id: 'projects-container'},
                    createElement('h3', {}, 'Projects'),
                    _createProjectsList()
                )
            );

            return sideNavComponent;
        },
    };
}