export function asNumber(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    return item !== null ? +item : defaultValue;
}

export function asString(key, defaultValue = null) {
    return localStorage.getItem(key) ?? defaultValue;
}

export function remove(key) {
    localStorage.removeItem(key);
}

export function save(key, value) {
    localStorage.setItem(key, value);
}