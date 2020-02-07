/**
 *
 */
class Hero extends Entity {
    /**
     * The entity that the player can control and play the game with.
     * @param game {GameEngine} The engine of the game for accessing
     * @param spritesheet {Image} The image of the hero for animation and updating
     */
    constructor(game, spritesheet) {
        super(game, 300, 420, 38, 55, 0);
        this.animation = new Animation(spritesheet, 16, 23, 2, .250, 2, true, 2.4);
        this.context = game.GAME_CONTEXT;
        this.speed = 225;
        this.transitionDirection = 0; // Helper variable to keep track of what direction to transition
    }

    /**
     * Predicts future hitbox based on inputs.
     */
    preUpdate() {
        if (!this.game.transition) {
            if (this.game.hasMoveInputs()) {
                this.status = 'walking';
                if (this.game.INPUTS["KeyW"]) {
                    this.direction = 0;
                    this.walk(this.direction);
                }
                if (this.game.INPUTS["KeyS"]) {
                    this.direction = 1;
                    this.walk(this.direction);
                }
                if (this.game.INPUTS["KeyA"]) {
                    this.direction = 2;
                    this.walk(this.direction);
                }
                if (this.game.INPUTS["KeyD"]) {
                    this.direction = 3;
                    this.walk(this.direction);
                }
            }
            else {
                this.status = 'idle';
            }
        }
    }

    /**
     * Moves the hero automatically based on the transition direction. This makes it look like the camera is panning while the hero is in place.
     */
    eventWalk() {
        // Admittedly slightly tricky to tweak; you want to cross but there's also an occasional bug where if you just
        // slightly tap the movement key to barely cross, you can get stuck in an infinite loop where it'll keep going back
        // and forth. Also rare. 10.42 seems to be the upper limit for Y (10.44 no good). 10.7 procs it in 1/5 tests for me,
        // so I will try 10.65.
        // Update: 10.42/10.41 no good for Y in roughly 1/10 trials. 10.40 in 1/25 (all estimated).

        // Steven Tran 2/6/2020
        // A straightforward fix for the slight tap would be to when the player reaches a border, set a hard coordinate point.
        // For example, player reaches border on left side, the y remains the same but x would be hard set to a value so transitioning doesn't have any weird rounding issues.
        const TRANSITION_AMOUNT_X = 10.65; // The amount of shift in the x direction when transitioning
        const TRANSITION_AMOUNT_Y = 10.37; // The amount of shift in the y direction when transitioning
        switch (this.transitionDirection) {
            case "up":
                this.hitbox.yMin = this.hitbox.yMin + TRANSITION_AMOUNT_Y; // Add top left y coordinate with the shift amount
                this.hitbox.yMax = this.hitbox.yMin + this.height; // Updates the new y max coordinate hitbox
                this.futureHitbox.yMin = this.hitbox.yMin; // Updates the future hitbox to accommodate for the shifting
                this.futureHitbox.yMax = this.hitbox.yMax;
                break;
            case "down":
                this.hitbox.yMin = this.hitbox.yMin - TRANSITION_AMOUNT_Y; // Add top left y coordinate with the shift amount
                this.hitbox.yMax = this.hitbox.yMin + this.height; // Updates the new y max coordinate hitbox
                this.futureHitbox.yMin = this.hitbox.yMin; // Updates the future hitbox to accommodate for the shifting
                this.futureHitbox.yMax = this.hitbox.yMax;
                break;
            case "left":
                this.hitbox.xMin = this.hitbox.xMin + TRANSITION_AMOUNT_X; // Add top left x coordinate with the shift amount
                this.hitbox.xMax = this.hitbox.xMin + this.width; // Updates the new x max coordinate to include the new width point
                this.futureHitbox.xMin = this.hitbox.xMin; // Updates the future hitbox to accommodate for the shifting
                this.futureHitbox.xMax = this.hitbox.xMax;
                break;
            case "right":
                this.hitbox.xMin = this.hitbox.xMin - TRANSITION_AMOUNT_X; // Add top left x coordinate with the shift amount
                this.hitbox.xMax = this.hitbox.xMin + this.width; // Updates the new x max coordinate to include the new width point
                this.futureHitbox.xMin = this.hitbox.xMin; // Updates the future hitbox to accommodate for the shifting
                this.futureHitbox.xMax = this.hitbox.xMax;
                break;
        }
    }

    /**
     * Draws the hero.
     */
    draw() {
        this.animation.drawFrame(this.game.clockTick, this.context,
            this.hitbox.xMin - this.width * (1 - this.HITBOX_SHRINK_FACTOR),
            this.hitbox.yMin - this.height * (1 - this.HITBOX_SHRINK_FACTOR), this.direction, this.status);
    }

    /**
     * Checks to see if the hero is on the border of the Canvas. If he is, then we tell the game engine what border he is on.
     * @returns {{changeInX: number, changeInY: number}} a change in x or y that represents which tilemap. Used to add with sections in World to determine the border transition
     */
    checkBorder() {
        // Up Canvas Border
        if (this.hitbox.yMin < 0) {
            this.transitionDirection = "up";
            return {
                changeInX: 0,
                changeInY: -1
            };
        }

        // Right Canvas Border
        if (this.hitbox.xMax > this.game.GAME_CANVAS_WIDTH) {
            this.transitionDirection = "right";
            return {
                changeInX: 1,
                changeInY: 0
            };
        }

        // Down Canvas Border
        if (this.hitbox.yMax > this.game.GAME_CANVAS_HEIGHT) {
            this.transitionDirection = "down";
            return {
                changeInX: 0,
                changeInY: 1
            };
        }

        // Left Canvas Border
        if (this.hitbox.xMin < 0) {
            this.transitionDirection = "left";
            return {
                changeInX: -1,
                changeInY: 0
            };
        }

        // Still within border
        return {
            changeInX: 0,
            changeInY: 0
        };
    }

}