const proto = {};

function defineGetter(property, key) {
    proto.__defineGetter__(key, function() {
        return this[property][key];
    })
}

function defineSetter(property, key) {
    proto.__defineSetter__(key, function(newValue) {
        this[property][key] = newValue;
    })
}


defineGetter('request', 'method');
defineGetter('request', 'path');
defineGetter('response', 'body');
defineGetter('response', 'set');
defineGetter('request', 'params');
defineGetter('response', 'statusCode');

defineSetter('response', 'body');


module.exports = proto;