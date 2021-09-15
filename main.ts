namespace SpriteKind {
    export const ship = SpriteKind.create()
    export const border = SpriteKind.create()
    export const debris = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vy += -5
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.say("cargo", 500)
    pause(500)
    Ship.say("London" + convertToText(cargo[1]), 1000)
    pause(500)
    Ship.say("Moon" + convertToText(cargo[2]), 1000)
    pause(500)
    Ship.say("Venus" + convertToText(cargo[3]), 1000)
    pause(500)
    Ship.say("Mars" + convertToText(cargo[4]), 1000)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vx += -5
})
function mkRocks () {
    for (let index = 0; index < xr + randint(3, 7); index++) {
        rock = sprites.create(Asteroids[randint(0, 3)], SpriteKind.debris)
        rock.setVelocity(randint(-50, 50), randint(-50, 50))
        rock.setPosition(randint(30, 50), randint(30, 50))
        rock.setFlag(SpriteFlag.DestroyOnWall, true)
    }
    xr = randint(0, 10)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vx += 5
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.debris, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.debris, SpriteKind.ship, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.knock.play()
})
function WallQ (mySprite: Sprite) {
    if (mySprite.y >= Floor) {
        return true
    }
    if (mySprite.y <= Ceiling) {
        return true
    }
    if (mySprite.x <= West) {
        return true
    }
    if (mySprite.x >= East) {
        return true
    }
    return false
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vy += 5
})
sprites.onOverlap(SpriteKind.debris, SpriteKind.debris, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
})
function setScene (num: number) {
    clearBorders()
    Scene = num
    // earth
    if (num == 1) {
        scene.setBackgroundImage(assets.image`London`)
        Ship.setPosition(23, 109)
        Ship.setVelocity(0, 0)
        Ship.setStayInScreen(true)
        YTG = 0
        YBG = 3
        XLG = 0
        XRG = 0
        Floor = 109
        Ceiling = 10
        West = 10
        East = 150
        TopLondon = sprites.create(assets.image`myImage`, SpriteKind.border)
        TopLondon.setPosition(71, 3)
    }
    // moon
    // 
    if (num == 2) {
        scene.setBackgroundImage(assets.image`Moon`)
        Ship.setPosition(82, 93)
        Ship.setVelocity(0, 0)
        Ship.setStayInScreen(true)
        YTG = 3
        YBG = 0
        XLG = 3
        XRG = 0
        Floor = 109
        Ceiling = 10
        West = 10
        East = 150
        ToMars.setImage(assets.image`Edge`)
        ToVenus.setImage(assets.image`Edge`)
        ToMars.setPosition(152, 120)
        ToVenus.setPosition(2, 120)
        BottomMoon.setImage(assets.image`myImage`)
        BottomMoon.setPosition(74, 105)
    }
    // venus
    if (num == 3) {
        scene.setBackgroundImage(assets.image`Venus`)
        Ship.setPosition(66, 9)
        Ship.setVelocity(0, 0)
        Ship.setStayInScreen(true)
        YTG = 0
        YBG = 3
        XLG = 3
        XRG = 0
        Floor = 109
        Ceiling = 10
        West = 10
        East = 150
        ToMoon.setImage(assets.image`Edge`)
        ToMoon.setPosition(146, 49)
    }
    // mars
    if (num == 4) {
        scene.setBackgroundImage(assets.image`Mars`)
        Ship.setPosition(19, 35)
        Ship.setVelocity(0, 0)
        Ship.setStayInScreen(true)
        YTG = 3
        YBG = 0
        XLG = 0
        XRG = 3
        Floor = 109
        Ceiling = 10
        West = 10
        East = 150
        ToMoon.setImage(assets.image`myImage`)
        ToMoon.setPosition(4, 1)
    }
}
function setCargo () {
    cargo = [
    0,
    0,
    randint(0, 10),
    randint(0, 10),
    randint(0, 10)
    ]
}
function chkDest () {
    Location = ""
    sx = Ship.x
    sy = Ship.y
    if (Scene == 1) {
        if (sx < 40 && sy > 100) {
            Location = "London"
            info.changeScoreBy(cargo[Scene])
            cargo[Scene] = 0
            setCargo()
        }
    }
    if (Scene == 2) {
        if (sx < 40 && sy < 30) {
            Location = "Moon"
            info.changeScoreBy(cargo[Scene])
            cargo[Scene] = 0
            cargo[1] = NextLondon + cargo[1]
            NextLondon = 0
        }
    }
    if (Scene == 3) {
        if (sx < 40 && sy > 69) {
            Location = "Venus"
            info.changeScoreBy(cargo[Scene])
            cargo[Scene] = 0
            cargo[1] = NextLondon + cargo[1]
            NextLondon = 0
        }
    }
    if (Scene == 4) {
        if (sx > 120 && sy < 54) {
            Location = "Mars"
            info.changeScoreBy(cargo[Scene])
            cargo[Scene] = 0
            cargo[1] = NextLondon + cargo[1]
            NextLondon = 0
        }
    }
    if (Location != "") {
        Ship.say(Location, 1000)
    } else {
        NextLondon = randint(5, 15)
    }
}
function clearBorders () {
    ToMars.setImage(assets.image`blah`)
    ToMoon.setImage(assets.image`blah`)
    TopLondon.setImage(assets.image`blah`)
    ToVenus.setImage(assets.image`blah`)
    BottomMoon.setImage(assets.image`blah`)
}
let sy = 0
let sx = 0
let Location = ""
let XRG = 0
let XLG = 0
let YBG = 0
let YTG = 0
let Scene = 0
let East = 0
let West = 0
let Ceiling = 0
let Floor = 0
let rock: Sprite = null
let cargo: number[] = []
let NextLondon = 0
let TopLondon: Sprite = null
let ToVenus: Sprite = null
let ToMars: Sprite = null
let ToMoon: Sprite = null
let BottomMoon: Sprite = null
let Ship: Sprite = null
let Asteroids: Image[] = []
let xr = 0
game.splash("Carry cargo to the Moon, Venus and Mars - and back to London!")
xr = 1
let first = 1
setCargo()
info.setLife(10)
Asteroids = [
assets.image`Asteroid1`,
assets.image`Asteroid2`,
assets.image`Asteroid1`,
assets.image`Asteroid2`
]
Ship = sprites.create(assets.image`ship`, SpriteKind.ship)
BottomMoon = sprites.create(assets.image`blah`, SpriteKind.border)
ToMoon = sprites.create(assets.image`blah`, SpriteKind.border)
ToMars = sprites.create(assets.image`blah`, SpriteKind.border)
ToVenus = sprites.create(assets.image`blah`, SpriteKind.border)
TopLondon = sprites.create(assets.image`blah`, SpriteKind.border)
let MarsIMG = sprites.create(assets.image`blah`, SpriteKind.border)
let MoonIMG = sprites.create(assets.image`blah`, SpriteKind.border)
let VenusIMG = sprites.create(assets.image`blah`, SpriteKind.border)
NextLondon = randint(5, 15)
setScene(1)
game.onUpdateInterval(500, function () {
    chkDest()
    if (Ship.vx > 0) {
        Ship.setImage(assets.image`ship`)
    }
    if (Ship.vx < 0) {
        Ship.setImage(assets.image`ship1`)
    }
    if (WallQ(Ship)) {
        Ship.setVelocity(0, 0)
    } else {
        Ship.vy += YBG
        Ship.vy += -1 * YTG
        Ship.vx += XRG
        Ship.vx += -1 * XLG
    }
    if (Ship.overlapsWith(TopLondon)) {
        setScene(2)
        if (1 == first) {
            game.splash("Venus is to your left, Mars to your right")
            first = 0
        }
        mkRocks()
        Ship.setPosition(129, 79)
        ToVenus.setImage(assets.image`Edge`)
        ToVenus.setPosition(3, 2)
        ToMars.setImage(assets.image`Edge`)
        ToMars.setPosition(157, 0)
        MoonIMG.setImage(assets.image`MoonPic`)
        MoonIMG.setPosition(0, 0)
    }
    if (Ship.overlapsWith(BottomMoon)) {
        setScene(1)
        Ship.setPosition(68, 12)
        TopLondon.setImage(assets.image`myImage`)
        BottomMoon.setImage(assets.image`blah`)
    }
    if (Ship.overlapsWith(ToVenus)) {
        setScene(3)
        mkRocks()
        Ship.setPosition(129, 79)
        ToMoon.setImage(assets.image`Edge`)
        ToMoon.setPosition(148, 3)
    }
    if (Ship.overlapsWith(ToMars)) {
        mkRocks()
        setScene(4)
        Ship.setPosition(33, 49)
        ToMoon.setImage(assets.image`Edge`)
        ToMoon.setPosition(4, 51)
    }
    if (Ship.overlapsWith(ToMoon)) {
        setScene(2)
        mkRocks()
        Ship.setPosition(129, 79)
        ToVenus.setImage(assets.image`Edge`)
        ToVenus.setPosition(3, 2)
        ToMars.setImage(assets.image`Edge`)
        ToMars.setPosition(157, 0)
        BottomMoon.setImage(assets.image`myImage`)
        BottomMoon.setPosition(3, 109)
    }
})
