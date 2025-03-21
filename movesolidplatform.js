var Move = pc.createScript('movesolidplatform');

Move.attributes.add('TargetPos', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The target entity where the platfrom will stop'
});
Move.attributes.add('moveSpeed', { type: 'number', default: 0.1, description: 'Speed of movement' });

Move.prototype.initialize = function() {
    this.moving = false;

};

// The method to be called from MovePlatform
Move.prototype.moveplat = function() {
    this.moving = true;
    this.target = this.TargetPos.getPosition(); 
    }

Move.prototype.update = function(dt) {
    // Update the target position
    if(this.moving){
    // Update code called every frame
    var currentPos = this.entity.getPosition();
    
    // Move the solidplatform smoothly toward the target position
    var newPosition = currentPos.lerp(currentPos, this.target, this.moveSpeed * dt);

    // Apply new position to solidplatform
    this.entity.setPosition(newPosition);

    // Stop moving once platform reaches the target
    if (newPosition.distance(this.target) < 0.1) {
        this.moving = false;
        console.log("Solid platform reached target position.");
    }
    }
};

