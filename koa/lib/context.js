const proto = {};

function defineProperty(proto, target) {
    // proto.__defineGetter__(prop, function() {
    //     this[target][prop];
    // })

    // Object.defineProperty(proto, prop, {
    //     get() {
    //         return this[target][prop]
    //     }
    // })

    return {
        access(prop) {
            Object.defineProperty(proto, target, {
                get() {
                    return this[target][prop];
                }
            })
        }
    }
}

defineProperty(proto, 'response')
    .access('method')
    .access('url')
    .access('pathname')
module.exports = proto;