
class timeCounter {
   constructor(start) {
      this.start = new Date(start);
      this.hora = 0;
      this.minuto = 0;
      this.segundo = 0;
      this.interval = null;
      this.counter();
   }

   counter() {
      if (this.start) {
         let fin = new Date();
         let transcurso = (fin - this.start) / 1000;
         if (transcurso > 3600) {
            this.hora = parseInt(transcurso / 3600);
            transcurso = transcurso % 3600;
         }
         if (transcurso > 60) {
            this.minuto = parseInt(transcurso / 60);
            transcurso = transcurso % 60;
         }
         if (transcurso <= 60) {
            this.segundo = parseInt(transcurso);
         }
      }
   }
   imprimir() {
      let h = this.hora < 10 ? '0' + this.hora : this.hora;
      let m = this.minuto < 10 ? '0' + this.minuto : this.minuto;
      let s = this.segundo < 10 ? '0' + this.segundo : this.segundo;

      return `${h}:${m}:${s}`;
   }

   alerta(actividad) {
      switch (actividad) {
         case 2:
            if (this.minuto >= 42 && this.minuto < 43) {
               return 'bg-warning text-white text-center font-weight-bold';
            } else if (this.minuto >= 43) {
               return 'bg-danger text-white text-center font-weight-bold'
            }
            break;
         case 3:
            if (this.minuto >= 12 && this.minuto < 13) {
               return 'bg-warning text-white text-center font-weight-bold';

            } else if (this.minuto >= 13) {
               return 'bg-danger text-white text-center font-weight-bold'
            }
            break;
         default:
            return 'text-dark'
      }
   }
}


const realtime = {
   getUserStatusData: (e) => {
      $.ajax({
         methdo: "GET",
         url: baseUrl + 'api/actividades/read-all-today',
         dataType: "json",
      }).then(data => {
         const d = data;
         let txt = "";
         for (let i = 0; i < d.length; i++) {
            const t = new timeCounter(d[i].inicio_dt);
            txt += `<tr>`;
            txt += `<td>${d[i].usuario}</td>`;
            txt += `<td>${d[i].jefe_nombre}</td>`;
            txt += `<td><i class='${d[i].icon}'></i> ${d[i].actividad}</td>`;
            txt += `<td class="${t.alerta(d[i].actividad_id)} ">${t.imprimir()}</td>`;
            txt += `</tr>`;
         }
         document.getElementById('rtl_table').innerHTML = txt;
      })
   },

   getUserbyTeam: (e) => {
      const data = { jefe_id: $("#jefe_id option:selected").val() }

      $.ajax({
         method: "post",
         url: baseUrl + 'api/actividades/read-by-team',
         dataType: "json",
         data: data
      }).then(rst => {
         let txt = "";
         for (let i = 0; i < rst.length; i++) {
            console.log(new Date());
            const t = new timeCounter(rst[i].inicio_dt);
            txt += `<tr>`;
            txt += `<td>${rst[i].usuario}</td>`;
            txt += `<td>${rst[i].jefe_nombre}</td>`;
            txt += `<td><i class='${rst[i].icon}'></i> ${rst[i].actividad}</td>`;
            txt += `<td class="${t.alerta(rst[i].actividad_id)} ">${t.imprimir()}</td>`;
            txt += `</tr>`;
         }
         document.getElementById('rtl_table').innerHTML = txt;
      })
         .catch((e) => {
            console.error(e);
         })
   },

   getAllCallsToDay: (e) => {
      $.ajax({
         method: "get",
         url: baseUrl + 'api/llamadas/hoy',
         dataType: "json",
      }).then(data => {
         document.getElementById('llamadas').innerHTML = data[0]['llamadas'];
      }).catch(err => { console.error(err) })
   },

   getEquipos: () => {
      $.ajax({
         method: 'GET',
         url: baseUrl + 'api/jefes/read'
      })
         .then((res) => {
            var txt = '<option value="">Equipos</option>';
            if (res) {
               for (let i = 0; i < res.length; i++) {
                  txt += `<option value="${res[i]['id']}">${res[i]['jefe_nombre']}</option>`

               }
            }
            document.getElementById('jefe_id').innerHTML = txt;
         })
         .catch((err) => {
            console.log(err)
         })
   },

   connectedAgents: (e) => {
      $.ajax({
         method: "get",
         url: baseUrl + 'api/agentes/conectados',
         dataType: "json",
      }).then(data => {
         document.getElementById('connected').innerHTML = data[0]['Conectados'];
      }).catch(err => { console.error(err) })
   },

   notreadyAgents: (e) => {
      $.ajax({
         method: "get",
         url: baseUrl + 'api/agentes/not-ready',
         dataType: "json",
      }).then(data => {
         document.getElementById('not-ready').innerHTML = data[0]['not-ready'];
      }).catch(err => { console.error(err) })
   }
}

$(document).ready(() => {
   this.interval = setInterval(() => {
      if ($("#jefe_id").val() > 0) {
         realtime.getUserbyTeam();
      } else {
         realtime.getUserStatusData()
      }
      realtime.getAllCallsToDay();
      realtime.connectedAgents();
      realtime.notreadyAgents();
   }, 1000);
   realtime.getEquipos();
   $("#tbl-realtime").DataTable({
       "paging":   false,
      "searching": false
   });
})        
