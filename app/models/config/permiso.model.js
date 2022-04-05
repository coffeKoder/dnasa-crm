const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const permiso = data;
        const sql = `INSERT INTO cfg_permisos(perfil_id, roles_id) VALUES ('${permiso.perfil_id}', '${permiso.roles_id}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT cpm.id, cpm.perfil_id, cpf.perfil, cpm.roles_id, cfr.path, cfr.method, cfr.description, cfr.assigned FROM cfg_permisos cpm LEFT JOIN cfg_perfiles cpf ON cpf.id = cpm.perfil_id LEFT JOIN cfg_roles cfr ON cfr.id = cpm.roles_id`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    readByProfile: async (data) => {
        const permiso = data;
        const sql = `SELECT cpm.id, cpm.perfil_id, cpf.perfil, cpm.roles_id, cfr.path, cfr.method, cfr.description, cfr.assigned FROM cfg_permisos cpm LEFT JOIN cfg_perfiles cpf ON cpf.id = cpm.perfil_id LEFT JOIN cfg_roles cfr ON cfr.id = cpm.roles_id WHERE cpm.perfil_id = '${permiso.perfil_id}'`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    readByRol: async (data) => {
        const permiso = data;
        const sql = `SELECT cpm.id, cpm.perfil_id, cpf.perfil, cpm.roles_id, cfr.path, cfr.method, cfr.description, cfr.assigned FROM cfg_permisos cpm LEFT JOIN cfg_perfiles cpf ON cpf.id = cpm.perfil_id LEFT JOIN cfg_roles cfr ON cfr.id = cpm.roles_id WHERE cfr.path = '${permiso.path}'`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    readByRolProfile: async (data) => {
        const permiso = data;
        const sql = `SELECT cpm.id, cpm.perfil_id, cpf.perfil, cpm.roles_id, cfr.path, cfr.method, cfr.description, cfr.assigned FROM cfg_permisos cpm LEFT JOIN cfg_perfiles cpf ON cpf.id = cpm.perfil_id LEFT JOIN cfg_roles cfr ON cfr.id = cpm.roles_id WHERE cfr.path = '${permiso.path}' AND cpm.perfil_id = '${permiso.perfil_id}' AND cfr.method='${permiso.me}'`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const permiso = data;
        const sql = `UPDATE cfg_permisos SET perfil_id='${permiso.perfil_id}', roles_id='${permiso.roles_id}' WHERE id = ${permiso.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const permiso = data;
        const sql = `DELETE FROM cfg_permisos WHERE id = ${permiso.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

};
