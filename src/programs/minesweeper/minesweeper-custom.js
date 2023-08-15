import {buildList, combinedTemplate} from '../../common/template-utils.js';
import {popup} from '../../components/popup-window.js';

export function MinesweeperCustom(okClick, parent) {
    const ok = document.createElement('button');
    ok.innerHTML = 'Ok';

    const content = combinedTemplate`
        <table>
            <tbody>
                ${buildList(['Width', 'Height', 'Mines'], buildRow)}
            </tbody>
        </table>
        <div>
            ${ok}
        </div>`;

    const ret = popup('Custom difficulty', content, {className: 'minesweeper-custom', parent});
    const inputs = [...ret.querySelectorAll('input')];

    ok.addEventListener('click', () => {
        okClick(...inputs.map(input => input.valueAsNumber));
        ret.close();
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