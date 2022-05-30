import HeaderComponent from "./headerComponent.js";
import SideNavComponent from "./sideNavComponent.js";
import FooterComponent from "./footerComponent.js";

import ToDoProjectComponent from "./todoProjectComponent.js";
import FilterTypeComponent from "./filterTypeComponent.js";

import { ToDoApp } from "./todoApp.js";
import { createElement } from "./utilities.js";

export default function ToDoAppComponent() {
    return {
        render: () => {
            const content = createElement('div', {id: 'content'});

            // Header
            content.appendChild(HeaderComponent().render());

            // Sidenav
            content.appendChild(SideNavComponent().render());

            // Main
            // content.appendChild(
            //     ToDoProjectComponent(ToDoApp.getProjectByName('default')).render()
            // );
            content.appendChild(FilterTypeComponent().render());

            // Footer
            content.appendChild(FooterComponent(2022).render());

            return content;
        },   
    };
}