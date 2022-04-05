const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {

        const sql = `INSERT INTO (corregimiento_id, direccion) VALUES('${data.corregimiento_id}', '${data.direccion}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT adr.id, adr.corregimiento_id, crg.corregimiento, crg.distrito_id, cdt.distrito, cdt.provincia_id, cpr.provincia, adr.direccion 
        FROM adm_direccion adr 
        LEFT JOIN cfg_corregimientos crg on crg.id = adr.corregimiento_id
        LEFT JOIN cfg_distrito cdt ON cdt.id = crg.distrito_id 
        LEFT JOIN cfg_provincia cpr ON cpr.id = cdt.provincia_id`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {

        const sql = `UPDATE adm_direccion SET corregimiento_id='${data.corregimiento_di}',direccion='${data.direccion}' WHERE id=${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {

        const sql = `DELETE FROM  adm_direccion WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}