import {getFolder} from '../../os/folders.js';
import Shortcut, {shortcutByPath} from '../../os/Shortcut.js';
import Window from '../../os/Window.js';

const id = 'explorer';
export const config = {
    icon: 'search-folder',
    id,
    menu: [],
    name: 'Windows Explorer'
};

export default class WindowsExplorer extends Window {
    constructor(path = '') {
        super(config);

        this.#open(path);
    }

    #open(path) {
        this.main.replaceChildren(
            ...getFolder(path).children
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
