const Emitter = require('events');
const http = require('http');
const context = require('./context');
const response = require('./response');
const request = require('./request');

const compose = function(middlewares, ctx) {
    function dispatch(index) {
        if (index === middlewares.length) return Promise.resolve();
        return Promise.resolve(middlewares[index](ctx, dispatch(index ++)));
    }
    return dispatch(0);
}

module.exports = class Koa extends Emitter{
    constructor() {
        super();
        this.middlewares = [];
        this.context = Object.create(context);
        this.response = Object.create(response);
        this.request = Object.create(request);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }
    
    handleRequest(req, res) {
        const ctx = this.createContext(req, res);
        compose(this.middlewares, ctx)
           .then(handleRE)
    }
    
    createContext(req, res) {
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);
        context.req =  request.req = response.req =req;
        context.res = request.res = response.res = res;
        request.ctx = response.ctx = context;
        return context;
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest(req, res));
        return server.listen(...args);
    }
}