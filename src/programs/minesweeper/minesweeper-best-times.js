import {asString, remove} from '../../common/memory.js';
import {buildList, combinedTemplate} from '../../common/template-utils.js';
import {popup} from '../../components/popup-window.js';

const levels = ['Beginner', 'Intermediate', 'Expert'];

export function MinesweeperBestTimes(parent) {
    const ret = popup('Best Times', content(), {className: 'minesweeper-best-times', parent});

    ret.querySelector('main button:first-child').addEventListener('click', () =>
        levels.forEach(key => {
            remove(`minesweeper${key}Player`);
            remove(`minesweeper${key}Score`);
            ret.querySelector('fieldset div').innerHTML = buildRows();
        })
    );
    ret.querySelector('main button:last-child').addEventListener('click', () => ret.close());
}

function content() {
    return combinedTemplate`
        <fieldset>
            <legend>Fastest Mine Sweepers</legend>
            <div>${buildRows()}</div>
        </fieldset>
        <div class="text-right">
            <button>Reset Scores</button>
            <button>Ok</button>
        </div>`;
}

function buildRows() {
    return buildList(levels, key => `
        <span>${key}:</span>
        <span>${asString(`minesweeper${key}Score`, 999)} seconds</span>
        <span>${asString(`minesweeper${key}Player`, 'Anonymous')}</span>`
    );
}