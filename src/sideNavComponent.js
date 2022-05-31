import { Filter } from "./filterType.js";
import { ToDoApp } from "./todoApp.js";
import { createElement } from "./utilities.js";

import './sideNavComponent.scss';
import FilterTypeComponent from "./filterTypeComponent.js";
import ToDoProjectComponent from "./todoProjectComponent.js";

export default function SideNavComponent() {
    const _createFilterTypeList = () => {
        const filterTypeListElement = createElement('ul', {id: 'filter-type'});

        Filter.getAllFilterTypes().forEach(filterType => {
            const linkElement = createElement('a', {href: ''}, 
                createElement('span', {}, filterType.getName())
            );

            linkElement.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector('main').replaceWith(FilterTypeComponent(filterType).render());
            }, false);

            filterTypeListElement.appendChild(
                createElement('li', {}, linkElement)
            );
        });

        return filterTypeListElement;
    };

    const _createProjectsList = () => {
        const projectsListElement = createElement('ul', {id: 'projects'});

        ToDoApp.getAllProjects().forEach(project => {
            const linkElement = createElement('a', {href: ''}, 
                createElement('span', {}, project.getName())
            );

            linkElement.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector('main').replaceWith(ToDoProjectComponent(project).render());
            }, false);

            projectsListElement.appendChild(
                createElement('li', {}, linkElement)
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