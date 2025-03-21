var GameController = pc.createScript('gameController');

// Attributes
GameController.attributes.add('ball', {
    type: 'entity',
    title: 'Ball',
    description: 'The ball entity that will be frozen until the game starts'
});

GameController.attributes.add('dominosGroup', {
    type: 'entity',
    title: 'Dominos Group',
    description: 'Parent entity containing all dominos'
});

GameController.attributes.add('movingPlatform', {
    type: 'entity',
    title: 'Moving Platform',
    description: 'The moving platform that should reset'
});



GameController.attributes.add('initialCamera', {
    type: 'entity',
    title: 'Initial Camera',
    description: 'The first camera to reset back to'
});

GameController.attributes.add('secondaryCamera', {
    type: 'entity',
    title: 'Secondary Camera',
    description: 'The second camera in the game'
});

GameController.attributes.add('thirdCamera', {
    type: 'entity',
    title: 'Third Camera',
    description: 'The third camera in the game'
});

// Initialize script
GameController.prototype.initialize = function() {
    // Store initial positions and rotations
    this.startPosition = this.ball.getPosition().clone();
    this.startRotation = this.ball.getRotation().clone();

    this.platformStartPos = this.movingPlatform.getPosition().clone();
    this.platformStartRot = this.movingPlatform.getRotation().clone();

    this.dominos = this.dominosGroup.children;

    this.dominoStartData = this.dominos.map(domino => ({
        entity: domino,
        position: domino.getPosition().clone(),
        rotation: domino.getRotation().clone()
    }));

        

    // Freeze the ball at the start
    this.freezeBall();

    // Listen for key presses
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
};

// Freezes the ball in place
GameController.prototype.freezeBall = function() {
    if (this.ball.rigidbody) {
        this.ball.rigidbody.type = pc.BODYTYPE_STATIC; // Prevent movement
    }
};

// Unfreezes the ball (starts the game)
GameController.prototype.unfreezeBall = function() {
    if (this.ball.rigidbody) {
        this.ball.rigidbody.type = pc.BODYTYPE_DYNAMIC; // Enable physics
    }
};

GameController.prototype.resetGame = function() {
    console.log("Resetting game...");

    // Freeze and reset the ball
    this.freezeBall();
    
    // Check if the ball has a rigidbody and teleport it
    if (this.ball.rigidbody) {
        this.ball.rigidbody.teleport(this.startPosition, this.startRotation);
        this.ball.rigidbody.linearVelocity = pc.Vec3.ZERO;
        this.ball.rigidbody.angularVelocity = pc.Vec3.ZERO;
    } else {
        console.error("Ball entity has no rigidbody component!");
    }

    // Reset all dominos
    this.dominoStartData.forEach(data => {
        if (data.entity.rigidbody) {
            data.entity.rigidbody.teleport(data.position, data.rotation);
            data.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
            data.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
        } else {
            console.error("Domino entity has no rigidbody component:", data.entity.name);
        }
    });

   
       // Reset the moving platform's position and rotation
        this.movingPlatform.setPosition(this.platformStartPos);
            this.movingPlatform.setRotation(this.platformStartRot);

    
    if (this.entity.tags.has("ball")){
        console.log("Entity tags:",this.entity.tags);
    console.log(" ball has ball tag ");
} else {
    this.entity.tags.add('ball');
    console.log(" added TAG BALL to ball");
    console.log("Entity tags:", this.entity.tags);

    }
    this.movingPlatform.removeComponent('rigidbody');
    // Optionally, re-add a static or kinematic rigidbody if needed
   this.movingPlatform.addComponent('collision', {
        type: 'box', // Collision shape type (can be box, sphere, capsule, etc.)
        halfExtents: new pc.Vec3(0.163, 0.02, 0.118) // Half extents (size of the collision box in the X, Y, Z directions)
    });        

    // Reset cameras: Enable the initial one, disable the others
    this.initialCamera.enabled = true;
    this.secondaryCamera.enabled = false;
    this.thirdCamera.enabled = false;

    console.log("Game reset complete.");
};


// Handle key presses
GameController.prototype.onKeyDown = function(event) {
    if (event.key === pc.KEY_SPACE) {
        this.unfreezeBall(); // Start the game
    } else if (event.key === pc.KEY_R) {
        this.resetGame(); // Reset everything
    }
};
