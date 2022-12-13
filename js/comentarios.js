const areaComentarios = document.getElementById("areaComentarios");
const formulario = document.getElementById("formulario");
const comentario = document.getElementById("comentario");

const arrayComentarios = JSON.parse(localStorage.getItem("comentario")) || [];

// Función para actualizar la lista de comentarios
function actualizar() {
  comentario.innerHTML = "";

  for (const key in arrayComentarios) {
    const p = document.createElement("p");

    const span = document.createElement("span");
    span.innerText = arrayComentarios[key];

    const boton = document.createElement("button");
    boton.innerText = "Eliminar";
    boton.setAttribute("key", key);
    boton.classList.add("eliminar");

    p.appendChild(span);
    p.appendChild(boton);
    comentario.appendChild(p);
  }

  localStorage.setItem("comentario", JSON.stringify(arrayComentarios));
}

// Función para insertar comentarios
function insertarComentario(value) {
  if (value === "") return;

  arrayComentarios.push(value);

  actualizar();
  areaComentarios.value = "";
}

// Función para eliminar comentarios
function eliminarComentario(key) {
  arrayComentarios.splice(Number(key), 1);

  actualizar();
  areaComentarios.value = "";
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  insertarComentario(areaComentarios.value);
});

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("eliminar")) {
    eliminarComentario(el.getAttribute("key"));
  }
});
