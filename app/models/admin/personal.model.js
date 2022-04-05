const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const sql = `INSERT INTO adm_personale(nombres, apellidop, apellidom, cip, nacimiento_dt, genero_id) 
                    VALUES ('${data.nombres}, '${data.apellidop}, '${data.apellidom}, '${data.cip}, '${data.nacimiento_dt}', '${data.genero_id}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT adp.id, adp.nombres, adp.apellidop, adp.apellidom, adp.cip, adp.nacimieno_dt, adp.genero_id, cfg.genero FROM adm_personal adp LEFT JOIN cfg_genero cfg ON cfg.id = adp.genero_id`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {
        const sql = `UPDATE adm_personal SET nombres='${data.nombres}',apellidop='${data.apellidop}',apellidom='${data.apellidom}', '${data.cip}', '${data.nacimiento_dt}', '${data.genero_id}' WHERE id='${data.id}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {
        const sql = `DELETE FROM adm_personal WHERE id='${data.id}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}