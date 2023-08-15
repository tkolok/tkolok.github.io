import Window from '../../components/window.js';

export default class InternetExplorer extends Window {
    #address = document.createElement('input');
    #iframe = document.createElement('iframe');

    constructor(url = 'https://www.google.com') {
        super();

        this.#initToolbar();
        this.initContent`${this.#iframe}`;
        this.#setAddress(url);
        this.maximize();
    }

    #initToolbar() {
        this.#address.addEventListener('keypress', this.#typeAddress.bind(this));

        this.initToolbar`
            <div class="address-bar">
                <span>Address</span>
                ${this.#address}
            </div>`;
    }

    #setAddress(url = this.#address.value) {
        this.#address.value = url;
        this.#iframe.src = url;
    }

    #typeAddress(event) {
        if (event.code === 'Enter') {
            this.#setAddress();
        }
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
