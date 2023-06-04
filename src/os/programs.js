import buildList from '../common/buildList.js';
import query from '../common/query.js';
import {addShortcut} from './desktop.js';

const programs = {};

['internet-explorer', 'pdf-reader'].forEach(async id => {
    const data = {id, ...(await import(`../programs/${id}.js`)).default};

    programs[data.id] = data;

    if (data.shortcut ?? true) {
        addShortcut({...data, dblclick: openProgram});
    }

    function openProgram() {
        open(data.id);
    }
});

addShortcut({
    dblclick: () => open(
        'pdf-reader',
        {
            name: 'Önéletrajz',
            path: 'files/cv_hun'
        },
        {full: true}),
    name: 'Önéletrajz'
});

window.openProgram = open;

export function open(name, file = {}, options = {}) {
    const program = programs[name];
    const dialog = document.createElement('dialog');

    dialog.classList.add(name, options.full ? 'full' : null);
    dialog.innerHTML = `
        <header>
            <span class="icon medium ${program.icon}"></span>
            <label>${program.name}</label>
            <button class="minimize"></button>
            <button class="maximize"></button>
            <button class="close"></button>
        </header>
        <menu>
            ${buildList(program.menu, buildMenuitem)}
        </menu>
        <main>
            ${program.template || ''}
        </main>`;

    program?.init(dialog, file);
    document.body.append(dialog);
    initTitleBar(dialog);
    dialog.open = true;
}

function buildMenuitem(menuitem) {
    const label = menuitem.name.replace(new RegExp(menuitem.key), `<u>${menuitem.key}</u>`);

    return `<li>${label}</li>`;
}

function initTitleBar(dialog) {
    const elements = query(dialog, {
        close: '.close',
        label: 'label',
        maximize: '.maximize',
        minimize: '.minimize'
    });

    elements.close.addEventListener('click', () => dialog.remove());
    elements.label.addEventListener('dblclick', maximize);
    elements.maximize.addEventListener('click', maximize);

    // minimize.addEventListener('click', () => dialog.open = !dialog.open);

    function maximize() {
        dialog.classList.toggle('full', !dialog.classList.contains('full'));
    }
}
