const Event = require("../core/EventEmitter_Core");
const { BULLET_CONFIG } = require("../core/GameDefine");
cc.Class({
  extends: cc.Component,

  properties: {
    bulletPrefabs: [cc.Prefab],
  },

  onLoad() {
    Event.on(Event.EVENT.SPAWN_BULLET, this.onSpawnBullet, this);

    this.bulletPrefabMap = {
      axe: this.bulletPrefabs[0],
      eye: this.bulletPrefabs[1],
      fish: this.bulletPrefabs[2],
    };
  },

  onSpawnBullet(data) {
    const localPosition = this.convertWorldToLocalPosition(data.worldPosition);

    const bulletNode = this.createBulletNode(data.bulletType);
    if (!bulletNode) return;

    bulletNode.setPosition(localPosition);
    this.node.addChild(bulletNode);

    this.initializeBullet(bulletNode, data.bulletType);
  },
  convertWorldToLocalPosition(worldPosition) {
    return this.node.convertToNodeSpaceAR(worldPosition);
  },

  createBulletNode(type) {
    const prefab = this.bulletPrefabMap[type];

    if (!prefab) {
      cc.error("Prefab is missing type:", type);
      return null;
    }

    return cc.instantiate(prefab);
  },
  initializeBullet(bulletNode, type) {
    const bullet = bulletNode.getComponent("Bullet");
    if (!bullet) return;
    const config = BULLET_CONFIG[type];

    bullet.init({
      direction: this.getShootDirection(),
      speed: config.speed,
      damage: config.damage,
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
