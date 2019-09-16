import { SceneNames } from "./scene-manager";
import { GameScene } from "./game-scene";
import { width, height } from "../enviroment/constants";

export class MinerScene extends GameScene {

    constructor(){
        super(SceneNames.game);
        const backGround:PIXI.Graphics=new PIXI.Graphics();
        backGround.beginFill(0xc0c0c0);
        backGround.lineStyle(3, 0x808080, 1);
        backGround.drawRect(0,0,width,height);
        backGround.endFill();
        this.addChild(backGround);
    }

    render(delta){
        console.log('render miner scene ',delta);
    }
}