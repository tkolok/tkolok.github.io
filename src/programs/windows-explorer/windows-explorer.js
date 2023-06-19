import {getFolder} from '../../os/folders.js';
import Shortcut, {shortcutById} from '../../os/Shortcut.js';
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
        this.main.replaceChildren(...getFolder(path).children.map(config =>
            config.id === id
                ? new Shortcut({...config, open: () => this.#open(`${path}/${config.path}`)})
                : shortcutById(config.id, config.data)
        ));
    }
}
