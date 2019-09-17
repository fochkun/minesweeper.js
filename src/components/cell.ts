export interface CellData {
    mine: boolean;
    digit: number;
}

export class Cell extends PIXI.Container {

    public row:number;
    public column:number;
    public static readonly STATE_CLOSED = 'closed';
    public static readonly STATE_OPEN = 'open';
    public static readonly STATE_FLAGGED = 'flagged';
    public static readonly STATE_QUESTION = 'question';
    protected static readonly STATES = [Cell.STATE_CLOSED, Cell.STATE_FLAGGED, Cell.STATE_QUESTION];
    protected static readonly STATE_COMCARATION = {
        'closed': 'cell_closed',
        'flagged': 'cell_flagged',
        'question': 'cell_question'
    }

    private _mine = false;
    private _digit = 0;
    private _state = Cell.STATE_CLOSED;
    private topLayer: PIXI.Sprite;
    private bottomLayer: PIXI.Sprite;
    constructor(data: CellData) {
        super();
        this._mine = data.mine;
        this._digit=data.digit;

        let texture: PIXI.Texture;
        if (data.mine) {
            texture = PIXI.Texture.fromImage('mine_revealed');

        } else {
            texture = PIXI.Texture.fromImage('open' + data.digit);
        }
        this.bottomLayer = new PIXI.Sprite(texture);
        this.addChild(this.bottomLayer);
        this.topLayer = new PIXI.Sprite(PIXI.Texture.fromImage(Cell.STATE_COMCARATION.closed));
        this.addChild(this.topLayer);
        this.on('rightclick', () => { this.rightClick() })
        this.on('click', () => { this.click() });
        this.interactive = true;
        this.buttonMode = true;
    }

    public get digit(): number {
        return this._digit;
    }
    public get mine(): boolean {
        return this._mine;
    }

    public get state(): string {
        return this._state;
    }

    public endGame() {
        this.topLayer.visible=false;
    }

    public click() {
        if (this._state !== Cell.STATE_FLAGGED && this._state!==Cell.STATE_OPEN) {
            this.open();
        }
    }

    public open(){
        this._state = Cell.STATE_OPEN;
        this.renderState();
    }

    private rightClick() {
        if (this._state !== Cell.STATE_OPEN) {
            let stateIndex = Cell.STATES.indexOf(this._state);
            if (stateIndex != -1) {
                stateIndex = stateIndex + 1 >= Cell.STATES.length ? 0 : ++stateIndex;
                this._state = Cell.STATES[stateIndex];
            }


        }
        this.renderState();
    }

    private renderState() {
        this.emit('change',{x:this.row,y:this.column});
        if (this._state == Cell.STATE_OPEN) {
            this.topLayer.visible=false;
        } else {
            let texture = Cell.STATE_COMCARATION[this._state];
            if (texture) {
                this.topLayer.texture=PIXI.Texture.fromImage(texture);
            }
        }

    }


}