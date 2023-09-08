import {combinedTemplate} from '../common/template-utils.js';

export default class Tab extends HTMLDivElement {
    #content = document.createElement('div');
    #tabs = new Map();

    constructor(tabs) {
        super();

        this.append(...combinedTemplate`
            <ul>
                ${tabs.map(this.#buildTab.bind(this))}
            </ul>
            ${this.#content}`);
        this.classList.add('tab-component');
        this.#content.classList.add('tab-content');
        this.#open(this.querySelector('li:first-child'));
    }

    #buildTab(config) {
        const li = document.createElement('li');

        li.addEventListener('click', () => this.#open(li));
        li.innerHTML = config.label;
        this.#tabs.set(li, config.content);

        return li;
    }

    #open(tab) {
        for (const current of this.#tabs.keys()) {
            current.classList.remove('active');
        }

        tab.classList.add('active');
        this.#content.replaceChildren(...this.#tabs.get(tab));
    }
}

customElements.define('w-tab', Tab, {extends: 'div'});
