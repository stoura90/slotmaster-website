let events = {};
export const UseEvent = () => {

    return {
        subscribe: (name, cb) => {
            (events[name] || (events[name] = [])).push(cb);
            return {
                unsubscribe: () => {
                    events[name] && events[name].splice(events[name].indexOf(cb), 1);
                }
            };
        },
        emit: (name, data) => {
            (events[name] || []).forEach(fn => fn(data));
        }
    };
}
