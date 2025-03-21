var MovePlatform = pc.createScript('platform');

// Attributes
MovePlatform.attributes.add('Target', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The target entity where the platform will stop'
});

MovePlatform.attributes.add('moveSpeed', { type: 'number', default: 0.1, description: 'Speed of movement' });


let performAction = false;
// Initialize variables
let balltuching = false;
let calling = false;
// Initialize function
MovePlatform.prototype.initialize = function() {
    this.timer = 0;  // Initialize the timer
    this.waiting = false;  // Initialize the waiting flag
    this.moving = false;  // Make sure moving is initialized to false
    this.calling = false;
    const onTriggerEnter = (otherEntity) => {
        console.log("Trigger detected with entity:", otherEntity.name); // Log the triggered entity
        
        // Log all tags of the entity
        console.log("Entity tags:", otherEntity.tags);

        if (otherEntity.tags.has("ball")) {
            console.log("Ball Triggered, moving platform...");
            balltuching = true;
            this.moving = true;  // Start moving
            this.waiting = false;  // Reset the waiting flag
            this.targetPos = this.Target.getPosition();

            // Add the rigidbody component for platform movement
            this.entity.addComponent('rigidbody', {
                type: 'kinematic',  // Set rigidbody type for physics interaction
                mass: 0,  // Mass of 0 (no effect on physics)
                friction: 0,
                restitution: 0  // No bounciness
            });
        } else {
            console.log("Entity does not have the 'ball' tag:", otherEntity.name);
        }
    };
    
    // Subscribe to the triggerenter event of this entity's collision component
    this.entity.collision.on('triggerenter', onTriggerEnter);

    // Unsubscribe when the script is destroyed
    this.on('destroy', () => {
        this.entity.collision.off('triggerenter', onTriggerEnter);
    });
};

// Update code called every frame
MovePlatform.prototype.update = function(dt) {
    if (this.moving) {
        var currentPos = this.entity.getPosition();
        
        // Move platform smoothly toward target position
        var newPosition = currentPos.lerp(currentPos, this.targetPos, this.moveSpeed * dt);
        this.entity.setPosition(newPosition);

        // Stop moving once platform reaches the target
        if (newPosition.distance(this.targetPos) < 0.1) {
            this.moving = false;
            console.log("Platform reached target position.");
            this.app.fire('platformReached');
              
            console.log("Performing action...");
            this.performAction();
           
            }
        }

        if(calling){
         this.timer = 0;  // Initialize the timer
    this.waiting = false;  // Initialize the waiting flag
    this.moving = false;  // Make sure moving is initialized to false

        onTriggerEnter = (otherEntity) => {
        console.log("Trigger detected with entity:", otherEntity.name); // Log the triggered entity
        
        // Log all tags of the entity
        console.log("Entity tags:", otherEntity.tags);

        if (otherEntity.tags.has("ball")) {
            console.log("Ball Triggered, moving platform...");
            balltuching = true;
            this.moving = true;  // Start moving
            this.waiting = false;  // Reset the waiting flag
            this.targetPos = this.Target.getPosition();

            // Add the rigidbody component for platform movement
            this.entity.addComponent('rigidbody', {
                type: 'kinematic',  // Set rigidbody type for physics interaction
                mass: 0,  // Mass of 0 (no effect on physics)
                friction: 0,
                restitution: 0  // No bounciness
            });
        } else {
            console.log("Entity does not have the 'ball' tag:", otherEntity.name);
        }
    };
    
    // Subscribe to the triggerenter event of this entity's collision component
    this.entity.collision.on('triggerenter', onTriggerEnter);

    // Unsubscribe when the script is destroyed
    this.on('destroy', () => {
        this.entity.collision.off('triggerenter', onTriggerEnter);
    });
        }
};



    


MovePlatform.prototype.performAction = function() {
    console.log("Performing action...");

    // Ensure the rigidbody is removed if needed
    this.calling = true;    

    // Ensure the collision component is restored and set to trigger mode
    let collision = this.entity.collision;
    
    if (!collision) {
        this.entity.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0.163, 0.02, 0.118)
        });
        collision = this.entity.collision;
    }

    // Make sure it's a trigger (important for re-triggering)
    collision.isTrigger = true;

    // Reset the platform to allow it to move again
    this.moving = false;
    console.log("Platform is reset and ready to move again.");

    // Re-enable trigger events if needed
    
};
