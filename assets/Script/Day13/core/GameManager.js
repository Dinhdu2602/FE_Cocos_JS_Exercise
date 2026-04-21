const Event = require("./EventEmitter_Core");

cc.Class({
  extends: cc.Component,

  properties: {
    characterLayer: cc.Node,
    bulletLayer: cc.Node,
    enemyLayer: cc.Node,
  },

  onLoad() {
    this.enemyManager = this.enemyLayer.getComponent("EnemyManager");
    window.Game = this;
  },

  getFirstEnemy() {
    return this.enemyManager.getFirstEnemy();
  },

  start() {
    this.initManagers();
  },

  initManagers() {
    this.characterManager =
    this.characterLayer.getComponent("CharacterManager");
    this.bulletManager = this.bulletLayer.getComponent("BulletManager");
    this.enemyManager = this.enemyLayer.getComponent("EnemyManager");
  },
});
