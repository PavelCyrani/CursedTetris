const element = document.getElementById("canvas")
const ctx = element.getContext("2d")

element.width = window.innerWidth
element.height = window.innerHeight

document.onkeydown = function (event) {
    switch (event.keyCode) {
        //backspace for new game
        case 8:
            game = new Game(element)
            game.play()
            break
        default:
            break
    }
}

let game = new Game(element)

game.play()
