import Window from '../../os/Window.js';

export const config = {
    icon: 'ie',
    id: 'ie',
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
    name: 'Internet Explorer',
    template: '<div>I think it is not working yet.</div>'
};

export default class InternetExplorer extends Window {
    constructor() {
        super(config);
    }
}
