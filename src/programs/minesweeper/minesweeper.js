import Window from '../../os/window.js';

export default class Minesweeper extends Window {
    #height = 9;
    #mines = 10;
    #table;
    #width = 9;

    constructor() {
        super();

        this.#start();
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

    #start(height = this.#height, width = this.#width, mines = this.#mines) {
        const cells = [];

        this.#height = height;
        this.#mines = mines;
        this.#width = width;
        this.#table = [];
        this.querySelector('tbody').replaceChildren(...[...Array(width).keys()].map(() => {
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

    //<editor-fold desc="Config">
    // static get disableResize() {
    //     return true;
    // }

    static get icon() {
        return 'minesweeper';
    }

    static get id() {
        return 'minesweeper';
    }

    static get name() {
        return 'Minesweeper';
    }

    static get once() {
        return true;
    }

    get menu() {
        return [
            {
                children: [
                    {
                        click: () => this.#start(),
                        key: 'N',
                        name: 'New'
                    },
                    null,
                    {
                        click: () => this.#start(9, 9, 10),
                        key: 'B',
                        name: 'Beginner'
                    },
                    {
                        click: () => this.#start(16, 16, 40),
                        key: 'I',
                        name: 'Intermediate'
                    },
                    {
                        click: () => this.#start(24, 24, 99),
                        key: 'E',
                        name: 'Expert'
                    },
                    {
                        key: 'C',
                        name: 'Custom...'
                    },
                    null,
                    {
                        click: () => this.close(),
                        key: 'X',
                        name: 'Exit'
                    }
                ],
                key: 'G',
                name: 'Game'
            },
            {
                key: 'H',
                name: 'Help'
            }
        ];
    }

    get template() {
        return `
            <table>
                <tbody></tbody>
            </table>`;
    }

    //</editor-fold>
}
