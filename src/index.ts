import * as PIXI from 'pixi.js';
import { SceneManager } from './scenes/scene-manager';
import { MainScene } from './scenes/main';
import { MinerScene } from './scenes/miner-game';
import { PauseScene } from './scenes/pause-menu';
import { EndGameMenu } from './scenes/end-game-menu';

const app = new PIXI.Application();
document.body.appendChild(app.view);

SceneManager.instance.game=app;

SceneManager.instance.add(new MainScene())
    .add(new MinerScene())
    .add(new PauseScene())
    .add(new EndGameMenu());

// app.ticker.add(() => {
//     console.log('ticker');
// });