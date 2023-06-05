export default {
    icon: 'ie',
    id: 'ie',
    init: (dialog, file) => {},
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
    name: 'Internet Explorer',
    shortcut: true,
    template: '<iframe src="https://www.greenpeace.org/"></iframe>'
};
