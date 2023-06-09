import {getFolder} from '../../os/folders.js';
import Shortcut, {shortcutByPath} from '../../os/Shortcut.js';
import Window from '../../os/Window.js';

const id = 'explorer';
export const config = {
    icon: 'search-folder',
    id,
    menu: [],
    name: 'Exploring',
    template: `
        <aside>
            <span class="icon"></span>
            <h1>Folder</h1>
            <div class="rainbow"></div>
        </aside>
        <div class="folders"></div>`
};

// TODO add description part

export default class FileExplorer extends Window {
    #descIcon;
    #folders;
    #name;

    constructor(path = '') {
        super(config);

        this.#descIcon = this.main.querySelector('.icon');
        this.#folders = this.main.querySelector('.folders');
        this.#name = this.main.querySelector('h1');
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
}

function defaultSort(a, b) {
    const bFolder = b.id === id;

    return (a.id === id) === bFolder ? a.name.localeCompare(b.name) : (+bFolder || -1);
}
