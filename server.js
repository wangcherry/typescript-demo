const Koa = require('koa');
const path = require('path');
const fse = require('fse');
const static = require('koa-static');
const opn = require('opn');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const returnFile = async (ctx, next) => {
    console.log(ctx.request.body);// post 方法提交的参数
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
}

// 配置静态资源
app.use(static(
    path.join(__dirname, './src')
))

// 使用ctx.body解析中间件
app.use(bodyParser())

// 请求
router.get('/xhr/doc/:name', returnFile)
router.post('/xhr/doc/:name', returnFile)
// 请求
router.get('/xhr/get/:name', async (ctx, next) => {
    ctx.body = '/xhr/doc/test.pptx'
})

app
    .use(router.routes())
    .use(router.allowedMethods());


opn('http://localhost:3001/');

app.listen(3001);