/**
 * Created by ljc on 2017/8/28.
 */
class SceneStart extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('b', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.font = '20pt Calibri';
        this.game.context.fillStyle = 'blue';
        this.game.context.fillText('玩家您好，按 b 开始游戏', 60, 290)
    }
}
