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

    const _createFilterTypeListElement = filterTypeArr => {
        const filterTypeListElement = document.createElement('ul');

        filterTypeArr.forEach(filterType => {
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

    return {
        render: () => {
            _sideNavElement = createElement('nav', {id: 'sidenav'});

            // Sort FilterTypes into groups with same filter group name
            // Key is filter group name and value is array of corresponding FilterTypes
            const filterTypeObj = {};
            let headerName;
            Filter.getAllFilterTypes().forEach(filterType => {
                headerName = filterType.getHeaderName();
                if (filterTypeObj.hasOwnProperty(headerName)) {
                    filterTypeObj[headerName].push(filterType);
                } else {
                    filterTypeObj[headerName] = [ filterType ];
                }
            });
            
            // Default options (ex. Today, Tomorrow, etc.)
            _sideNavElement.appendChild(
                _createFilterTypeListElement(filterTypeObj['default'])
            );
            
            // Other options (Project, etc.)
            for (const [headerName, filterTypeArr] of Object.entries(filterTypeObj)) {
                if (headerName === 'default')
                    continue;
                _sideNavElement.append(
                    document.createElement('hr'),
                    createElement('h3', {}, headerName),
                    _createFilterTypeListElement(filterTypeArr)
                );
            };

            // Add class to active nav link
            const activeNavLink = _sideNavElement.querySelector(`[data-key=${_activeNavLinkKey}`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }

            return _sideNavElement;
        },
    };
}