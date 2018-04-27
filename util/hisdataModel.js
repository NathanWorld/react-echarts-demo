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
  // const _sql = `select * from tb_hisdata where datetime between (select tb_batch.start from tb_batch where tb_batch.batch = "${batch}") and (select tb_batch.end from tb_batch where tb_batch.batch = "${batch}")`
  const _sql = `SELECT a.datetime, TI301AI, DO301AI, PH301AI, FI301AI, PI301AI
  FROM
    (SELECT datetime, value AS TI301AI FROM tb_hisdata, 
    (SELECT start, end from tb_batch WHERE tb_batch.batch = "${batch}") as batch
    WHERE tag = "ti301AI" and datetime BETWEEN batch.start and batch.end) AS a  
  INNER JOIN  
    (SELECT datetime, value AS DO301AI FROM tb_hisdata,  
    (SELECT start, end from tb_batch WHERE tb_batch.batch = "${batch}") as batch
    WHERE tag = "do301ai" and datetime BETWEEN batch.start and batch.end) AS b 
  ON a.datetime = b.datetime
  INNER JOIN 
    (SELECT datetime, value as PH301AI FROM tb_hisdata,
    (SELECT start, end from tb_batch WHERE tb_batch.batch = "${batch}") as batch
    WHERE tag = "ph301ai" and datetime BETWEEN batch.start and batch.end) as c 
  ON a.datetime = c.datetime
  INNER JOIN 
    (SELECT datetime, value as FI301AI FROM tb_hisdata,
    (SELECT start, end from tb_batch WHERE tb_batch.batch = "${batch}") as batch
    WHERE tag = "fi301ai" and datetime BETWEEN batch.start and batch.end) as d 
  ON a.datetime = d.datetime
  INNER JOIN 
    (SELECT datetime, value as PI301AI FROM tb_hisdata,
    (SELECT start, end from tb_batch WHERE tb_batch.batch = "${batch}") as batch
    WHERE tag = "pi301ai" and datetime BETWEEN batch.start and batch.end) as e 
  ON a.datetime = e.datetime
  order By a.datetime`
  return db.query(_sql, batch)
}

module.exports = {
  insertHisdata,
  insertBatchHisdata,
  selectBatchHisdata
}
