import Window from '../../components/window.js';
import {open} from '../../os/programs.js';

const name = 'WordPad';

export default class WordPad extends Window {
    constructor(data) {
        super();

        this.#initMenu();
        (async () => {
            const main = this.querySelector('main');

            main.attachShadow({mode: 'open'});
            main.shadowRoot.append(...(await import(`/src/files/${data.path}.js`))[data.id || 'default']);
            main.shadowRoot.querySelectorAll('a').forEach(redirect);
        })();

        this.maximize();
        this.windowName = `${data.name} - ${name}`;
    }

    #initMenu() {
        this.initMenu([
            {
                children: [],
                key: 'E',
                name: 'Edit'
            },
            {
                children: [],
                key: 'V',
                name: 'View'
            },
            {
                key: 'H',
                name: 'Help'
            }
        ]);
    }

    //<editor-fold desc="Config">
    static get icon() {
        return 'word-pad';
    }

    static get id() {
        return 'word-pad';
    }

    static get name() {
        return name;
    }

    //</editor-fold>
}

function redirect(anchor) {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        open('ie', anchor.href);
    });
}
