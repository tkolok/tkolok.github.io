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
    // once, egyszer nyitható-e meg
};

export default class WordPad extends Window {
    constructor(data) {
        super(config);

        this.main.attachShadow({mode: 'open'});
        this.main.shadowRoot.append(...data.children);
        this.maximize();
        this.windowName = `${data.name} - ${name}`;
    }
}
