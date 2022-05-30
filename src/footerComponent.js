import { createElement } from "./utilities.js";

export default function FooterComponent(copyrightYear) {
    return {
        render: () => {
            const footerElement = document.createElement('footer');
            const currYear = new Date().getFullYear();

            footerElement.appendChild(
                createElement('p', {}, 
                    createElement('small', {},
                        'Source Code © ',
                        createElement('time', {id:'copyright-year'}, currYear > copyrightYear ? `${copyrightYear}-${currYear}` : copyrightYear),
                        ' Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.'
                    )
                )
            );

            return footerElement;
        },
    };
}