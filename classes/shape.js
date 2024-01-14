/**
 * Class that represents a shape. Has one cube that has other cubes attached to it.
 */
class Shape {
    static cube

    /**
     * The constructor function for the class.
     */
    constructor() {
        let a = range(1, 101)
        if (a < 15) {
            a = 1
        } else if (a < 25) {
            a = 2
        } else if (a < 40) {
            a = 3
        } else if (a < 55) {
            a = 4
        } else if (a < 70) {
            a = 5
        } else if (a < 85) {
            a = 6
        } else if (a < 95) {
            a = 7
        } else if (a < 101) {
            a = 8
        }
        switch (a) {
            case 1:
                this.cube = new Cube("yellow", new Cube("yellow"), null, new Cube("yellow", null, null, new Cube("yellow",), null), null)
                break
            case 2:
                this.cube = new Cube("blue", null, null, new Cube("blue", null, null, new Cube("blue"), null), new Cube("blue"))
                break
            case 3:
                this.cube = new Cube("red", null, new Cube("red"), null, new Cube("red", new Cube("red"), null, null, null))
                break
            case 4:
                this.cube = new Cube("green", new Cube("green"), null, new Cube("green", null, null, new Cube("green"), null), null)
                break
            case 5:
                this.cube = new Cube("orange", null, new Cube("orange", null, null, null, new Cube("orange")), null, new Cube("orange"))
                break
            case 6:
                this.cube = new Cube("pink", null, new Cube("pink"), new Cube("pink", null, null, new Cube("pink"), null), null)
                break
            case 7:
                this.cube = new Cube("purple", new Cube("purple"), new Cube("purple"), new Cube("purple"), null)
                break
            case 8:
                this.cube = new Cube("gold")
                break
            default:
                console.error("invalid color generated")
                break
        }
    }

    /**
     * Function rotateShapeBeta rotates the shape without checking for collisions
     * 
     * 
     */
    rotateShapeBeta(direction) {
        switch (direction) {
            case "clockwise":
                this.cube.rotateCube("clockwise")
                break
            case "counterclockwise":
                this.cube.rotateCube("counterclockwise")
                break
            default:
                console.error("invalid direction")
                break
        }
        this.cube.setCords()
    }

    /**
     * The rotateShape function rotates the shape, with rotating all other attached cubes to it.
     * 
     * @param {field} placed
     * @param {"clockwise, counterclockwise"} direction 
     */
    rotateShape(direction, placed) {
        if (!this.rotateCollision(direction, placed)) {
            switch (direction) {
                case "clockwise":
                    this.cube.rotateCube("clockwise")
                    break
                case "counterclockwise":
                    this.cube.rotateCube("counterclockwise")
                    break
                default:
                    console.error("invalid direction")
                    break
            }
        }
        this.cube.setCords()
    }

    /**
     * Function rotationCollision checks if there
     * will be a collision once the shape is rotated in set direction
     * 
     * @param {"clockwise, counterclockwise"} direction 
     * @param {field} placed
     * @returns {boolean} true if collision will be created
     */
    rotateCollision(direction, placed) {
        let counterDirection = undefined
        switch (direction) {
            case "clockwise":
                counterDirection = "counterclockwise"
                break
            case "counterclockwise":
                counterDirection = "clockwise"
                break
            default:
                console.error("invalid direction")
                break
        }
        this.rotateShapeBeta(direction)
        if (this.collisionCheck(placed)) {
            this.rotateShapeBeta(counterDirection)
            return true
        } else {
            this.rotateShapeBeta(counterDirection)
            return false
        }
    }

    /**
     * This drawShape function is using the drawCube function
     * Draws the cube and all other attached to it (even those undirectly attached).
     * (Doens't draw cube if that cube is out of gamezone)
     * 
     * @param {ctx} ctx 
     * @param {"x of the gamezone"} gamezoneX
     * @param {"y of the gamezone"} gamezoneY
     */
    drawShape(ctx, GamezoneX, GamezoneY) {
        this.cube.drawCube(ctx, GamezoneX, GamezoneY)
    }



    /**
     * This findLeftest function is used to find the leftmost point of the shape.
     * 
     * @returns {number} x coordinate of the leftmost point of cubes attached to this cube.
     */
    findLeftest() {
        return this.cube.findLeftest()
    }

    /**
     * This findRightest function is used to find the rightmost point of the shape.
     * 
     * @returns {number} x coordinate of the rightmost point of cubes attached to this cube.
     */
    findRightest() {
        return this.cube.findRightest()
    }

    /**
     * This findLowest function is used to find the lowest point of the shape.
     * 
     * @returns {number} y coordinate of the lowest point of cubes attached to this cube.
     */
    findLowest() {
        return this.cube.findLowest()
    }

    /**
     * This findHighest function is used to find the highest point
     * 
     * @returns {number} y of the highest shape point
     */
    /*findHighest() {
        return this.cube.findHighest()
    }*/

    /**
     * This collisionCheck function is used to check if a cube is colliding with another cube or side of the gamezone.
     * 
     * @returns {boolean} true if there is a collision
     */
    collisionCheck(placed) {
        return this.cube.collisionCheck(placed)
    }

    /**
     * This futureCollisionCheck function checks if there will be collsion
     * 
     * @param {String} "down", "left", "right"
     * @param {field} placed
     * @returns {boolean} true if there will be collision
     */
    futureCollisionCheck(direction, placed) {
        return this.cube.futureCollisionCheck(direction, placed)
    }

    /**
     * This move function is used to move shape
     * 
     * @param {String} "down", "left", "right"
     * @param {field} placed
     * @returns {void} if shape was moved
     * @returns {boolean} false if it cannot be moved beacouse of collision, true otherwise
     */
    move(ctx, x1, y1, direction, placed) {
        this.cube.move(ctx, x1, y1, direction, placed)
    }

    /**
     * This placeCubes function places all cubes attached to the shape to the place collection.
     * 
     * @returns {void}
     */
    placeCubes(placed) {
        this.cube.placeCubes(placed)
    }

    /**
     * Function collisionWithPlaced returns true if there is cube attached that is colliding with placed cube.
     * 
     * @param {field} placed 
     * @returns {boolean} returns true if there is cube attached that is colliding with placed cube.
     */
    /*collisionWithPlaced(placed) {
        return this.cube.collisionWithPlaced(placed)
    }*/

    /**
     * Function dropIt moves shape dowb to the lowest
     *  position available without collision detection
     * 
     * @param {field} placed
     * @returns {number} score gotten for instant drop
     */
    dropIt(ctx, x1, y1, placed) {
        return this.cube.dropIt(ctx, x1, y1, placed)
    }


    /**
     * The findLowest function finds the lowest cube attached to the shape.
     * 
     * @return {[[y1,x1],[y2,x2],[y3,x3]]} x,y coordinates of the lowest cube attached to the shape
     */
    /*
    findLowest(){
        let x1 = this.cube.x
        let y1 = this.cube.y
        let x2 = null
        let y2 = null
        let x3 = null
        let y3 = null
        if(this.cube.left!= null){

        }
        if(this.cube.right!= null){

        }
        if(this.cube.down!= null){

        }
        return [y,x]
    }*/
}