import {buildList} from '../../common/template-utils.js';
import {popup} from '../../components/popup-window.js';

export function MinesweeperCustom(parent, build) {
    const ret = popup('Custom difficulty', content(), {className: 'minesweeper-custom', parent});
    const inputs = [...ret.querySelectorAll('input')];

    ret.querySelector('main button').addEventListener('click', () => {
        ret.close();
        build(...inputs.map(input => input.valueAsNumber), 'Custom');
    });

    return ret;
}

function buildRow(key) {
    const id = `minesweeper${key}`;

    return `
        <tr>
            <td>
                <label for="${id}">${key}:</label>
            </td>
            <td>
                <input id="${id}"
                       type="number">
            </td>
        </tr>`;
}

function content() {
    return `
        <table>
            <tbody>
                ${buildList(['Width', 'Height', 'Mines'], buildRow)}
            </tbody>
        </table>
        <div>
            <button>Ok</button>
        </div>`;
}