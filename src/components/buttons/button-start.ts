export class StartButton extends PIXI.Sprite {

    private _text:PIXI.Text;
    constructor(width=140) {
        super();
        const graphics = new PIXI.Graphics();
        this.interactive=true;
        this.buttonMode=true;
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0x650A5A, 0.25);
        graphics.drawRoundedRect(0, 0, width, 70, 16);
        graphics.x=300;
        graphics.y=400;
        graphics.endFill();
        
        const basicText = this._text = new PIXI.Text('старт',{fill:'#ffffff'});
        basicText.x = 37;
        basicText.y = 18;

        
        this.addChild(graphics);
        graphics.addChild(basicText)
    }

    set text(val:string){
        this._text.text=val;
    }
}