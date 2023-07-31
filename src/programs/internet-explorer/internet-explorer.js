import Window from '../../os/window.js';

export default class InternetExplorer extends Window {
    #address = document.createElement('input');
    #iframe = document.createElement('iframe');

    constructor(url = 'https://www.google.com') {
        super();

        this.#initMenu();
        this.#initContent();
        this.#address.addEventListener('keypress', event => {
            if (event.code === 'Enter') {
                this.#setAddress();
            }
        });

        this.#setAddress(url);
        this.maximize();
    }

    #initContent() {
        const addressBar = document.createElement('div');
        addressBar.append(
            Object.assign(document.createElement('span'), {innerHTML: 'Address'}),
            this.#address
        );
        addressBar.className = 'address-bar';

        super.initContent(addressBar, this.#iframe);
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

    //</editor-fold>
}
