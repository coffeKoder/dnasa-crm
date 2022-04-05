const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const sql = `INSERT INTO empleados(personal_id, laboral_id, direccion_id, medica_id, acceso_id, emergencia_id, contacto_id) 
        VALUES('${data.personal_id}', '${data.laboral_id}', '${data.direccion_id}, '${data.medica_id}', '${data.acceso_id}, '${data.emergencia_id}', '${data.contacto_id}')`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    read: async () => {
        const sql = `SELECT
        emp.id,
        emp.personal_id,
        adp.nombres,
        adp.apellidop,
        adp.apellidom,
        adp.cip,
        adp.nacimieno_dt,
        adp.genero_id,
        cfg.genero,
        emp.laboral_id,
        emp.direccion_id,
        adi.corregimiento_id,
        crg.corregimiento,
        crg.distrito_id,
        cdt.distrito,
        cdt.provincia_id,
        cpr.provincia,
        adi.direccion,
        adl.correo,
        adl.codempleado,
        adl.cargo_id,
        cfc.cargo,
        adl.jefe_id,
        cfj.usuario_jefe,
        cfj.jefe_nombre,
        adl.area_id,
        cfa.area,
        cfa.alias,
        adl.ingreso_dt,
        adl.salario,
        adl.estado_id,
        adl.modificado_dt,
        emp.medica_id,
        amd.cond_medica,
        amd.tipo_sangre,
        amd.cabecera,
        emp.acceso_id,
        ada.usuario,
        ada.perfil_id,
        cpf.perfil,
        ada.avatar,
        ada.create_dt,
        emp.emergencia_id,
        ade.contacto,
        ade.relacion,
        ade.telefono,
        emp.contacto_id,
        adc.telefono,
        adc.celular,
        adc.correo
    FROM
        empleados emp
    LEFT JOIN adm_personal adp ON
        adp.id = emp.personal_id -- listo
    LEFT JOIN cfg_genero cfg ON
        cfg.id = adp.genero_id -- listo
    LEFT JOIN adm_laboral adl ON
        adl.id = emp.laboral_id -- listo
    LEFT JOIN cfg_cargos cfc ON
        cfc.id = adl.cargo_id -- linsto
    LEFT JOIN cfg_jefes cfj ON
        cfj.id = adl.jefe_id -- listo
    LEFT JOIN cfg_areas cfa ON
        cfa.id = adl.area_id -- listo
    LEFT JOIN adm_direccion adi ON
        adi.id = emp.direccion_id -- listo
    LEFT JOIN cfg_corregimientos crg ON
        crg.id = adi.corregimiento_id -- listo
    LEFT JOIN cfg_distrito cdt ON
        cdt.id = crg.distrito_id -- listo
    LEFT JOIN cfg_provincia cpr ON
        cpr.id = cdt.provincia_id -- listo
    LEFT JOIN adm_medica amd ON
        amd.id = emp.medica_id -- listo
    LEFT JOIN adm_acceso ada ON
        ada.id = emp.acceso_id -- listo
    LEFT JOIN cfg_perfiles cpf ON
        cpf.id = ada.perfil_id -- listo
    LEFT JOIN adm_emergencia ade ON
        ade.id = emp.emergencia_id -- listo
    LEFT JOIN adm_contacto adc ON
        adc.id = emp.contacto_id -- listo`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },

   readByCookie: async(data) => {
      const sql = `SELECT
	e.id,
	e.personal_id,
	ap.nombres,
	ap.apellidop,
	ap.genero_id,
	e.laboral_id,
	al.cargo_id,
	cc.cargo,
	al.jefe_id,
	cj.usuario_jefe,
    cj.jefe_nombre,
	al.area_id,
	ca.area,
	ca.alias,
	e.acceso_id,
	aa.usuario,
	aa.perfil_id,
	cp.perfil,
	aa.avatar
FROM empleados e
LEFT JOIN adm_acceso aa ON aa.id = e.acceso_id
LEFT JOIN adm_laboral al ON al.id = e.laboral_id
LEFT JOIN adm_personal ap ON ap.id = e.personal_id
LEFT JOIN cfg_cargos cc ON cc.id = al.cargo_id
LEFT JOIN cfg_jefes cj ON cj.id = al.jefe_id
LEFT JOIN cfg_areas ca ON ca.id = al.area_id 
LEFT JOIN cfg_perfiles cp ON cp.id = aa.perfil_id 
WHERE e.id = ${data.id}
`;
      try{
         const result = await cn.query(sql);
         return result;
      }
      catch(e){
         return e;
      }
   },
    // by Usuario Id
    readByAccesoId: async (data) => {
        const sql = `SELECT
        emp.id,
        emp.personal_id,
        adp.nombres,
        adp.apellidop,
        adp.apellidom,
        adp.cip,
        adp.nacimieno_dt,
        adp.genero_id,
        cfg.genero,
        emp.laboral_id,
        emp.direccion_id,
        adi.corregimiento_id,
        crg.corregimiento,
        crg.distrito_id,
        cdt.distrito,
        cdt.provincia_id,
        cpr.provincia,
        adi.direccion,
        adl.correo,
        adl.codempleado,
        adl.cargo_id,
        cfc.cargo,
        adl.jefe_id,
        cfj.usuario_jefe,
        cfj.jefe_nombre,
        adl.area_id,
        cfa.area,
        cfa.alias,
        adl.ingreso_dt,
        adl.salario,
        adl.estado_id,
        adl.modificado_dt,
        emp.medica_id,
        amd.cond_medica,
        amd.tipo_sangre,
        amd.cabecera,
        emp.acceso_id,
        ada.usuario,
        ada.perfil_id,
        cpf.perfil,
        ada.avatar,
        ada.create_dt,
        emp.emergencia_id,
        ade.contacto,
        ade.relacion,
        ade.telefono,
        emp.contacto_id,
        adc.telefono,
        adc.celular,
        adc.correo
    FROM
        empleados emp
    LEFT JOIN adm_personal adp ON
        adp.id = emp.personal_id -- listo
    LEFT JOIN cfg_genero cfg ON
        cfg.id = adp.genero_id -- listo
    LEFT JOIN adm_laboral adl ON
        adl.id = emp.laboral_id -- listo
    LEFT JOIN cfg_cargos cfc ON
        cfc.id = adl.cargo_id -- linsto
    LEFT JOIN cfg_jefes cfj ON
        cfj.id = adl.jefe_id -- listo
    LEFT JOIN cfg_areas cfa ON
        cfa.id = adl.area_id -- listo
    LEFT JOIN adm_direccion adi ON
        adi.id = emp.direccion_id -- listo
    LEFT JOIN cfg_corregimientos crg ON
        crg.id = adi.corregimiento_id -- listo
    LEFT JOIN cfg_distrito cdt ON
        cdt.id = crg.distrito_id -- listo
    LEFT JOIN cfg_provincia cpr ON
        cpr.id = cdt.provincia_id -- listo
    LEFT JOIN adm_medica amd ON
        amd.id = emp.medica_id -- listo
    LEFT JOIN adm_acceso ada ON
        ada.id = emp.acceso_id -- listo
    LEFT JOIN cfg_perfiles cpf ON
        cpf.id = ada.perfil_id -- listo
    LEFT JOIN adm_emergencia ade ON
        ade.id = emp.emergencia_id -- listo
    LEFT JOIN adm_contacto adc ON
        adc.id = emp.contacto_id -- listo
        WHERE  emp.acceso_id = '${data.acceso_id}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },

    // by Usuario
    readByUsuario: async (data) => {
        const sql = `SELECT
        emp.id,
        emp.personal_id,
        adp.nombres,
        adp.apellidop,
        adp.apellidom,
        adp.cip,
        adp.nacimieno_dt,
        adp.genero_id,
        cfg.genero,
        emp.laboral_id,
        emp.direccion_id,
        adi.corregimiento_id,
        crg.corregimiento,
        crg.distrito_id,
        cdt.distrito,
        cdt.provincia_id,
        cpr.provincia,
        adi.direccion,
        adl.correo,
        adl.codempleado,
        adl.cargo_id,
        cfc.cargo,
        adl.jefe_id,
        cfj.usuario_jefe,
        cfj.jefe_nombre,
        adl.area_id,
        cfa.area,
        cfa.alias,
        adl.ingreso_dt,
        adl.salario,
        adl.estado_id,
        adl.modificado_dt,
        emp.medica_id,
        amd.cond_medica,
        amd.tipo_sangre,
        amd.cabecera,
        emp.acceso_id,
        ada.usuario,
        ada.perfil_id,
        cpf.perfil,
        ada.avatar,
        ada.create_dt,
        emp.emergencia_id,
        ade.contacto,
        ade.relacion,
        ade.telefono,
        emp.contacto_id,
        adc.telefono,
        adc.celular,
        adc.correo
    FROM
        empleados emp
    LEFT JOIN adm_personal adp ON
        adp.id = emp.personal_id -- listo
    LEFT JOIN cfg_genero cfg ON
        cfg.id = adp.genero_id -- listo
    LEFT JOIN adm_laboral adl ON
        adl.id = emp.laboral_id -- listo
    LEFT JOIN cfg_cargos cfc ON
        cfc.id = adl.cargo_id -- linsto
    LEFT JOIN cfg_jefes cfj ON
        cfj.id = adl.jefe_id -- listo
    LEFT JOIN cfg_areas cfa ON
        cfa.id = adl.area_id -- listo
    LEFT JOIN adm_direccion adi ON
        adi.id = emp.direccion_id -- listo
    LEFT JOIN cfg_corregimientos crg ON
        crg.id = adi.corregimiento_id -- listo
    LEFT JOIN cfg_distrito cdt ON
        cdt.id = crg.distrito_id -- listo
    LEFT JOIN cfg_provincia cpr ON
        cpr.id = cdt.provincia_id -- listo
    LEFT JOIN adm_medica amd ON
        amd.id = emp.medica_id -- listo
    LEFT JOIN adm_acceso ada ON
        ada.id = emp.acceso_id -- listo
    LEFT JOIN cfg_perfiles cpf ON
        cpf.id = ada.perfil_id -- listo
    LEFT JOIN adm_emergencia ade ON
        ade.id = emp.emergencia_id -- listo
    LEFT JOIN adm_contacto adc ON
        adc.id = emp.contacto_id -- listo
        WHERE  ada.usuario = '${data.usuario}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },

    // by Jefe
    readByJefe: async (data) => {
        const sql = `SELECT
        emp.id,
        emp.personal_id,
        adp.nombres,
        adp.apellidop,
        adp.apellidom,
        adp.cip,
        adp.nacimieno_dt,
        adp.genero_id,
        cfg.genero,
        emp.laboral_id,
        emp.direccion_id,
        adi.corregimiento_id,
        crg.corregimiento,
        crg.distrito_id,
        cdt.distrito,
        cdt.provincia_id,
        cpr.provincia,
        adi.direccion,
        adl.correo,
        adl.codempleado,
        adl.cargo_id,
        cfc.cargo,
        adl.jefe_id,
        cfj.usuario_jefe,
        cfj.jefe_nombre,
        adl.area_id,
        cfa.area,
        cfa.alias,
        adl.ingreso_dt,
        adl.salario,
        adl.estado_id,
        adl.modificado_dt,
        emp.medica_id,
        amd.cond_medica,
        amd.tipo_sangre,
        amd.cabecera,
        emp.acceso_id,
        ada.usuario,
        ada.perfil_id,
        cpf.perfil,
        ada.avatar,
        ada.create_dt,
        emp.emergencia_id,
        ade.contacto,
        ade.relacion,
        ade.telefono,
        emp.contacto_id,
        adc.telefono,
        adc.celular,
        adc.correo
    FROM
        empleados emp
    LEFT JOIN adm_personal adp ON
        adp.id = emp.personal_id -- listo
    LEFT JOIN cfg_genero cfg ON
        cfg.id = adp.genero_id -- listo
    LEFT JOIN adm_laboral adl ON
        adl.id = emp.laboral_id -- listo
    LEFT JOIN cfg_cargos cfc ON
        cfc.id = adl.cargo_id -- linsto
    LEFT JOIN cfg_jefes cfj ON
        cfj.id = adl.jefe_id -- listo
    LEFT JOIN cfg_areas cfa ON
        cfa.id = adl.area_id -- listo
    LEFT JOIN adm_direccion adi ON
        adi.id = emp.direccion_id -- listo
    LEFT JOIN cfg_corregimientos crg ON
        crg.id = adi.corregimiento_id -- listo
    LEFT JOIN cfg_distrito cdt ON
        cdt.id = crg.distrito_id -- listo
    LEFT JOIN cfg_provincia cpr ON
        cpr.id = cdt.provincia_id -- listo
    LEFT JOIN adm_medica amd ON
        amd.id = emp.medica_id -- listo
    LEFT JOIN adm_acceso ada ON
        ada.id = emp.acceso_id -- listo
    LEFT JOIN cfg_perfiles cpf ON
        cpf.id = ada.perfil_id -- listo
    LEFT JOIN adm_emergencia ade ON
        ade.id = emp.emergencia_id -- listo
    LEFT JOIN adm_contacto adc ON
        adc.id = emp.contacto_id -- listo
        WHERE  cfj.usuario_jefe = '${data.cfj.usuario_jefe}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {

        const sql = `UPDATE empleados SET personal_id = ${data.personal_id}, laboral_id = ${data.laboral_id}, direccion_id='${data.direccion_id}, medica_id='${data.medica_id}', acceso_id='${data.acceso_id}', emergencia_id='${data.emergencia_id}' contacto_id='${data.contacto_id}' WHERE id='${data.id}`;

        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {

        const sql = `DELETE FROusuarioM empleados WHERE id='${data.id}'`;
        try {
            const result = await cn.query(sql)
            return result
        } catch (e) {
            return e;
        }
    },
}
