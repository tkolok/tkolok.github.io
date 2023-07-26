import TaskbarButton from './taskbar-button.js';

const dragImg = Object.assign(new Image(0, 0), {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='});
const windows = [];

export default class Window extends HTMLDialogElement {
    #icon;
    #main;
    #name;
    #taskbarButton;

    constructor() {
        super();

        this.#icon = this.constructor.icon;
        this.#name = this.constructor.name;
        this.#taskbarButton = new TaskbarButton(this);
        this.addEventListener('focus', () => this.active = true);
        this.classList.add(this.constructor.id);

        this.#initTitleBar();
        this.#initMenu();
        this.#initMain();
        this.#initDragging();

        this.setPosition();
        this.active = true;
        document.body.append(this);

        if (!this.constructor.disableResize) {
            this.#addResizer('bottom', 'n', event => ({height: event.movementY}));
            this.#addResizer('left', 'e', event => ({left: event.movementX, width: -event.movementX}));
            this.#addResizer('right', 'e', event => ({width: event.movementX}));
            this.#addResizer('top', 'n', event => ({height: -event.movementY, top: event.movementY}));
            Object.assign(this.style, {height: `${this.offsetHeight}px`, width: `${this.offsetWidth}px`});
        }
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

    set icon(value) {
        const icon = this.querySelector('header .icon');

        icon.classList.remove(this.#icon);
        icon.classList.add(value);
        this.#icon = value;
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

    #addResizer(className, direction, resize) {
        const resizer = document.createElement('div');
        const _this = this;

        resizer.addEventListener('mousedown', event => {
            if (event.buttons === 1) {
                document.body.style.cursor = `${direction}-resize`;

                window.addEventListener('mousemove', mousemove);
                window.addEventListener('mouseup', stop);
            }
        });
        resizer.className = `resizer ${className}`;
        this.append(resizer);

        function mousemove(event) {
            const result = resize(event);

            Object.assign(_this.style, {
                height: `${_this.offsetHeight + (result.height || 0)}px`,
                left: `${_this.offsetLeft + (result.left || 0)}px`,
                top: `${_this.offsetTop + (result.top || 0)}px`,
                width: `${_this.offsetWidth + (result.width || 0)}px`
            });
        }

        function stop() {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', stop);
            document.body.style.cursor = null;
        }
    }

    #buildBarButton(buttonType) {
        const state = this.titleBarButtons?.[buttonType];

        if (state === 'HIDDEN') {
            return null;
        } else {
            const button = document.createElement('button');

            button.addEventListener('click', this[buttonType].bind(this));
            button.classList.add(buttonType);
            button.disabled = state === 'DISABLED';

            return button;
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

    #initMain() {
        this.#main = document.createElement('main');
        this.#main.innerHTML = this.template;
        this.append(this.#main);
    }

    #initMenu() {
        if (this.menu) {
            const menu = document.createElement('menu');

            menu.addEventListener('blur', () => menu.classList.remove('open'));
            menu.addEventListener('focus', () => menu.classList.add('open'));
            menu.append(...this.menu.map(menuitem => buildMenuitem(this, menu, menuitem)));
            menu.tabIndex = 1;

            this.append(menu);
        }
    }

    #initTitleBar() {
        const header = document.createElement('header');

        header.innerHTML = `
            <span class="icon small ${this.constructor.icon}"></span>
            <label draggable="true">
                <span>${this.constructor.name}</span>
            </label>`;
        header.append(...['minimize', 'maximize', 'close'].map(key => this.#buildBarButton(key)).filter(button => button));

        if (!this.constructor.disableResize) {
            header.querySelector('label').addEventListener('dblclick', this.maximize.bind(this));
        }

        this.append(header);
    }

    // <editor-fold desc="Config">
    static get disableResize() {
        return false;
    }

    static get icon() {
        return '';
    }

    static get id() {
        throw 'Id must be defined!';
    }

    static get name() {
        throw 'Name must be defined!';
    }

    static get once() {
        return false;
    }

    get menu() {
        return null;
    }

    get template() {
        return '';
    }

    get titleBarButtons() {
        return null;
    }

    // </editor-fold>
}

function buildMenuitem(window, menu, menuitem) {
    const li = document.createElement('li');

    if (menuitem) {
        li.innerHTML = `<label>${menuitem.name.replace(new RegExp(menuitem.key), `<u>${menuitem.key}</u>`)}</label>`;

        if (menuitem.children) {
            const ul = document.createElement('ul');

            ul.append(...menuitem.children.map(child => buildMenuitem(window, menu, child)));

            li.append(ul);
        }

        if (menuitem.click) {
            li.addEventListener('click', event => {
                event.stopPropagation();
                menuitem.click(window);
                menu.blur();
            });
        }

        if (!menuitem.click && !menuitem.children) {
            li.classList.add('todo');
        }
    } else {
        li.classList.add('menu-separator');
    }

    return li;
}
