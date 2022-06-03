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
    let _activeNavLinkKey = 'filter-today';
    let _sideNavElement = null;

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

            linkElement.dataset.key = `filter-${filterType.getName()}`;

            linkElement.addEventListener('click', e => {
                e.preventDefault();
                _removeActiveClassFromNavLinks();
                e.currentTarget.classList.add('active');
                _activeNavLinkKey = e.currentTarget.dataset.key;
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

            linkElement.dataset.key = `project-${project.getName()}`;

            linkElement.addEventListener('click', e => {
                e.preventDefault();
                _removeActiveClassFromNavLinks();
                e.currentTarget.classList.add('active');
                _activeNavLinkKey = e.currentTarget.dataset.key;
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
            _sideNavElement = createElement('nav', {id: 'sidenav'});

            // Filter Types
            _sideNavElement.appendChild(
                createElement('div', {id: 'filter-type-container'}, 
                    _createFilterTypeList()
                )
            );

            _sideNavElement.appendChild(document.createElement('hr'));

            // Projects
            _sideNavElement.appendChild(
                createElement('div', {id: 'projects-container'},
                    createElement('h3', {}, 'Projects'),
                    _createProjectsList()
                )
            );

            // Add class to active nav link
            const activeNavLink = _sideNavElement.querySelector(`[data-key=${_activeNavLinkKey}`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }

            return _sideNavElement;
        },
    };
}