var Rectfix = pc.createScript('rectfix');

// initialize code called once per entity
Rectfix.prototype.initialize = function() {
this.entity.rigidbody.angularFactor.set(0, 0, 0);





    var collision = this.entity.collision;

    if (!collision) {
        console.error("No collision component found on entity.");
        return;
    }

    var size = null;

    // Check for Box collision
    if (collision.halfExtents) {
        size = collision.halfExtents.clone().scale(2);
    }
    // Check for Sphere collision
    else if (collision.radius !== undefined) {
        size = new pc.Vec3(collision.radius * 2, collision.radius * 2, collision.radius * 2);
    }
    // Check for Capsule or Cylinder collision
    else if (collision.scale) {
        size = collision.scale.clone();
    }

    if (size) {
        this.entity.setLocalScale(size);
        console.log("Entity scaled to match collision size:", size);
    } else {
        console.warn("Collision shape not supported for auto-scaling.");
    }

    // Apply the same rotation as the collision component
    var rotation = collision.entity.getRotation();
    this.entity.setRotation(rotation);
    console.log("Entity rotation set to match collision:", rotation);


};

// update code called every frame
Rectfix.prototype.update = function(dt) {

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Rectfix.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/
