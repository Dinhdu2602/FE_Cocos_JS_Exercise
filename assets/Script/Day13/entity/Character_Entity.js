import Event from "../core/EventEmitter_Core";

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
    },

    onLoad() {
        this.manager = this.node.parent.getComponent("CharacterManager");
        this.characterId = this.manager.registerCharacter(this.node);

        Event.on(Event.EVENT.SHOOT, this.onShoot, this);
    },

    onShoot() {
        this.shoot();
    },

    shoot() {
        const worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);

        Event.emit(Event.EVENT.SPAWN_BULLET, {
            shooterId: this.characterId,
            worldPos: worldPos
        });
    },

    onDestroy() {
        Event.off(Event.EVENT.SHOOT, this.onShoot, this);
    }
});