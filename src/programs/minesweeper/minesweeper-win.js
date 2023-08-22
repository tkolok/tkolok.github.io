import {popup} from '../../components/popup-window.js';

export function MinesweeperWin(level, parent, ok) {
    const ret = popup('Congratulations', content(level), {className: 'minesweeper-win', parent});

    ret.querySelector('main button').addEventListener('click', () => {
        ret.close();
        ok(ret.querySelector('input').value);
    });

    return ret;
}

function content(level) {
    return `
        <div>You have the fastest time for ${level} level. Please type your name:</div>
        <input>
        <div class="text-right">
            <button>Ok</button>
        </div>`;
}
