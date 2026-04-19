
cc.Class({
    extends: cc.Component,

    properties: {
        spineNode: cc.Node,
        animation: cc.Animation,
    },

    onClickTween() {
        cc.tween(this.spineNode)
            .to(0.5, { scale: 1.5 })
            .to(0.5, { scale: 1 })
            .start();
    },

    onClickRunAction() {
        let action = cc.sequence(
            cc.scaleTo(0.5, 1.5),
            cc.scaleTo(0.5, 1)
        );

        this.spineNode.runAction(action);
    },

    onClickTimeline() {
        this.animation.play("your_clip_name");
    }
});