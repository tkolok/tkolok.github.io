import Window from '../../os/window.js';

export default class InternetExplorer extends Window {
    #address = document.createElement('input');
    #iframe = document.createElement('iframe');

    constructor(url = 'https://www.google.com') {
        super();

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

    //<editor-fold desc="Config">
    static get icon() {
        return 'ie';
    }

    static get id() {
        return 'ie';
    }

    static get name() {
        return 'Internet Explorer';
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
