const cn = require('../../libs/database.connect');

module.exports = {
   auth: async (data) => {
      const { usuario } = data;

      const sql = `
         SELECT ada.id, ada.usuario, ada.perfil_id, cpf.perfil, ada.clave, ada.avatar, ada.create_dt FROM adm_acceso ada 
         LEFT JOIN cfg_perfiles cpf ON cpf.id = ada.perfil_id
         WHERE ada.usuario = '${usuario}'`;
      try {
         const result = await cn.query(sql);
         return result;
      } catch (e) {
         console.log(e);
         return e;
      }
   },
   update_pass: async (data) => {
      const { clave } = data;
      const sql = `UPDATE adm_acceso SET clave = '${clave}', create_dt='${data.create_dt}' WHERE id = ${data.id}`;
      try {
         const result = await cn.query(sql);
         return result;
      } catch (e) {
         console.log(e);
         return e;
      }
   }

}
