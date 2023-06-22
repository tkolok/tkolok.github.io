import CVBuilder from '../files/cv_builder.js';

const folders = folder(
    {name: ''},
    folder(
        {icon: 'documents', name: 'Documents'},
        file(
            'word-pad',
            {
                data: {
                    name: 'Hungarian CV',
                    children: CVBuilder('hu')
                },
                name: 'Hungarian CV'
            }
        ),
        file(
            'word-pad',
            {
                data: {
                    name: 'English CV',
                    children: CVBuilder('en')
                },
                name: 'English CV'
            }
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
        data: config.path || config.name,
        icon: config.icon || 'folder',
        id: 'explorer',
        name: config.name,
        path: config.path || config.name
    };
}
