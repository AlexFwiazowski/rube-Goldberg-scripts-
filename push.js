var PushOnContact = pc.createScript('push');

// Define push force
PushOnContact.attributes.add('pushForce', {
    type: 'vec3',
    title: 'Push Force',
    description: 'The amount of force applied when something collides'
});

// Initialize script
PushOnContact.prototype.initialize = function() {
    // Ensure the entity has a collision and rigid body
    if (!this.entity.collision) {
        console.warn('PushOnContact: Entity needs a collision component.');
        return;
    }

    // Listen for collision start events
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};

// Apply push force on collision
PushOnContact.prototype.onCollisionStart = function(event) {
    var otherEntity = event.other; // The entity that collided

    // Check if the other entity has a rigid body
    if (otherEntity && otherEntity.rigidbody) {
        // Apply a small force in a random direction
        var force = new pc.Vec3(
            this.pushForce.x * (Math.random() - 0.5), 
            this.pushForce.y * (Math.random() - 0.5), 
            this.pushForce.z * (Math.random() - 0.5)
        );

        otherEntity.rigidbody.applyImpulse(force);
    }
};
