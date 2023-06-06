import buildList from '../common/buildList.js';
import query from '../common/query.js';

const dragImg = Object.assign(new Image(0, 0), {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='});

export default class Window extends HTMLDialogElement {
    #config;

    constructor(config, data) {
        super();

        this.#config = config;
        this.classList.add(config.id);
        this.innerHTML = `
            <header>
                <span class="icon medium ${config.icon}"></span>
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
        elements.label.addEventListener('dragstart', event => event.dataTransfer.setDragImage(dragImg, 0, 0));
        elements.maximize.addEventListener('click', this.maximize.bind(this));

        this.initMenu();
        this.setPosition();
        config.init(this, data);
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
}

function buildMenuitem(menuitem) {
    const label = menuitem.name.replace(new RegExp(menuitem.key), `<u>${menuitem.key}</u>`);

    return `<li>${label}</li>`;
}

customElements.define('w-window', Window, {extends: 'dialog'});
