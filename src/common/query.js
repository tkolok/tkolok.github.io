export default function query(element, selectors = {}) {
    const elements = [...element.querySelectorAll('[id]')].reduce((ret, child) => ({...ret, [child.id]: child}), {});

    Object.entries(selectors).forEach(([key, selector]) =>
        elements[key] = selector.endsWith('[]')
            ? element.querySelectorAll(selector.slice(0, -2))
            : element.querySelector(selector)
    );

    return elements;
}
