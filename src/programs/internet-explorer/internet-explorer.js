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
    #address = document.createElement('input');
    #iframe = document.createElement('iframe');

    constructor(url = 'https://www.google.com') {
        super(config);

        const addressBar = document.createElement('div');
        addressBar.append(
            Object.assign(document.createElement('span'), {innerHTML: 'Address'}),
            this.#address
        );
        addressBar.className = 'address-bar';

        this.#address.addEventListener('keypress', event => {
            if (event.code === 'Enter') {
                this.#setAddress();
            }
        });

        this.main.append(addressBar, this.#iframe);
        this.#setAddress(url);
        this.maximize();
    }

    #setAddress(url = this.#address.value) {
        this.#address.value = url;
        this.#iframe.src = url;
    }
}
