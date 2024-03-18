import Window from '../../components/window.js';

export default class extends Window {
    constructor(data) {
        super();

        this.initContent`<img alt="" src="${data.src}">`;
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
