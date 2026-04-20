import Event from "./EventEmitter_Core";

cc.Class({
    extends: cc.Component,

    properties: {
        characterLayer: cc.Node,
        bulletLayer: cc.Node,
        enemyLayer: cc.Node,
    },

    onLoad() {
        window.Game = this; 
    },

    start() {
        this.initManagers();
    },

    initManagers() {
        this.characterManager = this.characterLayer.getComponent("CharacterManager");
        this.bulletManager = this.bulletLayer.getComponent("BulletManager");
        this.monsterManager = this.enemyLayer.getComponent("MonsterManager");
    }
});