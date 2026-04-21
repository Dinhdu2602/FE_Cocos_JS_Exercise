const Event = require("../core/EventEmitter_Core");
cc.Class({
  extends: cc.Component,

  properties: {
    speed: 200,
    enableLog: true,
    currentBulletType: "axe",

    minX: -670,
    maxX: -400,
    minY: -350,
    maxY: 120,
  },

  onLoad() {
    this.initializeCharacter();
    this.registerEvent();

    // Event.on(Event.EVENT.SHOOT, this.onShoot, this);
  },

  onDestroy() {
    this.unregisterEvent();
  },

  initializeCharacter() {
    this.manager = this.getCharacterManager();

    if (!this.manager) {
      this.logWarning("CharacterManager not found.");
      return;
    }

    this.characterId = this.manager.registerCharacter(this.node);
    this.directionX = 0;
    this.directionY = 0;
  },

  registerEvent() {
    Event.on(Event.EVENT.SHOOT, this.onShoot, this);
    Event.on("CHANGE_BULLET", this.onChangeBullet, this);

    Event.on("MOVE_UP", this.onMoveUp, this);
    Event.on("MOVE_DOWN", this.onMoveDown, this);
    Event.on("MOVE_LEFT", this.onMoveLeft, this);
    Event.on("MOVE_RIGHT", this.onMoveRight, this);

    Event.on("STOP_MOVE_X", this.onStopMoveX, this);
    Event.on("STOP_MOVE_Y", this.onStopMoveY, this);
  },

  unregisterEvent() {
    Event.off(Event.EVENT.SHOOT, this.onShoot, this);

    Event.off("MOVE_UP", this.onMoveUp, this);
    Event.off("MOVE_DOWN", this.onMoveDown, this);
    Event.off("MOVE_LEFT", this.onMoveLeft, this);
    Event.off("MOVE_RIGHT", this.onMoveRight, this);

    Event.off("STOP_MOVE_X", this.onStopMoveX, this);
    Event.off("STOP_MOVE_Y", this.onStopMoveY, this);
  },

  onMoveUp() {
    this.directionY = 1;
  },
  onMoveDown() {
    this.directionY = -1;
  },

  onMoveLeft() {
    this.directionX = -1;
  },
  onMoveRight() {
    this.directionX = 1;
  },

  onStopMoveX() {
    this.directionX = 0;
  },
  onStopMoveY() {
    this.directionY = 0;
  },

  onChangeBullet(type) {
  this.currentBulletType = type;
  this.log("Switch Bullet Type: " + type);
},
  getCharacterManager() {
    return this.node.parent.getComponent("CharacterManager");
  },

  onShoot() {
    this.handleShootRequest();
  },

  handleShootRequest() {
    const worldPosition = this.getWorldPosition();
    this.emitSpawnBullet(worldPosition);
  },

  getWorldPosition() {
    return this.node.convertToWorldSpaceAR(cc.v2(0, 0));
  },

  emitSpawnBullet(worldPosition) {
    Event.emit(Event.EVENT.SPAWN_BULLET, {
      shooterId: this.characterId,
      worldPosition: worldPosition,
      bulletType: this.currentBulletType,
    });
  },

  handleMovement(dt) {
    if (this.directionX === 0 && this.directionY === 0) return;

    let newX = this.node.x + this.directionX * this.speed * dt;
    let newY = this.node.y + this.directionY * this.speed * dt;

    newX = this.clamp(newX, this.minX, this.maxX);
    newY = this.clamp(newY, this.minY, this.maxY);

    this.node.setPosition(newX, newY);
  },

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },

  update(dt) {
    this.handleMovement(dt);
  },
  log(message) {
    if (!this.enableLog) return;
    cc.log("[Character] " + message);
  },

  logWarning(message) {
    cc.warn("[Character WARNING] " + message);
  },
});
