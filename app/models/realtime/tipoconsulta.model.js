const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const consulta = data;
        const sql = `INSERT INTO crm_tipo_consulta(tipo_consulta) VALUES ('${consulta.tipo_consulta}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, tipo_consulta FROM crm_tipo_consulta`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const consulta = data;
        const sql = `UPDATE crm_tipo_consulta SET tipo_consulta='${consulta.tipo_consulta}' WHERE id = ${consulta.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const consulta = data;
        const sql = `DELETE FROM crm_tipo_consulta WHERE id = ${consulta.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};
