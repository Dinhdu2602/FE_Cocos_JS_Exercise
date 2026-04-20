const EventEmitter = new cc.EventTarget();

const EVENT = {
    SHOOT: "shoot",
    SPAWN_BULLET: "spawn_bullet",
    HIT_MONSTER: "hit_monster",
};

export default {
    on(event, callback, target) {
        EventEmitter.on(event, callback, target);
    },

    off(event, callback, target) {
        EventEmitter.off(event, callback, target);
    },

    emit(event, data) {
        EventEmitter.emit(event, data);
    },

    EVENT
};
