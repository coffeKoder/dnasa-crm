$(document).ready(() => {
   crm.listar_tconsulta();
   crm.listar_tcontacto();
   crm.enable_form();
   $("#tbl_registros").DataTable( {
        "order": [[ 0, "desc" ]],
    } );
   // tbl_registros $("#tbl_preg").on("click", ".btn-eliminar", eliminarRegistro);
   $("#tbl_registros").on("click", ".btn-detalle", crm.mostrarModal);
})

const crm = {
   listar_tcontacto: (e) => {
      $.ajax({
         methdo: "get",
         url: baseUrl + 'api/tipocontacto/read',
         dataType: "json",
      }).done((data) => {
         let opt = "<option value=''>Seleccione una opcion</option>";
         for (let i = 0; i < data.length; i++) {
            opt += `<option value='${data[i].id}'> ${data[i].tipo_contacto} </option>`;
         }
         document.getElementById('tipo_contacto').innerHTML = opt;
      }).catch(err => {
         console.error(err);
      });
   },

   listar_tconsulta: (e) => {
      $.ajax({
         methdo: "get",
         url: baseUrl + 'api/tipoconsulta/read',
         dataType: "json",
      }).done((data) => {
         let opt = "<option value=''>Seleccione una opcion</option>";
         for (let i = 0; i < data.length; i++) {
            opt += `<option value='${data[i].id}'> ${data[i].tipo_consulta} </option>`;
         }
         document.getElementById('tipo_consulta').innerHTML = opt;
      }).catch(err => {
         console.error(err);
      });
   },

   enable_form: (e) => {
      $("#new-register").click(() => {
         const ls = localStorage.getItem('dataCrono');
         if (ls) {
            $("#tipo_contacto").prop('disabled', false);
            $("#tipo_consulta").prop('disabled', false);
            $("#comentario").prop('disabled', false);
            $("#telefono").prop('disabled', false);
            $("#enviar").prop('disabled', false);
            // ToDO:desencadena evento que almacena la hora en que se hace click
            const dt = new Date();

            const tm = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
            $("#inicio_dt").val(tm);
         } else {
            $.notify({
               title: "Usuario no conectado:",
               message: "Debe iniciar una actividad para habilitar el formulario",
               icon: "fas fa-exclamation-triangle"
            }, {
               type: "danger"
            })
         }
      })
   },

   mostrarModal: (e) => {
      const id = e.currentTarget.value;
      const data = {
         id: id
      }
      $.ajax({
         url: baseUrl + 'api/crm/read-one',
         method: 'POST',
         dataType: 'json',
         data: data
      }).done((result) => {
         if (result.length > 0) {
            const data = result[0];
            console.info('This is data => ')
            console.log(data);
            $("#modalUsuario").text(data.usuario);
            $("#modalHora").text(data.inicio_dt);
            $("#modalTcontacto").text(data.tipo_contacto);
            $("#modalTconsulta").text(data.tipo_consulta);
            $("#modalTelefono").text(data.telefono);
            $("#modalComentario").text(data.comentario);
         } else {
            console.log(result.data[0])
         }
      }).fail((error) => {
         console.log(error);
      })

   }

}
