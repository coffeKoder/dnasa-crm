const cn = require('../../libs/database.connect');

module.exports = {
   create: async (data) => {
      const sql = `INSERT INTO app_submenu(menu_id, submenu_name, submenu_url, submenu_icon)  
      VALUES ('${data.menu_id}', '${data.submenu_name}', '${data.submenu_url}', '${data.submenu_icon}'))`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },
   read: async () => {
      const sql = `SELECT * FROM app_submenu`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },
   update: async (data) => {
      const sql = `UPDATE app_submenu SET menu_id = ${data}, submenu_name='${data.submenu_name}', submenu_url='${data.submenu_url}', submenu_icon='${data.submenu_icon}' WHERE id=${data.id}`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },
   delete: async (data) => {
      const sql = `DELETE FROM app_submenu WHERE id = ${data.id}`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

};
