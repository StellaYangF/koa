module.exports = {
    _body: undefined,

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
        this.statusCode(200);
        this._body = val;
    },
    
    statusCode(newValue) {
        this.res.statusCode = newValue;
    },

    set(...args) {
        console.log(args);
        this.res.setHeader(...args);
    }
}