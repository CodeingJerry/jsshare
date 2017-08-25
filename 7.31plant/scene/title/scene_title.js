class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)
        var b = GuaAnimation.new(game)
        b.x = 200
        b.y = 500
        this.b = b
        this.addElement(b)
        this.setupInputs()
        // var ps = GuaParticleSystem.new(game)
        // this.addElement(ps)
        // game.registerAction('k', function(){
        //     var s = Scene(game)
        //     game.replaceScene(s)
        // })
    }
    setupInputs() {
        var self = this
        // self.game.registerAction('a', function () {
        //     self.b.move(-5)
        // })
        self.game.registerAction('a', function (keyStatus) {
            self.b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.b.move(2, keyStatus)
        })

    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
