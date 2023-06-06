import {get} from './programs.js';
import Window from './Window.js';

export default class Shortcut extends HTMLDivElement {
    #program;

    constructor(config, data = null) {
        super();

        this.#program = get(config.id || config);
        this.addEventListener('dblclick', () => new Window(this.#program, data));
        this.classList.add('shortcut');
        this.innerHTML = `
            <div class="icon ${config.icon || this.#program.icon || ''}"></div>
            <p>${config.name || this.#program.name}</p>`;

        document.body.append(this);
    }
}

customElements.define('w-shortcut', Shortcut, {extends: 'div'});
