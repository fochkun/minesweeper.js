import * as PIXI from 'pixi.js'
import { SceneManager } from './scene-manager';

export abstract class GameScene extends PIXI.Container {
    protected _sceneManager: SceneManager;
    constructor(protected _key: string) {
        super();
        this.visible = false;
    }
    public get key(): string {
        return this._key;
    }

    public set sceneManager(value: SceneManager) {
        this._sceneManager = this._sceneManager == undefined ? value : this._sceneManager;
        console.log('set scene manager for',this._key,' sceneManager is:',this._sceneManager);
    }

    public pause() {
        this.visible = false;
    }
    public resume() {
        this.visible = true;
    }

    public start() {
        this.visible = true;
    }
    public stop() {
        this.visible = false;
    }

    public render(delta: number) {

    }
}