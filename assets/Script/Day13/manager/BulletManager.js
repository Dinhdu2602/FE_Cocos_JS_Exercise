import Event from "../core/EventEmitter_Core";

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefabs: [cc.Prefab],
    },

    onLoad() {
        Event.on(Event.EVENT.SPAWN_BULLET, this.onSpawnBullet, this);
    },

    onSpawnBullet(data) {
       
        console.log("Spawn bullet", data);
    },

    onDestroy() {
        Event.off(Event.EVENT.SPAWN_BULLET, this.onSpawnBullet, this);
    }
});