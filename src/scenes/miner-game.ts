import { SceneNames } from "./scene-manager";
import { GameScene } from "./game-scene";

export class MinerScene extends GameScene {
    constructor(){
        super(SceneNames.game);
    }
}