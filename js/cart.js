
var porcentajeShipping = 0.15
var datosCart = [];

function mostrarArticulos(arts){
  let htmlContenido = "";

  for (var i = 0; i < arts.length; i++){

    let costoUnitario = arts[i].unitCost;
    let monedaProducto = arts[i].currency;
    var tipoCambio = 1;
    if(monedaProducto == "USD"){
      tipoCambio = 40;
    }

    var valorSubtotal = tipoCambio * costoUnitario * arts[i].count;
    costoTipoMoneda = monedaProducto+" " + costoUnitario;
    htmlContenido += `
    <tr id="fila`+i+`">
      <td><img src="`+ arts[i].src +`" class="img-thumbnail" width="20%"></td>
      <td>`+ arts[i].name +`</td>
      <td id="monedaCosto`+ i +`">`+costoTipoMoneda+`</td>
      <td><input onchange="actualizarSubtotal(`+i+`)" id="inputCantArticulos`+ i +`" class="inputClase quantity" min="1" name="quantity"
      value="`+ arts[i].count +`" type="number"></td>
      <td><span id="subtotalProd`+ i +`" class="subtotalProdClase">`+ "UYU " + valorSubtotal +`</span></td>
    </tr>
    `

  }
  document.getElementById("articulosCarrito").innerHTML = htmlContenido;
}

function actualizarSubtotal(id){
   let count = parseInt(document.getElementById("inputCantArticulos"+id).value);
   monedaProd = document.getElementById("monedaCosto"+id).textContent;
   monedaProd2 = monedaProd.split(" ");

  var moneda = 1;
  if (monedaProd2[0] == "USD"){
    moneda = 40;
  }

  subtotal = monedaProd2[1] * count * moneda;

  document.getElementById("subtotalProd"+id).innerHTML = "UYU " + subtotal;

  actualizaTotal();

}

function actualizaTotal(){
  let subTotCostoHTML = document.getElementById("subTotalHTML");
  let costoShippingHTML = document.getElementById("costoEnvioHTML");
  let costoTotHTML = document.getElementById("costoTotal");

  var sumaSubTotales = 0;

  for (var i = 0; i < datosCart.length; i++){
    var texto = document.getElementById("subtotalProd"+ i).textContent;
    var arText = texto.split(" ");
    var valorTexto = arText[1];
    sumaSubTotales += parseInt(valorTexto);
  }

  let costoShipping = Math.round(porcentajeShipping * sumaSubTotales);

  subTotCostoHTML.innerHTML = "UYU " + sumaSubTotales;
  costoShippingHTML.innerHTML = "UYU " + costoShipping;
  costoTotHTML.innerHTML = "UYU " + (sumaSubTotales + costoShipping);
}

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CARRITO_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          datosCarrito = resultObj.data;
          datosCart = datosCarrito.articles;
          mostrarArticulos(datosCart);

          primerSubtotal = 0;
          primerTotal = 0;
          primerSubtotal2 = 0

          for(let i = 0; i<datosCart.length; i++){
            primerSubtotal = document.getElementById("subtotalProd"+ i).textContent.split(" ");
            primerSubtotal2 += parseInt(primerSubtotal[1])

          }
          primerTotal = primerSubtotal2 * porcentajeShipping;

          document.getElementById("subTotalHTML").innerHTML = primerSubtotal2;
          document.getElementById("costoEnvioHTML").innerHTML = primerSubtotal2 * porcentajeShipping;
          document.getElementById("costoTotal").innerHTML = (primerSubtotal2 * porcentajeShipping) + primerSubtotal2

      };
    });

    document.getElementById("premiumradio").addEventListener("change",function(){
      porcentajeShipping = 0.15;
      actualizaTotal();
    });
    document.getElementById("expressradio").addEventListener("change",function(){
      porcentajeShipping = 0.07;
      actualizaTotal();
    });
    document.getElementById("standardradio").addEventListener("change",function(){
      porcentajeShipping = 0.05;
      actualizaTotal();
    });

});

function comprobarPago(){
  if (document.getElementById("metodoTarjeta").checked == true){
    document.getElementById("posibleAlerta").style.display = "contents"
    sessionStorage.setItem("valorComprobacion",1);

  } else if (document.getElementById("metodoTransferencia").checked == true){
    document.getElementById("posibleAlerta").style.display = "contents"
    sessionStorage.setItem("valorComprobacion",1);

  } else if (document.getElementById("metodoTarjeta").checked == false && document.getElementById("transferenciaBancaria").checked == false) {
    document.getElementById("posibleAlerta2").innerHTML += `
    <div class="alert alert-danger alert-dismissible" role="alert">
      Inserte un método de pago
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `
  }
}
function cerrarCompra(){
  console.log("entra")
  sessionStorage.setItem("valorComprobacion", 0);
}

function comprobacion(){
  var comprueba = sessionStorage.getItem("valorComprobacion")
  if (comprueba == 1){
    document.getElementById("posibleAlerta").style.display = "contents"
  } else {
    document.getElementById("posibleAlerta").style.display = "none"
  }
}
comprobacion();
