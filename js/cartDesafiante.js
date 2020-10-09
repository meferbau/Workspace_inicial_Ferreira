//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CARRITO_URL).then(function(resultObj2){
    if (resultObj2.status === "ok")
    {
      datosCarrito2 = resultObj2.data;

      for(i=0; i<datosCarrito2.articles.length; i++){
        let contenidoTabla = "";
        let moneda = "";
        let subTotInicial2 = 0;
        moneda = datosCarrito2.articles[i].currency;

        if (moneda == "UYU"){
          subTotInicial2 = datosCarrito2.articles[i].unitCost * datosCarrito2.articles[i].count;
        }else{
          subTotInicial2 = datosCarrito2.articles[i].unitCost * datosCarrito2.articles[i].count * 40;
        };

        contenidoTabla += `
        <tr>
          <td id="imgArticulo`+ i +`"><img src="`+datosCarrito2.articles[i].src+`" class="img-thumbnail" width="12%"></td>

          <td id="nombreArticulo`+ i +`">`+datosCarrito2.articles[i].name+`</td>

          <td id="costoArticulo`+ i +`">`+datosCarrito2.articles[i].currency +" "+ datosCarrito2.articles[i].unitCost+`</td>

          <td id="cantidadArticulo`+ i +`"><input id="inputCantArticulos`+ i +`" class="quantity" min="1" name="quantity"
          value="`+ datosCarrito2.articles[i].count +`" type="number" onchange="miFuncion(this)"></td>

          <td id="subtotalArticulo`+ i +`">`+"UYU "+ subTotInicial2 +`</td>
        </tr>
        `;
        document.getElementById("articlesWrapper").innerHTML += contenidoTabla;

        document.addEventListener("change",function(){
          console.log("entra");
        });

      };


    };
  });
});
function miFuncion(t){
  console.log("entra funcion");
  alert(t.id);
}
