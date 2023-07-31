import Window from '../../os/window.js';

export default class extends Window {
    #img = document.createElement('img');

    init(data) {
        this.#img.src = `/assets/images/${data.src}`;
        this.maximize();
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

    get content() {
        return this.#img;
    }

    //</editor-fold>
};
