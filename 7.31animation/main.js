var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        plane: 'img/plane.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        background: 'img/background.png',
        fire: 'fire.png',
        // 动画
        bird0_0: 'img/birds/bird0_0.png',
        bird0_1: 'img/birds/bird0_1.png',
        bird0_2: 'img/birds/bird0_2.png',
        // 多状态动画
        bird1_0: 'img/blue/bird1_0.png',
        bird1_1: 'img/blue/bird1_1.png',
        bird1_2: 'img/blue/bird1_2.png',
        bird2_0: 'img/red/bird2_0.png',
        bird2_1: 'img/red/bird2_1.png',
        bird2_2: 'img/red/bird2_2.png',
        center: 'img/center.jpg',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
