import {NAME_CHANGE} from './Window.js';

const taskbarButtons = document.body.querySelector('#taskbarButtons');

export default class TaskbarButton extends HTMLDivElement {
    #window;

    constructor(window) {
        super();

        this.#window = window;
        this.addEventListener('click', () => console.log(window));
        this.innerHTML = `
            <span class="icon small ${window.icon}"></span>
            <span class="name"></span>`;
        window.addEventListener(NAME_CHANGE, this.#updateName.bind(this));
        this.#updateName();

        taskbarButtons.append(this);
    }

    #updateName() {
        this.querySelector('.name').innerHTML = this.#window.name;
    }
}

customElements.define('w-taskbar-button', TaskbarButton, {extends: 'div'});
