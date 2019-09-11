import { SceneNames } from "./scene-manager";
import { GameScene } from "./game-scene";

export class MainScene extends GameScene {
    constructor(){
        super(SceneNames.main);
    }
}