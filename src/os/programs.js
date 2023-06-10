import Shortcut from './Shortcut.js';

const defaultConfig = {
    icon: '',
    menu: [],
    run: () => {},
    shortcut: false,
    template: ''
};
const programs = {};

export function define(config) {
    programs[config.id] = {...defaultConfig, ...config};

    if (config.shortcut) {
        new Shortcut(config);
    }
}

export function get(id) {
    return programs[id];
}
