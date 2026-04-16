cc.Class({
    extends: cc.Component,

    properties: {
        charName: "Player Demo",
        mana: 100,
        speed: 200,
        processMana: cc.ProgressBar,
        labelName: cc.Label,
        leftButton: cc.Node,
        rightButton: cc.Node,
    },

    onLoad() {
        this.currentMana = this.mana;
        this.walkDirection = 0;
        this.currentAnimation = "idle";
        this.holdTime = 0;
        this.transitionTime = 0.5;

        // ✅ Lấy skeleton TRƯỚC
        let skeletonComponents = this.node.getComponentsInChildren(sp.Skeleton);
        if (skeletonComponents.length > 0) {
            this.skeletonComponent = skeletonComponents[0];
        } else {
            cc.error("Không tìm thấy Spine!");
            return;
        }

        this.originalScaleX = this.skeletonComponent.node.scaleX;
        this.originalScaleY = this.skeletonComponent.node.scaleY;

        // ✅ Hướng ban đầu (fix player 2)
       // this.facing = Math.sign(this.originalScaleX) || 1;

        // BUTTON EVENTS
        if (this.rightButton) {
            this.rightButton.off(cc.Node.EventType.TOUCH_START);
            this.rightButton.off(cc.Node.EventType.TOUCH_END);

            this.rightButton.on(cc.Node.EventType.TOUCH_START, () => {
                this.onRightButton(true);
            }, this);

            this.rightButton.on(cc.Node.EventType.TOUCH_END, () => {
                this.onRightButton(false);
            }, this);
        }

        if (this.leftButton) {
            this.leftButton.off(cc.Node.EventType.TOUCH_START);
            this.leftButton.off(cc.Node.EventType.TOUCH_END);

            this.leftButton.on(cc.Node.EventType.TOUCH_START, () => {
                this.onLeftButton(true);
            }, this);

            this.leftButton.on(cc.Node.EventType.TOUCH_END, () => {
                this.onLeftButton(false);
            }, this);
        }
    },

    start() {
        this.labelName.string = this.charName;
        this.updateManaBar();
    },

    updateManaBar() {
        this.processMana.progress = this.currentMana / this.mana;
    },

    onLeftButton(isDown) {
        if (isDown) {
            this.walkDirection = -1;
            this.holdTime = 0;
            this._updateCharacterScale();
            this._playAnimation("walk");
        } else {
            if (this.walkDirection === -1) this.walkDirection = 0;
            this.holdTime = 0;
            this._playAnimation("idle");
        }
    },

    onRightButton(isDown) {
        if (isDown) {
            this.walkDirection = 1;
            this.holdTime = 0;
            this._updateCharacterScale();
            this._playAnimation("walk");
        } else {
            if (this.walkDirection === 1) this.walkDirection = 0;
            this.holdTime = 0;
            this._playAnimation("idle");
        }
    },

    _singleStep(direction) {
        if (this.currentMana <= 0) return;

        let pos = this.node.position;

    
        pos.x += direction * this.speed * 0.08;

        this.node.setPosition(pos);
        this._playAnimation("walk");

        this.currentMana -= 10 * 0.08;
        if (this.currentMana < 0) this.currentMana = 0;

        this.updateManaBar();
    },

    update(dt) {
        if (this.walkDirection !== 0 && this.currentMana > 0) {
            this.holdTime += dt;

            if (this.holdTime >= this.transitionTime) {
                this._playAnimation("run");
            } else {
                this._playAnimation("walk");
            }

            let pos = this.node.position;

        
           pos.x += this.walkDirection * this.speed * dt;

            if (pos.x > 730) pos.x = 730;
            if (pos.x < -700) pos.x = -700;

            this.node.setPosition(pos);

            this.currentMana -= 10 * dt;
            if (this.currentMana < 0) {
                this.currentMana = 0;
                this.node.active = false;
            }

            this.updateManaBar();
        }
    },

    _updateCharacterScale() {
        if (this.walkDirection === 0 || !this.skeletonComponent) return;

        let absScaleX = Math.abs(this.originalScaleX);

        this.skeletonComponent.node.scaleX =
            absScaleX * this.walkDirection;

        this.skeletonComponent.node.scaleY = this.originalScaleY;
    },

    _playAnimation(animName) {
        if (!this.skeletonComponent) return;
        if (this.currentAnimation === animName) return;

        this.skeletonComponent.setAnimation(0, animName, true);
        this.currentAnimation = animName;
    },
});