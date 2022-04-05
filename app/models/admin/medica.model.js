const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const sql = `INSERT INTO (cond_medica, tipo_sangre, cabecera) VALUES('${data.cond_medica}', '${data.tipo_sangre}', '${data.cabecera}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT id, cond_medica, tipo_sangre, cabecera FROM adm_medica`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {
        const sql = `UPDATE adm_medica SET cond_medica = ${data.cond_medica}, tipo_sangre = ${data.tipo_sangre}, cabecera='${data.cabecera}' WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {
        const sql = `DELETE FROM adm_medica WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}