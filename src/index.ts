import * as PIXI from 'pixi.js';

const app = new PIXI.Application();
document.body.appendChild(app.view);

app.ticker.add(() => {
    console.log('ticker');
});