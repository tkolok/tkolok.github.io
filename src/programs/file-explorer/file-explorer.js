import {getFolder} from '../../os/folders.js';
import Shortcut, {shortcutByPath} from '../../os/shortcut.js';
import Window from '../../os/window.js';

const id = 'explorer';

export default class FileExplorer extends Window {
    #descIcon = this.main.querySelector('.icon');
    #folders = this.main.querySelector('.folders');
    #name = this.main.querySelector('h1');

    constructor(path = '') {
        super();

        this.#open(path);
    }

    #open(path) {
        const folder = getFolder(path);

        this.#name.innerText = folder.name;
        this.#descIcon.className = `icon ${folder.icon}`;
        this.icon = folder.icon;
        this.windowName = folder.name;

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

    get template() {
        return `
            <aside>
                <span class="icon"></span>
                <h1>Folder</h1>
                <div class="rainbow"></div>
            </aside>
            <div class="folders"></div>`;
    }

    //</editor-fold>
}

function defaultSort(a, b) {
    const bFolder = b.id === id;

    return (a.id === id) === bFolder ? a.name.localeCompare(b.name) : (+bFolder || -1);
}
