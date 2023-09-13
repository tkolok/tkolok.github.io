import createElement, {append, classList, eventListener, innerHTML} from '../common/element-builder.js';

export class Dropdown extends HTMLDivElement {
    #button = createElement('button', classList('dropdown-toggle'));
    #optionMap = new Map();
    #value;

    constructor(config = {}) {
        super();

        createElement(this,
            classList('dropdown'),
            append(
                this.#button,
                createElement('ul',
                    classList('dropdown-list'),
                    append(...config.options.map(this.#buildOption.bind(this)))
                )
            )
        );
        this.value = config.active || config.options[0].value;
    }

    set disabled(value) {
        this.#button.disabled = !!value;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        if (this.#optionMap.has(value)) {
            this.#optionMap.get(this.#value)?.element.classList.remove('active');
            this.#value = value;
            this.#optionMap.get(value).element.classList.add('active');
            this.#button.innerHTML = this.#optionMap.get(value).label;
        }
    }

    #buildOption(option) {
        return createElement('li',
            innerHTML(option.label ?? option.value),
            eventListener('click', () => this.value = option.value),
            element => this.#optionMap.set(option.value, {element, label: option.label || option.value})
        );
    }
}

customElements.define('w-dropdown', Dropdown, {extends: 'div'});