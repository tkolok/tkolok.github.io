import {getConfig, open} from './programs.js';

export default class Shortcut extends HTMLDivElement {
    constructor(config, data) {
        super();
        const programConfig = getConfig(config.id);

        this.addEventListener('dblclick', config.open || (() => open(config.id, data)));
        this.classList.add('shortcut');
        this.innerHTML = `
            <div class="icon ${config.icon || programConfig.icon || ''}"></div>
            <p>${config.name || programConfig.name}</p>`;
        this.tabIndex = 1;

        document.body.append(this);
    }
}

customElements.define('w-shortcut', Shortcut, {extends: 'div'});
