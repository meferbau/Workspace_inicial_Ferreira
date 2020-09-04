var category = {};

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
//const LIST_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productSimilarHTML = document.getElementById("productSimilar");

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.soldCount;


            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
          }


            // Tomo el json de los productos para obtener la información de los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultado){
                if (resultado.status === "ok")
                {
                  productosTodos = resultado.data;
                  var primerProductoRelacionado = productosTodos[category.relatedProducts[0]];
                  var segundoProductoRelacionado = productosTodos[category.relatedProducts[1]];

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
                      dataComentarios = contenido.data;
                      let contenidoComentarios = "";
                      for (i = 0; i<dataComentarios.length; i++){
                        contenidoComentarios += `
                        <div>
                          <p><strong>`+ dataComentarios[i].user +`: </strong>` + dataComentarios[i].description +`</p>
                          <p>`+ dataComentarios[i].dateTime +`</p>
                          <hr>
                        </div>
                        `

                      }
                      document.getElementById("comentarios").innerHTML = contenidoComentarios;

                    }
            });
        });
});
