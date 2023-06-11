import {define} from './programs.js';
import Shortcut from './Shortcut.js';

await Promise.all([new Promise(resolve => setTimeout(resolve, 3000)), initPrograms()]);
initShortcuts();
document.body.querySelector('#booting').remove();

function initPrograms() {
    return [
        import('../programs/internet-explorer/internet-explorer.js'),
        import('../programs/word-pad/word-pad.js')
    ].reduce(async (ret, program) => {
        define((await program).default);

        return program;
    }, null);
}

function initShortcuts() {
    new Shortcut(
        {
            id: 'word-pad',
            name: 'Önéletrajz'
        },
        {
            name: 'Önéletrajz',
            path: 'files/cv_hun'
        });
}
