//arrayHeroes = arrayHeroes.sort((a, b) => b.comics.available - a.comics.available);
const urlGeneral = "https://superheroapi.com/api.php/" + apiKey + "/";

const selectNombres = document.getElementById("selectNombres");

// Opción por defecto para el select
let defaultOption = document.createElement("option");
defaultOption.text = "Superhéroe aleatorio...";
selectNombres.add(defaultOption);
selectNombres.selectedIndex = 0;

rellenarSelectNombres();

// Función que rellena el select con 10 nombres aleatorios entre todos los superhéroes
function rellenarSelectNombres() {
  for (let i = 0; i < 10; i++) {
    // Variable que genera un id aleatorio entre 1 y 732 (todos los superhéroes que hay)
    let idAleatorio = Math.floor(Math.random() * (1 - 732 + 1) + 732);
    let urlIdAleatorio = urlGeneral + idAleatorio + "/biography/";
    fetch(urlIdAleatorio)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let optionElement = document.createElement("option");
        optionElement.textContent = data.name;
        optionElement.setAttribute("value", data.id);
        selectNombres.appendChild(optionElement);
      });
  }
}

// Función que obitiene el id del superhéroe y pinta las cartas
function superPorNombre() {
  let idSuper = selectNombres.value;
  // Variable para almacenar la url de la imagen del superhéroe que se selecciona
  let imgSuper = urlGeneral + idSuper + "/image/url/";

  fetch(imgSuper)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // div para las cartas
      let contenedor_cartas = document.createElement("div");
      contenedor_cartas.className = "contenedor-cartas";
      contenedor_cartas.id = data.id;
      let favorito;

      // Comprueba si el superhéroe está en favoritos y añade una imagen u otra en función de ello
      let favs = JSON.parse(localStorage.getItem("supersFavoritos"));
      if (favs.indexOf(data.id) !== -1) {
        favorito = fav;
      } else {
        favorito = aniadirFav;
      }

      // Pinta la carta
      if (selectNombres.value == "Superhéroe aleatorio...") {
        contenedor_cartas.innerHTML = "";
      } else {
        contenedor_cartas.innerHTML = `
        <div class="img-carta">
            <img src="${data.url}">
        </div>
        <div class="nombre-carta">${data.name}</div>
        <div>
            <img id="btn_favorito" src="${favorito}" width="25">
        </div>  
    `;
        document.getElementById("resultados").appendChild(contenedor_cartas);
      }
    });
}
