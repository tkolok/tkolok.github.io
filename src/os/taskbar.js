import query from '../common/query.js';
import {open} from './programs.js';

const {dateAndTime, startButton, startMenu} = query(document.body.querySelector('#taskbar'));
const dateFormatter = new Intl.DateTimeFormat(undefined, {timeStyle: 'short'});

startButton.addEventListener('blur', blur);
startButton.addEventListener('click', () => toggleStartMenu());
updateTime();
setInterval(updateTime, 1000);

startMenu.append(
    ...[
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    click: () => console.log('TODO'),
                                    icon: 'freecell',
                                    label: 'FreeCell'
                                },
                                {
                                    click: () => console.log('TODO'),
                                    icon: 'hearts',
                                    label: 'Hearts'
                                },
                                {
                                    click: () => console.log('TODO'),
                                    icon: 'minesweeper',
                                    label: 'Minesweeper'
                                },
                                {
                                    click: () => console.log('TODO'),
                                    icon: 'solitaire',
                                    label: 'Solitaire'
                                }
                            ],
                            label: 'Games'
                        },
                        {
                            click: () => console.log('TODO'),
                            icon: 'calculator',
                            label: 'Calculator'
                        },
                        {
                            click: () => console.log('TODO'),
                            icon: 'imaging',
                            label: 'Imaging'
                        },
                        {
                            click: () => open('notepad'),
                            icon: 'notepad',
                            label: 'Notepad'
                        },
                        {
                            click: () => console.log('TODO'),
                            icon: 'word-pad',
                            label: 'WordPad'
                        }
                    ],
                    click: () => console.log('TODO'),
                    label: 'Accessories'
                },
                {
                    click: () => open('ie'),
                    icon: 'ie',
                    label: 'Internet Explorer'
                }
            ],
            label: 'Programs'
        },
        {
            click: () => open('explorer', 'C:/My Documents'),
            icon: 'documents',
            label: 'My Documents'
        },
        {
            click: () => console.log('TODO'),
            icon: 'search-file',
            label: 'Find'
        },
        {
            click: () => console.log('TODO'),
            icon: 'help',
            label: 'Help'
        },
        null,
        {
            click: () => console.log('TODO'),
            icon: 'log-off',
            label: 'Log Off...'
        },
        {
            click: () => window.close(),
            icon: 'shut-down',
            label: 'Shut down...'
        }
    ].map(buildMenuitem)
);

function blur(event) {
    if (!event.relatedTarget?.closest('#startMenu')) {
        toggleStartMenu(false);
    }
}

function buildClick({click}) {
    return event => {
        toggleStartMenu(false);
        click(event);
    };
}

function buildMenuitem(config) {
    const menuitem = document.createElement('li');

    if (config) {
        menuitem.classList.add('menuitem');
        menuitem.innerHTML = `
            <span class="icon ${config.icon || 'programs'}"></span>
            <label>${config.label}</label>`;
        menuitem.tabIndex = 1;

        if (config.children) {
            const ul = document.createElement('ul');
            ul.append(...config.children.map(buildMenuitem));
            menuitem.append(ul);
        }

        if (config.click) {
            menuitem.addEventListener('click', buildClick(config));
        }
    } else {
        menuitem.classList.add('menu-separator');
    }

    return menuitem;
}

function toggleStartMenu(value = !startMenu.classList.contains('open')) {
    startMenu.classList.toggle('open', value);
}

function updateTime() {
    dateAndTime.innerHTML = dateFormatter.format(new Date());
}
