class Crono {

   constructor() {
      this.opt = null;
      this.hora = 0;
      this.minuto = 0;
      this.segundo = 0;
      this.data = JSON.parse(localStorage.getItem('dataCrono'));
      this.interval = null;
      this.txtclass = '';
   }

   reloadTime() {
      if (this.data) {
         let fin = new Date();
         let inicio = new Date();
         inicio.setHours(this.data.hora);
         inicio.setMinutes(this.data.minuto);
         inicio.setSeconds(this.data.segundo);
         let transcurso = (fin - inicio) / 1000;
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

   setLSData(hora, id) {
      let dataCrono = {
         opt: parseInt($("#user-status").val()),
         hora: parseInt(hora.getHours()),
         minuto: parseInt(hora.getMinutes()),
         segundo: parseInt(hora.getSeconds()),
         id: parseInt(id)
      }
      try {
         localStorage.setItem('dataCrono', JSON.stringify(dataCrono));
      } catch (e) {
         console.log(e)
      }
   }

   contador() {
      this.segundo++;
      if (this.segundo > 59) {
         this.segundo = 0;
         this.minuto++
      }
      if (this.minuto > 59) {
         this.minuto = 0;
         this.hora++
      }
   }

   imprimir() {
      let h = this.hora < 10 ? '0' + this.hora : this.hora;
      let m = this.minuto < 10 ? '0' + this.minuto : this.minuto;
      let s = this.segundo < 10 ? '0' + this.segundo : this.segundo;
      document.getElementById('app-timer').innerHTML = `${h}:${m}:${s}`;
   }

   selectData() {
      $.ajax({
         url: baseUrl + 'api/global/read',
         type: 'GET',
         dataType: 'json',
      }).done(function (result) {
         let item = result;
         const opt = JSON.parse(localStorage.getItem('dataCrono'));
         let text = "";
         for (let i = 0; i < item.length; i++) {
            if (opt) {
               if (opt.opt == item[i].id) {
                  text += "<option value='" + item[i]['id'] + "' selected='selected'><i class='" + item[i]['icon'] + "'></i>" + item[i]['actividad'] + "</option>";
               } else {
                  text += "<option value='" + item[i]['id'] + "'><i class='" + item[i]['icon'] + "'></i>" + item[i]['actividad'] + "</option>";
               }
            } else {
               text += "<option value='" + item[i]['id'] + "'><i class='" + item[i]['icon'] + "'></i>" + item[i]['actividad'] + "</option>";
            }
         }
         document.getElementById("user-status").innerHTML = text;
      }).fail(function (e) {
         console.log(e)
      });
   }

   startInterval() {
      this.interval = setInterval(() => {
         this.contador();
         this.imprimir();
         this.alerta();
      }, 1000);
   }


   ejecutar() {
      this.data = JSON.parse(localStorage.getItem('dataCrono'));
      this.selectData();
      if (this.data) {
         this.reloadTime();
         this.startInterval();
         $("#start-session").css("display", "none");
         $("#user-status").css("display", "");
      } else {
         $("#start-session").css("display", "");
         $("#user-status").css("display", "none");
         $("#start-session").on('click', () => {
            $("#start-session").css("display", "none");
            $("#user-status").css("display", "");
            $("#user-status").val(1);
            this.data = JSON.parse(localStorage.getItem('dataCrono'));
            clearInterval(this.interval);
            if ($("#user-status").val() != 8) {
               let hora = new Date();
               if (this.data) {
                  this.updateActivity(this.data.id, hora);
               }
               this.insertActivity(hora);
               this.segundo = 0;
               this.minuto = 0;
               this.hora = 0;
               this.startInterval();
            }
         });
      }

      $("#user-status").change(() => {
         this.data = JSON.parse(localStorage.getItem('dataCrono'));
         clearInterval(this.interval);
         if ($("#user-status").val() != 8) {

            let hora = new Date();
            if (this.data) {
               this.updateActivity(this.data.id, hora);
               $("#start-session").css("display", "none");
               $("#user-status").css("display", "");
            }
            this.insertActivity(hora);
            this.segundo = 0;
            this.minuto = 0;
            this.hora = 0;
            this.startInterval();
         } else {
            $("#start-session").css("display", "");
            $("#user-status").css("display", "none");
            let hora = new Date();
            this.updateActivity(this.data.id, hora);
            this.insertActivity(hora);
            localStorage.removeItem('dataCrono');
            document.getElementById('app-timer').innerHTML = '00:00:00';
         }
      });

      $("#sign-out").click(() => {
         this.data = JSON.parse(localStorage.getItem('dataCrono'));
         if (this.data) {
            let hora = new Date();
            this.updateActivity(this.data.id, hora);
            localStorage.removeItem('dataCrono');
            document.getElementById('app-timer').innerHTML = '00:00:00';
         }
         window.location.href = baseUrl + 'api/logout';
      })
   }

   // Generamos las consultas a la base de datos que almacenarán la actividad del operador
   insertActivity(hora) {
      const activityUser = {
         usuario_id: null,
         actividad_id: $("#user-status").val(),
         inicio_dt: $.formatDateTime('yy-mm-dd hh:ii:ss.uu', hora),
         final_dt: $.formatDateTime('yy-mm-dd hh:ii:ss.uu', hora),
         estado: 0
      }
      if ($("#user-status").val() == 8) {
         activityUser.estado = 1;
      }
      $.ajax({
         url: baseUrl + 'api/actividades/craete',
         type: 'POST',
         dataType: 'json',
         data: activityUser
      })
         .done((result) => {
            console.log(result);
            if ($("#user-status").val() != 8) {
               this.setLSData(hora, result.insertId);
            }
            if (result.affectedRows > 0) {
               return true;
            }
         })
         .catch((err) => {
            console.log(err)
         })
   }

   updateActivity(id, hora) {
      $.ajax({
         url: baseUrl + 'api/actividades/update',
         type: 'POST',
         dataType: 'json',
         data: { id: id, final_dt: $.formatDateTime('yy-mm-dd hh:ii:ss.uu', hora) }
      })
         .done((result) => {
            if (result.affectedRows > 0) {
               return true;
            }
         })
         .fail((err) => {
            console.log(err)
         })
   }

   alerta() {
      const actividad = $("#user-status").val();
      switch (actividad) {
         case 2:
            if (this.minuto >= 42 && this.minuto < 43) {
               $.notify({
                  title: 'Alerta!',
                  message: 'Tiempo de almuerzo proximo a terminar',
                  icon: 'fas fa-times'
               }, {
                  type: 'warning',
               });
               this.txtclass = 'bg-warning text-white text-center font-weight-bold';
            } else if (this.minuto >= 43) {
               $.notify({
                  title: 'Alerta!',
                  message: 'Tiempo de almuerzo ha finalizado',
                  icon: 'fas fa-times'
               }, {
                  type: 'danger',
               });
               this.txtclass = 'bg-danger text-white text-center font-weight-bold';
            }
            break;
         case 3:
            console.log('Dentro del caso 3')
            if (this.minuto >= 12 && this.minuto < 13) {
               $.notify({
                  title: 'Alerta!',
                  message: 'Tiempo de descanzo proximo a terminar',
                  icon: 'fas fa-times'
               }, {
                  type: 'warning',
               });
               this.txtclass = 'bg-warning text-white text-center font-weight-bold';

            } else if (this.minuto >= 13) {
               $.notify({
                  title: 'Alerta!',
                  message: 'Tiempo de descanso ha finalizado',
                  icon: 'fas fa-times'
               }, {
                  type: 'danger',
               });
               this.txtclass = 'bg-danger text-white text-center font-weight-bold';
            }
            break;
         default:
            this.txtclass = 'text-dark';
            break;
      }
      $("#app-timer").addClass(this.txtclass)
   }
}

$(document).ready(function () {
   c = new Crono();
   c.ejecutar();
   // c.alerta()
});