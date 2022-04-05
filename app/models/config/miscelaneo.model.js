/*
Select
*/
// Generos
// Provincia
// Distrito
// Corregimiento
// Tipo sangre
// user-status

const cn = require('../../libs/database.connect');

module.exports = {
   read_generos: async () => {
      const sql = `SELECT * FOM cfg_genero`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

   read_provincia: async () => {
      const sql = `SELECT * FROM cfg_provincia`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

   read_distrito: async (data) => {
      const sql = `SELECT * FROM cfg_distrito WHERE privincia_id = '${data.privincia_id}'`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

   read_corregimiento: async (data) => {
      const sql = `SELECT * FROM cfg_corregimientos WHERE distrito_id = ${data.distrito_id}`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

   read_tiposangre: async () => {
      const sql = `SELECT * FROM cfg_tiposangre`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

   read_estadousuario: async () => {
      const sql = `SELECT * FROM cfg_user_status`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   }
}