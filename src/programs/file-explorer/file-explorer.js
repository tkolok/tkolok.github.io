import History from '../../common/history.js';
import {getFolder} from '../../os/folders.js';
import Shortcut, {shortcutByPath} from '../../os/shortcut.js';
import Window from '../../os/window.js';

const id = 'explorer';

export default class FileExplorer extends Window {
    #back = document.createElement('button');
    #descIcon = document.createElement('span');
    #folders = document.createElement('div');
    #forward = document.createElement('button');
    #history;
    #name = document.createElement('h1');

    constructor(path = '') {
        super();

        this.#initToolbar();
        this.#initContent();
        this.#history = new History(path);
        this.#open(path, false);
    }

    #initContent() {
        this.#descIcon.classList.add('icon');
        this.#folders.classList.add('folders');
        this.initContent`
            <aside>
                ${this.#descIcon}
                ${this.#name}
                <div class="rainbow"></div>
            </aside>
            ${this.#folders}`;
    }

    #initToolbar() {
        this.#back.innerHTML = 'Back';
        this.#back.addEventListener('click', () => this.#open(this.#history.previous(), false));
        this.#forward.innerHTML = 'Forward';
        this.#forward.addEventListener('click', () => this.#open(this.#history.next(), false));
        this.initToolbar`${this.#back}${this.#forward}`;
    }

    #open(path, add = true) {
        const folder = getFolder(path);

        this.#descIcon.className = `icon ${folder.icon}`;
        this.#name.innerText = folder.name;
        this.icon = folder.icon;
        this.windowName = folder.name;

        if (add) {
            this.#history.add(path);
        }

        this.#back.disabled = this.#history.isFirst;
        this.#forward.disabled = this.#history.isLast;

        this.#folders.replaceChildren(
            ...folder.children
                .sort(defaultSort)
                .map(config =>
                    config.id === id
                        ? new Shortcut({...config, open: () => this.#open(`${path}/${config.path}`)})
                        : shortcutByPath(`${path}/${config.path}`)
                ));
    }

    //<editor-fold desc="Config">
    static get icon() {
        return 'search-folder';
    }

    static get id() {
        return id;
    }

    static get name() {
        return 'Exploring';
    }

    //</editor-fold>
}

function defaultSort(a, b) {
    const bFolder = b.id === id;

    return (a.id === id) === bFolder ? a.name.localeCompare(b.name) : (+bFolder || -1);
}
