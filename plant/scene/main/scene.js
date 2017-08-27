const config = {
    player_speed: 10,
    bullet_speed : 5,
    cloud_speed : 1,
    cooldown : 8,
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // this.speed = 2
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }

    // 子弹与敌人相撞
    // collide(enemy) {
    //     var a = this
    //     var b = enemy
    //     if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
    //         if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    // collide(enemy) {
    //     ex = this.x > enemy.x && this.x < enemy.x + enemy.width
    //     ey = this.y > enemy.y && this.x < enemy.x + enemy.height
    //     return ex && ey
    // }
}

class Blt extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // this.speed = 2
    }
    update() {
        this.speed = config.bullet_speed
        this.y += this.speed
    }

    // 子弹与敌人相撞
    // collide(enemy) {
    //     var a = this
    //     var b = enemy
    //     if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
    //         if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    // collide(enemy) {
    //     ex = this.x > enemy.x && this.x < enemy.x + enemy.width
    //     ey = this.y > enemy.y && this.x < enemy.x + enemy.height
    //     return ex && ey
    // }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'plane')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
        this.bullets = []
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.bullets.push(b)
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }

    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var ty = randomBetween(1, 3)
        var name = 'enemy' + ty
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.life = true
        this.bullets = []
        this.cooldown = 0
        var r = randomBetween(1, 8)
        if (r == 2) {
            this.enablefired = true
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = 50
            var x = this.x + this.w / 2
            var y = this.y
            var b = Blt.new(this.game)
            b.x = x
            b.y = y
            this.bullets.push(b)
            this.scene.addElement(b)
        }
    }
    draw() {
        if (this.life) {
            this.game.drawImage(this)
        }
        if (this.enablefired) {
            log('enablefired, ', this.enablefired)
            this.fire()
        }

    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown --
        }
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)

    }
    update() {
        this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnermies = 10
        this.bg = GuaImage.new(game, 'background')
        this.cloud = Cloud.new(game, 'cloud')
        this.player = Player.new(game)
        // this.cloud = GuaImage.new(game, 'cloud')
        // this.plane = GuaImage.new(game, 'plane')
        this.player.x = 160
        this.player.y = 450
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addEnemies()
        this.addElement(this.player)
        var ps = GuaParticleSystem.new(this.game)
        log('ps, ', ps)
        this.addElement(ps)
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnermies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
            log('enemy, ',e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }
    update() {
        super.update()
        var enemys = this.enemies
        var p = this.player
        var bullets = p.bullets
        for (var i = 0; i < enemys.length; i++) {
            var e = enemys[i]
            var ebs = e.bullets
            if (e.life) {
                for (var k = 0; k < ebs.length; k++) {
                    var eb = ebs[k]
                    if (collide(eb, p)) {
                        log('敌机子弹与机相撞')
                        var sceneend = SceneEnd.new(this.game)
                        this.game.replaceScene(sceneend)
                    }
                }
                if (collide(p, e)) {
                    log('机机相撞')
                    let ps = GuaParticleSystem.new(this.game)
                    ps.x = p.x
                    ps.y = p.y
                    // log('ps, ', ps)
                    this.addElement(ps)
                    var sceneend = SceneEnd.new(this.game)
                    this.game.replaceScene(sceneend)
                }
                for (var j = 0; j < bullets.length; j++) {
                    var b = bullets[j]
                    if (collide(b, e)) {
                        log('弹机相撞')
                        e.life = false
                        var ps = GuaParticleSystem.new(this.game)
                        ps.x = b.x
                        ps.y = b.y
                        // log('ps, ', ps)
                        this.addElement(ps)
                        // kill 敌机

                    }
                }
            }

        }
    }
}
