/**
 * Collision detects all the collision/interaction between several entities and tells others about the collision/interaction.
 */
class Collision {
    /**
     * Initializes Collision instance to serve as physics handler
     */
    constructor() {
    }

    /**
     * Returns an array of all unique pairs of colliding entities
     * @param {Array} entitiesToCheck List of entities to check for collision
     * @returns {[Entity, Entity]} a list of entity pairs that have collided
     */
    detectCollide(entitiesToCheck) {
        var i, j, firstElement, secondElement;
        const entityCount = entitiesToCheck.length;
        const currentCollisionPairs = [];

        // Dead entities don't need to collide
        // DECISION: DO we check if an entity necessitates checking here or elsewhere?
        for (i = 0; i < entityCount; i++) {
            firstElement = entitiesToCheck[i];

            for (j = i + 1; j < entityCount; j++) {
                secondElement = entitiesToCheck[j];

                if (this.entitiesCollided(firstElement, secondElement)) {
                    currentCollisionPairs.push([firstElement, secondElement]);
                }
            }
        }
        return currentCollisionPairs;
    }

    /**
     * Returns if two elements (entities) are colliding
     * @param  {Entity} firstElement  First element to compare for collision
     * @param  {Entity} secondElement Second element to compare for collision
     * @return {Boolean} True if the two elements are colliding, false otherwise
     */
    entitiesCollided(firstElement, secondElement) {
        const boxOne = firstElement.futureHitbox;
        const boxTwo = secondElement.futureHitbox;
        return boxOne.xMin < boxTwo.xMax &&
            boxTwo.xMin < boxOne.xMax &&
            boxOne.yMin < boxTwo.yMax &&
            boxTwo.yMin < boxOne.yMax;
    }

    /**
     * Entities that are going to collide should not be allowed to update
     * Flags entities in collision pairs so they can't complete their update
     * @param  {Array} collisionPairs Array of pairs of collision
     * TODO: Change this to only affect block to other entity interaction
     */
    flagImpassable(collisionPairs) {
        collisionPairs.forEach(function (element) {
            if (!(element[0] instanceof Weapon) && !(element[1] instanceof Weapon)) {

                    element[0].pushUpdate = false;
                    element[1].pushUpdate = false;
            }
            // TO-DO: Modify this system so multiple behaviors can work.
            // Projectiles might be allowed to collide completely/penetrate
            // How to split them up and classify?
            // Boolean flags for entity sub classes?
        })
    }

    /**
     * Entities that are going to collide and are part of a damage pair should flag damage.
     * @param collisionPairs
     */
    flagDamage(collisionPairs) {
        collisionPairs.forEach(function (element) {
            if (element[0] instanceof Hero) {
                if (element[1] instanceof Enemy) {
                    element[0].pushDamage = true;
                }
            }
            if (element[1] instanceof Enemy) {
                if (element[0] instanceof Weapon && element[0].active) {
                    console.log(element[0].active);
                    element[1].pushDamage = true;
                }
            }
        })
    }

    /**
     * Resets flags for entities pre-loop.
     * @param {Array} entitiesToCheck
     */
    resetFlags(entitiesToCheck) {
        for (let i = 0; i < entitiesToCheck.length; i++) {
            entitiesToCheck[i].pushUpdate = true;
        }
    }
}