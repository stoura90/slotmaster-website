var events = {};
export default class EventEmitter {
    on(name, listener) {
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(listener);
    }

    removeListener(name, listenerToRemove) {
        if (!events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }

        const filterListeners = (listener) => listener !== listenerToRemove;

        events[name] = events[name].filter(filterListeners);
    }

    emit(name, data) {
        if (!events[name]) {
            throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
        }

        const fireCallbacks = (callback) => {
            callback(data);
        };

        events[name].forEach(fireCallbacks);
    }
}

