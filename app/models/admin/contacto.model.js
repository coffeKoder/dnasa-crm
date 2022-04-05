const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {

        const sql = `INSERT INTO adm_contacto(telefono, celular, correo) VALUES ('${data.telefono}', '${data.celular}', '${data.correo}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT id, telefono, celular, correo FROM adm_contacto`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {

        const sql = `UPDATE adm_contacto SET telefono='${data.telefono}',celular='${data.celular}',correo='${data.correo}' WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {

        const sql = `DELETE FROM adm_contacto WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}