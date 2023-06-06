const taskbarButtons = document.body.querySelector('#taskbarButtons');

export default class TaskbarButton extends HTMLDivElement {
    constructor(window) {
        super();

        this.addEventListener('click', () => console.log(window));
        this.innerHTML = `
            <span class="icon small ${window.icon}"></span>
            ${window.name}`;

        taskbarButtons.append(this);
    }
}

customElements.define('w-taskbar-button', TaskbarButton, {extends: 'div'});
