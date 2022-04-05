

function listar() {
   $.ajax({
      methdo: "GET",
      url: baseUrl + 'api/areas/read',
      dataType: "json",
   })
      .then(rst => {
         if (rst) {
            const d = rst;
            let t = '';
            for (let i = 0; i < d.length; i++) {
               t += `<tr>`;
               t += `<td>${d[i]['id']}</td>`;
               t += `<td>${d[i]['area']}</td>`;
               t += `<td>${d[i]['alias']}</td>`;
               t += `<td>`;
               t += `<div class="bs-component">
                           <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn btn-info btn-sm btn-editar">
                                 <input type="checkbox" value="${d[i]['id']}" autocomplete="off">
                                 <i class="far fa-edit"></i>
                              </label>
                              <label class="btn btn-danger btn-sm btn-eliminar">
                                 <input type="checkbox" value="${d[i]['id']}" autocomplete="off">
                                 <i class="far fa-trash-alt"></i>
                              </label>
                           </div>
                        </div>`
               t += `</td>`;
               t += `</tr>`;
            }
            document.getElementById('tbl_area_data').innerHTML = t;
         }

      })
      .catch(err => {
         console.log(err)
      });

}

function cargar() {
   var cRow = $(this).closest('tr');
   const id = cRow.find('td:eq(0)').text();
   $.ajax({
      type: "POST",
      url: baseUrl + 'api/areas/filter',
      dataType: "json",
      data: { id: id }
   })
      .then(rst => {

         $("#id").val(rst[0].id);
         $("#area").val(rst[0].area);
         $("#alias").val(rst[0].alias);
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
      $("#area_form").trigger('reset');
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
               url: baseUrl + 'api/areas/delete',
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
                  listar();
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
      });


}

function editar(data) {
   $.ajax({
      url: baseUrl + 'api/areas/update',
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
      url: baseUrl + 'api/areas/create',
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
      // limpiarForm();
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
      ;
}

function procesar() {

   let data = {}
   data.id = $("#id").val() ? $("#id").val() : null;
   data.area = $('#area').val() ? $('#area').val() : null;
   data.alias = $("#alias").val() ? $("#alias").val() : null;

   if (data.area && data.alias) {
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
   });
}


$(document).ready(() => {
   listar();
   $("#tbl_data").DataTable();
   $("#tbl_data").on('click', '.btn-editar', cargar);
   $("#tbl_data").on('click', '.btn-eliminar', eliminar);
   $("#procesar").on('click', procesar);
})