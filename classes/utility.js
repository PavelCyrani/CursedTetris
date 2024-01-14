/**
 * Random number generator
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns random number between min and max (min excluded, max included)
 */
function range(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Round function
 * 
 * @param {number} rounded
 * @returns {number} round number
 */
function round(number) {
    return (Math.round(number * 100) / 100).toFixed(2)
}

/**
 * Class that counts set time
 */
class Timer {
    /**
     * @type {Date}
     */
    lastTime

    /**
     * Constructor for class
     */
    constructor() {
        this.lastTime = new Date()
    }

    /**
     * TimePassed function checks if time passed since last call of this function
     * 
     * @param {number} time that was supposed to be passed
     * @returns {boolean} true if time has passed since last date (approximately)
     */
    timePassed(time) {
        if (new Date - this.lastTime >= time) {
            this.lastTime = new Date()
            return true;
        } else {
            return false
        }
    }
}

function PLAYTHEGAME(element) {
}