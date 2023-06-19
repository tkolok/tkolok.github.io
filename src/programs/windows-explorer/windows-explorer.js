import {open} from '../../os/programs.js';
import Shortcut from '../../os/Shortcut.js';
import Window from '../../os/Window.js';
import directories from './directories.js';

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
        this.main.replaceChildren(...getFolder(path).children.map(config => {
            config.open = config.id === id
                ? () => this.#open(`${path}/${config.path}`)
                : () => open(config.id, config.data);

            return new Shortcut(config);
        }));
    }
}

function getFolder(fullPath) {
    return fullPath.split('/')
        .filter(path => path)
        .reduce((folder, path) => folder.children.find(current => current.path === path), directories);
}
