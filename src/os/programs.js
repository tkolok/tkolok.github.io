const programs = new Map();

export async function define(module) {
    const {default: program, config} = await module;

    customElements.define(`w-program-${config.id}`, program, {extends: 'dialog'});
    programs.set(config.id, buildData(config, program));

    return module;
}

export function getConfig(id) {
    return programs.get(id).config;
}

export function open(id, data) {
    return programs.get(id).open(data);
}

function buildData(config, program) {
    let openProgram;

    if (config.once) {
        let instance;

        openProgram = data => {
            if (!instance?.isConnected) {
                instance = new program(data);
            } else {
                instance.active = true;
            }

            return instance;
        };
    } else {
        openProgram = data => new program(data);
    }

    return {
        config,
        open: openProgram
    };
}
