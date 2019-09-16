import { SceneNames } from "./scene-manager";
import { GameScene } from "./game-scene";
import { width, height } from "../enviroment/constants";
import { CellData, Cell } from "../components/cell";

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };



export class MinerScene extends GameScene {

    private poleWidth = 9;
    private poleHeight = 9;
    private mines = 10;
    private poleData: Array<Array<CellData>>;
    private cellContainer:PIXI.Container;

    constructor() {
        super(SceneNames.game);
        const backGround: PIXI.Graphics = new PIXI.Graphics();
        backGround.beginFill(0xc0c0c0);
        backGround.lineStyle(3, 0x808080, 1);
        backGround.drawRect(0, 0, width, height);
        backGround.endFill();
        this.addChild(backGround);
        this.cellContainer=new PIXI.Container();
        this.addChild(this.cellContainer);
    }

    start() {
        super.start();
        this.poleData = this.generatePole(this.poleWidth, this.poleHeight, this.mines);
        console.log('new game data=', this.poleData);
        this.removeChild(this.cellContainer);
        this.cellContainer=new PIXI.Container();
        this.addChild(this.cellContainer);
        
        for (let rows = 0; rows < this.poleHeight; rows++) {
            
            for (let cellIdx = 0; cellIdx < this.poleWidth; cellIdx++) {
                const cell=new Cell(this.poleData[rows][cellIdx]);
                this.cellContainer.addChild(cell);
                cell.x=100+20*cellIdx;
                cell.y=100+20*rows;
            }
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

    render(delta) {
        // console.log('render miner scene ', delta);
    }
}