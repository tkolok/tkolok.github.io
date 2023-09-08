import {noop} from '../common/utils.js';
import Window from './window.js';

const defaultConfig = {
    disableResize: true,
    mainNoBorder: true,
    maximize: 'HIDDEN',
    minimize: 'HIDDEN',
    popup: true
};

export default class PopupWindow extends Window {
    #close;

    constructor(config) {
        super({...defaultConfig, ...config});

        this.initContent`${config.content}`;
        this.windowName = config.name;
        this.#close = config.close || noop;
        config.init?.();
    }

    close(returnValue) {
        super.close(returnValue);
        this.#close();
    }

    static get icon() {
        return null;
    }

    static get id() {
        return 'message-window';
    }

    static get name() {
        return '';
    }
}

export function popup(name, content, config = {}) {
    return new PopupWindow({name, content, ...config});
}