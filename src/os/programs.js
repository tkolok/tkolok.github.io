const programs = new Map();

export async function define(module) {
    const program = (await module).default;

    customElements.define(`w-program-${program.id}`, program, {extends: 'dialog'});
    programs.set(program.id, buildData(program));

    return module;
}

export function getConfig(id) {
    return programs.get(id).config;
}

export function open(id, data) {
    return programs.get(id).open(data);
}

function buildData(program) {
    let openProgram;

    if (program.once) {
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
        config: {
            icon: program.icon,
            id: program.id,
            name: program.name
        },
        open: openProgram
    };
}
