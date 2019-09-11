
export const SceneNames={
    main:'main',
    game:'game',
    pause:'pause_menu',
    endGame:'end_game_menu',
}

export class SceneManager {
    private static _instance:SceneManager;
    private _sceneList:Array<any>=[];
    private _currentScene:any;
    constructor(){
        if (SceneManager._instance==undefined){
            SceneManager._instance=this;
        }
    }
    public static instance():SceneManager{
        if (SceneManager._instance == undefined){
            return new SceneManager();
        }
        return SceneManager._instance;
    }

    getScene(key:string):any{
        return this._sceneList.find(value=>value.key==key);
    }

    public add(scene){
        if (this._sceneList.length==0){
            this._currentScene=scene;
        }
        this._sceneList.push(scene);

    }

    public switch(key){
        let scene=this.getScene(key);
        if (scene){
            if (this._currentScene){
                this._currentScene.stop();
            }
            this._currentScene=scene;
            scene.start();

        }

    }

}