var Teleporter = pc.createScript('teleporter');

Teleporter.attributes.add('target', {
    type: 'entity',
    title: 'Target Entity',
    description: 'The target entity where we are going to teleport'
});

// initialize code called once per entity
Teleporter.prototype.initialize = function() {
    const onTriggerEnter = (otherEntity) => {
        console.log("Trigger detected with entity:", otherEntity.name); // Log the triggered entity

        // If the entity has the movement script attached
        if (otherEntity.script && otherEntity.script.movement) {
            console.log("Teleporting entity:", otherEntity.name);

            const targetPos = this.target.getPosition().clone();
            targetPos.y += 0.5; // Slight adjustment to the y position

            // Teleport the entity
            otherEntity.script.movement.teleport(targetPos);
        } else {
            console.log("No movement script on entity:", otherEntity.name);
        }
    };

    // Subscribe to the triggerenter event of this entity's collision component.
    this.entity.collision.on('triggerenter', onTriggerEnter);

    // Unsubscribe if the teleporter is destroyed
    this.on('destroy', () => {
        this.entity.collision.off('triggerenter', onTriggerEnter);
    });
};
