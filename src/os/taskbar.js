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
                                    icon: 'freecell',
                                    label: 'FreeCell'
                                },
                                {
                                    icon: 'hearts',
                                    label: 'Hearts'
                                },
                                {
                                    click: () => open('minesweeper'),
                                    icon: 'minesweeper',
                                    label: 'Minesweeper'
                                },
                                {
                                    icon: 'solitaire',
                                    label: 'Solitaire'
                                }
                            ],
                            label: 'Games'
                        },
                        {
                            icon: 'calculator',
                            label: 'Calculator'
                        },
                        {
                            icon: 'imaging',
                            label: 'Imaging'
                        },
                        {
                            click: () => open('notepad'),
                            icon: 'notepad',
                            label: 'Notepad'
                        },
                        {
                            icon: 'word-pad',
                            label: 'WordPad'
                        }
                    ],
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
            icon: 'search-file',
            label: 'Find'
        },
        {
            icon: 'help',
            label: 'Help'
        },
        null,
        {
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
        } else if (!config.children) {
            menuitem.classList.add('todo');
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
