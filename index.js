const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const app = new Koa()

app.use(KoaBody({
    multipart: true
}))

const router = new Router()


router.post('/upload', async (ctx) => {
    const file = ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../uploads/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";

})

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, () => {
    console.log('app is running');
})
