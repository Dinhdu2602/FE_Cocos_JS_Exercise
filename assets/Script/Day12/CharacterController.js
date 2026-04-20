import mEventEmitter from "./EventEmitter";

cc.Class({
    extends: cc.Component,

    properties: {
        spine: sp.Skeleton,
    },

    onLoad() {
        mEventEmitter.instance.removeAllEvents(this);
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
        this.spine.setAnimation(0, animName, true);
        this.resetState();
        this.spine.setAnimation(0, animName, true);
    },

    resetState() {
        this.spine.clearTracks();
        this.spine.setToSetupPose();
    },

   onClickRemoveAllEvents() {
        mEventEmitter.instance.removeAllEvents(this);
   },
});