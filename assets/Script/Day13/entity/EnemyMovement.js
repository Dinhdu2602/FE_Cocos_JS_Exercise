const ENEMY_CONFIG = require("../core/GameDefine").ENEMY_CONFIG;

cc.Class({
  extends: cc.Component,

  properties: {
    enemyType: "small",
    speed: 0,
    range: 0,
  },

  // LIFE-CYCLE CALLBACKS:
  start() {
    this.startY = this.node.y;
    this.direction = 1;
  },

  onLoad() {
    const config = ENEMY_CONFIG[this.enemyType];
    if (config) {
      this.speed = config.speed;
      this.range = config.range;
    }
  },

  update(dt) {
    this.move(dt);
  },

  move(dt) {
    const canvas = cc.find("Canvas");
    const size = canvas.getContentSize();
    const halfHeight = size.height / 2;

    const sprite = this.getComponentInChildren(cc.Sprite);
    if (!sprite) return;

    const enemyHalfHeight = (sprite.node.height * sprite.node.scaleY) / 2;

    const nextY = this.node.y + this.direction * this.speed * dt;
    const margin = 70;
    const topLimit = halfHeight - enemyHalfHeight - margin;
    const bottomLimit = -halfHeight + enemyHalfHeight + margin;

    if (nextY > topLimit) {
      this.node.y = topLimit;
      this.direction = -1;
    } else if (nextY < bottomLimit) {
      this.node.y = bottomLimit;
      this.direction = 1;
    } else {
      this.node.y = nextY;
    }
  },
});
