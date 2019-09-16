export class StartButton extends PIXI.Sprite {

    constructor() {
        super();
        const graphics = new PIXI.Graphics();
        this.interactive=true;
        this.buttonMode=true;
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0x650A5A, 0.25);
        graphics.drawRoundedRect(0, 0, 140, 70, 16);
        graphics.x=200;
        graphics.y=400;
        graphics.endFill();
        
        const basicText = new PIXI.Text('старт',{fill:'#ffffff'});
        basicText.x = 37;
        basicText.y = 18;

        
        this.addChild(graphics);
        graphics.addChild(basicText)
    }
}