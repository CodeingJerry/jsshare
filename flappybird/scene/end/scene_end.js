class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneStart.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.font = '20pt Calibri';
        this.game.context.fillStyle = 'blue';
        this.game.context.fillText('游戏结束, 按 r 返回标题界面', 60, 290)
    }
}
