const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('../../settings/app.settings');

const db = mysql.createPool(database);
db.getConnection((err, con) => {
   if (err) {
      console.error(err);
   }
   if (con) {
      con.release();
      console.log('DB CONNECTED!!');
      return;
   }
});

db.query = promisify(db.query);
module.exports = db;
