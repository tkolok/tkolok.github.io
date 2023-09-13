export function noop() {}

export function capitalize(text) {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export function isFalse(value) {
    return value === undefined || value === false || value === null || isNaN(value);
}