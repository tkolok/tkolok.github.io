import Window from '../../os/window.js';

export default class extends Window {
    constructor(data) {
        super();

        this.#initContent(data);
        this.maximize();
    }

    #initContent(data) {
        const img = document.createElement('img');
        img.src = `/assets/images/${data.src}`;
        this.initContent(img);
    }

    //<editor-fold desc="Config">
    static get icon() {
        return 'imaging';
    }

    static get id() {
        return 'imaging';
    }

    static get name() {
        return 'Imaging';
    }

    //</editor-fold>
};
