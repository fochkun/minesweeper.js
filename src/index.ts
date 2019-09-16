import * as PIXI from 'pixi.js';
import { SceneManager } from './scenes/scene-manager';
import { MainScene } from './scenes/main';
import { MinerScene } from './scenes/miner-game';
import { PauseScene } from './scenes/pause-menu';
import { EndGameMenu } from './scenes/end-game-menu';

const app = new PIXI.Application();
document.body.appendChild(app.view);

const loaderContainer: PIXI.Container = new PIXI.Container();
app.stage.addChild(loaderContainer);

const loadingText = new PIXI.Text('Загрузка: 0%', { fill: '#ffffff' });
loadingText.x = 300;
loadingText.y = 440;
loaderContainer.addChild(loadingText);

const loader = new PIXI.loaders.Loader();

loader.add('cell_blank', 'assets/board/blank.gif')
    .add('cell_flagged', 'assets/board/flagged.gif')
    .add('cell_question', 'assets/board/question.gif')

loader.add('face_dead', 'assets/face/facedead.gif')
    .add('face_smile', 'assets/face/facesmile.gif')
    .add('face_win', 'assets/face/facewin.gif')

loader.add('mine_lose', 'assets/mine/minedeath.gif')
    .add('mine_flagged', 'assets/mine/mineisflagged.gif')
    .add('mine_revealed', 'assets/mine/minerevealed.png')

for (let index = 0; index < 9; index++) {
    loader.add('open' + index, 'assets/open/open' + index + '.gif');
}

loader.onProgress.add((event) => { console.log('loading process', event);
loadingText.text='Загрузка: '+Math.round(event.progress)+'%'
});
loader.onLoad.add((event)=>{
    console.log('solmething loaded,',event);
})
loader.onError.add((error) => { 
    debugger;
    console.log('loading error',error) });
loader.onComplete.add((data) => {

    console.log('data loaded',data);
    SceneManager.instance.game = app;

    SceneManager.instance.add(new MainScene())
        .add(new MinerScene())
        .add(new PauseScene())
        .add(new EndGameMenu());
    
    app.stage.removeChild(loaderContainer);
    console.log('loaded',PIXI.loader);
});

loader.load()



// app.ticker.add(() => {
//     console.log('ticker');
// });