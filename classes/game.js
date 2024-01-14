function gameLoop(game) {
    let timerForFall = new Timer()
    let timerForControl = new Timer()
    let lastScore = game.score
    let holdable = true
    let gameInterval = setInterval(function () {
        if (game.score != lastScore) {
            holdable = true
            lastScore = game.score
        }
        //writing text
        game.writeVariableTexts()
        //falls every gm.speed
        if (timerForFall.timePassed(game.speed)) {
            game.moveDown()
            game.setSpeed()
        }
        //if keyboard reads
        if (timerForControl.timePassed(50)) {
            document.onkeydown = function (event) {
                switch (event.keyCode) {
                    //case right arrow
                    case 39:
                        game.moveRight()
                        break
                    //case left arrow
                    case 37:
                        game.moveLeft()
                        break
                    //case down arrow
                    case 40:
                        game.moveDown()
                        break
                    //case space
                    case 32:
                        game.instantPlace()
                        break
                    //case C
                    case 67:
                        if (holdable) {
                            game.storeShape()
                            holdable = false
                        }
                        break
                    //case A
                    case 65:
                        game.rotateCounterclockwise()
                        break
                    //case D
                    case 68:
                        game.rotateClockwise()
                        break
                    default:
                        break
                }
            }
        }
        //checking for game evnets
        //finished line
        game.checkForLine()
        //game end
        if (game.checkForEnd()) {
            clearInterval(gameInterval)
        }
    }, 12)
}

class Game {
    score
    lineCounter
    speed
    currShape
    nextShape1
    nextShape2
    nextShape3
    storedShape
    placed

    x
    y
    width
    height

    element

    /**
     * Constructor function with preset parametres for Game class.
     * 
     * @param {*} element 
     */
    constructor(element) {
        this.width = 570
        this.height = 620
        this.element = element
        this.x = (element.width / 2) - (this.width / 2)
        this.y = 100

        this.score = 0
        this.lineCounter = 0
        this.speed = 1000

        this.currShape = new Shape()
        this.nextShape1 = new Shape()
        this.nextShape2 = new Shape()
        this.nextShape3 = new Shape()
        this.storedShape = null

        this.placed = []
        //y of placed
        for (let i = 0; i < 24; i++) {
            this.placed.push([])
            //x of placed
            for (let j = 0; j < 12; j++) {
                this.placed[i].push(null)
            }
        }
    }



    /**
     * Main game function
     */
    play() {
        this.drawGame()
        this.drawCurrShape()
        this.drawNextShapes()
        gameLoop(this)
    }



    /**
     * The drawGame function draws the game's GUI.
     * 
     * @return {void}
     * @throws Nothing
     */
    drawGame() {
        //outline 
        ctx.lineWidth = 7
        ctx.strokeStyle = "#000000"
        ctx.beginPath()
        ctx.roundRect(this.x - (ctx.lineWidth / 2), this.y - (ctx.lineWidth / 2), this.width + ctx.lineWidth, this.height + ctx.lineWidth, 10)
        ctx.fillStyle = "#3b3535"
        ctx.fill()
        ctx.fillStyle = "black"
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.lineWidth = 8
        ctx.strokeStyle = "#2a2627"
        ctx.roundRect(this.x - (ctx.lineWidth / 2) - 3.5, this.y - (ctx.lineWidth / 2) - 3.5, this.width + ctx.lineWidth + 7, this.height + ctx.lineWidth + 7, 10)
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.lineWidth = 9
        ctx.strokeStyle = "#534b4e"
        ctx.roundRect(this.x - (ctx.lineWidth / 2) - 7.5, this.y - (ctx.lineWidth / 2) - 7.5, this.width + ctx.lineWidth + 16, this.height + ctx.lineWidth + 16, 10)
        ctx.stroke()
        ctx.closePath()
        //gui setup
        ctx.lineWidth = 8
        ctx.strokeStyle = "#2a2627"
        ctx.fillStyle = "#4f4e48"
        //holder
        ctx.beginPath()
        ctx.roundRect(this.x + 10, this.y + 10, 100, 150, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        //score counter
        ctx.beginPath()
        ctx.roundRect(this.x + 10, this.y + 180, 100, 80, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        //line counter
        ctx.beginPath()
        ctx.roundRect(this.x + 10, this.y + 280, 100, 80, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        //speed
        ctx.beginPath()
        ctx.roundRect(this.x + 10, this.y + 380, 100, 80, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        //next shapes
        ctx.beginPath()
        ctx.roundRect(this.x + 440, this.y + 10, 120, 485, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        //gamezone
        ctx.beginPath()
        ctx.roundRect(this.x + 125 - (ctx.lineWidth / 2), this.y - (ctx.lineWidth / 2) + 10, 300 + ctx.lineWidth, 600 + ctx.lineWidth, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.strokeStyle = "#b1b1b1"
        ctx.lineWidth = 0.5
        for (let i = 1; i < 12; i++) {
            ctx.beginPath()
            ctx.moveTo(this.x + 125 + (i * 25), this.y + 14)
            ctx.lineTo(this.x + 125 + (i * 25), this.y + 606)
            ctx.stroke()
            ctx.closePath()
        }
        for (let i = 1; i < 24; i++) {
            ctx.beginPath()
            ctx.moveTo(this.x + 129, this.y + 10 + (i * 25))
            ctx.lineTo(this.x + 421, this.y + 10 + (i * 25))
            ctx.stroke()
            ctx.closePath()
        }
        this.writeTexts()
        this.writeVariableTexts()
    }

    /**
     * Function writeTexts writes texts like:
     * score, speed, lines and next (that do change)
     * 
     * @returns {void}
     */
    writeVariableTexts() {
        //erasing old text
        ctx.fillStyle = "#4f4e48"
        ctx.fillRect(this.x + 15, this.y + 210, 90, 40)
        ctx.fillRect(this.x + 15, this.y + 310, 90, 40)
        ctx.fillRect(this.x + 15, this.y + 410, 90, 40)
        //writing new text
        ctx.fillStyle = "#d7d7d7"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.font = "bold 20px Inconsolata"
        ctx.fontStretch = "expanded"
        ctx.fillText(this.score, this.x + 60, this.y + 230, 90)
        ctx.fillText(this.lineCounter, this.x + 60, this.y + 330, 90)
        ctx.fillText(round(this.speed / 100) / 10 + "s", this.x + 60, this.y + 430, 90)
    }

    /**
     * Function writeTexts writes texts like:
     * score, speed, lines and next (that do not change)
     * 
     * @returns {void}
     */
    writeTexts() {
        ctx.fillStyle = "#d7d7d7"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.font = "bold 20px Inconsolata"
        ctx.fontStretch = "expanded"
        ctx.fillText("Holder:", this.x + 60, this.y + 20, 90)
        ctx.fillText("Score:", this.x + 60, this.y + 190, 90)
        ctx.fillText("Lines:", this.x + 60, this.y + 290, 90)
        ctx.fillText("Fall time", this.x + 60, this.y + 390, 90)
        ctx.fillText("Next:", this.x + 500, this.y + 20, 90)
    }

    /**
     * The drawCurrShape function draws the current shape.
     * 
     * @returns {void}
     */
    drawCurrShape() {
        this.currShape.drawShape(ctx, this.x + 125, this.y + 10)
    }

    /**
    * The drawNextShapes function draws the next three shapes.
    * 
    * @return {void}
    */
    drawNextShapes() {
        ctx.lineWidth = 8
        ctx.strokeStyle = "#2a2627"
        ctx.fillStyle = "#4f4e48"
        ctx.beginPath()
        ctx.roundRect(this.x + 440, this.y + 10, 120, 485, 10)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        this.nextShape1.drawShape(ctx, this.x + 365, this.y + 45)
        this.nextShape2.drawShape(ctx, this.x + 365, this.y + 160)
        this.nextShape3.drawShape(ctx, this.x + 365, this.y + 275)
    }

    /**
     * Function checkForLine checks for line,
     * if one is found it adds score, adds lineCounter
     * removes finished line, moves the ones above one down
     * 
     * @returns {void}
     */
    checkForLine() {
        //checking rows
        for (let i = 0; i < 24; i++) {
            //checking each block
            let block = 0
            while (block < 13) {
                if (block != 12) {
                    if (this.placed[i][block] == null) {
                        break
                    } else {
                        block++
                    }
                } else {
                    //adds score and moves everything one down
                    this.score += 2500
                    this.lineCounter += 1
                    for (let j = i; j > 0; j--) {
                        this.placed[j] = this.placed[j - 1]
                    }
                    for (let j = 0; j < 12; j++) {
                        this.placed[0][j] = null
                    }
                    //this.reDrawPlaced()
                    break
                }
            }
        }
    }

    /**
     * Function reDrawGamezone
     * 
     * @returns {void} 
     */
    reDrawPlaced() {
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 12; j++) {
                if (this.placed[i][j] != null) {
                    this.placed[i][j].drawSingleCube(ctx, this.x + 125, this.y + 10)
                } else {
                    ctx.fillStyle = "#4f4e48"
                    ctx.strokeStyle = "#b1b1b1"
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.roundRect(this.x + 125 + (j * 25), this.y + 10 + (i * 25), 25, 25)
                    ctx.fill()
                    ctx.stroke()
                    ctx.closePath()
                }
            }
        }
    }


    /**
     * Function that checks for finished lines.
     * If some are found, score is added and line is removed and other lines above are moved down.
     * 
     * @returns {boolean} if finished line was found returns true, else false
     */
    /*checkForLine() {
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 13; j++) {
                if (j == 12) {
                    this.score += 2500
                    this.lineCounter += 1
                    for (i; i >= 0; i--) {
                        this.placed[i] = this.placed[i - 1]
                    }
                    return true
                } else {
                    if (this.placed[i][j] == null) {
                        break
                    }
                }
            }
        }
        return false
    }*/

    /**
     * Function checkForEnd checks if the game is over.
     * (GameOver is if new shape is created inside of already existing shape)
     * 
     * @returns {boolean} true if game is over.
     */
    checkForEnd() {
        if (this.currShape.collisionCheck(this.placed)) {
            ctx.strokeStyle = "red"
            ctx.fillStyle = "black"
            ctx.lineWidth = 5
            ctx.fillRect(this.x + 117.5, this.y + 50, 315, 300)
            ctx.strokeRect(this.x + 117.5, this.y + 50, 315, 300)
            return true
        }
    }

    /**
     * Function setSpeed sets the speed of the game based on score.
     * 
     * @returns {void}
     */
    setSpeed() {
        if (this.speed <= 100) {
            this.speed = 100
        } else {
            this.speed = 1000 - ((this.score / 500) * 2)
        }
    }

    /**
     * Function placeShape places the current shape on the board.
     * And add's it to the list of placed shapes.
     * 
     * @returns {void}
     */
    placeShape() {
        this.score += 1000
        this.currShape.placeCubes(this.placed)
        this.drawCurrShape()
        this.setNewShapes()
        this.drawCurrShape()
        this.checkForLine()
        this.checkForEnd()
    }

    /**
     * Function setNewShapes moves the preset shapes to the next shapes.
     * Makes new shape to nextShape3 and puts nextShape1 to place of currShape
     * 
     * @returns {void}
     */
    setNewShapes() {
        this.currShape = this.nextShape1
        this.nextShape1 = this.nextShape2
        this.nextShape2 = this.nextShape3
        this.nextShape3 = new Shape()
        this.redrawNextShape()
    }

    /**
     * Function eraseNextShapes erase the next shapes from screen
     * 
     * @returns {void}
     */
    eraseNextShapes() {
        ctx.fillStyle = "#4f4e48"
        ctx.fillRect(this.x + 450, this.y + 40, 100, 400)
    }

    /**
     * redrawNextShape function redraws next shapes on the screen
     * 
     * @returns {void}
     */
    redrawNextShape() {
        this.eraseNextShapes()
        this.drawNextShapes()
    }

    /**
     * Function moveDown moves current shape down
     * 
     * @returns {void}
     */
    moveDown() {
        if (!this.currShape.futureCollisionCheck("down", this.placed)) {
            this.currShape.move(ctx, this.x + 125, this.y + 10, "down", this.placed)
        } else {
            this.placeShape()
        }
    }

    /**
     * Function moveLeft moves current shape left
     * 
     * @returns {void}
     */
    moveLeft() {
        if (!this.currShape.futureCollisionCheck("left", this.placed)) {
            this.currShape.move(ctx, this.x + 125, this.y + 10, "left", this.placed)
        }
    }

    /**
     * Function moveRight moves current shape right
     * 
     * @returns {void}
     */
    moveRight() {
        if (!this.currShape.futureCollisionCheck("right", this.placed)) {
            this.currShape.move(ctx, this.x + 125, this.y + 10, "right", this.placed)
        }
    }

    /**
     * RotateClockwise function rotates current shape
     * 
     * @returns {void}
     */
    rotateClockwise() {
        this.currShape.cube.eraseCube(ctx, this.x + 125, this.y + 10)
        this.currShape.rotateShape("clockwise", this.placed)
        this.currShape.drawShape(ctx, this.x + 125, this.y + 10)
    }

    /**
     * RotateCounterclockwise function rotates current shape
     * 
     * @returns {void}
     */
    rotateCounterclockwise() {
        this.currShape.cube.eraseCube(ctx, this.x + 125, this.y + 10)
        this.currShape.rotateShape("counterclockwise", this.placed)
        this.currShape.drawShape(ctx, this.x + 125, this.y + 10)
    }

    /**
     * eraseCube function erases current shape
     * 
     * @returns {void}
     */
    eraseCube() {
        this.currShape.cube.eraseCube(ctx, this.x + 125, this.y + 10)
    }

    /**
     * Redraw storedShape function redraws storedShape
     * 
     * @returns {void}
     */
    redrawStoredShape() {
        this.eraseStored()
        this.storedShape.drawShape(ctx, this.x - 80, this.y + 45)
    }

    /**
     * eraseStored function erases storedShape
     * 
     * @returns {void}
     */
    eraseStored() {
        ctx.fillStyle = "#4f4e48"
        ctx.fillRect(this.x + 15, this.y + 40, 90, 110)
    }

    /**
     * storeShape function stores current shape into holder
     * 
     * @returns {void}
     */
    storeShape() {
        this.currShape.cube.eraseCube(ctx, this.x + 125, this.y + 10)
        this.eraseStored()
        if (this.storedShape == null) {
            this.storedShape = this.currShape
            this.setNewShapes()
        } else {
            let a = this.storedShape
            this.storedShape = this.currShape
            this.currShape = a
        }
        this.storedShape.cube.y = 50
        this.storedShape.cube.x = 125
        this.storedShape.cube.setCords()
        this.drawCurrShape()
        this.redrawStoredShape()
    }

    /**
     * instantPlace function instantly places current shape on the lowest 
     * position posible in the gamezone
     * 
     * @returns {void}
     */
    instantPlace() {
        this.score += this.currShape.dropIt(ctx, this.x + 125, this.y + 10, this.placed)
        this.setNewShapes()
        this.drawCurrShape()
        this.checkForLine()
    }
}