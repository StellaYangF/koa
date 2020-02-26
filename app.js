const Koa = require('./koa');

const app = new Koa();

app.use(async(ctx, next) => {
    console.log(1);
    ctx.body = '1';
    await next();
    setTimeout(() => {
        ctx.body = '11';
    })
    console.log(4);
});

app.use((ctx, next) => {
    console.log(2);
    ctx.body = '2';
    next();
    ctx.body = '22';
    console.log(5);
});

app.use((ctx, next) => {
    console.log(3);
    ctx.body = '3';
    next();
    ctx.body = '33';
    console.log(6);
});


app.on('err', console.log);

app.listen(3000);