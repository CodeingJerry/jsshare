class Pipes {
    constructor(game) {
        this.game = game
        //    为了省事，硬编码一套动画
        this.pipes = []
        this.pipeSpace = 150
        this.gs = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.gs
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.gs = config.gs.value
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        this.debug && this.debug()
        for (var i = 0; i < this.pipes.length / 2; i+=2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.gs * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.gs * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2);
            var scaleX = p.flipx ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY);
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2);
            context.drawImage(p.texture, 0, 0);
            context.restore()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'hello')
        // this.addElement(label)
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        var pp = Pipes.new(game)
        this.addElement(pp)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 22; i++) {
            var g = GuaImage.new(game, 'land')
            g.x = i * 21
            g.y = 500
            this.addElement(g)
            this.grounds.push(g)
        }
        this.birdspeed = 2
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
            self.b.move(-self.birdspeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.b.move(self.birdspeed, keyStatus)
        })
        self.game.registerAction('s', function (keyStatus) {
            self.b.jump()
        })

    }
    debug() {
        this.birdspeed = config.birdspeed.value
    }
    update() {
        this.debug && this.debug()
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
