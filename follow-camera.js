var FollowCamera = pc.createScript('followCamera');

FollowCamera.attributes.add('target', {
    type: 'entity',
    title: 'Target',
    description: 'The Entity to follow'
});

FollowCamera.attributes.add('distance', {
    type: 'number',
    default: 4,
    title: 'Distance',
    description: 'How far from the Entity should the follower be'
});

FollowCamera.attributes.add('height', {
    type: 'number',
    default: 2,
    title: 'Height Offset',
    description: 'Height above the target'
});

// Initialize the script
FollowCamera.prototype.initialize = function() {
    this.targetPos = new pc.Vec3(); 
    this.pos = new pc.Vec3();
    this.offset = new pc.Vec3(0.75, 1, 0.75); // Initialize properly
    this.targetDistance = this.distance; // Ensure zoom transitions work correctly// Stores the desired camera position
};

// Update function runs every frame
FollowCamera.prototype.postUpdate = function(dt) {
    if (!this.target) return;

    // Get the target's current position
    var targetPos = this.target.getPosition();

    // Calculate the desired camera position behind the target
    this.targetPos.set(
        targetPos.x - this.distance, // Move back by 'distance' units
        targetPos.y + this.height,   // Apply height offset
        targetPos.z                  // Keep aligned on Z-axis
    );

    // Smoothly move the camera towards the target position
    var currentPos = this.entity.getPosition();
    currentPos.lerp(currentPos, this.targetPos, 0.1); // Adjust 0.1 for smoother/faster movement
    this.entity.setPosition(currentPos); // Apply the new position

    // Make the camera look at the target
    this.entity.lookAt(targetPos);
};

