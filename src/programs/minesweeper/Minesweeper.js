import Window from '../../os/Window.js';

// Beginner: 81 tiles, 10 mines
// Intermediate: 256 tiles, 40 mines
// Expert: 480 tiles, 99 mines

export const config = {
    disableResize: true,
    icon: 'minesweeper',
    id: 'minesweeper',
    menu: [],
    name: 'Minesweeper',
    once: true,
    template: `
        <table>
            <tbody></tbody>
        </table>`
};

export default class Minesweeper extends Window {
    #field;
    #height;
    #table;
    #width;

    constructor() {
        super(config);

        this.#field = this.main.querySelector('tbody');
        this.#start(9, 9, 10);
    }

    #boom() {
        this.#table.forEach(row => row.forEach(cell => {
            if (cell.dataset.value === 'MINE') {
                cell.classList.remove('hidden');
            }
        }));
    }

    #iterateNeighbours(cell, fn) {
        const maxX = Math.min(this.#width - 1, cell.cellIndex + 1);
        const maxY = Math.min(this.#height - 1, cell.parentElement.rowIndex + 1);

        for (let x = Math.max(0, cell.cellIndex - 1); x <= maxX; x++) {
            for (let y = Math.max(0, cell.parentElement.rowIndex - 1); y <= maxY; y++) {
                fn(this.#table[y][x], x, y);
            }
        }
    }

    #mouseup(cell) {
        if (cell.classList.contains('hidden')) {
            cell.classList.remove('hidden');

            switch (cell.dataset.value) {
                case '0':
                    this.#iterateNeighbours(cell, neighbour => this.#mouseup(neighbour));
                    break;
                case 'MINE':
                    cell.classList.add('boom');
                    this.#boom();
            }
        }
    }

    #start(height, width, mines) {
        const cells = [];

        this.#height = height;
        this.#width = width;
        this.#table = [];
        this.#field.replaceChildren(...[...Array(width).keys()].map(() => {
            const row = [];
            const tr = document.createElement('tr');

            this.#table.push(row);
            tr.append(...[...Array(height).keys()].map(() => {
                const td = document.createElement('td');

                td.addEventListener('mouseup', this.#mouseup.bind(this, td));
                td.classList.add('hidden');
                cells.push(td);
                row.push(td);

                return td;
            }));

            return tr;
        }));

        for (let i = 0; i++ < mines;) {
            cells.splice(Math.floor(Math.random() * cells.length), 1)[0].dataset.value = 'MINE';
        }

        this.#table.forEach(row => {
            row.forEach(cell => {
                if (cell.dataset.value !== 'MINE') {
                    let count = 0;

                    this.#iterateNeighbours(cell, neighbour => count += +(neighbour.dataset.value === 'MINE'));
                    cell.dataset.value = `${count}`;
                }
            });
        });
    }
}
