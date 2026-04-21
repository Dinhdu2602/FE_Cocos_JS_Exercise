

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
        range: 200,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startY = this.node.y;
        this.direction = 1;
    },

    update(dt) {
        this.move(dt);
    },

    move(dt) {
        this.node.y += this.direction * this.speed * dt;

        const upper = this.startY + this.range;
        const lower = this.startY - this.range;

        if (this.node.y > upper || this.node.y < lower) {
            this.direction *= -1;
        }
    },
});
