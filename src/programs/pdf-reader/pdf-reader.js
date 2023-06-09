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
    run: async (window, file) => {
        const main = window.querySelector('main');

        main.attachShadow({mode: 'open'});
        main.shadowRoot.append(...(await import(`/src/${file.path}.js`)).default);

        window.maximize();
        window.windowName += ` - ${file.name}`;
    },
    shortcut: false
    // mely ablak műveletek érhetőek el (hide, disabled)
    // once, egyszer nyitható-e meg
};
