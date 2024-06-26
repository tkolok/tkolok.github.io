const folders = folder(
    {
        icon: 'computer',
        name: 'My Computer',
        path: ''
    },
    folder(
        {
            icon: 'drive-floppy',
            name: '(A:)',
            path: 'A:'
        }
    ),
    folder(
        {
            icon: 'drive-hard-disk',
            name: '(C:)',
            path: 'C:'
        },
        folder(
            {
                icon: 'documents',
                name: 'My Documents'
            },
            file(
                'word-pad',
                {
                    data: {
                        id: 'hu',
                        name: 'Hungarian CV',
                        path: 'cv-files'
                    },
                    name: 'Hungarian CV'
                }
            ),
            file(
                'word-pad',
                {
                    data: {
                        id: 'en',
                        name: 'English CV',
                        path: 'cv-files'
                    },
                    name: 'English CV'
                }
            ),
            file(
                'word-pad',
                {
                    data: {
                        name: 'My Diary',
                        path: 'my-diary'
                    },
                    name: 'My Diary'
                }
            ),
            file(
                'imaging',
                {
                    data: {
                        src: 'https://lh3.googleusercontent.com/pw/AP1GczNVDZusaZ5XL5lTZq4Yy0uUIlhe6i1iKZ0q-JSUrVVI5OViDOR65rUMdDmO2NIKUK7dMbXRV3_sV5Rn04OYRxXSrNCTYz8zkJ0EnciLUoIrTnsnR3gmFRxj9xdpQ_pbeWpRLqfg3RPhCB3McGYmLsHn=w1215-h911-s-no-gm'
                    },
                    name: 'New York selfie'
                }
            ),
            file(
                'imaging',
                {
                    data: {
                        src: 'https://lh3.googleusercontent.com/pw/AP1GczMR4LVa90NSr232l3TkORRWNw_1sEwwKtrqK8oZhjVjAorixDKAmxJRiEsiudztHiHdNEMGQeUVbKYtrNRYEhi0qZX--uqk2_Ns2CIHy0lEtv5r9AtqXnkp-3ihRHd8FQWdzKu0Nn4WtKRzDJUu1l6h=w1222-h629-s-no-gm'
                    },
                    name: 'Demonstration'
                    // https://youtu.be/KXa5VDHLmEk?t=275
                }
            )
        ),
        folder(
            {name: 'Program Files'},
            file('ie')
        ),
        folder(
            {name: 'Windows'}
        )
    ),
    folder(
        {
            icon: 'drive-cd',
            name: '(D:)',
            path: 'D:'
        }
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
        data: config.path ?? config.name,
        icon: config.icon || 'folder',
        id: 'explorer',
        name: config.name,
        path: config.path ?? config.name
    };
}
