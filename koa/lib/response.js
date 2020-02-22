module.exports = {
    get header() {
        const { res } = this;
        return res.getHeaders();
    },

    get headers() {
        return this.header;
    },

    get status() {
        return this.res.statusCode;
    },

    get body() {
        return this._body;
    },

    set body(val) {
        const original = this._body;
        this._body = val;
    }
}