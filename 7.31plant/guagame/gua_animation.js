/**
 * Created by lijunchao on 2017/8/24.
 */
class GuaAnimation {
    constructor(game) {
        this.game = game
    //    为了省事，硬编码一套动画
        this.animations = {
            blue: [],
            red: [],
        }
        for (var i = 0; i < 3; i++) {
            var name = `bird1_${i}`
            var t = game.textureByName(name)
            this.animations['blue'].push(t)
        }
        for (var i = 0; i < 3; i++) {
            var name = `bird2_${i}`
            var t = game.textureByName(name)
            this.animations['red'].push(t)
        }
        // this.frames = []
        // for (var i = 0; i < 3; i++) {
        //     var name = `bird0_${i}`
        //     var t = game.textureByName(name)
        //     this.frames.push(t)
        // }
        this.animationName = 'red'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipx = false
        this.frameIndex = 0
        this.frameCount = 5
    }
    frames () {
        return this.animations[this.animationName]
    }
    static new(game) {
        return new this(game)
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 5
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        if (this.flipx) {
            context.save()
            var x = this.x + this.w / 2
            context.translate(x, 0);
            context.scale(-1, 1);
            context.translate(-x, 0);
            context.drawImage(this.texture, this.x, this.y);
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }
    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipx = true
        // } else {
        //     this.flipx = false
        // }
        this.flipx = x < 0
        this.x += x
        log('keyStatus, ', keyStatus)
        var animationNames = {
            down: 'blue',
            up: 'red',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
        // if (keyStatus == 'down') {
        //     this.changeAnimation('blue')
        // } else if (keyStatus == 'up') {
        //     this.changeAnimation('red')
        // }
    }
    changeAnimation(name) {
        this.animationName = name
    }
}