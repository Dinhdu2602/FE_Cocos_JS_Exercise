cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
    },

    init(data) {
        this.initializeSpeed(data);
        this.initializeDirection(data);
        
        cc.log("[Bullet] Init with direction:", this.direction);
    },

    initializeSpeed(data) {
        if (data && data.speed) {
            this.speed = data.speed;
        }
    },

    initializeDirection(data) {
        if (!data || !data.direction) {
            this.direction = null;
            this.logWarning("Direction is missing.");
            return;
        }

        this.direction = data.direction.normalize();
    },

    update(dt) {
        this.move(dt);

        //cc.log("Bullet pos:", this.node.y);
    },

    move(deltaTime) {
        if (!this.direction) return;

        const movement = this.calculateMovement(deltaTime);
        this.applyMovement(movement);
    },

    calculateMovement(deltaTime) {
        return this.direction.mul(this.speed * deltaTime);
    },

    applyMovement(movement) {
        this.node.position = this.node.position.add(movement);
    },

    logWarning(message) {
        cc.warn("[Bullet WARNING] " + message);
    }
});