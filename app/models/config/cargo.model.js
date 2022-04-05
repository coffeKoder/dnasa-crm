const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const cargo = data;
        const sql = `INSERT INTO cfg_cargos(cargo) VALUES ('${cargo.cargo}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, cargo FROM cfg_cargos`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const cargo = data;
        const sql = `UPDATE cfg_cargos SET cargo='${cargo.cargo}' WHERE id = ${cargo.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const cargo = data;
        const sql = `DELETE FROM cfg_cargos WHERE id = ${cargo.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};
