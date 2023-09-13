import {isFalse} from '../common/utils.js';

export default class SpinBox extends HTMLSpanElement {
    #input = document.createElement('input');
    #stepDown = document.createElement('button');
    #stepUp = document.createElement('button');

    constructor() {
        super();

        this.classList.add('spin-box');
        this.append(this.#input, this.#stepUp, this.#stepDown);
        this.#input.type = 'number';
        this.#stepDown.addEventListener('click', () => this.#input.stepDown());
        this.#stepDown.classList.add('step-down');
        this.#stepUp.addEventListener('click', () => this.#input.stepUp());
        this.#stepUp.classList.add('step-up');
    }

    set disabled(value) {
        value = !!value;
        this.#input.disabled = value;
        this.#stepDown.disabled = value;
        this.#stepUp.disabled = value;
    }

    set max(value) {
        this.#input.max = isFalse(value) ? '' : `${value}`;
    }

    set min(value) {
        this.#input.min = isFalse(value) ? '' : `${value}`;
    }

    set step(value) {
        this.#input.step = isFalse(value) ? '' : `${value}`;
    }

    get value() {
        return this.#input.valueAsNumber;
    }

    set value(value) {
        this.#input.value = value;
    }
}

customElements.define('w-spin-box', SpinBox, {extends: 'span'});