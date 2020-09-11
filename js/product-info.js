var products = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

     for(let i = 0; i < array.length; i++){
         let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
     }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data;

            let productsNameHTML  = document.getElementById("productsName");
            let productsDescriptionHTML = document.getElementById("productsDescription");
            let productCountHTML = document.getElementById("productCount");
            let productSimilarHTML = document.getElementById("productSimilar");

            productsNameHTML.innerHTML = products.name;
            productsDescriptionHTML.innerHTML = products.description;
            productCountHTML.innerHTML = products.soldCount;


            //Muestro las imagenes en forma de galería
            showImagesGallery(products.images);
          }


            // Tomo el json de los productos para obtener la información de los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultado){
                if (resultado.status === "ok")
                {
                  productosTodos = resultado.data;
                  var primerProductoRelacionado = productosTodos[products.relatedProducts[0]];
                  var segundoProductoRelacionado = productosTodos[products.relatedProducts[1]];

                  //Obtengo y muestro info del primer elemento en el html
                  let contHTMLPrimProdRel = "";
                  contHTMLPrimProdRel += `
                  <div class="card-body">
                    <img class="card-img-top" src="`+ primerProductoRelacionado.imgSrc +`" alt="Card image cap">
                    <h5 id="nombrePrimImg" class="card-title">`+ primerProductoRelacionado.name +`</h5>
                    <p class="card-text">`+ primerProductoRelacionado.description +`</p>
                  </div>
                  `
                  document.getElementById("primerProdRel").innerHTML = contHTMLPrimProdRel;

                  //Obtengo y muestro info del segundo elemento en el html
                  let descripcionSegundo = "";
                  descripcionSegundo = segundoProductoRelacionado.description.substring(0,57);
                  descripcionSegundo += " ...";
                  let contHTMLSegProdRel = "";
                  contHTMLSegProdRel += `
                  <div class="card-body">
                    <img class="card-img-top" src="`+ segundoProductoRelacionado.imgSrc +`" alt="Card image cap">
                    <h5 id="nombrePrimImg" class="card-title">`+ segundoProductoRelacionado.name +`</h5>
                    <p class="card-text">`+ descripcionSegundo +`</p>
                  </div>
                  `
                  document.getElementById("segundoProdRel").innerHTML = contHTMLSegProdRel;
                }
              });

                getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(contenido){
                    if (contenido.status === "ok")
                    {
                      // Se obtienen todos los datos del JSON
                      dataComentarios = contenido.data;

                      let contenidoComentarios = "";
                      let cantEstrellas = 0;
                      let contenidoEstrellas = "";

                      //Este for crea los comentarios
                      for (i = 0; i<dataComentarios.length; i++){

                        //Se obtienen las estrellas amarillas adecuadas al score obtenido
                        cantEstrellas = dataComentarios[i].score;
                        for (a = 0; a<cantEstrellas; a++){
                          contenidoEstrellas += `
                          <span class="fa fa-star checked"></span>
                          `
                        }
                        //Dependiendo de cuántas estrellas amarillas tengamos, se agregan
                        //las estrellas negras correspondientes
                        if (cantEstrellas<5){
                          let totalEstrellasVacias = 5-cantEstrellas;
                          for (b = 0; b<totalEstrellasVacias; b++){
                            contenidoEstrellas += `
                            <span class="fa fa-star"></span>
                            `
                          }
                        }
                        cantEstrellas = 0;

                        //Se agrega a una variable la información del comentario
                        contenidoComentarios += `
                        <div>
                          <p><strong>`+ dataComentarios[i].user +`: </strong>` + dataComentarios[i].description +`</p>
                          <p>`+ dataComentarios[i].dateTime + contenidoEstrellas +`</p>
                          <hr>
                        </div>
                        `
                        contenidoEstrellas = "";

                      }
                      //Se muestra en el html nuestra variable que contiene los comentarios
                      document.getElementById("comentarios").innerHTML = contenidoComentarios;

                    }
            });
        });
});
document.getElementById("btnEnviarComentario").addEventListener("click", function(){

  var puntuacionDada = document.getElementById("puntuacionSelect").value;
  var comentarioHecho = document.getElementById("comentarioAgregado").value;
  var fechaHora = new Date();
  var usuario = sessionStorage.getItem("soloNombreUsuario");

  let fechaFormateada = fechaHora.getFullYear() + "-" + (fechaHora.getMonth() + 1) + "-"
  + fechaHora.getDate() + " " + fechaHora.getHours() + ":" + fechaHora.getMinutes() + ":" + fechaHora.getSeconds();

  var puntuacionEstrellas = '';
  for (i=1; i<=5; i++){
    if (i<=puntuacionDada){
      puntuacionEstrellas += `
      <span class="fa fa-star checked"></span>
      `
    }else {
      puntuacionEstrellas += `
      <span class="fa fa-star"></span>
      `
    }
  }
  var nuevosComentarios = ""
  nuevosComentarios += `
  <div>
    <p><strong>`+ usuario +`: </strong>` + comentarioHecho +`</p>
    <p>`+ fechaFormateada + puntuacionEstrellas +`</p>
    <hr>
  </div>
  `
  document.getElementById("comentarios").innerHTML += nuevosComentarios
});
