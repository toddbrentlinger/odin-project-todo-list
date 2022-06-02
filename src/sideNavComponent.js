import { Filter } from "./filterType.js";
import { ToDoApp } from "./todoApp.js";
import { createElement } from "./utilities.js";

import './sideNavComponent.scss';
import FilterTypeComponent from "./filterTypeComponent.js";
import ToDoProjectComponent from "./todoProjectComponent.js";

/**
 * 
 * @param {Object} props 
 * @returns {Object}
 */
export default function SideNavComponent(props) {
    const _removeActiveClassFromNavLinks = () => {
        document.querySelectorAll('#sidenav a')
            .forEach(navLink => navLink.classList.remove('active'));
    };

    const _createFilterTypeList = () => {
        const filterTypeListElement = createElement('ul', {id: 'filter-type'});

        Filter.getAllFilterTypes().forEach(filterType => {
            const linkElement = createElement('a', {href: ''}, 
                createElement('span', {}, filterType.getName())
            );

            // Add active class to default selected nav link 'Today'
            if (filterType.getName() === 'today') {
                linkElement.classList.add('active');
            }

            linkElement.addEventListener('click', e => {
                e.preventDefault();
                _removeActiveClassFromNavLinks();
                e.currentTarget.classList.add('active');
                props.handleSideNavLinkClick(FilterTypeComponent(filterType));
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
                _removeActiveClassFromNavLinks();
                e.currentTarget.classList.add('active');
                props.handleSideNavLinkClick(ToDoProjectComponent(project));
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