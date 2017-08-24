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
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'plane')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
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
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)

    }
    update() {
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

    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnermies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
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
    }
}
