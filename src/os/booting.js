import {define} from './programs.js';
import Shortcut from './Shortcut.js';

await Promise.all([new Promise(resolve => setTimeout(resolve, 3000)), initPrograms()]);
initShortcuts();
document.body.querySelector('#booting').remove();

function initPrograms() {
    return [
        'internet-explorer',
        'pdf-reader'
    ].reduce(async (ret, id) => {
        ret = import(`../programs/${id}/${id}.js`);

        define({id, ...(await ret).default});

        return ret;
    }, null);
}

function initShortcuts() {
    new Shortcut(
        {
            id: 'pdf-reader',
            name: 'Önéletrajz'
        },
        {
            name: 'Önéletrajz',
            path: 'files/cv_hun'
        });
}
