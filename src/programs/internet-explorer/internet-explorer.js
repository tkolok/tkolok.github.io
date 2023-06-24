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
    name: 'Internet Explorer'
};

export default class InternetExplorer extends Window {
    constructor(url = 'https://www.google.com') {
        super(config);

        const iframe = document.createElement('iframe');
        iframe.src = url;
        this.main.append(iframe);
        this.maximize();
    }
}
