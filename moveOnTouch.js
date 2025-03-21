var MoveOnTouch = pc.createScript('moveOnTouch');

MoveOnTouch.attributes.add('TARGET', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The target entity where we are going to teleport'
});

// initialize code called once per entity
MoveOnTouch.prototype.initialize = function() {
    const onTriggerEnter = (otherEntity) => {
        console.log("Trigger detected with entity:", otherEntity.name); // Log the triggered entity
        
        // Log all tags of the entity
        console.log("Entity tags:", otherEntity.tags);

        // If the entity has the 'ball' tag
        if (otherEntity.tags.has("ball")) {
            console.log("Teleporting entity:", otherEntity.name);

             
        var targetPos = this.TARGET.getPosition().clone();
        targetPos.y += 0.5; // Move the entity up by 2 units
        otherEntity.script.movement.moveOnTouch(targetPos);// Set the new position


        } else {
            console.log("Entity does not have the 'ball' tag:", otherEntity.name);
        }
    };

    // Subscribe to the triggerenter event of this entity's collision component.
    this.entity.collision.on('triggerenter', onTriggerEnter);

    // Unsubscribe if the teleporter is destroyed
    this.on('destroy', () => {
        this.entity.collision.off('triggerenter', onTriggerEnter);
    });
};
