const Emitter = require('events');
const http = require('http');
const context = require('./context');
const response = require('./response');
const request = require('./request');
const Stream = require('stream');

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
        ctx.statusCode(404);
        this.compose(this.middlewares, ctx)
            .then(() => {
                let body = ctx.body;
                if (body instanceof Stream) {
                    body.pipe(res);
                } else if (typeof body === 'object'){
                    ctx.set('Context-Type', 'application/json');
                    res.end(JSON.stringify(body));
                } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
                    res.end(body);
                } else {
                    res.end('Not Found')
                }
            }, err => {
                this.emit('error', err);
                ctx.statusCode(500);
                ctx.end('Internal Server Error')
            })
    }
    
    compose (middlewares, ctx) {
        function dispatch(index) {
            if (index === middlewares.length) return Promise.resolve();
            try {
                return Promise.resolve(middlewares[index](ctx, () => dispatch(index +1)));
            } catch(err) {
                return Promise.reject(err);
            }
        }
        return dispatch(0);
    }

    createContext(req, res) {
        const context = Object.create(this.context);
        const request  = context.request = Object.create(this.request);
        const response =  context.response = Object.create(this.response);
        context.req = request.req = req;
        context.res =  response.res = res;
        return context;
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        return server.listen(...args);
    }
}