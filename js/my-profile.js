//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var arregloUsuarios = [];

document.addEventListener("DOMContentLoaded", function (e) {
  arregloUsuarios = JSON.parse(localStorage.getItem("PerfilUsuario"));
  //este for ubica los datos del usuario y los coloca en el formulario html
  for (i in arregloUsuarios){
    if (sessionStorage.getItem("userName") == arregloUsuarios[i].email){
      document.getElementById("primerNombreUsuario").value = arregloUsuarios[i].primerNombre;
      document.getElementById("segundoNombreUsuario").value = arregloUsuarios[i].segundoNombre;
      document.getElementById("primerApellidoUsuario").value = arregloUsuarios[i].primerApellido;
      document.getElementById("segundoApellidoUsuario").value = arregloUsuarios[i].segundoApellido;
      document.getElementById("emailUsuarioCreado").value = arregloUsuarios[i].email;
      document.getElementById("numeroContactoUsuario").value = arregloUsuarios[i].numeroContacto;
    }
  }

});

function guardarDatos(){
  //esta función se acciona al presionar el botón "guardar datos" del formulario
  arregloUsuarios = JSON.parse(localStorage.getItem("PerfilUsuario"));

  for (var i in arregloUsuarios){
    //con este if verificamos si el email que colocó el usuario ya está creado o no
    if (arregloUsuarios[i].email == document.getElementById("emailUsuarioCreado").value){
      sessionStorage.setItem('userName', document.getElementById("emailUsuarioCreado").value);
      //con el splice lo que hacemos es eliminar los datos que teníamos y colocar en la posición los nuevos datos
      arregloUsuarios.splice(i,1,{
        primerNombre: document.getElementById("primerNombreUsuario").value,
        segundoNombre: document.getElementById("segundoNombreUsuario").value,
        primerApellido: document.getElementById("primerApellidoUsuario").value,
        segundoApellido: document.getElementById("segundoApellidoUsuario").value,
        email: document.getElementById("emailUsuarioCreado").value,
        numeroContacto: document.getElementById("numeroContactoUsuario").value
      })

      break;
    }else if (i == arregloUsuarios.length-1){
      //si se recorrió todo el arreglo y no se encontró el email, se crea un item nuevo en el arreglo
      sessionStorage.setItem('userName', document.getElementById("emailUsuarioCreado").value);
      arregloUsuarios.push(
        {
          primerNombre: document.getElementById("primerNombreUsuario").value,
          segundoNombre: document.getElementById("segundoNombreUsuario").value,
          primerApellido: document.getElementById("primerApellidoUsuario").value,
          segundoApellido: document.getElementById("segundoApellidoUsuario").value,
          email: document.getElementById("emailUsuarioCreado").value,
          numeroContacto: document.getElementById("numeroContactoUsuario").value
        }
      )
    }
  }
  localStorage.setItem("PerfilUsuario", JSON.stringify(arregloUsuarios));
}
