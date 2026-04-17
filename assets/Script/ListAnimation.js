

cc.Class({
    extends: cc.Component,

    properties: {
        spine: sp.Skeleton,
        itemPrefab: cc.Prefab,
        content: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.content.removeAllChildren();
    },

    
     
    start() {
        const animations = this.spine._skeleton.data.animations;
        console.log(animations);

        for (let anim = 0; anim < animations.length; anim++) {
            let item = this.loadAnimButton(animations[anim].name);
            item.parent = this.content;
        }
    },

    loadAnimButton(name) {
        let button = cc.instantiate(this.itemPrefab);
        button.getComponentInChildren(cc.Label).string = name;
        console.log(button.getChildByName("Background"));
        return button;
    }
    // update (dt) {},
});
