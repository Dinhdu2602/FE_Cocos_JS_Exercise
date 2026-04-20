import mEventEmitter from "./EventEmitter";

cc.Class({
    extends: cc.Component,

    properties: {
        spine: sp.Skeleton,
    },

    onEnable() {
        mEventEmitter.instance.registerEvent(
            "PLAY_ANIM",
            this.playAnim,
            this
        );
    },

    onDisable() {
        mEventEmitter.instance.removeAllEvents(this);
    },

    playAnim(animName) {
        this.resetState();
        this.spine.setAnimation(0, animName, true);
    },

    resetState() {
        this.spine.clearTracks();
        this.spine.setToSetupPose();
    },

    onClickDisableSelf() {
        this.node.active = false;
    }
});