const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const contacto = data;
        const sql = `INSERT INTO crm_tipo_contacto(tipo_contacto) VALUES ('${contacto.tipo_contacto}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, tipo_contacto FROM crm_tipo_contacto`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const contacto = data;
        const sql = `UPDATE crm_tipo_contacto SET tipo_contacto='${contacto.tipo_contacto}' WHERE id = ${contacto.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const contacto = data;
        const sql = `DELETE FROM crm_tipo_contacto WHERE id = ${contacto.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};



