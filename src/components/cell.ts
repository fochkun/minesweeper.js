export interface CellData {
    mine: boolean;
    digit: number;
}

export class Cell extends PIXI.Container{
    constructor(data:CellData){
        super();
        let texture:PIXI.Texture;
        if (data.mine){
            texture=PIXI.Texture.fromImage('mine_revealed');
            
        } else {
            texture=PIXI.Texture.fromImage('open'+data.digit);
        }
        console.log('texture for cell=',texture)
        this.addChild(new PIXI.Sprite(texture));
    }
}