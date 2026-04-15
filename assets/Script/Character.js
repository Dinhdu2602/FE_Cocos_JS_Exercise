
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
        
        // Tìm sp.Skeleton component (Spine animation)
        let skeletonComponents = this.node.getComponentsInChildren(sp.Skeleton);
        
        
        if (skeletonComponents.length > 0) {
            this.skeletonComponent = skeletonComponents[0];
        } 
        
        // Gán event TOUCH_START/END vào button
        if (this.rightButton) {
            this.rightButton.off(cc.Node.EventType.TOUCH_START);
            this.rightButton.off(cc.Node.EventType.TOUCH_END);
            this.rightButton.on(cc.Node.EventType.TOUCH_START, function() { this.onRightButton(true); }.bind(this), this);
            this.rightButton.on(cc.Node.EventType.TOUCH_END, function() { this.onRightButton(false); }.bind(this), this);
        }
        
        if (this.leftButton) {
            this.leftButton.off(cc.Node.EventType.TOUCH_START);
            this.leftButton.off(cc.Node.EventType.TOUCH_END);
            this.leftButton.on(cc.Node.EventType.TOUCH_START, function() { this.onLeftButton(true); }.bind(this), this);
            this.leftButton.on(cc.Node.EventType.TOUCH_END, function() { this.onLeftButton(false); }.bind(this), this);
        }
    },

    start () {
        this.labelName.string = this.charName;
        this.updateManaBar();
    },
    updateManaBar() {
        this.processMana.progress = this.currentMana / this.mana;
    },
    onLeftButton(isDown) {
        if (isDown) {
            this.walkDirection = -1;
            this._playAnimation("walk");
            this._singleStep(-1);
        } else {
            if (this.walkDirection === -1) this.walkDirection = 0;
            this._playAnimation("idle");
        }
    },
    onRightButton(isDown) {
        if (isDown) {
            this.walkDirection = 1;
            this._playAnimation("walk");
            this._singleStep(1);
        } else {
            if (this.walkDirection === 1) this.walkDirection = 0;
            this._playAnimation("idle");
        }
    },
    // Các hàm click đơn giản để gán vào Click Events trong Cocos Creator
    onLeftClick() {
        if (this.currentMana <= 0) return;
        this._singleStep(-1);
    },
    onRightClick() {
        if (this.currentMana <= 0) return;
        this._singleStep(1);
    },
    // Di chuyển 1 bước nhỏ khi nhấn nhanh
    _singleStep(direction) {
        if (this.currentMana <= 0) return;
        let pos = this.node.position;
        pos.x += direction * this.speed * 0.08; // đi 1 bước nhỏ (0.08s)
        this._playAnimation("walk");
        this.node.setPosition(pos);
        let manaCost = 10 * 0.08; // tăng mana cost (từ 5 lên 10)
        this.currentMana -= manaCost;
        if (this.currentMana < 0) this.currentMana = 0;
        this.updateManaBar();
    },
    // Hàm update gọi mỗi frame - xử lý nhấn giữ di chuyển mượt mà
    update(dt) {
        if (this.walkDirection !== 0 && this.currentMana > 0) {
            // Play animation run khi đang giữ nút
            this._playAnimation("run");
            
            let pos = this.node.position;
            pos.x += this.walkDirection * this.speed * dt;
            if (pos.x > 730) pos.x = 730;
            if (pos.x < -700) pos.x = -700;
            this.node.setPosition(pos);
            let manaCost = 10 * dt; // trừ mana khi nhấn giữ
            this.currentMana -= manaCost;
            if (this.currentMana < 0) {
                this.currentMana = 0;
                this.node.active = false;
            }
            this.updateManaBar();
        }
    },
    
    // Hàm chạy animation (dùng sp.Skeleton - Spine)
    _playAnimation(animName) {
        if (!this.skeletonComponent) return;
        if (this.currentAnimation === animName) return; // tránh play liên tục cùng animation
        
        this.skeletonComponent.setAnimation(0, animName, true); // loop = true
        this.currentAnimation = animName;
    }
    // update (dt) {},
});
