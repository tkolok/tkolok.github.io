let radioId = 0;

export function radioMenuItems(config, ...menuItems) {
    const id = `radio-menuitem-${radioId++}`;
    const {initial = 0} = config;

    return menuItems.map((menuitem, index) => ({
        ...menuitem,
        checked: index === initial,
        radio: id
    }));
}
