const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const perfil = data;
        const sql = `INSERT INTO cfg_perfiles(perfil) VALUES ('${perfil.perfil}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, perfil FROM cfg_perfiles`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const perfil = data;
        const sql = `UPDATE cfg_perfiles SET perfil='${perfil.perfil}' WHERE id = ${perfil.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const perfil = data;
        const sql = `DELETE FROM cfg_perfiles WHERE id = ${perfil.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};
