import batchModel from '../util/batchModel'
import hisdataModel from '../util/hisdataModel'
const router = require('koa-router')()

async function getAllBatchInfo() {
  const batches = await batchModel.selectAllBatch()
}

// 批次列表
router.get('/batches', async(ctx, next) => {
  ctx.body = await batchModel.selectAllBatch()
})

// 获取批次历史数据
router.get('/batches/:batch', async(ctx, next) => {
  ctx.body = await hisdataModel.selectBatchHisdata(ctx.params.batch)
})
 
// 测试
router.get('/time', async(ctx, next) => {
  ctx.body = await batchModel.selectNow()
})

module.exports = router