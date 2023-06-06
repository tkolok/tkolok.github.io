import buildList from '../common/buildList.js';
import query from '../common/query.js';
import {addShortcut} from './desktop.js';

const programs = {};
const dragImg = Object.assign(new Image(0, 0), {src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='});

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

export function addProgram(data) {
    programs[data.id] = data;

    if (data.shortcut ?? true) {
        addShortcut({...data, dblclick: openProgram});
    }

    function openProgram() {
        open(data.id);
    }
}

export function open(name, file = {}, options = {}) {
    const program = programs[name];
    const dialog = document.createElement('dialog');

    dialog.classList.add(name, options.full ? 'full' : null);
    dialog.innerHTML = `
        <header>
            <span class="icon medium ${program.icon}"></span>
            <label draggable="true">${program.name}</label>
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
    elements.label.addEventListener('drag', setPosition);
    elements.label.addEventListener('dragend', setPosition);
    elements.label.addEventListener('dragstart', event => event.dataTransfer.setDragImage(dragImg, 0, 0));
    elements.maximize.addEventListener('click', maximize);

    // minimize.addEventListener('click', () => dialog.open = !dialog.open);

    function maximize() {
        dialog.classList.toggle('full', !dialog.classList.contains('full'));
    }

    function setPosition(event) {
        Object.assign(dialog.style, {top: `${event.y}px`, left: `${event.x}px`});
    }
}
