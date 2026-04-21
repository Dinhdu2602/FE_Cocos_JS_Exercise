cc.Class({
  extends: cc.Component,

  getAllEnemy() {
    return this.node.children;
  },

  getFirstEnemy() {
    if (!this.node || this.node.children.length === 0) {
      return null;
    }
    return this.node.children[0];
  },
});
