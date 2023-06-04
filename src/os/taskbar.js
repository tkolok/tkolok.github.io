import query from '../common/query.js';

const {dateAndTime, startButton, startMenu} = query(document.body.querySelector('#taskbar'));
const dateFormatter = new Intl.DateTimeFormat(undefined, {timeStyle: 'short'});

startButton.addEventListener('click', () => toggleStartMenu());
updateTime();
setInterval(updateTime, 1000);

[
    {
        click: () => console.log('TODO'),
        icon: 'documents',
        label: 'Documents'
    },
    null,
    {
        click: () => window.close(),
        icon: 'monitor',
        label: 'Shut down...'
    }
].forEach(addMenuitem);

export function addMenuitem(config) {
    const li = document.createElement('li');

    if (config) {
        li.addEventListener('click', buildClick(config));
        li.classList.add('menuitem');
        li.innerHTML = `
            <span class="icon ${config.icon}"></span>
            <label>${config.label}</label>`;
    } else {
        li.classList.add('menu-separator');
    }

    startMenu.append(li);
}

function buildClick({click}) {
    return event => {
        toggleStartMenu(false);
        click(event);
    };
}

function toggleStartMenu(value = !startMenu.classList.contains('open')) {
    startMenu.classList.toggle('open', value);
}

function updateTime() {
    dateAndTime.innerHTML = dateFormatter.format(new Date());
}
