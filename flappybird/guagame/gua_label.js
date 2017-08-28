/**
 * Created by lijunchao on 2017/8/24.
 */
class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        this.game.context.font = '20pt Calibri';
        this.game.context.fillStyle = 'blue';
        this.game.context.fillText('score ：' + this.text, 20, 30)
    }
    update() {

    }
}
