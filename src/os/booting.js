import {addProgram} from './programs.js';

await Promise.all([new Promise(resolve => setTimeout(resolve, 3000)), initPrograms()]);
document.body.querySelector('#booting').remove();

function initPrograms() {
    return ['internet-explorer', 'pdf-reader'].reduce(async (ret, id) => {
        ret = import(`../programs/${id}.js`);

        addProgram({id, ...(await ret).default});

        return ret;
    }, null);
}
