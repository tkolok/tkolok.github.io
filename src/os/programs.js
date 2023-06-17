const programs = new Map();

export async function define(module) {
    const {default: program, config} = await module;

    customElements.define(`w-program-${config.id}`, program, {extends: 'dialog'});
    programs.set(config.id, {config, program});

    return module;
}

export function get(id) {
    return programs.get(id).program;
}

export function getConfig(id) {
    return programs.get(id).config;
}
