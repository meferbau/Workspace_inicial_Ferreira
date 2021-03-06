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
            if (cantDeseada <= 0){
              cantDeseada=0
              document.getElementById("inputCantArticulos").value = 0;
            }

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

function funcionEnviaForm(){
  let tipoDeEnvio = "";
  let formaDePago = "";

  if (document.getElementById("premiumradio").value == true){
    tipoDeEnvio = "Premium";
  } else if (document.getElementById("expressradio").value == true){
    tipoDeEnvio = "Express";
  } else {
    tipoDeEnvio = "Standard";
  }

  if (document.getElementById("metodoTarjeta").value == "on"){
    formaDePago = "con tarjeta";
  } else if (document.getElementById("metodoMercadoPago").value == "on"){
    formaDePago = "a través de Mercado Pago";
  } else {
    formaDePago = "en efectivo";
  }

  htmlDatosCompra = document.getElementById("inputCantArticulos").value;
  htmlDatosCompra += " " + document.getElementById("nombreArticulo").innerText;
  htmlDatosCompra += `\n Tipo de envío: `+ tipoDeEnvio
  htmlDatosCompra += `\n Total a pagar: `+ document.getElementById("costoTotal").innerText
  htmlDatosCompra += `\n Se enviará a: `+ document.getElementById("calleEnvio").value;
  htmlDatosCompra += " "+ document.getElementById("numeroEnvio").value;
  htmlDatosCompra += " Esquina: "+ document.getElementById("esquinaEnvio").value;
  htmlDatosCompra += "\n Forma de pago: " + formaDePago;

  alert("Datos de su compra: \n" + htmlDatosCompra);
}
