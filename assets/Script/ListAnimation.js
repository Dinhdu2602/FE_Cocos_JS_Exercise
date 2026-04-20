import mEventEmitter from "./EventEmitter";
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

        for (let anim = 0; anim < animations.length; anim++) {
            let item = this.loadAnimButton(animations[anim].name);
            item.parent = this.content;
        }
    },

    loadAnimButton(name) {
        let button = cc.instantiate(this.itemPrefab);
        button.getComponentInChildren(cc.Label).string = name;
        button.on("click", () => {
            mEventEmitter.instance.emit("PLAY_ANIM", name);
        });
        return button;
    }
    // update (dt) {},
});
