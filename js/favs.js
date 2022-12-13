const apiKey = "5783830981663644";
const url = "https://superheroapi.com/api.php/" + apiKey + "/";

// Variables para guardar las imágenes de añadir o modificar favoritos
const aniadirFav = "../img/addFav.png";
const fav = "../img/fav.png";

// Llamada a la API
async function buscarSuperheroe(id) {
  let response = await fetch(url + id);
  pintarCartas(await response.json());
}

obtenerFavs();

// Función que obtiene a los superhéroes favoritos del localStorage
function obtenerFavs() {
  let favs = JSON.parse(localStorage.getItem("supersFavoritos"));
  if (favs.length <= 0) {
    document.getElementById("resultados").innerHTML =
      "Aún no hay Super Héroes favoritos. Añade alguno para poder visualizarlos.";
    return;
  }
  document.getElementById("resultados").innerHTML = "";
  favs.forEach((id) => {
    buscarSuperheroe(id);
  });
}

function pintarCartas(data) {
  // div para las cartas
  let contenedor_cartas = document.createElement("div");
  contenedor_cartas.className = "contenedor-cartas";
  contenedor_cartas.id = data.id;
  let favorito;

  // Comprueba si el superhéroe está en favoritos
  let favs = JSON.parse(localStorage.getItem("supersFavoritos"));
  if (favs.indexOf(data.id) !== -1) {
    favorito = fav;
  } else {
    favorito = aniadirFav;
  }
  // Pinta el contenido de la carta
  contenedor_cartas.innerHTML = `
        <div class="img-carta">
            <img src="${data.image.url}">
        </div>
        <div class="nombre-carta">${data.name}</div>
        <div>
            <img id="btn_favorito" src="${favorito}" width="25">
        </div>  
    `;
  document.getElementById("resultados").appendChild(contenedor_cartas);
}

// Evento para añadir y eliminar favoritos
document.addEventListener("click", (event) => {
  if (event.target.id == "btn_favorito") {
    let id = event.target.parentNode.parentNode.id;
    let favs = JSON.parse(localStorage.getItem("supersFavoritos"));
    if (favs.indexOf(id) != -1) {
      favs = favs.filter((item) => item != id);
      localStorage.setItem("supersFavoritos", JSON.stringify(favs));
      event.target.src = aniadirFav;
      document.getElementById(id).remove();
    } else {
      favs.push(id);
      localStorage.setItem("supersFavoritos", JSON.stringify(favs));
      event.target.src = fav;
    }
  }
});
