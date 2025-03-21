var CameraSwitch = pc.createScript('CameraSwitch');

CameraSwitch.attributes.add('newCamera', {
    type: 'entity',
    title: 'New Camera',
    description: 'The camera to switch to when triggered.'
});

CameraSwitch.attributes.add('oldCamera', {
    type: 'entity',
    title: 'Old Camera',
    description: 'The current active camera before switching.'
});

// Initialize
CameraSwitch.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

// Function called when the ball enters the trigger zone
CameraSwitch.prototype.onTriggerEnter = function(otherEntity) {
    if (otherEntity.tags.has('ball')) { // Ensure only the ball triggers the switch
        if (this.oldCamera && this.newCamera) {
            console.log("Switching cameras...");

            this.oldCamera.enabled = false;  // Disable old camera
            this.newCamera.enabled = true;   // Enable new camera
        } else {
            console.error("CameraSwitch: One or both camera references are missing.");
        }
    }
};

// Cleanup
CameraSwitch.prototype.destroy = function() {
    this.entity.collision.off('triggerenter', this.onTriggerEnter, this);
};
