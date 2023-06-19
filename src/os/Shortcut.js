import {getFolder} from './folders.js';
import {getConfig, open} from './programs.js';

export default class Shortcut extends HTMLDivElement {
    constructor(config, data) {
        super();

        this.addEventListener('dblclick', config.open || (() => open(config.id, data)));
        this.classList.add('shortcut');
        this.innerHTML = `
            <div class="icon ${config.icon || ''}"></div>
            <p>${config.name}</p>`;
        this.tabIndex = 1;
    }
}

export function shortcutById(id, data) {
    return new Shortcut(getConfig(id), data);
}

export function shortcutByPath(path) {
    const {data, ...config} = getFolder(path);

    return new Shortcut({...getConfig(config.id), ...config}, data);
}

customElements.define('w-shortcut', Shortcut, {extends: 'div'});
