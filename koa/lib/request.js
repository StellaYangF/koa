const url = require('url');
const querystring = require('querystring');

module.exports = {
    get method() {
        return this.req.method;
    },

    set method(val) {
        this.req.method = val;
    },

    get path() {
        // Url {
        //     protocol: null,
        //     slashes: null,
        //     auth: null,
        //     host: null,
        //     port: null,
        //     hostname: null,
        //     hash: null,
        //     search: '?id=1',
        //     query: 'id=1',
        //     pathname: '/get',
        //     path: '/get?id=1',
        //     href: '/get?id=1'
        //   }
        const { pathname, query } = url.parse(this.req.url);
        this._params = querystring.parse(query);
        return pathname;
    },

    get params() {
        return this._params;
    },

    get url() {
        return this.req.url;
    },

}