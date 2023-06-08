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
        const {default: data} = await import(`/src/${file.path}.js`);
        const inner = document.createElement('div');
        const main = window.querySelector('main');
        const style = document.createElement('style');

        inner.className = data.className;
        inner.id = 'body';
        inner.innerHTML = data.html;
        style.innerHTML = data.css;
        main.attachShadow({mode: 'open'});
        main.shadowRoot.append(style, inner);

        window.maximize();
        window.windowName += ` - ${file.name}`;
    },
    shortcut: false
    // mely ablak műveletek érhetőek el (hide, disabled)
    // once, egyszer nyitható-e meg
};
