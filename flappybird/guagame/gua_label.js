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
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}
