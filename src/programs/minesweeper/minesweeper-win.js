import {popup} from '../../components/popup-window.js';

export function MinesweeperWin(level, parent) {
    const ret = popup('Congratulations', content(level), {className: 'minesweeper-win', parent});

    ret.element.querySelector('main button').addEventListener('click', () => ret.close(ret.element.querySelector('input').value));

    return ret;
}

function content(level) {
    return `
        <div>You have the fastest time for ${level} level. Please type your name:</div>
        <input>
        <div>
            <button>Ok</button>
        </div>`;
}
