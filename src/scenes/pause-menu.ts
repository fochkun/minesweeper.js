import { SceneNames, SceneManager } from "./scene-manager";
import { GameScene } from "./game-scene";
import { GAME_WIDTH, GAME_HEIGHT } from "../enviroment/constants";
import { StartButton } from "../components/buttons/button-start";

export class PauseScene extends GameScene {
    constructor(){
        super(SceneNames.pause);
        const backGround: PIXI.Graphics = new PIXI.Graphics();
        backGround.beginFill(0xc0c0c0);
        backGround.lineStyle(3, 0x808080, 1);
        backGround.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        backGround.endFill();
        this.addChild(backGround);

        const buttonHome=new StartButton();
        buttonHome.text='выход';
        buttonHome.y=-100;
        buttonHome.on('click',()=>{
            // this.visible=false;
            this._sceneManager.pause(this.key);
            this._sceneManager.switch(SceneNames.main);
        })
        this.addChild(buttonHome);

        const buttonContinue=new StartButton(215);
        buttonContinue.text='продолжить';
        buttonContinue.y=0;
        buttonContinue.x=-40;
        buttonContinue.on('click',()=>{
            this.visible=false;
        })
        this.addChild(buttonContinue);
    }
}