/**
 * Class that represents just single cube (has option of attaching other cubes to it).
 */
class Cube {
    side
    x
    y
    color

    left
    right
    up
    down

    /**
     * The constructor function for the class.
     * 
     * @param {"yellow, blue, red, green, orange, pink, purple, gold"} color  of the cube (important for deciding shape)
     * @param {Cube} left 
     * @param {Cube} right 
     * @param {Cube} up 
     * @param {Cube} down 
     */
    constructor(color, left = null, right = null, up = null, down = null) {
        this.side = 25
        this.x = 125
        this.y = 50
        this.color = color
        this.left = left
        this.right = right
        this.up = up
        this.down = down
        this.setCords()
    }

    /**
     * The setCords function sets the x and y of cubes that are attached to this cube and to cubes attached to attached ones.
     * 
     * @return Nothing
     */
    setCords() {
        if (this.up != null) {
            this.up.x = this.x
            this.up.y = this.y - 25
            this.up.setCords()
        }
        if (this.down != null) {
            this.down.x = this.x
            this.down.y = this.y + 25
            this.down.setCords()
        }
        if (this.right != null) {
            this.right.x = this.x + 25
            this.right.y = this.y
            this.right.setCords()
        }
        if (this.left != null) {
            this.left.x = this.x - 25
            this.left.y = this.y
            this.left.setCords()
        }
    }

    /**
     * The rotateCube function rotates the cube, with rotating all other attached cubes to it.
     * 
     * @param {"clockwise, counterclockwise"} direction 
     */
    rotateCube(direction) {
        let holder = this.left
        switch (direction) {
            case "clockwise":
                this.left = this.down
                this.down = this.right
                this.right = this.up
                this.up = holder
                break
            case "counterclockwise":
                this.left = this.up
                this.up = this.right
                this.right = this.down
                this.down = holder
                break
            default:
                console.error("invalid direction")
                break
        }
        if (this.left != null) {
            this.left.rotateCube(direction)
        }
        if (this.right != null) {
            this.right.rotateCube(direction)
        }
        if (this.up != null) {
            this.up.rotateCube(direction)
        }
        if (this.down != null) {
            this.down.rotateCube(direction)
        }
        this.setCords()
    }

    /**
     * Function drawSingleCube
     * 
     * @param {ctx} ctx
     * @param {x1}
     * @param {y1}
     * @returns {void}
    */
    drawSingleCube(ctx, x1, y1) {
        let gamezoneWidth = 300
        let gamezoneHeight = 600
        ctx.lineWidth = 1
        ctx.strokeStyle = "black"
        switch (this.color) {
            case "yellow":
                ctx.fillStyle = "yellow"
                break
            case "blue":
                ctx.fillStyle = "blue"
                break
            case "red":
                ctx.fillStyle = "red"
                break
            case "green":
                ctx.fillStyle = "green"
                break
            case "orange":
                ctx.fillStyle = "orange"
                break
            case "pink":
                ctx.fillStyle = "pink"
                break
            case "purple":
                ctx.fillStyle = "purple"
                break
            case "gold":
                ctx.fillStyle = "gold"
                break
            default:
                console.error("invalid color")
                break
        }
        if (this.x >= 0 && this.x < gamezoneWidth && this.y >= 0 && this.y < gamezoneHeight) {
            ctx.beginPath()
            ctx.roundRect(x1 + this.x, y1 + this.y, this.side, this.side, 4)
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
    }


    /**
     * This drawCube function draws the cube and all other attached to it (even those undirectly attached).
     * (Doens't draw cube if that cube is out of gamezone)
     * 
     * @param {ctx} ctx 
     * @param {"x of the gamezone"} gamezoneX
     * @param {"y of the gamezone"} gamezoneY
     */
    drawCube(ctx, x1, y1) {
        let gamezoneWidth = 300
        let gamezoneHeight = 600
        ctx.lineWidth = 1
        ctx.strokeStyle = "black"
        switch (this.color) {
            case "yellow":
                ctx.fillStyle = "yellow"
                break
            case "blue":
                ctx.fillStyle = "blue"
                break
            case "red":
                ctx.fillStyle = "red"
                break
            case "green":
                ctx.fillStyle = "green"
                break
            case "orange":
                ctx.fillStyle = "orange"
                break
            case "pink":
                ctx.fillStyle = "pink"
                break
            case "purple":
                ctx.fillStyle = "purple"
                break
            case "gold":
                ctx.fillStyle = "gold"
                break
            default:
                console.error("invalid color")
                break
        }
        if (this.x >= 0 && this.x < gamezoneWidth && this.y >= 0 && this.y < gamezoneHeight) {
            ctx.beginPath()
            ctx.roundRect(x1 + this.x, y1 + this.y, this.side, this.side, 4)
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
        this.setCords()
        if (this.left != null) {
            this.left.drawCube(ctx, x1, y1)
        }
        if (this.right != null) {
            this.right.drawCube(ctx, x1, y1)
        }
        if (this.up != null) {
            this.up.drawCube(ctx, x1, y1)
        }
        if (this.down != null) {
            this.down.drawCube(ctx, x1, y1)
        }
    }

    /**
     * Function eraseCube erases drawing of the cube, used to free space on gamezone once cube is about to be moved.
     * 
     * @returns {void}
     */
    eraseCube(ctx, x1, y1) {
        let gamezoneWidth = 300
        let gamezoneHeight = 600
        ctx.lineWidth = 0.5
        ctx.strokeStyle = "#b1b1b1"
        ctx.fillStyle = "#4f4e48"
        if (this.x >= 0 && this.x < gamezoneWidth && this.y >= 0 && this.y < gamezoneHeight) {
            ctx.fillRect(x1 + this.x, y1 + this.y, this.side, this.side)
            ctx.strokeRect(x1 + this.x, y1 + this.y, this.side, this.side)
        }
        this.setCords()
        if (this.left != null) {
            this.left.eraseCube(ctx, x1, y1)
        }
        if (this.right != null) {
            this.right.eraseCube(ctx, x1, y1)
        }
        if (this.up != null) {
            this.up.eraseCube(ctx, x1, y1)
        }
        if (this.down != null) {
            this.down.eraseCube(ctx, x1, y1)
        }
    }

    /**
     * Function that finds the leftest x cords of cubes attached to this cube.
     * Considered that begining point is left top corner of the gamezone.
     * 
     * @returns {number} x coordinate of the leftest point of cubes attached to this cube.
     */
    findLeftest() {
        leftestX = this.x
        if (this.left != null) {
            if (this.left.findLeftest() < leftestX) {
                leftestX = this.left.findLeftest()
            }
        }
        if (this.right != null) {
            if (this.right.findLeftest() < leftestX) {
                leftestX = this.right.findLeftest()
            }
        }
        if (this.down != null) {
            if (this.down.findLeftest() < leftestX) {
                leftestX = this.down.findLeftest()
            }
        }
        if (this.up != null) {
            if (this.up.findLeftest() < leftestX) {
                leftestX = this.up.findLeftest()
            }
        }
        return leftestX
    }

    /**
     * Function that finds the rightest x cords of cubes attached to this cube.
     * Considered that begining point is left top corner of the gamezone.
     * 
     * @return {number} x coordinate of the rightest point of cubes attached to this cube.
     */
    findRightest() {
        rightestX = this.x
        if (this.left != null) {
            if (this.left.findRightest() > rightestX) {
                rightestX = this.left.findRightest()
            }
        }
        if (this.right != null) {
            if (this.right.findRightest() > rightestX) {
                rightestX = this.right.findRightest()
            }
        }
        if (this.down != null) {
            if (this.down.findRightest() > rightestX) {
                rightestX = this.down.findRightest()
            }
        }
        if (this.up != null) {
            if (this.up.findRightest() > rightestX) {
                rightestX = this.up.findRightest()
            }
        }
        return rightestX
    }

    /**
     * Function findLowest returns the lowest y cords of cubes attached to this cube.
     * 
     * @returns {number} y coordinate of the lowest point of cubes attached to this cube.
     */
    findLowest() {
        lowestY = this.y
        if (this.up != null) {
            if (this.up.findLowest() < lowestY) {
                lowestY = this.up.findLowest()
            }
        }
        if (this.down != null) {
            if (this.down.findLowest() < lowestY) {
                lowestY = this.down.findLowest()
            }
        }
        if (this.left != null) {
            if (this.left.findLowest() < lowestY) {
                lowestY = this.left.findLowest()
            }
        }
        if (this.right != null) {
            if (this.right.findLowest() < lowestY) {
                lowestY = this.right.findLowest()
            }
        }
        return lowestY
    }

    /**
     * Function findHighest returns the highest y cords of cubes attached to this cube.
     * 
     * @returns {number} y coordinate of the highest point of cubes attached to this cube.
     */
    /*findHighest() {
        let highestY = this.y
        if (this.up != null) {
            if (this.up.findHighest() < highestY) {
                highestY = this.up.findHighest()
            }
        }
        if (this.down != null) {
            if (this.down.findHighest() < highestY) {
                highestY = this.down.findHighest()
            }
        }
        if (this.left != null) {
            if (this.left.findHighest() < highestY) {
                highestY = this.left.findHighest()
            }
        }
        if (this.right != null) {
            if (this.right.findHighest() < highestY) {
                highestY = this.right.findHighest()
            }
        }
        return highestY
    }*/

    /**
     * Function placeCubes places all cubes attached to this cube to place collection.
     * (first goes y, then x)
     * 
     * @returns {void}
     */
    placeCubes(placed) {
        this.setCords()
        if (this.left != null) {
            this.left.placeCubes(placed)
        }
        if (this.right != null) {
            this.right.placeCubes(placed)
        }
        if (this.up != null) {
            this.up.placeCubes(placed)
        }
        if (this.down != null) {
            this.down.placeCubes(placed)
        }
        placed[this.y / 25][this.x / 25] = this
    }

    /**
     * Function futureCollisionCheck checks if there will be collision once cubes are moved in set direction
     * 
     * @param {String} "down", "left", "right"
     * @param {field} placed
     * @returns {boolean} true if there will be collision
     */
    futureCollisionCheck(direction, placed) {
        this.setCords()
        let x = 0
        let y = 0
        switch (direction) {
            case "down":
                y = 25
                break
            case "left":
                x = -25
                break
            case "right":
                x = 25
                break
        }
        if (this.findLeftest + x < 0) {
            return true
        }
        if (this.findRightest + x > 275) {
            return true
        }
        if (this.findLowest + y > 575) {
            return true
        }
        if (this.futureCollisionWithPlaced(direction, placed)) {
            return true
        }
        if (this.up != null) {
            if (this.up.futureCollisionCheck(direction, placed)) {
                return true
            }
        }
        if (this.down != null) {
            if (this.down.futureCollisionCheck(direction, placed)) {
                return true
            }
        }
        if (this.left != null) {
            if (this.left.futureCollisionCheck(direction, placed)) {
                return true
            }
        }
        if (this.right != null) {
            if (this.right.futureCollisionCheck(direction, placed)) {
                return true
            }
        }
        return false
    }

    /**
     * Function futureCollisionWithPlaced returns true if there will be collision once shape is moved in set direction
     * 
     * @param {String} "down", "left", "right"
     * @param {field} placed
     * @returns {boolean} returns true if there will be collision once shape is moved in set direction
     */
    futureCollisionWithPlaced(direction, placed) {
        this.setCords()
        let x = 0
        let y = 0
        let returned = false
        switch (direction) {
            case "down":
                y = 25
                break
            case "left":
                x = -25
                break
            case "right":
                x = 25
                break
        }
        if ((this.y + y) / 25 < 24 && (this.y + y) / 25 >= 0
            && (this.x + x) / 25 < 12 && (this.x + x) / 25 >= 0) {
            if (placed[(this.y + y) / 25][(this.x + x) / 25] != null) {
                returned = true
            }
        } else {
            returned = true
        }
        if (this.up != null) {
            if (this.up.futureCollisionWithPlaced(direction, placed)) {
                return true
            }
        }
        if (this.down != null) {
            if (this.down.futureCollisionWithPlaced(direction, placed)) {
                return true
            }
        }
        if (this.left != null) {
            if (this.left.futureCollisionWithPlaced(direction, placed)) {
                return true
            }
        }
        if (this.right != null) {
            if (this.right.futureCollisionWithPlaced(direction, placed)) {
                return true
            }
        }
        return returned
    }

    /**
     * This collisionCheck function is used to check if a cube is colliding with another cube or side of the gamezone.
     * 
     * @param {field} placed 
     * @return {boolean} true if the cube is colliding with another cube or side of the gamezone.
     */
    collisionCheck(placed) {
        this.setCords()
        if (this.findLeftest < 0) {
            return true
        }
        if (this.findRightest > 275) {
            return true
        }
        if (this.findLowest > 575) {
            return true
        }
        if (this.collisionWithPlaced(placed)) {
            return true
        }
        if (this.up != null) {
            if (this.up.collisionCheck(placed)) {
                return true
            }
        }
        if (this.down != null) {
            if (this.down.collisionCheck(placed)) {
                return true
            }
        }
        if (this.left != null) {
            if (this.left.collisionCheck(placed)) {
                return true
            }
        }
        if (this.right != null) {
            if (this.right.collisionCheck(placed)) {
                return true
            }
        }
        return false
    }

    /**
     * Function collisionWithPlaced returns true if there is cube attached that is colliding with placed cube.
     * 
     * @param {field} placed 
     * @returns {boolean} returns true if there is cube attached that is colliding with placed cube.
     */
    collisionWithPlaced(placed) {
        this.setCords()
        let returned = false
        if (this.y / 25 < 24 && this.y / 25 >= 0 &&
            this.x / 25 < 12 && this.x / 25 >= 0) {
            if (placed[this.y / 25][this.x / 25] != null) {
                returned = true
            }
        }
        if (this.up != null) {
            if (this.up.collisionWithPlaced(placed)) {
                return true
            }
        }
        if (this.down != null) {
            if (this.down.collisionWithPlaced(placed)) {
                return true
            }
        }
        if (this.left != null) {
            if (this.left.collisionWithPlaced(placed)) {
                return true
            }
        }
        if (this.right != null) {
            if (this.right.collisionWithPlaced(placed)) {
                return true
            }
        }
        return returned
    }

    /**
     * Function move moves cubes in set direction.
     * It cleans space on the gamezone where they have been, changes their cords and draw them where they should be.
     * 
     * @param {String} direction "left", "right", "down"
     * @param {field} placed
     * @returns {void} 
     */
    move(ctx, x1, y1, direction, placed) {
        this.eraseCube(ctx, x1, y1)
        this.moveBeta(direction, placed)
        this.drawCube(ctx, x1, y1)
    }

    /**
     * Function moveBeta, moves conds of cubes attached in set direction.
     * Doesn't draw them on the gamezone.
     * 
     * @param {String} "down", "left", "right"
     * @returns {void}
     */
    moveBeta(direction, placed) {
        if (!this.futureCollisionCheck(direction, placed)) {
            let y = 0
            let x = 0
            switch (direction) {
                case "down":
                    y = 25
                    break
                case "left":
                    x = -25
                    break
                case "right":
                    x = 25
                    break
            }
            this.y += y
            this.x += x
            this.setCords()
            return true
        } else {
            return false
        }
    }

    /**
     * Function dropIt moves shape dowb to the lowest
     *  position available without collision detection
     * 
     * @param {field} placed
     * @returns {number} score for instant drop
     */
    dropIt(ctx, x1, y1, placed) {
        let scorePlus = 0
        this.eraseCube(ctx, x1, y1)
        while (this.moveBeta("down", placed)) {
            scorePlus += 100
        }
        this.drawCube(ctx, x1, y1)
        this.placeCubes(placed)
        return scorePlus
    }
}