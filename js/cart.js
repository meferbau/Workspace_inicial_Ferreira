//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          datosCarrito = resultObj.data;


          let nombreArtiHTML  = document.getElementById("nombreArticulo");
          let costoArtiHTML  = document.getElementById("costoArticulo");
          let cantidadArtiHTML  = document.getElementById("cantidadArticulo");

          let porcentajeEnvio = 0.15;

          document.getElementById("imgArticulo").innerHTML = `<img src="`+datosCarrito.articles[0].src+`" class="img-thumbnail" width="40%">`

          nombreArtiHTML.innerHTML = datosCarrito.articles[0].name;
          costoArtiHTML.innerHTML = datosCarrito.articles[0].currency +" "+ datosCarrito.articles[0].unitCost;

          cantidadArtiHTML.innerHTML = `<input id="inputCantArticulos" class="quantity" min="1" name="quantity"
          value="`+ datosCarrito.articles[0].count +`" type="number">`;

          let subTotInicial = 0;
          subTotInicial = datosCarrito.articles[0].unitCost * datosCarrito.articles[0].count;
          document.getElementById("subtotalArticulo").innerHTML = datosCarrito.articles[0].currency +" "+ subTotInicial;

          let subTotalHTML = document.getElementById("subTotalHTML");
          subTotalHTML.innerHTML = datosCarrito.articles[0].currency +" "+ subTotInicial;

          document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotInicial*porcentajeEnvio);

          let subTotSecundario = 0;

          document.getElementById("costoTotal").innerHTML = Math.round(subTotInicial*porcentajeEnvio + subTotInicial);

          document.getElementById("inputCantArticulos").addEventListener("change",function(){
            let cantDeseada = document.getElementById("inputCantArticulos").value;

            subTotSecundario = datosCarrito.articles[0].unitCost * cantDeseada;
            document.getElementById("subtotalArticulo").innerHTML = datosCarrito.articles[0].currency +" "+ subTotSecundario;

            document.getElementById("subTotalHTML").innerHTML = datosCarrito.articles[0].currency +" "+ subTotSecundario;

            document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotSecundario*porcentajeEnvio);

            document.getElementById("costoTotal").innerHTML = Math.round(subTotSecundario*porcentajeEnvio + subTotSecundario);
          });

          document.getElementById("premiumradio").addEventListener("change",function(){
            porcentajeEnvio = 0.15;
            if (subTotSecundario != 0){
              document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotSecundario*porcentajeEnvio);
              document.getElementById("costoTotal").innerHTML = Math.round(subTotSecundario*porcentajeEnvio + subTotSecundario);
            }else{
              document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotInicial*porcentajeEnvio);
              document.getElementById("costoTotal").innerHTML = Math.round(subTotInicial*porcentajeEnvio + subTotInicial);
            }
          });
          document.getElementById("expressradio").addEventListener("change",function(){
            porcentajeEnvio = 0.07;
            if (subTotSecundario != 0){
              document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotSecundario*porcentajeEnvio);
              document.getElementById("costoTotal").innerHTML = Math.round(subTotSecundario*porcentajeEnvio + subTotSecundario);
            }else{
              document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotInicial*porcentajeEnvio);
              document.getElementById("costoTotal").innerHTML = Math.round(subTotInicial*porcentajeEnvio + subTotInicial);
            }
          });
          document.getElementById("standardradio").addEventListener("change",function(){
            porcentajeEnvio = 0.05;
            if (subTotSecundario != 0){
              document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotSecundario*porcentajeEnvio);
              document.getElementById("costoTotal").innerHTML = Math.round(subTotSecundario*porcentajeEnvio + subTotSecundario);
            }else{
              document.getElementById("costoEnvioHTML").innerHTML = datosCarrito.articles[0].currency +" "+ Math.round(subTotInicial*porcentajeEnvio);
              document.getElementById("costoTotal").innerHTML = Math.round(subTotInicial*porcentajeEnvio + subTotInicial);
            }
          });


      }
  });

});
