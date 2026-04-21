const Event = require("../core/EventEmitter_Core");

cc.Class({
  extends: cc.Component,

  properties: {
    enableLog: true,
  },

  //LIFE CYCLE
  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onKeyDown(event) {
    this.handleKeyDown(event.keyCode);

    switch (event.keyCode) {
      case cc.macro.KEY.e:
        Event.emit("CHANGE_BULLET", "axe");
        break;

      case cc.macro.KEY.r:
        Event.emit("CHANGE_BULLET", "eye");
        break;

      case cc.macro.KEY.t:
        Event.emit("CHANGE_BULLET", "fish");
        break;
      case cc.macro.KEY.w:
        Event.emit("MOVE_UP");
        break;
      case cc.macro.KEY.s:
        Event.emit("MOVE_DOWN");
        break;
      case cc.macro.KEY.a:
        Event.emit("MOVE_LEFT");
        break;
      case cc.macro.KEY.d:
        Event.emit("MOVE_RIGHT");
        break;
    }
  },

  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.w:
      case cc.macro.KEY.s:
        Event.emit("STOP_MOVE_Y");
        break;

      case cc.macro.KEY.a:
      case cc.macro.KEY.d:
        Event.emit("STOP_MOVE_X");
        break;
    }
  },

  handleKeyDown(keyCode) {
    switch (keyCode) {
      case cc.macro.KEY.space:
        this.handleShootInput();
        break;
      default:
        this.logKeyIgnored(keyCode);
        break;
    }
  },

  handleShootInput() {
    this.logAction("Shoot Key pressed.");
    this.emitShootEvent();
  },

  emitShootEvent() {
    Event.emit(Event.EVENT.SHOOT);
  },

  logAction(message) {
    if (!this.enableLog) return;
    cc.log("[Input Controller] " + message);
  },

  logWarning(message) {
    cc.warn("[Input Controller WARNING] " + message);
  },

  logKeyIgnored(keyCode) {
    if (!this.enableLog) return;
    cc.log("[Input Controller] Key Ignored: " + keyCode);
  },
});
