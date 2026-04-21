
cc.Class({
    extends: cc.Component,

    properties: {
        maxHp: 100,
        hpBar: cc.ProgressBar,
        damageLabelPrefab: cc.Prefab,
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
        if (!this.damageLabelPrefab) return;

        const node = cc.instantiate(this.damageLabelPrefab);
        node.setPosition(this.node.position);
        this.node.parent.addChild(node);

        const label = node.getComponent(cc.Label);
        label.string = "-" + damage;

        node.runAction(
            cc.sequence(
                cc.moveBy(0.5, cc.v2(0, 50)),
                cc.fadeOut(0.3),
                cc.callFunc(() => node.destroy())
            )
        );
    },
    
    die() {
        this.node.destroy();
    }
});
