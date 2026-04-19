class mEventEmitter {
    constructor() {
        this.eventEmitter = new cc.EventTarget();
        this.listenerMap = new Map();
    }

    emit(eventName, data) {
        this.eventEmitter.emit(eventName, data);
    }

    registerEvent(eventName, method, owner) {
        this.eventEmitter.on(eventName, method, owner);

        if (owner) {
            if (!this.listenerMap.has(owner)) {
                this.listenerMap.set(owner, []);
            }
            this.listenerMap.get(owner).push({ eventName, method });
        }
    }

    // removeAllEvents(owner) {
    //     if (!this.listenerMap.has(owner)) return;

    //     const listeners = this.listenerMap.get(owner);

    //     listeners.forEach(({ eventName, method }) => {
    //         this.eventEmitter.off(eventName, method, owner);
    //     });

    //     this.listenerMap.delete(owner);
    // }
}

mEventEmitter.instance = new mEventEmitter();
export default mEventEmitter;