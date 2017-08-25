var Scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

    // var blocks = loadLevel(game, 1)
    // log('$$$$$$$$$$$$$$$$$$$$$$$$$$$,blocks, ', blocks)

    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })

    s.draw = function() {
        var blocks = loadLevel(game, 1)
        // draw 背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        // log('########################### draw blocks, ',blocks)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = function() {
        var blocks = loadLevel(game, 1)
        if (window.paused) {
            return
        }

        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到 游戏结束 的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                ball.反弹()
                // 更新分数
                score += 100
            }
        }
    }

    // edit block
    game.canvas.addEventListener('click', function(event){
        var level_key = 'level' + game.level
        var bks = JSON.parse(localStorage.getItem(level_key))||[]
        // var coordinate = JSON.parse(localStorage.getItem(level_key))||[]
        var x = event.offsetX
        var y = event.offsetY
        // if (coordinate.length != 0) {
        //     for (var i = 0; i < coordinate.length; i++) {
        //         var t = coordinate[i]
        //         if (t[0] == x && t[1] == y) {
        //             continue
        //         }
        //         bks.push([x,y])
        //     }
        // }else {
        //     bks.push([x,y])
        // }
        bks.push([x,y])
        log('level block length, ',bks.length)
        localStorage.setItem(level_key,JSON.stringify(bks))
        log('@@@localStorage level1, ',level_key,JSON.parse(localStorage.getItem(level_key)))
    })
    
    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, event)
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            log(x, y, 'drag')
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })

    return s
}
