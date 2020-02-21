const Emitter = require('events');
const http = require('http');
const response = require('./response');
const request = require('./request');

module.exports = class Koa extends Emitter{
    constructor() {
        super();
        this.middlewares = [];
        this.response = Object.create(response);
        this.request = Object.create(request);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    callback() {
        const fn = 
    }

    
    handleRequest(req, res) {
        this.compose(req, res);
    }
    
    createContext() {
        this.request
    }
    
    compose(middlewares) {
        function dispatch(index) {
            if (index === middlewares.length) return Promise.resolve();
            return Promise.resolve(middlewares[index](this, dispatch(index ++)));
        }
        return dispatch(0);
    }

    listen(...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }
}