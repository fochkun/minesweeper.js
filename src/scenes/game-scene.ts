import * as PIXI from 'pixi.js'

export class GameScene extends PIXI.Container{
    constructor(protected _key:string){
        super();
    }
    public get key():string{
        return this._key;
    }

    public start(){

    }
    public stop(){
        
    }
}