import { GameScene } from "./game-scene";

export const SceneNames = {
    main: 'main',
    game: 'game',
    pause: 'pause_menu',
    endGame: 'end_game_menu',
}

export class SceneManager {
    // private static _instance: SceneManager;
    private _sceneList: Array<GameScene> = [];
    private _currentScene: GameScene;
    private _game: PIXI.Application;
    constructor() {
        // if (SceneManager._instance == undefined) {
        //     SceneManager._instance = this;
        // }
    }
    // public static get instance(): SceneManager {
    //     if (SceneManager._instance == undefined) {
    //         return new SceneManager();
    //     }
    //     return SceneManager._instance;
    // }

    public getScene<T extends GameScene = GameScene>(key: string): T {
        return this._sceneList.find(value => value.key == key) as T;
    }

    public add(scene:GameScene): SceneManager {
        scene.sceneManager=this;
        if (this._sceneList.length == 0) {
            this._currentScene = scene;
            scene.start();
        }
        this._sceneList.push(scene);
        if (this._game) {
            this._game.stage.addChild(scene);
        }
        return this;
    }

    public set game(game: PIXI.Application) {
        if (this._game == undefined) {
            this._game = game;
            game.ticker.add(delta => { this.render(delta) });
            this._sceneList.forEach(scene => {
                game.stage.addChild(scene);
            })
        }
    }

    private render(delta) {
        this._currentScene.render(delta);
    }

    public pause(key:string){
        const scene=this.getScene(key);
        if (scene){
            scene.pause();
        }
    }


    public resume(key:string){
        const scene=this.getScene(key);
        if (scene){
            scene.resume();
        }
    }

    public switch<T extends GameScene = GameScene>(key): T {
        let scene = this.getScene(key);
        if (scene) {
            if (this._currentScene) {
                this._currentScene.stop();
            }
            this._currentScene = scene;
            scene.start();
            return scene as T;
        } else {
            throw new Error('cant switch scene');
        }

    }

}