/**
 * Created by lijunchao on 2017/8/24.
 */
class GuaAnimation {
    constructor(game) {
        this.game = game
        //    为了省事，硬编码一套动画
        this.animations = {
            idle: [],
            // blue: [],
            // red: [],
        }
        for (var i = 0; i < 3; i++) {
            var name = `bird0_${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        // for (var i = 0; i < 3; i++) {
        //     var name = `bird2_${i}`
        //     var t = game.textureByName(name)
        //     this.animations['red'].push(t)
        // }
        // this.frames = []
        // for (var i = 0; i < 3; i++) {
        //     var name = `bird0_${i}`
        //     var t = game.textureByName(name)
        //     this.frames.push(t)
        // }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipx = false
        this.frameIndex = 0
        this.frameCount = 2
        // 重力加速度
        this.gy = 10
        this.vy = 0
        this.rotation = 0
        this.alpha = 1
    }
    frames () {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -5
        this.rotation = -45
    }
    static new(game) {
        return new this(game)
    }
    update() {
        // 更新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // log('this.alpha, ', this.alpha)
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.08
        var h = 464
        if (this.y > h) {
            this.y = h
        }
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 2
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2);
        if (this.flipx) {
            // context.save()
            // var x = this.x + this.w / 2
            // context.translate(x, 0);
            context.scale(-1, 1);
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2);
        context.drawImage(this.texture, 0, 0);
        context.restore()
    }
    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipx = true
        // } else {
        //     this.flipx = false
        // }
        this.flipx = x < 0
        this.x += x
        // log('keyStatus, ', keyStatus)
        // var animationNames = {
        //     down: 'blue',
        //     up: 'red',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
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