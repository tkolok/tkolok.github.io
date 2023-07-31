import {open} from '../../os/programs.js';
import Window from '../../os/window.js';

const name = 'WordPad';

export default class WordPad extends Window {
    async init(data) {
        this.main.attachShadow({mode: 'open'});
        this.main.shadowRoot.append(...(await import(`/src/files/${data.path}.js`))[data.id || 'default']);
        this.main.shadowRoot.querySelectorAll('a').forEach(redirect);

        this.maximize();
        this.windowName = `${data.name} - ${name}`;
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

    get menu() {
        return [
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
        ];
    }

    //</editor-fold>
}

function redirect(anchor) {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        open('ie', anchor.href);
    });
}
