const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')
const app = new Koa()
const fs = require('fs')

// app.use(
//   koaBody({
//     multipart: true, //解析多个文件
//     formidable: {
//       maxFileSize: 100 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
//       uploadDir: './uploads', //可以填写一个路径，不填写默认为 os.tmpDir()
//       keepExtensions: true
//     }
//   })
// )

const router = new Router()

router.post('/upload', async (ctx) => {
  fs.writeFile('./uploads/test.txt', 'HelloWorld', { flag: 'a' }, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('write file success')
    }
  })

  // console.log(ctx.request.files.file)
  ctx.body = '上传成功！'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('app is running')
})
