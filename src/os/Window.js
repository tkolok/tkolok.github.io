import buildList from '../common/buildList.js';
import TaskbarButton from './TaskbarButton.js';

const dragImg = Object.assign(new Image(0, 0), {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='});
const windows = [];

export default class Window extends HTMLDialogElement {
    #config;
    #icon;
    #main;
    #name;
    #taskbarButton;

    constructor(config) {
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
            </header>
            <menu></menu>
            <main>${config.template}</main>`;

        this.#main = this.querySelector('main');
        this.querySelector('label').addEventListener('dblclick', this.maximize.bind(this));
        this.#addTitleBarButton('minimize');
        this.#addTitleBarButton('maximize');
        this.#addTitleBarButton('close');
        this.#initDragging();

        this.#initMenu();
        this.setPosition();
        this.active = true;
        document.body.append(this);
    }

    close(returnValue) {
        windows.splice(windows.indexOf(this), 1);
        this.remove();
        this.#taskbarButton.remove();
    }

    maximize() {
        this.classList.toggle('full', !this.classList.contains('full'));
    }

    minimize() {
        super.close();
    }

    setPosition(x = 25 + (windows.length % 10) * 25, y = 25 + (windows.length % 10) * 25) {
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

    get main() {
        return this.#main;
    }

    get windowName() {
        return this.#name;
    }

    set windowName(value) {
        this.#name = value;
        this.querySelector('header label').innerHTML = value;
        this.#taskbarButton.windowName = value;
    }

    #addTitleBarButton(buttonType) {
        if (this.#config[buttonType]?.state !== 'hidden') {
            const button = document.createElement('button');

            button.addEventListener('click', this[buttonType].bind(this));
            button.classList.add(buttonType);
            this.querySelector('header').append(button);
        }
    }

    #initDragging() {
        const label = this.querySelector('label');
        let xDiff;
        let yDiff;

        label.addEventListener('drag', event => this.setPosition(event.x - xDiff, event.y - yDiff));
        label.addEventListener('dragend', event => this.setPosition(event.x - xDiff, event.y - yDiff));
        label.addEventListener('dragstart', event => {
            xDiff = event.x - this.offsetLeft;
            yDiff = event.y - this.offsetTop;
            event.dataTransfer.setDragImage(dragImg, 0, 0);
        });
    }

    #initMenu() {
        this.querySelector('menu').innerHTML = buildList(this.#config.menu, buildMenuitem);
    }
}

function buildMenuitem(menuitem) {
    const label = menuitem.name.replace(new RegExp(menuitem.key), `<u>${menuitem.key}</u>`);

    return `<li>${label}</li>`;
}

customElements.define('w-window', Window, {extends: 'dialog'});
