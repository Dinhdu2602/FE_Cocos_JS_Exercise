import Event from "../core/EventEmitter_Core";

cc.Class({
    extends: cc.Component,

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                Event.emit(Event.EVENT.SHOOT);
                break;
        }
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
});