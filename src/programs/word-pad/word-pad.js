import {open} from '../../os/programs.js';
import Window from '../../os/Window.js';

const name = 'WordPad';

export const config = {
    icon: 'rich-text',
    id: 'word-pad',
    menu: [
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
    ],
    name
    // mely ablak műveletek érhetőek el (hidden, disabled)
};

export default class WordPad extends Window {
    constructor(data) {
        super(config);

        this.main.attachShadow({mode: 'open'});
        this.main.shadowRoot.append(...data.children);
        this.main.shadowRoot.querySelectorAll('a').forEach(redirect);
        this.maximize();
        this.windowName = `${data.name} - ${name}`;
    }
}

function redirect(anchor) {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        open('ie', anchor.href);
    });
}
