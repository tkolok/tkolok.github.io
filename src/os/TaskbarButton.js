const taskbarButtons = document.body.querySelector('#taskbarButtons');

export default class TaskbarButton extends HTMLButtonElement {
    constructor(window) {
        super();

        this.addEventListener('click', () => window.active = true);
        this.innerHTML = `
            <span class="icon small ${window.icon}"></span>
            <label></label>`;
        this.windowName = window.windowName;

        taskbarButtons.append(this);
    }

    set windowName(value) {
        this.querySelector('label').innerText = value;
    }
}

customElements.define('w-taskbar-button', TaskbarButton, {extends: 'button'});
