cc.Class({
    extends: cc.Component,

    onLoad() {
        this.characterMap = new Map();
        this.idCounter = 0;
    },

    registerCharacter(node) {
        const id = ++this.idCounter;
        node.characterId = id;
        this.characterMap.set(id, node);
        return id;
    },

    getMainCharacter() {
        //Get Player1
        return this.node.children[0];
    }
});