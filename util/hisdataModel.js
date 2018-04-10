const db = require('./dbconfig')

const insertHisdata = (value) => {
  //const _sql = "insert into tb_hisdata set datetime=?, tag=?, value=?"
  const _sql = "replace tb_hisdata set datetime=?, tag=?, value=?"
  return db.query(_sql, value)
}

const insertBatchHisdata = (value) => {
  const _sql = "replace tb_hisdata(datetime, tag, value) values ?"
  return db.query(_sql, value)
}

const selectBatchHisdata = (batch) => {
  const _sql = `select * from tb_hisdata where datetime between (select tb_batch.start from tb_batch where tb_batch.batch = "${batch}") and (select tb_batch.end from tb_batch where tb_batch.batch = "${batch}")`
  return db.query(_sql, batch)
}

module.exports = {
  insertHisdata,
  insertBatchHisdata,
  selectBatchHisdata
}
