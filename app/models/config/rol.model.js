const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const rol = data;
        const sql = `INSERT INTO cfg_roles( path, name, method, description, assigned) VALUES ('${rol.path}', '${rol.name}', '${rol.method}', '${rol.description}', '${rol.assigned}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    createOrUpdate: async (data) => {
        const rol = data;
        const sql = `INSERT IGNORE INTO cfg_roles( path, name, method, description, assigned) VALUES ('${rol.path}', '${rol.name}', '${rol.method}', '${rol.description}', '${rol.assigned}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, path, method, description, assigned FROM cfg_roles`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const rol = data;
        const sql = `UPDATE cfg_rols SET path = '${rol.path}', method = '${rol.method}', description = '${rol.description}', assigned = '${rol.assigned}' WHERE id = ${rol.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const rol = data;
        const sql = `DELETE FROM cfg_rols WHERE id = ${rol.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};
