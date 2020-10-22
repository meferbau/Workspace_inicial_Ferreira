//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
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
    alert(valorTexto)
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
