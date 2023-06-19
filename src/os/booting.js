import {define} from './programs.js';
import {shortcutById, shortcutByPath} from './Shortcut.js';

await Promise.all([new Promise(resolve => setTimeout(resolve, 3000)), initPrograms()]);
initShortcuts();
document.body.querySelector('#booting').remove();

function initPrograms() {
    return [
        import('../programs/windows-explorer/windows-explorer.js'),
        import('../programs/internet-explorer/internet-explorer.js'),
        import('../programs/notepad/notepad.js'),
        import('../programs/word-pad/word-pad.js')
    ].reduce(async (ret, module) => define(module), null);
}

function initShortcuts() {
    document.body.append(
        shortcutById('explorer'),
        shortcutById('ie'),
        shortcutById('notepad'),
        shortcutByPath('/Documents/Hungarian CV')
    );
}
