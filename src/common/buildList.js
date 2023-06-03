export default function buildList(list, callback) {
    return list.reduce((ret, ...args) => `${ret}${callback(...args)}`, '');
}
