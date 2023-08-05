export function buildList(list, callback) {
    return list.reduce((ret, ...args) => `${ret}${callback(...args)}`, '');
}

export function combinedTemplate(strings, ...nodes) {
    const element = document.createElement('slot');
    const nodeList = [];
    let innerHTML = '';

    for (let index = 0; index < strings.length - 1; index++) {
        const node = nodes[index];

        innerHTML += `${strings[index]}${node instanceof Array ? buildList(node, it => buildRef(it, nodeList)) : buildRef(node, nodeList)}`;
    }

    element.innerHTML = innerHTML + strings[strings.length - 1];
    nodeList.forEach((node, index) => element.querySelector(`[data-ref="${index}"]`).replaceWith(node));
    return [...element.childNodes];
}

function buildRef(node, list) {
    if (node instanceof HTMLElement) {
        list.push(node);
        return `<${node.tagName} data-ref="${list.length - 1}"></${node.tagName}>`;
    } else if (node instanceof Text) {
        return node.wholeText;
    } else {
        return node;
    }
}