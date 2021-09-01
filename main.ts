namespace SpriteKind {
    export const ship = SpriteKind.create()
    export const border = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vy += -5
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vx += -5
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Ship.vx += 5
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
let TopLondon: Sprite = null
let ToVenus: Sprite = null
let ToMars: Sprite = null
let ToMoon: Sprite = null
let BottomMoon: Sprite = null
let Ship: Sprite = null
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
        Ship.setPosition(129, 79)
        ToMoon.setImage(assets.image`Edge`)
        ToMoon.setPosition(148, 3)
    }
    if (Ship.overlapsWith(ToMars)) {
        setScene(4)
        Ship.setPosition(33, 49)
        ToMoon.setImage(assets.image`Edge`)
        ToMoon.setPosition(4, 51)
    }
    if (Ship.overlapsWith(ToMoon)) {
        setScene(2)
        Ship.setPosition(129, 79)
        ToVenus.setImage(assets.image`Edge`)
        ToVenus.setPosition(3, 2)
        ToMars.setImage(assets.image`Edge`)
        ToMars.setPosition(157, 0)
        BottomMoon.setImage(assets.image`myImage`)
        BottomMoon.setPosition(3, 109)
    }
})
