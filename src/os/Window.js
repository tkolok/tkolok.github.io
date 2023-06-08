import buildList from '../common/buildList.js';
import query from '../common/query.js';
import TaskbarButton from './TaskbarButton.js';

const dragImg = Object.assign(new Image(0, 0), {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='});
const windows = [];

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
        this.addEventListener('focus', () => this.active = true);
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
        elements.minimize.addEventListener('click', this.minimize.bind(this));
        elements.maximize.addEventListener('click', this.maximize.bind(this));

        this.initMenu();
        this.setPosition();
        config.run(this, data);
        this.active = true;
        document.body.append(this);
    }

    close(returnValue) {
        this.remove();
        this.#taskbarButton.remove();
    }

    initMenu() {
        this.querySelector('menu').innerHTML = buildList(this.#config.menu, buildMenuitem);
    }

    maximize() {
        this.classList.toggle('full', !this.classList.contains('full'));
    }

    minimize() {
        super.close();
    }

    setPosition(x = 0, y = 0) {
        Object.assign(this.style, {top: `${y}px`, left: `${x}px`});
    }

    set active(value) {
        this.classList.toggle('active', value);
        this.#taskbarButton.classList.toggle('active', value);

        if (value) {
            const index = windows.indexOf(this);

            if (index > -1) {
                windows.splice(index, 1);
            }
            windows.forEach(window => window.active = false);
            windows.push(this);
            this.show();
        }

        this.style.zIndex = `${10 + windows.indexOf(this)}`;
    }

    get icon() {
        return this.#icon;
    }

    get windowName() {
        return this.#name;
    }

    set windowName(value) {
        this.#name = value;
        this.querySelector('header label').innerHTML = value;
        this.#taskbarButton.windowName = value;
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
