import buildList from '../common/buildList.js';
import query from '../common/query.js';
import TaskbarButton from './TaskbarButton.js';

export const NAME_CHANGE = 'window-name-change';
const dragImg = Object.assign(new Image(0, 0), {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='});

export default class Window extends HTMLDialogElement {
    #config;
    #icon;
    #name;
    #taskbarButton;

    constructor(config, data) {
        super();

        this.#config = config;
        this.#icon = config.icon;
        this.#name = config.name;
        this.#taskbarButton = new TaskbarButton(this);
        this.classList.add(config.id);
        this.innerHTML = `
            <header>
                <span class="icon small ${config.icon}"></span>
                <label draggable="true">${config.name}</label>
                <button class="minimize"></button>
                <button class="maximize"></button>
                <button class="close"></button>
            </header>
            <menu></menu>
            <main>${config.template}</main>`;

        const elements = query(this, {
            close: '.close',
            label: 'label',
            maximize: '.maximize',
            minimize: '.minimize'
        });

        elements.close.addEventListener('click', this.close.bind(this));
        elements.label.addEventListener('dblclick', this.maximize.bind(this));
        elements.label.addEventListener('drag', event => this.setPosition(event.x, event.y));
        elements.label.addEventListener('dragend', event => this.setPosition(event.x, event.y));
        elements.label.addEventListener('dragstart', dragStart);
        elements.maximize.addEventListener('click', this.maximize.bind(this));

        this.initMenu();
        this.setPosition();
        config.run(this, data);
        this.open = true;
        document.body.append(this);
    }

    close(returnValue) {
        this.remove();
    }

    initMenu() {
        this.querySelector('menu').innerHTML = buildList(this.#config.menu, buildMenuitem);
    }

    maximize() {
        this.classList.toggle('full', !this.classList.contains('full'));
    }

    setPosition(x = 0, y = 0) {
        Object.assign(this.style, {top: `${y}px`, left: `${x}px`});
    }

    get icon() {
        return this.#icon;
    }

    get name() {
        return this.#name;
    }

    set name(detail) {
        this.#name = detail;
        this.querySelector('header label').innerHTML = detail;
        this.dispatchEvent(new CustomEvent(NAME_CHANGE, {detail}));
    }
}

function buildMenuitem(menuitem) {
    const label = menuitem.name.replace(new RegExp(menuitem.key), `<u>${menuitem.key}</u>`);

    return `<li>${label}</li>`;
}

function dragStart(event) {
    event.dataTransfer.setDragImage(dragImg, 0, 0);
}

customElements.define('w-window', Window, {extends: 'dialog'});
