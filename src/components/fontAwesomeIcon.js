import { createElement } from "../utilities.js";

export default function FontAwesomeIcon(className = '') {
    return {
        render: () => {
            return createElement('i', {'class': className});
        },
    };
}