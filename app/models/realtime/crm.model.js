const cn = require('../../libs/database.connect');

module.exports = {
   create: async (data) => {
      const reg = data;
      const sql = `INSERT INTO crm_registros(
         inicio_dt, 
         empleado_id, 
         tipocontacto_id, 
         tipoconsulta_id, 
         telefono, 
         final_dt, 
         comentario) 
         VALUES(
            "${reg.inicio_dt}", 
            "${reg.empleado_id}", 
            "${reg.tipo_contacto}", 
            "${reg.tipo_consulta}", 
            "${reg.telefono}", 
            "${reg.final_dt}", 
            "${reg.comentario}")`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         console.log(e);
         return e;
      }
   },

   read: async () => {
      const sql = `
      SELECT rgs.id, rgs.inicio_dt, rgs.empleado_id, ada.usuario, rgs.tipocontacto_id, tcn.tipo_contacto, rgs.tipoconsulta_id, tcl.tipo_consulta, rgs.telefono, rgs.final_dt, rgs.comentario 
      FROM crm_registros rgs 
      LEFT JOIN crm_tipo_contacto tcn ON tcn.id = rgs.tipocontacto_id 
      LEFT JOIN crm_tipo_consulta tcl ON tcl.id = rgs.tipoconsulta_id 
      LEFT JOIN empleados emp ON emp.id = rgs.empleado_id 
      LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id;`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readAllCallsToDay: async () => {
      const f = new Date();
      const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
      const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
      const fecha = f.getFullYear() + '-' + m + '-' + d;
      const sql = `SELECT COUNT(*) as llamadas FROM crm_registros WHERE CONVERT(inicio_dt, DATE) = '${fecha}'`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readOne: async (data) => {
      const sql = `
      SELECT rgs.id, rgs.inicio_dt, rgs.empleado_id, ada.usuario, rgs.tipocontacto_id, tcn.tipo_contacto, rgs.tipoconsulta_id, tcl.tipo_consulta, rgs.telefono, rgs.final_dt, rgs.comentario 
      FROM crm_registros rgs 
      LEFT JOIN crm_tipo_contacto tcn ON tcn.id = rgs.tipocontacto_id 
      LEFT JOIN crm_tipo_consulta tcl ON tcl.id = rgs.tipoconsulta_id 
      LEFT JOIN empleados emp ON emp.id = rgs.empleado_id 
      LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id
      WHERE rgs.id = '${data.id}';`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readByMe: async (data) => {
      const sql = `
      SELECT rgs.id, rgs.inicio_dt, rgs.empleado_id, ada.usuario, rgs.tipocontacto_id, tcn.tipo_contacto, rgs.tipoconsulta_id, tcl.tipo_consulta, rgs.telefono, rgs.final_dt, rgs.comentario 
      FROM crm_registros rgs 
      LEFT JOIN crm_tipo_contacto tcn ON tcn.id = rgs.tipocontacto_id 
      LEFT JOIN crm_tipo_consulta tcl ON tcl.id = rgs.tipoconsulta_id 
      LEFT JOIN empleados emp ON emp.id = rgs.empleado_id 
      LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id
      WHERE rgs.empleado_id = '${data.empleado_id}';`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   readByMeToDay: async (data) => {
      const sql = `
      SELECT rgs.id, rgs.inicio_dt, rgs.empleado_id, ada.usuario, rgs.tipocontacto_id, tcn.tipo_contacto, rgs.tipoconsulta_id, tcl.tipo_consulta, rgs.telefono, rgs.final_dt, rgs.comentario 
      FROM crm_registros rgs 
      LEFT JOIN crm_tipo_contacto tcn ON tcn.id = rgs.tipocontacto_id 
      LEFT JOIN crm_tipo_consulta tcl ON tcl.id = rgs.tipoconsulta_id 
      LEFT JOIN empleados emp ON emp.id = rgs.empleado_id 
      LEFT JOIN adm_acceso ada ON ada.id = emp.acceso_id
      WHERE rgs.empleado_id = '${data.empleado_id}' AND CONVERT(rgs.inicio_dt, DATE) = '${data.fecha}'
      ORDER BY rgs.id ASC;`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },

   update: async (data) => {
      const reg = data;
      const sql = `UPDATE crm_registros SET inicio_dt="${reg.inicio_dt}",empleado_id="${reg.empleado_id}",id_tcontacto="${reg.tipo_contacto}",id_tconsulta="${reg.tipo_consulta}",medio="${reg.telefono}",final_dt="${reg.final_dt}",comentario="${reg.comentario}" WHERE id = ${reg.id}`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },
   delete: async (data) => {
      const reg = data;
      const sql = `DELETE FROM crm_registros WHERE id = ${reg.id}`;
      try {
         const results = await cn.query(sql);
         return results;
      } catch (e) {
         return e;
      }
   },


   todayDataByQuarter: async () => { }
};
