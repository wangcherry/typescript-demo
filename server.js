const Koa = require('koa');
const path = require('path');
const fse = require('fse');
const static = require('koa-static');
const opn = require('opn');
const Router = require('koa-router')

const app = new Koa();
const router = new Router();

// 配置静态资源
app.use(static(
    path.join(__dirname, './src')
))

// 请求
router.get('/xhr/doc/:name', async (ctx, next) => {
    let filePath = decodeURI(ctx.path.replace('/xhr/', ''));
    if (fse.existsSync(path.resolve(filePath))) {
        ctx.set('Content-disposition', 'attachment; filename=a.pptx');
        ctx.set('Content-Type', 'application/x-ppt; charset=UTF-8');
        console.log(path.resolve(filePath))
        ctx.body = fse.readFileSync(path.resolve(filePath), 'utf-8');
    } else {
        console.log('error');
        await next();
    }
})

app
    .use(router.routes())
    .use(router.allowedMethods());


opn('http://localhost:3001/');

app.listen(3001);