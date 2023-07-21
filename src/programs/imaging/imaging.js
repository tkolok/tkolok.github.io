import Window from '../../os/window.js';

export default class extends Window {
    constructor(data) {
        super();

        const img = document.createElement('img');
        img.src = `/assets/images/${data.src}`;
        this.main.append(img);

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

    //</editor-fold>
};
