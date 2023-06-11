const name = 'Notepad';

export default {
    icon: 'notepad',
    id: 'notepad',
    menu: [
        {
            children: [],
            key: 'F',
            name: 'File'
        },
        {
            children: [],
            key: 'E',
            name: 'Edit'
        },
        {
            key: 'S',
            name: 'Search'
        },
        {
            key: 'H',
            name: 'Help'
        }
    ],
    name: 'Notepad',
    run: window => {
        window.maximize();
        window.windowName = `Untitled - ${name}`;
    },
    shortcut: true,
    template: '<textarea spellcheck="false"></textarea>'
};
