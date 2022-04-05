function listar() {
   $.ajax({
      method: 'GET',
      url: baseUrl + 'api/cargos/read',
      dataType: 'json'
   })
      .then((rst) => {
         let t = '';
         for (let i = 0; i < rst.length; i++) {
            t += '<tr>';
            t += '<td>' + rst[i]['id'] + '</td>';
            t += '<td>' + rst[i]['cargo'] + '</td>';
            t += `<td>`;
            t += `<div class="bs-component">
                           <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn btn-info btn-sm btn-editar">
                                 <input type="checkbox" value="${rst[i]['id']}" autocomplete="off">
                                 <i class="far fa-edit"></i>
                              </label>
                              <label class="btn btn-danger btn-sm btn-eliminar">
                                 <input type="checkbox" value="${rst[i]['id']}" autocomplete="off">
                                 <i class="far fa-trash-alt"></i>
                              </label>
                           </div>
                        </div>`
            t += `</td>`;
            t += `</tr>`;
         }
         document.getElementById('tbl-cargo-data').innerHTML = t;
         $("#tbl-cargo").DataTable();
      })
      .catch((err) => {
         $.notify({
            title: "Datos no encontrados : ",
            message: err,
            icon: 'fa fa-exclamation-triangle'
         }, {
            type: "warning"
         });
      })
}

function cargar() {
   var cRow = $(this).closest('tr');
   const id = cRow.find('td:eq(0)').text();
   $.ajax({
      type: "POST",
      url: baseUrl + 'api/cargos/filter',
      dataType: "json",
      data: { id: id }
   })
      .then(rst => {

         $("#id").val(rst[0].id);
         $("#cargo").val(rst[0].cargo);

      })
      .catch(err => {
         $.notify({
            title: "Datos no encontrados : ",
            message: err,
            icon: 'fa fa-exclamation-triangle'
         }, {
            type: "warning"
         });
      });
}

function limpiarForm() {
   try {
      $("#cargo_form").trigger('reset');
   } catch (e) {
      console.log(e)
   }
}

function eliminar() {
   var cRow = $(this).closest('tr');
   const id = cRow.find('td:eq(0)').text();

   swal({
      title: "Desea eliminar este registro?",
      text: "Al aceptar los datos serán eliminados permanentemente!",
      icon: "error",
      buttons: ["Cancelar!", "Aceptar"],
      dangerMode: true,
   })
      .then((willDelete) => {
         if (willDelete) {
            $.ajax({
               type: "POST",
               url: baseUrl + 'api/cargos/delete',
               dataType: "json",
               data: { id: id }
            })
               .then(rst => {
                  $.notify({
                     title: "Datos Eiminados: ",
                     message: "Los datos han sido eliminados correctamente",
                     icon: 'fas fa-trash'
                  }, {
                     type: "success"
                  });
               })
               .catch(err => {
                  $.notify({
                     title: "Error al Eliminar: ",
                     message: err,
                     icon: 'fas fa-times'
                  }, {
                     type: "success"
                  });
               })
         } else {
            swal("Cancelado a solicitud del usuario", {
               icon: "warning",
            });
         }
      })
      .finally(() => {
         listar();
      });
}

function editar(data) {
   $.ajax({
      url: baseUrl + 'api/cargos/update',
      type: 'POST',
      dataType: 'json',
      data: data,
   }).done(function (result) {
      $.notify({
         title: "Datos actualizados : ",
         message: "Los datos han sido actualizados correctamente",
         icon: 'fas fa-check-double'
      }, {
         type: "info"
      });
      limpiarForm();
   }).fail(function (e) {
      $.notify({
         title: "Error en la actualizacion : ",
         message: e,
         icon: 'far fa-times-circle'
      }, {
         type: "info"
      });
   });
}

function crear(data) {
   $.ajax({
      url: baseUrl + 'api/cargos/create',
      method: 'POST',
      dataType: 'json',
      data: data,
   }).done((result) => {
      // console.log(result);
      $.notify({
         title: "Datos registrados : ",
         message: "Los datos han sido registrados correctamente",
         icon: 'fas fa-check-double'
      }, {
         type: "success"
      });
      listar();
      limpiarForm();
   }).catch((textStatus) => {
      console.log(textStatus);
      $.notify({
         title: "Error : ",
         message: textStatus,
         icon: 'far fa-times-circle'
      }, {
         type: "warning"
      });
   })
}

function procesar() {
   let data = {}
   data.id = $("#id").val() ? $("#id").val() : null;
   data.cargo = $('#cargo').val() ? $('#cargo').val() : null;


   if (data.cargo) {
      if (data.id) {
         editar(data);
      } else {
         crear(data);
      }
      listar();
   } else {
      validateAlert();
   }
}

function validateAlert() {
   $.notify({
      title: "Datos insuficientes : ",
      message: "Es necesario llenar todos los campos del formulalruio",
      icon: 'far fa-times-circle'
   }, {
      type: "danger"
   })
}

$(document).ready(() => {
   listar();
   $("#tbl-cargo").on('click', '.btn-editar', cargar);
   $("#tbl-cargo").on('click', '.btn-eliminar', eliminar);
   $("#procesar").on('click', procesar);
})

