const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const jefe = data;
        const sql = `INSERT INTO cfg_jefes(jefe_nombre, usuario_jefe) VALUES ('${jefe.jefe_nombre}', '${jefe.usuario_jefe}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, jefe_nombre, usuario_jefe FROM cfg_jefes`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const jefe = data;
        const sql = `UPDATE cfg_jefes SET jefe_nombre='${jefe.jefe_nombre}', usuario_jefe='${jefe.usuario_jefe}' WHERE id = ${jefe.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const jefe = data;
        const sql = `DELETE FROM cfg_jefes WHERE id = ${jefe.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};
