import {asString} from '../../common/memory.js';
import {combinedTemplate} from '../../common/template-utils.js';
import {popup} from '../../components/popup-window.js';

export function MinesweeperBestTimes(parent) {
    popup('Best Times', content(), {className: 'minesweeper-best-times', parent});
}

function content() {
    return combinedTemplate`<div>${['Beginner', 'Intermediate', 'Expert'].map(buildRow)}</div>`;
}

function buildRow(key) {
    return `
        <span>${key}:</span>
        <span>${asString(`minesweeper${key}Score`, 999)} seconds</span>
        <span>${asString(`minesweeper${key}Player`, 'Anonymous')}</span>`;
}