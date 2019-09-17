import { SceneNames, SceneManager } from "./scene-manager";
import { GameScene } from "./game-scene";
import { gameWidth, gameHeight } from "../enviroment/constants";
import { CellData, Cell } from "../components/cell";
import { StartButton } from "../components/buttons/button-start";
import { EndGameMenu } from "./end-game-menu";

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };



export class MinerScene extends GameScene {

    private poleWidth = 9;
    private poleHeight = 9;
    private mines = 10;
    private poleData: Array<Array<CellData>>;
    private cellContainer: PIXI.Container;
    private cells: Array<Array<Cell>>;

    constructor() {
        super(SceneNames.game);
        const backGround: PIXI.Graphics = new PIXI.Graphics();
        backGround.beginFill(0xc0c0c0);
        backGround.lineStyle(3, 0x808080, 1);
        backGround.drawRect(0, 0, gameWidth, gameHeight);
        backGround.endFill();
        this.addChild(backGround);
        this.cellContainer = new PIXI.Container();
        this.addChild(this.cellContainer);

        const buttonPause=new StartButton();
        buttonPause.text='меню';
        buttonPause.on('click',()=>{
            SceneManager.instance.getScene(SceneNames.pause).visible=true;
        })
        this.addChild(buttonPause);
    }

    start() {
        this.cells = new Array<Array<Cell>>();
        super.start();
        this.poleData = this.generatePole(this.poleWidth, this.poleHeight, this.mines);
        this.removeChild(this.cellContainer);
        this.cellContainer = new PIXI.Container();
        this.cellContainer.x=285;
        this.cellContainer.y=150;
        this.addChild(this.cellContainer);

        for (let rows = 0; rows < this.poleHeight; rows++) {
            const row = new Array<Cell>();
            this.cells.push(row);
            for (let cellIdx = 0; cellIdx < this.poleWidth; cellIdx++) {
                const cell = new Cell(this.poleData[rows][cellIdx]);
                cell.row = rows;
                cell.column = cellIdx;
                this.cellContainer.addChild(cell);
                row.push(cell);
                cell.on('change', (data) => { this.checkGameState(data) });
                cell.x = 20 * cellIdx;
                cell.y = 20 * rows;
            }
        }

    }

    stop() {
        super.stop();
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.removeAllListeners();
                if (cell.parent) {
                    cell.parent.removeChild(cell);
                }
            })
        });

    }

    checkGameState(data: { x: number, y: number }) {
        function clickCell(array: Array<Array<Cell>>, point) {
            if (point.x < 0 || point.y < 0 || point.x >= array.length || point.y >= array[0].length) {
                return;
            }
            const cell = array[point.x][point.y];
            if (cell) {
                cell.click();
            }
        }

        //check neigbor cells
        let cell = this.cells[data.x][data.y];
        if (cell.digit == 0 && !cell.mine) {
            const rowIdx = data.x;
            const cellIdx = data.y;
            // setTimeout(() => {
                clickCell(this.cells, { x: rowIdx - 1, y: cellIdx - 1 });
                clickCell(this.cells, { x: rowIdx - 1, y: cellIdx });
                clickCell(this.cells, { x: rowIdx - 1, y: cellIdx + 1 });
                clickCell(this.cells, { x: rowIdx, y: cellIdx - 1 });
                clickCell(this.cells, { x: rowIdx, y: cellIdx + 1 });
                clickCell(this.cells, { x: rowIdx + 1, y: cellIdx - 1 });
                clickCell(this.cells, { x: rowIdx + 1, y: cellIdx });
                clickCell(this.cells, { x: rowIdx + 1, y: cellIdx + 1 });
            // }, 10);
        }

        let win = true;
        let lose = false;
        for (let row = 0; row < this.cells.length; row++) {
            for (let cellIndex = 0; cellIndex < this.cells[0].length; cellIndex++) {
                const cell = this.cells[row][cellIndex];
                if (cell.state == Cell.STATE_OPEN && cell.mine) {
                    lose = true;
                }
                if (cell.state == Cell.STATE_CLOSED || cell.state == Cell.STATE_QUESTION || (cell.state == Cell.STATE_FLAGGED && !cell.mine)) {
                    win = false;
                }
            }
        }
        if (lose) {
            console.log('lose');
            (SceneManager.instance.switch(SceneNames.endGame) as EndGameMenu).setWin(false);
        } else if (win) {
            console.log('win');
            (SceneManager.instance.switch(SceneNames.endGame) as EndGameMenu).setWin(true);
        }
    }

    generatePole(width: number, height: number, mines: number): Array<Array<CellData>> {
        function addDigit(array, point) {
            if (point.x < 0 || point.y < 0 || point.x >= array.length || point.y >= array[0].length) {
                return;
            }
            const cell = array[point.x][point.y];
            if (cell) {
                cell.digit += 1;
            }
        }
        let result: Array<Array<CellData>> = new Array<Array<CellData>>();
        let minesRemaining = mines;
        for (let rows = 0; rows < height; rows++) {
            const row: Array<CellData> = new Array<CellData>();
            result.push(row);
            for (let cell = 0; cell < width; cell++) {
                row.push({ digit: 0, mine: false });
            }
        }

        while (minesRemaining > 0) {
            let minePosition: { x: number, y: number } = {
                x: Math.floor(height * Math.random()),
                y: Math.floor(width * Math.random())
            }
            const cell = result[minePosition.x][minePosition.y]
            if (cell && !cell.mine) {
                cell.mine = true;
                --minesRemaining;
                addDigit(result, { x: minePosition.x - 1, y: minePosition.y - 1 });
                addDigit(result, { x: minePosition.x, y: minePosition.y - 1 });
                addDigit(result, { x: minePosition.x + 1, y: minePosition.y - 1 });
                addDigit(result, { x: minePosition.x - 1, y: minePosition.y });
                // addDigit(result,{x:minePosition.x,y:minePosition.y});
                addDigit(result, { x: minePosition.x + 1, y: minePosition.y });
                addDigit(result, { x: minePosition.x - 1, y: minePosition.y + 1 });
                addDigit(result, { x: minePosition.x, y: minePosition.y + 1 });
                addDigit(result, { x: minePosition.x + 1, y: minePosition.y + 1 });

            }
        }


        return result;
    }

}