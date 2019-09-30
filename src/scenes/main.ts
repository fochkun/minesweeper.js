import { SceneNames, SceneManager } from "./scene-manager";
import { GameScene } from "./game-scene";
import { StartButton } from "../components/buttons/button-start";

export class MainScene extends GameScene {
    private _startButton: StartButton;
    constructor() {
        super(SceneNames.main);

    }

    start() {
        super.start();
        this._startButton = new StartButton();
        this.addChild(this._startButton);
        this._startButton.on('pointerup', this.switchScene)
    }
    stop() {
        super.stop();
        this.removeChild(this._startButton);
        this._startButton.off('pointerup', this.switchScene);
    }
    private switchScene = () => {
        this._sceneManager.switch(SceneNames.game);
    }

}