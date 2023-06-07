export default {
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
    run: (window, file) => {
        window.name += ` - ${file.name}`;
        window.querySelector('main').innerHTML = `<iframe src="./src/${file.path}.html"></iframe>`;
    },
    shortcut: false
    // mely ablak műveletek érhetőek el (hide, disabled)
    // once, egyszer nyitható-e meg
};
