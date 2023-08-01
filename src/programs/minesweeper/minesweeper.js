import {radioMenuItems} from '../../common/menu-builder.js';
import Window from '../../os/window.js';

export default class Minesweeper extends Window {
    #board = document.createElement('tbody');
    #face = document.createElement('button');
    #height;
    #hiddenCells;
    #interval;
    #mineNumbers = [...new Array(3)].map(() => document.createElement('div'));
    #mines;
    #mouseup;
    #table;
    #time;
    #timerNumbers = [...new Array(3)].map(() => document.createElement('div'));
    #width;

    constructor() {
        super();

        this.#initMenu();
        this.#initContent();

        this.main.classList.add('no-border');
        this.#build(9, 9, 10);
    }

    close(returnValue) {
        clearInterval(this.#interval);
        super.close(returnValue);
    }

    #boom() {
        clearInterval(this.#interval);
        this.#face.classList.add('dead');
        this.#mouseup = () => {};
        this.#table.forEach(row => row.forEach(cell => {
            if (cell.dataset.value === 'MINE') {
                this.#revealCell(cell);
            }
        }));
    }

    #build(height = this.#height, width = this.#width, mines = this.#mines) {
        clearInterval(this.#interval);

        this.#face.classList.remove('dead', 'win');
        this.#height = height;
        this.#hiddenCells = new Set();
        this.#interval = null;
        this.#mines = mines;
        this.#mouseup = this.#start;
        this.#table = [];
        this.#time = 0;
        this.#width = width;
        this.#setNumbers(mines, this.#mineNumbers);
        this.#setNumbers(this.#time, this.#timerNumbers);
        this.#board.replaceChildren(...[...Array(width).keys()].map(() => {
            const row = [];
            const tr = document.createElement('tr');

            this.#table.push(row);
            tr.append(...[...Array(height).keys()].map(() => {
                const td = document.createElement('td');

                td.addEventListener('mouseup', event => this.#mouseup(event, td));
                td.classList.add('hidden');
                this.#hiddenCells.add(td);
                row.push(td);

                return td;
            }));

            return tr;
        }));
    }

    #checkWin() {
        if (this.#hiddenCells.size === this.#mines) {
            clearInterval(this.#interval);
            this.#face.classList.add('win');
            this.#mouseup = () => {};
            [...this.#hiddenCells.values()].forEach(cell => cell.classList.add('flag'));
        }
    }

    #initContent() {
        this.#face.classList.add('face');
        [...this.#mineNumbers, ...this.#timerNumbers].forEach(element => element.classList.add('number'));

        this.initContent`
            <div class="info">
                <div class="number-block">
                    ${this.#mineNumbers}
                </div>
                ${this.#face}
                <div class="number-block">
                    ${this.#timerNumbers}
                </div>
            </div>
            <table>
                ${this.#board}
            </table>`;
    }

    #initMenu() {
        this.initMenu([
            {
                children: [
                    {
                        click: () => this.#build(),
                        key: 'N',
                        name: 'New'
                    },
                    null,
                    ...radioMenuItems({},
                        {
                            click: () => this.#build(9, 9, 10),
                            key: 'B',
                            name: 'Beginner'
                        },
                        {
                            click: () => this.#build(16, 16, 40),
                            key: 'I',
                            name: 'Intermediate'
                        },
                        {
                            click: () => this.#build(24, 24, 99),
                            key: 'E',
                            name: 'Expert'
                        },
                        {
                            key: 'C',
                            name: 'Custom...'
                        }
                    ),
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
        ]);
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

    #reveal(event, cell) {
        if (this.#hiddenCells.has(cell)) {
            switch (event.button) {
                case 0:
                    this.#revealCell(cell);

                    switch (cell.dataset.value) {
                        case '0':
                            this.#iterateNeighbours(cell, neighbour => this.#mouseup(event, neighbour));
                            this.#checkWin();
                            break;
                        case 'MINE':
                            cell.classList.add('boom');
                            this.#boom();
                            break;
                        default:
                            this.#checkWin();
                    }
                    break;
                case 2:
                    cell.classList.toggle('flag');
                    this.#setNumbers(this.#mines - this.#board.querySelectorAll('td.flag').length, this.#mineNumbers);
            }
        }
    }

    #revealCell(cell) {
        cell.classList.remove('flag', 'hidden');
        this.#hiddenCells.delete(cell);
    }

    #setNumbers(value, numbers) {
        value = `${Math.max(value, 0)}`.padStart(3, '0').slice(-3);
        numbers.forEach((number, index) => number.dataset.value = value[index]);
    }

    #start(event, cell) {
        if (event.button) {
            return;
        }

        const cells = [...this.#board.querySelectorAll('td')];

        cells.splice(cells.indexOf(cell), 1);
        for (let i = 0; i++ < this.#mines;) {
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

        this.#interval = setInterval(() => this.#setNumbers(++this.#time, this.#timerNumbers), 1000);
        this.#mouseup = this.#reveal;
        this.#reveal(event, cell);
    }

    //<editor-fold desc="Config">
    static get disableResize() {
        return true;
    }

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

    get titleBarButtons() {
        return {
            maximize: 'DISABLED'
        };
    }

    //</editor-fold>
}
