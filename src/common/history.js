export default class History {
    #index = 0;
    #items;

    constructor(item) {
        this.#items = [item];
    }

    add(item) {
        this.#items.splice(this.#index + 1, this.#items.length, item);
        this.#index = this.#items.length - 1;
        return this.current;
    }

    jump(index) {
        this.#index = range(index, 0, this.#items.length);
    }

    next() {
        this.#index = Math.min(this.#index + 1, this.#items.length - 1);
        return this.current;
    }

    previous() {
        this.#index = Math.max(this.#index - 1, 0);
        return this.current;
    }

    get current() {
        return this.#items[this.#index];
    }

    get isFirst() {
        return this.#index === 0;
    }

    get isLast() {
        return this.#index === this.#items.length - 1;
    }

    get nextItems() {
        return this.#items.slice(this.#index + 1);
    }

    get previousItems() {
        return this.#items.slice(0, this.#index);
    }
}

function range(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}