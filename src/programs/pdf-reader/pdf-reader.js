import query from '../../common/query.js';

export default {
    init: (dialog, file) => {
        const elements = query(dialog, {
            label: 'header label',
            main: 'main'
        });

        elements.label.innerHTML += ` - ${file.name}`;
        elements.main.innerHTML = `<iframe src="./src/${file.path}.html"></iframe>`;
    },
    menu: [
        {
            children: [],
            key: 'E',
            name: 'Edit'
        },
        {
            children: [],
            key: 'V',
            name: 'View'
        },
        {
            key: 'H',
            name: 'Help'
        }
    ],
    name: 'PDF Reader',
    shortcut: false
    // mely ablak műveletek érhetőek el
    // menu beállítások
    // once, egyszer nyitható-e meg
    // path
    // template
};
