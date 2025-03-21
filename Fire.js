var Fire = pc.createScript('Fire');

Fire.attributes.add('moveSpeed', {
    type: 'number',
    default: 2,
    title: 'Move Speed',
    description: 'Speed at which the entity moves forward when triggered.'
});

Fire.attributes.add('moveDistance', {
    type: 'number',
    default: 5,
    title: 'Move Distance',
    description: 'How far the entity should move when triggered.'
});

Fire.attributes.add('MovingPlatform', {
    type: 'entity',
    title: 'Moving Platform',
    description: 'The moving platform that should reset'
});

// Initialize script
Fire.prototype.initialize = function() {
    this.targetPosition = null;
    this.moving = false;

    // Listen for event to start moving
    this.app.on('platformReached', this.startMoving, this);
};

// Start movement when event is triggered
Fire.prototype.startMoving = function() {
    this.moving = true;
    this.startPos = this.entity.getPosition().clone();
    this.targetPosition = this.startPos.clone();
    this.targetPosition.x += this.moveDistance;

    
};

// Update function for smooth movement
Fire.prototype.update = function(dt) {
    if (this.moving && this.targetPosition) {
        var currentPos = this.entity.getPosition();
        
        // Smoothly interpolate towards target
        var newPosition = new pc.Vec3().lerp(currentPos, this.targetPosition, this.moveSpeed * dt);
        this.entity.setPosition(newPosition);

        // Stop moving when close enough
        if (newPosition.distance(this.targetPosition) < 0.1) {
            this.moving = false;
            console.log("Entity reached the target position.");
            
            
        }
    }
};

// Cleanup event listener on destroy
Fire.prototype.destroy = function() {
    this.app.off('platformReached', this.startMoving, this);
};
