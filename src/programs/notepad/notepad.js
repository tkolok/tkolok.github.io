import Window from '../../os/Window.js';

const name = 'Notepad';

export const config = {
    icon: 'notepad',
    id: 'notepad',
    menu: [
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
    ],
    name: 'Notepad',
    template: '<textarea spellcheck="false"></textarea>'
};

export default class Notepad extends Window {
    constructor() {
        super(config);

        this.maximize();
        this.windowName = `Untitled - ${name}`;
    }
}
