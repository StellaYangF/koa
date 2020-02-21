const Emitter = require('events');

module.exports = class Koa extends Emitter{
    constructor() {
        super();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    listen(port) {
        require('http').createServer((req,res) => {
            this.handleRequest(req, res);
        }).listen(`Server starts, listening on ${port}`);
    }

    handleRequest(req, res) {
        this.compose(req, res);
    }

    createContext() {
        
    }

    compose(req, res) {

    }
}