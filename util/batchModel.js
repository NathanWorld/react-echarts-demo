const db = require('./dbconfig')

const insertBatch = (batch) => {
  const _sql = "replace tb_batch set `batch`=?, `start`=?, `end`=?"
  //const _sql = "insert tb_batch(`batch`, `start`, `end`) values ?"
  return db.query(_sql, batch)
}

const selectBatchInfo = (batch) => {
  const _sql = "select * from tb_batch where batch=?"
  return db.query(_sql, batch)
}
const selectAllBatch = () => {
  const _sql = "select batch, start, end from tb_batch"
  return db.query(_sql)
}

module.exports = {
  insertBatch,
  selectBatchInfo,
  selectAllBatch,
}