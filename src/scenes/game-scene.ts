import * as PIXI from 'pixi.js'

export class GameScene extends PIXI.Container{
    constructor(protected _key:string){
        super();
        this.visible=false;
    }
    public get key():string{
        return this._key;
    }

    public start(){
        this.visible=true;
    }
    public stop(){
        this.visible=false;
        
    }

    public render(delta:number){

    }
}