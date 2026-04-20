
cc.Class({
    extends: cc.Component,

    properties: {
        spineNode: cc.Node,
        animation: cc.Animation,
        timelineClip: "CharacterAnimationClip" 
    },
    onLoad() {
        this.defaultState = {
            position: this.spineNode.position.clone(),
            scaleX: this.spineNode.scaleX,
            scaleY: this.spineNode.scaleY,
            angle: this.spineNode.angle,
        };
    },

    stopAll() {
        if (this.animation) {
            this.animation.stop();
        }

        cc.Tween.stopAllByTarget(this.spineNode);
        this.spineNode.stopAllActions();
        this.spineNode.setScale(1, 1);
        this.spineNode.angle = 0;
        this.spineNode.y = this.defaultState.position.y;
    },
        

    onClickTween() {
        this.stopAll();
        cc.tween(this.spineNode)
            .to(0.3, { scale: 1.3, y: 20}, { easing: "quadOut"})
            .to(0.2, { scale: 1, y: 0}, {easing: "bounceOut"})
            .start();
    },

    onClickRunAction() {
        this.stopAll();

        let jumpUp = cc.moveBy(0.2, cc.v2(0, 60)).easing(cc.easeCubicActionOut());
        let fallDown = cc.moveBy(0.3, cc.v2(0, -60)).easing(cc.easeBounceOut());

        let scaleUp = cc.scaleTo(0.2, 1.3);
        let scaleDown = cc.scaleTo(0.3, 1);

        let rotate = cc.rotateBy(0.6, 360);

    

        let action = cc.sequence(
            cc.spawn(jumpUp, scaleUp),   
            cc.spawn(fallDown, scaleDown, rotate)
        );

        this.spineNode.runAction(action);
    },

    onClickTimeline() {
        this.stopAll();
        let action = this.animation;
        
        this.animation.wrapMode = cc.WrapMode.Loop;
        action.play(this.timelineClip);
    }
});