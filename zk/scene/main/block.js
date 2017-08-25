var Block = function(game, position) {
    // positon 是 [0, 0] 格式
    var p = position
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function() {
        log('kill block!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        var level_key = 'level' + game.level
        var bks = []
        var coordinate = JSON.parse(localStorage.getItem(level_key))||[]
        var x = o.x
        var y = o.y
        var xy = [x,y]
        // log('kill x,y, ',x,y)
        if (coordinate != []) {
            for (var i = 0; i < coordinate.length; i++) {
                var t = coordinate[i]
                // log('kill t,',t,typeof t,t != xy)
                if (t[0] != xy[0] || t[1] != xy[1]) {
                    bks.push(t)
                }
            }
        }
        // log('kill bks, ',bks)
        localStorage.setItem(level_key,JSON.stringify(bks))
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function(b) {
        // log('block', o.alive, b)
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
