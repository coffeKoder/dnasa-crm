const cn = require('../../libs/database.connect');

// TODO: crear query desde la tabla empleados
module.exports = {
   create: async (data) => {
      const sql = `INSERT INTO rtl_actividades(empleado_id, actividad_id, inicio_dt, final_dt, estado) 
      VALUES('${data.usuario_id}', '${data.actividad_id}', '${data.inicio_dt}', '${data.final_dt}', ${data.estado})`;
      // console.log(sql);
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },
   readAll: async () => {
      const sql = `SELECT rta.id, rta.empleado_id, ada.usuario, CONCAT(adp.apellidop, ', ', adp.nombres) as nombre, adl.jefe_id, cfj.jefe_nombre, rta.actividad_id, gla.actividad, gla.icon, rta.inicio_dt, rta.final_dt, rta.estado FROM rtl_actividades rta LEFT JOIN glb_actividades gla ON gla.id LEFT JOIN empleados emp ON emp.id = rta.empleado_id LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id LEFT JOIN adm_laboral adl ON adl.id = emp.laboral_id LEFT JOIN cfg_jefes cfj ON cfj.id = adl.jefe_id LEFT JOIN adm_personal adp ON adp.id = emp.personal_id `;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readAllToDay: async (data) => {
      const sql = `
      SELECT rta.id, rta.empleado_id, ada.usuario, CONCAT(adp.apellidop, ', ', adp.nombres) as nombre, adl.jefe_id, cfj.jefe_nombre, rta.actividad_id, gla.actividad, gla.icon, rta.inicio_dt, rta.final_dt, rta.estado 
      FROM rtl_actividades rta LEFT JOIN glb_actividades gla ON gla.id = rta.actividad_id
      LEFT JOIN empleados emp ON emp.id = rta.empleado_id
      LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id
      LEFT JOIN adm_laboral adl ON adl.id = emp.laboral_id
      LEFT JOIN cfg_jefes cfj ON cfj.id = adl.jefe_id
      LEFT JOIN adm_personal adp ON adp.id = emp.personal_id
      WHERE CONVERT(rta.inicio_dt, DATE) = '${data.inicio_dt}' AND rta.estado = 0;`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readConnectedAgent: async () => {
      const f = new Date();
      const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
      const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
      const fecha = f.getFullYear() + '-' + m + '-' + d;
      const sql = `SELECT count(*) as 'Conectados' FROM rtl_actividades WHERE estado = 0 AND CONVERT(inicio_dt, DATE) ='${fecha}'`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readNotReadyAgent: async () => {
      const f = new Date();
      const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
      const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
      const fecha = f.getFullYear() + '-' + m + '-' + d;
      const sql = `SELECT count(*) as 'not-ready' FROM rtl_actividades WHERE estado = 0 AND CONVERT(inicio_dt, DATE) ='${fecha}'  AND actividad_id != 1`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readByTeam: async (data) => {
      const sql = `
       SELECT rta.id, rta.empleado_id, ada.usuario, CONCAT(adp.apellidop, ', ', adp.nombres) as nombre, adl.jefe_id, cfj.jefe_nombre, rta.actividad_id, gla.actividad, gla.icon, rta.inicio_dt, rta.final_dt, rta.estado 
      FROM rtl_actividades rta LEFT JOIN glb_actividades gla ON gla.id = rta.actividad_id
      LEFT JOIN empleados emp ON emp.id = rta.empleado_id
      LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id
      LEFT JOIN adm_laboral adl ON adl.id = emp.laboral_id
      LEFT JOIN cfg_jefes cfj ON cfj.id = adl.jefe_id
      LEFT JOIN adm_personal adp ON adp.id = emp.personal_id
   WHERE adl.jefe_id = '${data.jefe_id}' AND  CONVERT(rta.inicio_dt, DATE) = '${data.inicio_dt}' AND rta.estado = 0;`;
      try {
         const results = await cn.query(sql);
         
         return results;
      } catch (e) {
         return e;
      }
   },

   // Solo debe hacer falta el campo final_dt
   update: async (data) => {
      const sql = `UPDATE rtl_actividades SET final_dt='${data.final_dt}', estado=1 WHERE id = ${data.id}`;
      // console.log(sql);
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   delete: async (data) => {
      const sql = `DELETE FROM rtl_actividades WHERE id = ${data.id}`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   countTodayCall: async () => {
      const d = new Date();
      const a = $.formatDateTime('yy-mm-dd gg:ii:ss.uu', d);
      const sql = `SELECT COUNT(*) FROM crm_registros WHERE CONVERT(inicio_dt, DATE) >= '${a}'`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   countConnectedAgents: async () => {

   }

};
