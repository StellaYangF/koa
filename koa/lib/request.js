module.exports = {
    method() {
        return this.req.method;
    },

    set method(val) {
        this.req.method = val;
    },

    get url() {
        return this.req.url;
    },

    get path() {
        return require('url').parse(this.req).pathname;
    }
}