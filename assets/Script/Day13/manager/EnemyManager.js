cc.Class({
    extends: cc.Component,

    getAllMonster() {
        return this.node.children;
    },

    getFirstMonster() {
        return this.node.children[0];
    }
});
