import Window from '../../os/Window.js';

export const config = {
    icon: 'imaging',
    id: 'imaging',
    menu: [],
    name: 'Imaging'
};

export default class extends Window {
    constructor(data) {
        super(config);

        const img = document.createElement('img');
        img.src = `/assets/images/${data.src}`;
        this.main.append(img);

        this.maximize();
    }
};
