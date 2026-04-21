cc.Class({
  extends: cc.Component,

  properties: {
    smallPrefab: cc.Prefab,
    mediumPrefab: cc.Prefab,
    bigPrefab: cc.Prefab,
  },

  start() {
    this.spawnEnemy("small", cc.v2(-100, 0));
    this.spawnEnemy("medium", cc.v2(150, 0));
    this.spawnEnemy("big", cc.v2(550,0));
  },

  spawnEnemy(type, position) {
    let prefab = null;

    switch (type) {
      case "small":
        prefab = this.smallPrefab;
        break;
      case "medium":
        prefab = this.mediumPrefab;
        break;
      case "big":
        prefab = this.bigPrefab;
        break;
    }

    if (!prefab) return;

    const enemy = cc.instantiate(prefab);
    enemy.setPosition(position);
    this.node.addChild(enemy);
    const movement = enemy.getComponent("EnemyMovement");
    if (movement) {
      movement.startY = position.y;
    }
  },

  getAllEnemy() {
    return this.node.children;
  },

  getFirstEnemy() {
    return this.node.children[0] || null;
  },
});
