import Window from '../../os/window.js';

const name = 'Notepad';

export default class Notepad extends Window {
    init() {
        this.maximize();
        this.windowName = `Untitled - ${name}`;
    }

    //<editor-fold desc="Config">
    static get icon() {
        return 'notepad';
    }

    static get id() {
        return 'notepad';
    }

    static get name() {
        return name;
    }

    get content() {
        const textarea = document.createElement('textarea');
        textarea.spellcheck = false;
        return textarea;
    }

    get menu() {
        return [
            {
                children: [],
                key: 'F',
                name: 'File'
            },
            {
                children: [],
                key: 'E',
                name: 'Edit'
            },
            {
                key: 'S',
                name: 'Search'
            },
            {
                key: 'H',
                name: 'Help'
            }
        ];
    }

    //</editor-fold>
}
