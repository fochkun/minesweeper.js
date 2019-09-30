import { GameScene } from "./game-scene";
import { SceneNames, SceneManager } from "./scene-manager";
import { GAME_WIDTH, GAME_HEIGHT } from "../enviroment/constants";
import { StartButton } from "../components/buttons/button-start";

export class EndGameMenu extends GameScene {
    private winText: PIXI.Text;
    constructor() {
        super(SceneNames.endGame);
        const backGround: PIXI.Graphics = new PIXI.Graphics();
        backGround.beginFill(0xc0c0c0);
        backGround.lineStyle(3, 0x808080, 1);
        backGround.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        backGround.endFill();
        this.addChild(backGround);

        const buttonHome = new StartButton();
        buttonHome.text = 'выход';
        buttonHome.on('click', () => {
            this.switchScene();
        })
        this.addChild(buttonHome);

        const basicText = this.winText = new PIXI.Text('Победа', { fill: '#000000' });
        basicText.x = 300;
        basicText.y = 180;
        this.addChild(basicText);
    }

    switchScene() {
        this.visible = false;
        this._sceneManager.switch(SceneNames.main);
    }

    setWin(isWin = true) {
        if (isWin) {
            this.winText.text = 'Победа';
        } else {
            this.winText.text = 'Поражение';
        }
    }
}