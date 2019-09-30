export class StartButton extends PIXI.Sprite {

    private _text:PIXI.Text;
    constructor(width=140) {
        super();
        const graphics = this.drawButton(width);
        const basicText = this._text = this.setText('#ffffff',37,18);
        this.addChild(graphics);
        graphics.addChild(basicText)
        this.interactive=true;
        this.buttonMode=true;
    }

    private drawButton(width:number):PIXI.Graphics{
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0x650A5A, 0.25);
        graphics.drawRoundedRect(0, 0, width, 70, 16);
        graphics.x=300;
        graphics.y=400;
        graphics.endFill();
        return graphics;
    }

    setText(fill:string,x:number,y:number):PIXI.Text{
        const basicText = this._text = new PIXI.Text('старт',{fill});
        basicText.x = x;
        basicText.y = y;
        return basicText
    }

    set text(val:string){
        this._text.text=val;
    }
}