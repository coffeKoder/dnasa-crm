const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {

        const sql = `INSERT INTO adm_emergencia( contacto, relacion, telefono) VALUES('${data.contacto}', '${data.relacion}', '${data.telefono}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT contacto, relacion, telefono FROM adm_emergencia`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {

        const sql = `UPDATE adm_emergencia SET contacto='${data.contacto}', relacion='${data.relacion}', telefono='${data.telefono}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {

        const sql = `DELETE FROM adm_emergencia WHERE contacto=${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}