export function addShortcut(config) {
    const shortcut = document.createElement('div');

    shortcut.classList.add('shortcut');
    shortcut.innerHTML = `
        <div class="icon ${config.icon || ''}"></div>
        <p>${config.name}</p>`;
    shortcut.addEventListener('dblclick', config.dblclick);

    document.body.append(shortcut);
}
