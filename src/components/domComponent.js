export default function DOMComponent(props) {
    this._element = null;
}

DOMComponent.prototype.render = function() {
    if (this._element) {
        this._element.replaceWith(document.createElement('div'));
    } else {
        this._element = document.createElement('div');
    }

    return this._element;
};

DOMComponent.prototype.refresh = function() {
    const prevElement = this._element;
    if (!prevElement) {
        console.error('Component element is null!');
        return;
    }
    this.render();
    prevElement.replaceWith(this._element);
};