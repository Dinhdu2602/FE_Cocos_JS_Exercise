const Event = require("../core/EventEmitter_Core");

cc.Class({
  extends: cc.Component,

  properties: {
    bulletPrefabs: [cc.Prefab],
  },

  onLoad() {
    Event.on(Event.EVENT.SPAWN_BULLET, this.onSpawnBullet, this);
  },

  onSpawnBullet(data) {
    const localPos = this.convertWorldToLocalPosition(data.worldPosition);

    const bulletNode = this.createBulletNode();
    if (!bulletNode) return;

    bulletNode.setPosition(localPos);
    this.node.addChild(bulletNode);

    this.initializeBullet(bulletNode);
  },
  convertWorldToLocalPosition(worldPosition) {
    return this.node.convertToNodeSpaceAR(worldPosition);
  },

  createBulletNode() {
    if (!this.bulletPrefabs || this.bulletPrefabs.length === 0) {
      cc.error("Bullet prefab is missing!");
      return null;
    }

    return cc.instantiate(this.bulletPrefabs[0]);
  },
  initializeBullet(bulletNode) {
    const bullet = bulletNode.getComponent("Bullet");
    if (!bullet) return;

    const direction = this.getShootDirection();
    // const target = this.getTargetEnemy();
    // if (!target) return;
    // const direction = this.calculateDirection(bulletNode, target);

    bullet.init({
      direction: direction,
      speed: 300,
    });
  },

  getShootDirection() {
    return cc.v2(1, 0);
  },

  getTargetEnemy() {
    const enemyLayer = cc.find("Canvas/EnemyLayer");
    const enemyManager = enemyLayer.getComponent("EnemyManager");

    if (!enemyManager) {
      cc.error("EnemyManager not found!");
      return null;
    }

    const enemy = enemyManager.getFirstEnemy();

    if (!enemy) {
      cc.warn("No Enemy found!");
      return null;
    }

    return enemy;
  },

  calculateDirection(bulletNode, target) {
    const targetWorld = target.parent.convertToWorldSpaceAR(target.position);
    const targetLocal = this.node.convertToNodeSpaceAR(targetWorld);

    const direction = targetLocal.sub(bulletNode.position).normalize();

    return direction;
  },

  onDestroy() {
    Event.off(Event.EVENT.SPAWN_BULLET, this.onSpawnBullet, this);
  },
});
