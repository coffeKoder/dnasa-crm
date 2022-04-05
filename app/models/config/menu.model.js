const cn = require('../../libs/database.connect');

module.exports = {
   create: async (data) => {
      const sql = `INSERT INTO app_menu(menu_name, menu_url, menu_icon, menu_child)  VALUES ('${data.menu_name}', '${data.menu_url}', '${data.menu_icon}', '${data.menu_child}')`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },
   read: async () => {
      const sql = `SELECT * FROM app_menu`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },
   update: async (data) => {
      const sql = `UPDATE app_menu SET menu_name='${data.menu_name}', menu_url='${data.menu_url}', menu_icon='${data.menu_icon}', menu_child= '${data.menu_child}' WHERE id=${data.id}`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },
   delete: async (data) => {
      const sql = `DELETE FROM app_menu WHERE id = ${data.id}`;
      try {
         const result = await db.query(sql);
         return result;
      } catch (err) {
         return e;
      }
   },

};
