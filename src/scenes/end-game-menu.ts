import { GameScene } from "./game-scene";
import { SceneNames } from "./scene-manager";

export class EndGameMenu extends GameScene {
    constructor(){
        super(SceneNames.endGame);
    }
}