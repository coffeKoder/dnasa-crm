const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const sql = `INSERT INTO adm_laboral(correo, codempleado, cargo_id, jefe_id, area_id, ingreso_dt, salario, estado_id, modificado_dt) 
                    VALUES ('${data.correo}, '${data.codempleado}, '${data.cargo_id}', '${data.jefe_id}, '${data.area_id}, '${data.ingreso_dt}, '${data.salario}, '${data.estado_id}, '${data.modificado_dt})`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT adl.id, adl.correo, adl.codempleado, adl.cargo_id, cfc.cargo, adl.jefe_id, cfj.usuario_jefe, cfj.jefe_nombre, adl.area_id, cfa.area, cfa.alias, adl.ingreso_dt, adl.salario, adl.estado_id, adl.modificado_dt FROM adm_laboral adl LEFT JOIN cfg_cargos cfc ON cfc.id = adl.cargo_id LEFT JOIN cfg_jefes cfj ON cfj.id = adl.jefe_id LEFT JOIN cfg_areas cfa ON cfa.id = adl.area_id`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {
        const sql = `UPDATE adm_laboral SET correo = '${data.correo}',codempleado = '${data.codemple}', cargo_id = '${data.cargo_id}', jefe_id = '${data.jefe_id}', area_id = '${data.area_id}', ingreso_dt = '${data.ingreso_dt}', salario = '${data.salario}', estado_id = '${data.estado_id}', modificado_dt='${data.modificado_dt}' WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {
        const sql = `DELETE FROM adm_laboral WHERE id = ${data.id}`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}