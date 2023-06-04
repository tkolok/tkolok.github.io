import query from '../common/query.js';

const {dateAndTime} = query(document.body);
const dateFormatter = new Intl.DateTimeFormat(undefined, {timeStyle: 'short'});

updateTime();
setInterval(updateTime, 1000);

export function addShortcut(config) {
    const shortcut = document.createElement('div');

    shortcut.classList.add('shortcut');
    shortcut.innerHTML = `
        <div class="icon ${config.icon || ''}"></div>
        <p>${config.name}</p>`;
    shortcut.addEventListener('dblclick', config.dblclick);

    document.body.append(shortcut);
}

function updateTime() {
    dateAndTime.innerHTML = dateFormatter.format(new Date());
}
