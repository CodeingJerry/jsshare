class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'hello')
        // this.addElement(label)
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 22; i++) {
            var g = GuaImage.new(game, 'land')
            g.x = i * 21
            g.y = 500
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        var b = GuaAnimation.new(game)
        b.x = 80
        b.y = 200
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
        self.game.registerAction('s', function (keyStatus) {
            self.b.jump()
        })

    }
    update() {
        super.update()
        // 移动地面
        this.skipCount --
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 22; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
