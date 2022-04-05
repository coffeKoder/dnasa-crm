const cn = require('../../libs/database.connect');


module.exports = {
    create: async (data) => {
        const sql = `INSERT INTO  adm_acceso(usuario, perfil_id, clave, avatar, create_dt) 
        VALUES('${data.usuario}', '${data.perfil_id}', '${data.clave}', '${data.avatar}', '${data.create_dt}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT ada.id, ada.usuario, ada.perfil_id, cpf.perfil, ada.clave, ada.avatar, ada.create_dt FROM adm_acceso ada 
        LEFT JOIN cfg_perfiles cpf ON cpf.id = ada.perfil_id`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {
        const sql = `UPDATE adm_acceso SET usuario='${data.usuario}',perfil_id='${data.perfil_id}',clave='${data.clave}',avatar='${data.avatar}',create_dt='${data.create_dt}' WHERE usuario='${data.usuario} WHERE id=${data.id};`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {
        const sql = `DELETE FROM adm_acceso WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}