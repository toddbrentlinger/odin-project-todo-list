import { createElement } from "./utilities.js";

import './confirmComponent.scss';

/**
 * Factory function to create DOM components that asks a question and calls a specific callback function for 'yes' or 'no'.
 * @param {String} question
 * @param {Function} confirmCallback 
 * @param {Function} cancelCallback
 * @returns 
 */
export default function ConfirmComponent(question = 'Are you sure?', confirmCallback = e => e.preventDefault(), cancelCallback = e => e.preventDefault()) {
    let _element = null;

    const _handleConfirmClick = e => {
        confirmCallback(e);
        _element.remove();
    };

    const _handleCancelClick = e => {
        cancelCallback(e);
        _element.remove();
    };
    
    return {
        render: () => {
            _element = createElement('div', {'class': 'confirm-modal-container'});

            // Confirm Modal
            const confirmModal = _element.appendChild(
                createElement('div', {'class': 'confirm-modal'})
            );

            // Question
            confirmModal.appendChild(
                createElement('div', {'class': 'confirm-modal-question'}, question)
            );

            // Button Container
            const btnContainer = confirmModal.appendChild(
                createElement('div', {'class': 'confirm-modal-btn-container'})
            );

            // Button - Confirm
            btnContainer.appendChild(
                createElement('button', {'class': 'custom-btn'}, 
                    createElement('span', {}, 'Yes')
                )
            ).addEventListener('click', _handleConfirmClick, false);

            // Button - Cancel
            btnContainer.appendChild(
                createElement('button', {'class': 'custom-btn'}, 
                    createElement('span', {}, 'No')
                )
            ).addEventListener('click', _handleCancelClick, false);

            return _element;
        },
    };
}