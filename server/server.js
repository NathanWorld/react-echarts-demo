import Koa from 'koa'
//import views from 'koa-views'
import { resolve } from 'path'
import logger from 'koa-logger'
import serve from 'koa-static'

const app = new Koa()
app.use(logger())
app.use(serve(resolve(__dirname, '../dist')))
/*
app.use(views(path.join(__dirname, './views'), {
  extension: 'html'
}))
*/
console.log(__dirname)
app.listen(3000)