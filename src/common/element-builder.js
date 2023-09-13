export default function createElement(element, ...builders) {
    if (typeof element === 'string') {
        element = document.createElement(element);
    }

    builders.forEach(builder => builder(element));

    return element;
}

export function append(...elements) {
    return element => element.append(...elements);
}

export function classList(...tokens) {
    return element => element.classList.add(...tokens.filter(token => token));
}

export function eventListener(type, listener) {
    return element => element.addEventListener(type, listener);
}

export function innerHTML(html) {
    return element => element.innerHTML = html;
}