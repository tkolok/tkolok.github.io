const folders = folder(
    {name: ''},
    folder(
        {icon: 'documents', name: 'Documents'},
        file(
            'word-pad',
            {
                data: {
                    name: 'Hungarian CV',
                    path: 'files/documents/cv_hun'
                },
                name: 'Hungarian CV'
            }
        ),
        folder(
            {name: 'Win98'},
            file('ie')
        )
    )
);

export function getFolder(fullPath) {
    return fullPath.split('/')
        .filter(path => path)
        .reduce((folder, path) => folder.children.find(current => current.path === path), folders);
}

function file(id, config) {
    return {
        ...config,
        id,
        path: config?.path || config?.name || id
    };
}

function folder(config, ...children) {
    return {
        children,
        icon: config.icon || 'folder',
        id: 'explorer',
        name: config.name,
        path: config.path || config.name
    };
}
