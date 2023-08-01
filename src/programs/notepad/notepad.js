import Window from '../../os/window.js';

const name = 'Notepad';

export default class Notepad extends Window {
    constructor() {
        super();

        this.#initMenu();
        this.initContent`<textarea spellcheck="false"></textarea>`;
        this.maximize();
        this.windowName = `Untitled - ${name}`;
    }

    #initMenu() {
        this.initMenu([
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
        ]);
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

    //</editor-fold>
}
