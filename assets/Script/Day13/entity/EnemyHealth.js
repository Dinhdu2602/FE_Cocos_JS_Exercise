
cc.Class({
    extends: cc.Component,

    properties: {
        maxHp: 100,
        hpBar: cc.ProgressBar,
        damageLabel: cc.Label,
    },  

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentHp = this.maxHp;
        this.updateHpBar();
    },

    takeDamage(damage) {
        this.currentHp -=damage;

        this.updateHpBar();
        this.showDamage(damage);

        if (this.currentHp <= 0) {
            this.die();
        }
    },

    updateHpBar() {
        if (!this.hpBar) return;
        this.hpBar.progress = this.currentHp / this.maxHp;
    },

    showDamage(damage) {
    if (!this.damageLabel) return;

    const node = this.damageLabel.node;

    node.stopAllActions();
    node.active = true;
    node.opacity = 255;

    this.damageLabel.string = "-" + damage;

    const offsetX = Math.random() * 40 - 20;

    node.setPosition(cc.v2(0, 50));

    node.runAction(
        cc.sequence(
            cc.spawn(
                cc.moveBy(0.5, cc.v2(0, 60)),
                cc.fadeOut(0.5)
            ),
            cc.callFunc(() => {
                node.active = false;
            })
        )
    );
},
    
    die() {
        this.node.destroy();
    }
});
