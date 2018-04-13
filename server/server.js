import Koa from 'koa'
//import views from 'koa-views'
import logger from 'koa-logger'
import serve from 'koa-static'
import cors from 'koa2-cors'
import { resolve } from 'path'
import index from '../routers/index'

const app = new Koa()
app.use(logger())
// 支持跨域请求
app.use(cors())
app.use(serve(resolve(__dirname, '../dist')))
app.use(index.routes(), index.allowedMethods())
/*
app.use(views(path.join(__dirname, './views'), {
  extension: 'html'
}))
*/

app.listen(3000)