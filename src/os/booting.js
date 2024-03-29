import {shortcutById, shortcutByPath} from '../components/shortcut.js';
import {define} from './programs.js';

await Promise.all([new Promise(resolve => setTimeout(resolve, 3000)), initPrograms()]);
initShortcuts();
document.body.querySelector('#booting').remove();
window.addEventListener('contextmenu', e => e.preventDefault());

function initPrograms() {
    return [
        import('../components/popup-window.js'),
        import('../programs/file-explorer/file-explorer.js'),
        import('../programs/imaging/imaging.js'),
        import('../programs/internet-explorer/internet-explorer.js'),
        import('../programs/minesweeper/minesweeper.js'),
        import('../programs/notepad/notepad.js'),
        import('../programs/word-pad/word-pad.js')
    ].reduce(async (ret, module) => define(module), null);
}

function initShortcuts() {
    document.body.append(
        shortcutByPath(''),
        shortcutById('ie'),
        shortcutById('notepad')
    );
}
