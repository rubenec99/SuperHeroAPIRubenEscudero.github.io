const apiKey = "5783830981663644";
const url = "https://superheroapi.com/api.php/" + apiKey + "/search/";

// Variables para guardar las imágenes de añadir o modificar favoritos
const aniadirFav = "./img/addFav.png";
const fav = "./img/fav.png";

comprobarLocalStorage();
barraBusqueda();

// Llamada a la API
async function buscarSuperheroe(buscarString) {
  let response = await fetch(url + buscarString);
  pintarContenedorCartas(await response.json());
}

// Función para buscar superhéroes en el imput
function barraBusqueda() {
  const barraBusqueda = document.getElementById("busqueda");

  barraBusqueda.addEventListener("keyup", (e) => {
    const buscarString = e.target.value;

    // Empieza a mostrar resultados una vez se hayan introducido 3 caráctares, así no se sobrecarga la página
    if (buscarString.length < 3) {
      let resultados = document.getElementById("resultados");
      resultados.innerHTML =
        "Debes introducir al menos tres carácteres para comenzar la búsqueda.";
    } else {
      buscarSuperheroe(buscarString);
    }
  });
}

// Función para pintar el contenedor de las cartas
function pintarContenedorCartas(data) {
  // Borrar cartas si se borran carácteres
  let resultados = document.getElementById("resultados");
  resultados.remove();

  // div de resultados
  let contenedor_resultados = document.getElementById("contenedor-resultados");
  resultados = document.createElement("div");
  resultados.id = "resultados";
  contenedor_resultados.appendChild(resultados);

  // forEach para sacar a los superhéroes
  data.results.forEach((element) => {
    resultados.appendChild(pintarCartas(element));
  });
}

// Función para pintar las cartas
function pintarCartas(data) {
  // div para las cartas
  let contenedor_cartas = document.createElement("div");
  contenedor_cartas.className = "contenedor-cartas";
  contenedor_cartas.id = data.id;
  let favorito;

  // Comprueba si el superhéroe está en favoritos y añade una imagen u otra
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
  return contenedor_cartas;
}

// Función que crea un array en localStorage para añadir favoritos si no existe
function comprobarLocalStorage() {
  if (localStorage.getItem("supersFavoritos") == null) {
    localStorage.setItem("supersFavoritos", JSON.stringify(Array()));
  }
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
    } else {
      favs.push(id);
      localStorage.setItem("supersFavoritos", JSON.stringify(favs));
      event.target.src = fav;
    }
  }
});
