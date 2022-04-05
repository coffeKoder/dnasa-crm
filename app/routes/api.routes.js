var express = require('express');
var app = express.Router();
const { isAuth } = require('../middlewares/auth.middleware');

const accesoModel = require('../models/admin/acceso.model');
const contactoModel = require('../models/admin/contacto.model');
const direccionModel = require('../models/admin/direccion.model');
const emergenciaModel = require('../models/admin/emergencia.model');
const empleadoModel = require('../models/admin/empleado.model');
const laboralModel = require('../models/admin/laboral.model');
const medicaModel = require('../models/admin/medica.model');
const personalModel = require('../models/admin/personal.model');

const authModel = require('../models/auth/auth.model');

const areaModel = require('../models/config/area.model');
const cargoModel = require('../models/config/cargo.model');
const jefeModel = require('../models/config/jefe.model');
const miscelaneoModel = require('../models/config/miscelaneo.model');
const perfilModel = require('../models/config/perfil.model');
const permisoModel = require('../models/config/permiso.model');
const rolModel = require('../models/config/rol.model');

const actividadesModel = require('../models/realtime/actividades.models');
const crmModel = require('../models/realtime/crm.model');
const globalModel = require('../models/realtime/global.model');
const tipoconsultaModel = require('../models/realtime/tipoconsulta.model');
const tipocontactoModel = require('../models/realtime/tipocontacto.model');

const pp = require('passport');
const passwd = require('../libs/password.hash');
const authMiddleware = require('../middlewares/auth.middleware');




// config
// => AREAS //
app.post('/areas/create', (req, res, next) => {
   const data = {
      area: req.body.area,
      alias: req.body.alias
   }
   areaModel.create(data).then(rst => {
      if (rst) {
         console.log(rst)
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', result: rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      res.status(404).json(err);
   })
});
app.get('/areas/read', (req, res, next) => {
   areaModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

app.post('/areas/filter', (req, res, next) => {

   areaModel.filter({ id: req.body.id }).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/areas/update', (req, res, next) => {
   const data = {
      id: req.body.id,
      area: req.body.area,
      alias: req.body.alias
   }
   areaModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/areas/delete', (req, res, next) => {
   const data = { id: req.body.id }
   areaModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => CARGOS //
app.post('/cargos/create', (req, res, next) => {
   const data = {
      cargo: req.body.cargo
   }
   cargoModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/cargos/read', (req, res, next) => {
   cargoModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/cargos/update', (req, res, next) => {
   const data = {
      cargo: req.body.cargo,
      id: req.body.id
   }
   cargoModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/cargos/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   cargoModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => JEFES //
app.post('/jefes/create', (req, res, next) => {
   const data = {
      jefe_nombre: req.body.jefe_nombre,
      jefe_usuario: req.body.jefe_usuario
   }
   jefeModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/jefes/read', (req, res, next) => {

   jefeModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/jefes/update', (req, res, next) => {
   const data = {
      jefe_nombre: req.body.jefe_nombre,
      jefe_usuario: req.body.jefe_usuario,
      id: req.body.id
   }
   jefeModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/jefes/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   jefeModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => PERFILES //
app.post('/perfiles/create', (req, res, next) => {
   const data = {
      perfil: req.body.perfil
   }
   perfilModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/perfiles/read', (req, res, next) => {
   perfilModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/perfiles/update', (req, res, next) => {
   const data = {
      perfil: req.body.perfil,
      id: req.body.id
   }
   perfilModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/perfiles/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   perfilModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => PERMISOS //
app.post('/permisos/create', (req, res, next) => {
   const data = {
      perfil_id: req.body.perfil_id,
      roles_id: req.body.roles_id
   }
   permisoModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/permisos/read', (req, res, next) => {
   permisoModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/permisos/update', (req, res, next) => {
   const data = {
      perfil_id: req.body.perfil_id,
      roles_id: req.body.roles_id,
      id: req.body.id
   }
   permisoModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/permisos/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   permisoModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => ROLES //
app.post('/roles/create', (req, res, next) => {
   const data = {
      path: req.body.path,
      name: req.body.name,
      method: req.body.method,
      description: req.body.description,
      assigned: req.body.assigned
   }
   rolModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/roles/read', (req, res, next) => {
   rolModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/roles/update', (req, res, next) => {
   const data = {
      path: req.body.path,
      name: req.body.name,
      method: req.body.method,
      description: req.body.description,
      assigned: req.body.assigned,
      id: req.body.id
   }
   rolModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/roles/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   rolModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// ccreaterm
// => CRM //
app.post('/crm/create', (req, res, next) => {
   const d = new Date();
   //cosnt y = d.getFullYear();
   const m = parseInt(d.getMonth())+1 < 10? parseInt(d.getMonth())+1 : '0' + parseInt(d.getMonth())+1;
   const x = d.getDate() >10 ? d.getDate() : '0'+ d.getDate();
   const final_dt = `${d.getFullYear()}-${m}-${x} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
   const data = {
      inicio_dt: req.body.inicio_dt,
      empleado_id: req.user.id,
      tipo_contacto: req.body.tipo_contacto,
      tipo_consulta: req.body.tipo_consulta,
      telefono: req.body.telefono,
      final_dt: final_dt,
      comentario: req.body.comentario
   }
   crmModel.create(data).then(rst => {
      if (rst) {
         //console.log(rst)
         res.status(200).redirect('/gestion');
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/crm/read', (req, res, next) => {
   crmModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/crm/read-one', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   crmModel.readOne(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/crm/read-by-me', (req, res, next) => {
   const data = { empleado_id: req.user.id };
   crmModel.readByMe(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/crm/read-by-me-today', (req, res, next) => {
   const f = new Date();
   const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
   const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
   const fecha = f.getFullYear() + '-' + m + '-' + d;
   const data = { empleado_id: req.user.id, fecha: fecha, };
   crmModel.readByMeToDay(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      console.log(err);
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/crm/update', (req, res, next) => {
   const d = new Date();
   const final_dt = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
   const data = {
      inicio_dt: req.body.inicio_dt,
      empleado_id: req.user.id,
      tipo_contacto: req.body.tipo_contacto,
      tipo_consulta: req.body.tipo_consulta,
      telefono: req.body.telefono,
      final_dt: final_dt,
      comentario: req.body.comentario,
      id: req.body.id
   }
   crmModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/crm/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   crmModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => TIPOCONSULTA //
app.post('/tipoconsulta/create', (req, res, next) => {
   const data = {
      tipo_consulta: req.body.tipo_consulta
   }
   tipoconsultaModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/tipoconsulta/read', (req, res, next) => {
   tipoconsultaModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/tipoconsulta/update', (req, res, next) => {
   const data = {
      tipo_consulta: req.body.tipo_consulta,
      id: req.body.id
   }
   tipoconsultaModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/tipoconsulta/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   tipoconsultaModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => TIPOCONTACTO //
app.post('/tipocontacto/create', (req, res, next) => {
   const data = {
      tipo_contacto: req.body.tipo_contacto
   }
   tipocontactoModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/tipocontacto/read', (req, res, next) => {
   tipocontactoModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/tipocontacto/update', (req, res, next) => {
   const data = {
      tipo_contacto: req.body.tipo_contacto,
      id: req.body.id
   }
   tipocontactoModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/tipocontacto/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   tipocontactoModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// empleados

// => INFO PERSONAL //
app.post('/info-personal/create', (req, res, next) => {
   const data = {
      nombres: req.body.nombres,
      apellidop: req.body.apellidop,
      apellidom: req.body.apellidom,
      cip: req.body.cip,
      nacimieno_dt: req.body.nacimieno_dt,
      genero_id: req.body.genero_id,
   }
   personalModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-personal/read', (req, res, next) => {
   personalModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-personal/update', (req, res, next) => {
   const data = {
      nombres: req.body.nombres,
      apellidop: req.body.apellidop,
      apellidom: req.body.apellidom,
      cip: req.body.cip,
      nacimieno_dt: req.body.nacimieno_dt,
      genero_id: req.body.genero_id,
      id: req.body.id
   }
   personalModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-personal/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   personalModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => INFO MEDICA //
app.post('/info-medica/create', (req, res, next) => {
   const data = {
      cond_medica: req.body.cond_medica,
      tipo_sangre: req.body.tipo_sangre,
      cabecera: req.body.cabecera
   }
   medicaModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-medica/read', (req, res, next) => {
   medicaModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-medica/update', (req, res, next) => {
   const data = {
      cond_medica: req.body.cond_medica,
      tipo_sangre: req.body.tipo_sangre,
      cabecera: req.body.cabecera,
      id: req.body.id
   }
   medicaModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-medica/delete', (req, res, next) => {
   const data = { id: req.params.id }
   medicaModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => INFO LABORAL //
app.post('/info-laboral/create', (req, res, next) => {
   const data = {
      correo: req.body.correo,
      codempleado: req.body.codempleado,
      cargo_id: req.body.cargo_id,
      jefe_id: req.body.jefe_id,
      area_id: req.body.area_id,
      ingreso_dt: req.body.ingreso_dt,
      salario: req.body.salario,
      estado_id: req.body.estado_id,
      modificado_dt: req.body.modificado_dt
   };
   laboralModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-laboral/read', (req, res, next) => {
   laboralModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-laboral/update', (req, res, next) => {
   const data = {
      correo: req.body.correo,
      codempleado: req.body.codempleado,
      cargo_id: req.body.cargo_id,
      jefe_id: req.body.jefe_id,
      area_id: req.body.area_id,
      ingreso_dt: req.body.ingreso_dt,
      salario: req.body.salario,
      estado_id: req.body.estado_id,
      modificado_dt: req.body.modificado_dt,
      id: req.body.id
   };
   laboralModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-laboral/delete', (req, res, next) => {
   const data = { id: req.params.id };
   laboralModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => EMPLEADOS //
app.post('/empleados/create', (req, res, next) => {
   const data = {
      personal_id: req.body.personal_id,
      laboral_id: req.body.laboral_id,
      direccion_id: req.body.direccion_id,
      medico_id: req.body.medico_id,
      acceso_id: req.body.acceso_id,
      emergencia_id: req.body.emergencia_id,
      contacto_id: req.body.contacto_id
   }
   empleadoModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/empleados/read', (req, res, next) => {
   empleadoModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/empleados/read-by-acceso', (req, res, next) => {
   const data = {
      acceso_id: req.body.acceso_id
   }
   empleadoModel.readByAccesoId(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/empleados/read-by-usuario', (req, res, next) => {
   const data = {
      usuario: req.body.usuario
   }
   empleadoModel.readByUsuario(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/empleados/read-by-jefe', (req, res, next) => {
   const data = {
      usuario_jefe: req.body.usuario_jefe
   }
   empleadoModel.readByJefe(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/empleados/update', (req, res, next) => {
   const data = {
      personal_id: req.body.personal_id,
      laboral_id: req.body.laboral_id,
      direccion_id: req.body.direccion_id,
      medico_id: req.body.medico_id,
      acceso_id: req.body.acceso_id,
      emergencia_id: req.body.emergencia_id,
      contacto_id: req.body.contacto_id,
      id: req.body.id,
   }
   empleadoModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/empleados/delete', (req, res, next) => {
   const data = {
      id: req.body.id
   }
   empleadoModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => INFO EMERGENCIA //
app.post('/info-emergencia/create', (req, res, next) => {
   const data = {
      contacto: req.body.contacto,
      relacion: req.body.relacion,
      telefono: req.body.telefono,
   }
   emergenciaModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-emergencia/read', (req, res, next) => {

   emergenciaModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-emergencia/update', (req, res, next) => {
   const data = {
      contacto: req.body.contacto,
      relacion: req.body.relacion,
      telefono: req.body.telefono,
      id: req.body.id
   }
   emergenciaModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-emergencia/delete', (req, res, next) => {
   const data = {
      id: req.params.id
   }
   emergenciaModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => INFO DIRECCION //
app.post('/info-direccion/create', (req, res, next) => {
   const data = {
      corregimiento_id: req.body.corregimiento_id,
      direccion: req.body.direccion,
   }
   direccionModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-direccion/read', (req, res, next) => {
   direccionModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-direccion/update', (req, res, next) => {
   const data = {
      id: req.body.id,
      corregimiento_id: req.body.corregimiento_id,
      direccion: req.body.direccion,
   }
   direccionModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-direccion/delete', (req, res, next) => {
   const data = {
      id: req.body.id,
   }
   direccionModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => INFO CONTACTO //// => ROLES //
app.post('/info-contacto/create', (req, res, next) => {
   const data = {
      telefono: req.body.telefono,
      celular: req.body.celular,
      correo: req.body.correo
   }
   contactoModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-contacto/read', (req, res, next) => {
   contactoModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-contacto/update', (req, res, next) => {
   const data = {
      id: req.body.id,
      telefono: req.body.telefono,
      celular: req.body.celular,
      correo: req.body.correo
   };
   contactoModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-contacto/delete', (req, res, next) => {
   const data = {
      id: req.body.id,
   };
   contactoModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// => INFO ACCESO //
app.post('/info-acceso/create', (req, res, next) => {
   const data = {
      usuario: req.body.usuario,
      perfil_id: req.body.perfil_id,
      clave: req.body.clave,
      avatar: req.body.avatar,
      create_dt: req.body.create_dt
   }
   accesoModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/info-acceso/read', (req, res, next) => {
   accesoModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-acceso/update', (req, res, next) => {
   const data = {
      usuario: req.body.usuario,
      perfil_id: req.body.perfil_id,
      clave: req.body.clave,
      avatar: req.body.avatar,
      create_dt: req.body.create_dt,
      id: req.body.id
   }
   accesoModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/info-acceso/delete', (req, res, next) => {
   const data = {
      id: req.body.id,
   }
   accesoModel.delete(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// global
// => INFO ACCESO //
app.get('/global/read', (req, res, next) => {
   globalModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

// realtime

app.get('/llamadas/hoy', (req, res, next) => {
   crmModel.readAllCallsToDay().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

app.get('/agentes/conectados', (req, res, next) => {
   actividadesModel.readConnectedAgent().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/agentes/not-ready', (req, res, next) => {
   actividadesModel.readNotReadyAgent().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});

app.post('/actividades/craete', (req, res, next) => {
   const a = req.body;
   const data = {
      usuario_id: req.user.id,
      actividad_id: a.actividad_id,
      inicio_dt: a.inicio_dt,
      final_dt: a.final_dt,
      estado: a.estado
   }
   actividadesModel.create(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      console.Console(err)
      res.status(404).json(rsp);
   })
});
app.get('/actividades/read-all', (req, res, next) => {
   actividadesModel.read().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/actividades/read-all-today', (req, res, next) => {
   const f = new Date();
   const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
   const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
   const fecha = f.getFullYear() + '-' + m + '-' + d;
   data = {
      inicio_dt: fecha
   }
   actividadesModel.readAllToDay(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/actividades/read-by-team', (req, res, next) => {
   const f = new Date();
   const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
   const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
   const fecha = f.getFullYear() + '-' + m + '-' + d;
   const data = {
      jefe_id: req.body.jefe_id,
      inicio_dt: fecha
   };
   actividadesModel.readByTeam(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/actividades/update', (req, res, next) => {
   const data = {
      id: req.body.id,
      final_dt: req.body.final_dt
   };
   actividadesModel.update(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      console.log(data);
      res.status(404).json(rsp);
   })
});
app.post('/actividades/delete', (req, res, next) => {
   const data = {};
   actividadesModel.delete(data).thenpost(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/actividades/count-call-today', (req, res, next) => {
   actividadesModel.countTodayCall().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});




app.get('/miscelaneo/listar/generos', (req, res, next) => {
   miscelaneoModel.read_generos().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/miscelaneo/listar/provincias', (req, res, next) => {
   miscelaneoModel.read_provincia().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/miscelaneo/listar/distritos', (req, res, next) => {
   data = {
      provincia_id: req.params.provincia_id
   }
   miscelaneoModel.read_distrito(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.post('/miscelaneo/listar/corregimientos', (req, res, next) => {
   const data = {
      distrito_id: req.body.distrito_id
   }
   miscelaneoModel.read_corregimiento(data).then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/miscelaneo/listar/tiposangre', (req, res, next) => {
   miscelaneoModel.read_tiposangre().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
app.get('/miscelaneo/listar/estadousuario', (req, res, next) => {
   miscelaneoModel.read_estadousuario().then(rst => {
      if (rst) {
         res.status(200).json(rst);
      } else {
         const rsp = { msg: 'No se ha encontrado coincidencia', rst };
         res.status(205).json(rsp);
      }
   }).catch(err => {
      const rsp = { msg: 'Error en la consulta', err }
      res.status(404).json(rsp);
   })
});
// users

// Auth
app.post('/auth/login', (req, res, next) => {
   pp.authenticate('local.signin', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      failureMessage: true
   })(req, res, next);
});

app.get("/logout", (req, res) => {
   req.logout();
   res.redirect('/auth/login');
})


app.post('/change/password', isAuth, (req, res, next) => {
   const password = req.body.password;
   const password2 = req.body.password2;

   if (password.length < 8) {
      console.log('Contraseña menor a 8 digitos')
      req.flash('warning', 'La contraseña debe tener al menos ocho (8) caracteres');
      res.status(400).redirect('/auth/change-password');
   } else if (password != password2) {
      console.log('contraseñas no coinciden');
      req.flash('warning', 'Las contraseñas no coinciden');
      res.status(400).redirect('/auth/change-password')
   } else {

   passwd.encrypt(password).then((hash) => {
      if (hash) {
         const f = new Date();
         const m = parseInt( f.getMonth()+1) < 10 ? '0' + parseInt(f.getMonth()+1) :  parseInt(f.getMonth()+1);
         const d = parseInt(f.getDate()) < 10 ? '0' + parseInt(f.getDate()) : parseInt(f.getDate())
         const create_dt = `${f.getFullYear()}-${m}-${d}`;
         console.log(create_dt);
         data = {
            id: req.user.acceso_id,
            clave: hash,
            create_dt: create_dt
         }
         authModel.update_pass(data).then(rst => {
            if (rst) {
               res.status(200).redirect('/')
            } else {
               console.log(rst);
               req.flash('info', 'Error al intentar actualizar datos')
               res.status(400).redirect('/auth/recovery-password')
            }
         }).catch(err => {
            if (err) {
               console.log(err)
            }
         })
      }
   }).catch((err) => {
      console.log(err)
   })
   }

})


module.exports = app;
