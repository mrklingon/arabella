namespace SpriteKind {
    export const ship = SpriteKind.create()
    export const border = SpriteKind.create()
    export const debris = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vy += -5
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    cannonball = sprites.create(assets.image`cannonball`, SpriteKind.Projectile)
    cannonball.setPosition(Ship.x, Ship.x)
    cannonball.follow(Villain, 200)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vx += -5
})
function mkRocks () {
    for (let index = 0; index < randint(2, 5); index++) {
        rock = sprites.create(Asteroids[randint(0, 3)], SpriteKind.debris)
        rock.setVelocity(randint(-50, 50), randint(-50, 50))
        rock.setPosition(randint(30, 50), randint(30, 50))
        rock.setFlag(SpriteFlag.DestroyOnWall, true)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vx += 5
})
function mkFrench () {
    for (let index = 0; index < randint(0, 2); index++) {
        Villain = sprites.create(assets.image`French`, SpriteKind.Enemy)
        Villain.follow(Ship, 10)
        Villain.setPosition(randint(0, 100), randint(30, 50))
        Villain.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(5)
})
function clearBorders () {
    ToMars.setImage(assets.image`blah`)
    ToMoon.setImage(assets.image`blah`)
    TopLondon.setImage(assets.image`blah`)
    ToVenus.setImage(assets.image`blah`)
    BottomMoon.setImage(assets.image`blah`)
}
let XRG = 0
let XLG = 0
let YBG = 0
let YTG = 0
let East = 0
let West = 0
let Ceiling = 0
let Floor = 0
let rock: Sprite = null
let Villain: Sprite = null
let cannonball: Sprite = null
let TopLondon: Sprite = null
let ToVenus: Sprite = null
let ToMars: Sprite = null
let ToMoon: Sprite = null
let BottomMoon: Sprite = null
let Ship: Sprite = null
let Asteroids: Image[] = []
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
setScene(1)
game.onUpdateInterval(500, function () {
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
        mkFrench()
        mkRocks()
        Ship.setPosition(129, 79)
        ToVenus.setImage(assets.image`Edge`)
        ToVenus.setPosition(3, 2)
        ToMars.setImage(assets.image`Edge`)
        ToMars.setPosition(157, 0)
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
