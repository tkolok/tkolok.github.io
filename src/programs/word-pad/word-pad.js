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
    constructor(file) {
        super(config);

        this.maximize();
        this.windowName = `${file.name} - ${name}`;

        (async () => {
            this.main.attachShadow({mode: 'open'});
            this.main.shadowRoot.append(...(await import(`/src/${file.path}.js`)).default);
        })();
    }
}
