export default folder(
    {name: ''},
    folder(
        {icon: 'documents', name: 'Documents'},
        {
            id: 'word-pad',
            data: {
                name: 'Önéletrajz',
                path: 'files/documents/cv_hun'
            },
            name: 'Önéletrajz'
        },
        folder(
            {name: 'Win98'},
            {id: 'ie'}
        )
    )
);

function folder(config, ...children) {
    return {
        children,
        icon: config.icon || 'folder',
        id: 'explorer',
        name: config.name,
        path: config.path || config.name.toLowerCase().replace(/[^a-z]+/g, '_')
    };
}
