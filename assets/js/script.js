// ------ Agregó los elementos al DOM -----------
const inputTarea = document.querySelector(".inputTarea");
const buttonAgregar = document.querySelector(".btnAgregar");
const listaTareas = document.querySelector(".listaTareas");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");


// ------- Lista de tareas - Arrays -----------
const tareas = [
  {
    id: listaId(),
    nombre: "Pan integral",
    confirmado: false,
  },
  {
    id: listaId(),
    nombre: "Docena de huevos blancos",
    confirmado: false,
  },
  {
    id: listaId(),
    nombre: "Leche sin lactosa descremada",
    confirmado: false,
  },
];

// ---------- Se crean ID ---------------------
function listaId(min, max) {
  min = Math.ceil(1);
  max = Math.floor(100);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ------------ Se crean tareas ---------------------

buttonAgregar.addEventListener("click", () => {
  const nuevaTarea = {
    id: listaId(),
    nombre: inputTarea.value,
    confirmado: false,
  };
  tareas.push(nuevaTarea);
  inputTarea.value = "";
  renderizarTareas();
});

// ------ Se agregan tareas -----------------
const renderizarTareas = function () {
  let html = "";

  for (const tarea of tareas) {
    if (tarea.confirmado) {
      chequeado = "checked";
    } else {
      chequeado = "";
    }

    html += `
    <tr>
    <td >${
      tarea.confirmado
        ? "<span style='color:green'> <del>" + tarea.id + "</del></span>"
        : "<span style='color:black'> " + tarea.id + "</span>"
    } </td>

    <td >
        ${
          tarea.confirmado
            ? "<span style='color:green'>" + tarea.nombre + "</span>"
            : "<span style='color:black'>" + tarea.nombre + "</span>"
        } </td>
    <td><input onclick="actualizarConfirmacion(${
      tarea.id
    })" type="checkbox" ${chequeado}  ></td>
    <td><button class="buttonEliminar" onclick="borrar (${
      tarea.id
    })"> X </button></td>
  </tr> `;
  }

  listaTareas.innerHTML = `  <tr>
 <td> <strong>ID</strong></td>
  <td><strong>Tarea</strong></td>
</tr> ${html}`;

  recuento();
};

// ------ Se borran los ID ----------------
const borrar = (id) => {
  const index = tareas.findIndex((e) => e.id === id);
  tareas.splice(index, 1);
  renderizarTareas();
};

// ---- Se le da check cuando se confirma ----------
const actualizarConfirmacion = function (id) {
  const index = tareas.findIndex((e) => e.id === id);
  tareas[index].confirmado = !tareas[index].confirmado;
  renderizarTareas();
};

const recuento = () => {
  total.innerHTML = tareas.length;
  realizadas.innerHTML = tareas.filter((e) => e.confirmado === true).length;
};

renderizarTareas();