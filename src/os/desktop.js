import query from '../common/query.js';

const {dateAndTime} = query(document.body);

updateTime();
setInterval(updateTime, 1000);

export function addShortcut(config) {
    const shortcut = document.createElement('div');

    shortcut.classList.add('item');
    shortcut.innerHTML = `
        <div class="icon ${config.icon || ''}"></div>
        <p>${config.name}</p>`;
    shortcut.addEventListener('dblclick', config.dblclick);

    document.body.append(shortcut);
}

function updateTime() {
    dateAndTime.innerHTML = new Date().toLocaleTimeString().slice(0, 5);
}
