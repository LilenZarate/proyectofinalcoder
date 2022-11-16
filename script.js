// data entities and data generation
class Lector {
  constructor(id, nombre, apellido) {
      this.id = id,
      this.nombre = nombre,
      this.apellido = apellido;
  }
}

const lector1 = new Lector(1, "Patricia", "Pantoja");
const lector2 = new Lector(2, "Nayme", "Soria");
const lector3 = new Lector(3, "Valeria", "Rocabado");
const lector4 = new Lector(4, "Anush", "Toufeksian");
const lector5 = new Lector(5, "Lucas", "Tchailakian");

const lectores = [lector1, lector2, lector3, lector4, lector5];

//spread
const lectoresSpread = [...lectores];
console.log("spread:" , lectoresSpread);

//general variables
const miDiv = document.getElementById("mensaje"); // div donde estan los botones
const miTabla = document.getElementById("tabla");// div donde se imprime la tabla de datos
const miForm = document.getElementById("formulario");
const p = document.createElement("p");
const tabla_lectores = document.getElementById("listaLectores");
const librosContainer = document.getElementById("librosContainer");

let cantidadDias = 0;

inicioApp();

function inicioApp() {

  const footer = document.getElementById("footer");
  footer.setAttribute("style", "margin-top:500px");
  const p = document.createElement("p");
  p.innerText = "Este es un sistema de administracion de lectores. Cualquier consulta comunicarse al mesadeayuda@biblioteca.com.ar "

  footer.appendChild(p);

  mostrarMenu();
}

function mostrarMenu() {

  const opciones = ["Agregar lector", "Buscar lector", "Calcular deuda", "Mostrar lista de lectores", "Eliminar lector", "Mostrar libros"];

  //Desestructuracion de array
  const [a,b,c,d,e,f ] = opciones;

  opciones.forEach((opcion) => {
    const btn = document.createElement("button");
    btn.innerText = opcion;

    switch (opcion) {
      case a: {
        btn.addEventListener("click", () => {
          miTabla.innerText = "";
          miForm.innerText = "";
          librosContainer.innerText ="";
          formAgregarLector();
        })
        break;
      }
      case b: {
        btn.addEventListener("click", () => {
          miTabla.innerText = "";
          miForm.innerText = "";
          librosContainer.innerText ="";
          buscarLector();
        },)
        break;
      }
      case c: {
        btn.addEventListener("click", () => {
          miTabla.innerText = "";
          miForm.innerText = "";
          librosContainer.innerText ="";
          calcDeuda();
          
        },)
        break;
      }
      case d: {
        btn.addEventListener("click", () => {
          miTabla.innerText = "";
          miForm.innerText = "";
          librosContainer.innerText ="";
          mostrarLista(lectores);
        }, )
        break;
      }
      case e: {
        btn.addEventListener("click", () => {
          miTabla.innerText = "";
          miForm.innerText = "";
          librosContainer.innerText ="";
          eliminarLector();
        },)
        break;
      }
      case f: {
        btn.addEventListener("click", () => {
          miTabla.innerText = "";
          miForm.innerText = "";
          cargarLibros();
        },)
        break;
      }
      default: {
        alert("Opcion Inválida");
        break;
      }
    }

    miDiv.appendChild(btn);
  })

}

function formAgregarLector() {
  let inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.placeholder = "Nombre";
  miForm.appendChild(inputNombre);

  let inputApellido = document.createElement("input");
  inputApellido.type = "text";
  inputApellido.placeholder = "Apellido";
  miForm.appendChild(inputApellido);

  const btnAceptar = document.createElement("button");
  btnAceptar.innerHTML = "Aceptar";
  btnAceptar.className = "btnAceptar";

  btnAceptar.addEventListener('click', () => {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    // valido si no estan vacios
    if (!nombre) return "empty"
    if (!apellido) return "empty"

    // creo lector y guardo state 
    let lector = new Lector(getId(), nombre, apellido);
    localStorage.setItem("lector", JSON.stringify(lector));

    // actualizo ui
    const mensaje_lector = `LECTOR AGREGADO: ${nombre} ${apellido}`;
    const item_lector = crearItemListaLector(lector)
    const tabla_lectores = document.getElementById("listaLectores");
    tabla_lectores.appendChild(item_lector);
    lectores.push(lector);

    Toastify({
      text: mensaje_lector,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      style: { background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)" },
    }).showToast();
  })

  miForm.appendChild(btnAceptar);

  console.table(lectores);

  mostrarLista(lectores);
}

function getId() {

  //Ternario
  const ultimo = lectores[lectores.length - 1];

  const tieneId = lectores.length === 0 ? true : false;

  const idFinal = tieneId === true ? 1 : ultimo.id +1;

  console.log(idFinal)
  return idFinal;

}

function eliminarLector() {

  let inputIdLector = document.createElement("input");
  inputIdLector.type = "number";
  inputIdLector.placeholder = "ID";
  miForm.appendChild(inputIdLector);

  const btnAceptar = document.createElement("button");
  btnAceptar.innerHTML = "Aceptar";
  btnAceptar.className = "btnAceptar";

  btnAceptar.addEventListener('click', () => {

    let idLector = Number(inputIdLector.value);
    console.log("INPUT VALOR: ", idLector);
    
        const esta = lectores.find((lector) => lector.id === idLector);

    if (esta) {
      console.log("objeto", esta); //devuelve en consola el objeto del lector por eliminar.
  
      const soloIds = lectores.map((lector) => lector.id); //.me devuelve el nuevo array solamente con los id
      const indice = soloIds.indexOf(idLector); //buscar el elemento dentro del array.
  
      lectores.splice(indice, 1);
  
  // actualizo ui
  const mensaje_lector = `LECTOR ELIMINADO: ${esta.nombre} ${esta.apellido}`;
  mostrarLista(lectores);

  Toastify({
    text: mensaje_lector,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
    style: { background: "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)" },
  }).showToast();
  
      console.log("LECTOR ELIMINADO:");
      console.table(lectores);
    } else {
      p.innerText = `LECTOR NO ENCONTRADO`;
      miTabla.appendChild(p);
}
  })

  miForm.appendChild(btnAceptar);
}

function buscarLector() {
  let inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.placeholder = "Ingrese nombre o apellido";
  miForm.appendChild(inputNombre);

  const btnAceptar = document.createElement("button");
  btnAceptar.innerHTML = "Aceptar";
  btnAceptar.className = "btnAceptar";
  miForm.appendChild(btnAceptar);

  btnAceptar.addEventListener('click', () => {

    let paramBusqueda = inputNombre.value;
    console.log("buscado", paramBusqueda);

    // valido si no estan vacios
    if (!paramBusqueda) return "empty"

    let encontrados = lectores.filter((lector) =>
    lector.nombre.toLowerCase().indexOf(paramBusqueda.toLocaleLowerCase()) !== -1 ||
    lector.apellido.toLowerCase().indexOf(paramBusqueda.toLocaleLowerCase()) !== -1);

  mostrarLista(encontrados);
  });

}

function calcDeuda() {

  let inputIdLector = document.createElement("input");
  inputIdLector.type = "number";
  inputIdLector.placeholder = "ID del lector";
  miForm.appendChild(inputIdLector);

  let inputDias = document.createElement("input");
  inputDias.type = "number";
  inputDias.placeholder = "Cant. de dias de prestamo";
  miForm.appendChild(inputDias);

  const btnAceptar = document.createElement("button");
  btnAceptar.innerHTML = "Aceptar";
  btnAceptar.className = "btnAceptar";
  miForm.appendChild(btnAceptar);

  btnAceptar.addEventListener('click', () => {

    let idDeudor = Number(inputIdLector.value);
    let cantidadDias = Number(inputDias.value);
    console.log("INPUT deudor: ", idDeudor);
    console.log("INPUT cant dias: ", inputDias);

    const estaLector = lectores.some((lector) => lector.id === idDeudor);

  if (estaLector) {
    if (cantidadDias > 15) {
      let deudaTotal = (cantidadDias - 15) * 20;
      Swal.fire({
        title: `¡El lector tiene una deuda!`,
        text: `Su deuda es de $ ${deudaTotal}. Recuerde que el lector solo dispone de 2 semanas de prestamo, despues se cobra una multa por dia extra.`,
        icon: "warning",
        confirmButtonText: 'Aceptar',
      })
    } else {
      Swal.fire({
        title: `¡El lector no tiene una deuda!`,
        text: `Todavia esta dentro del tiempo establecido de prestamo.`,
        icon: "success",
        confirmButtonText: 'Aceptar',
      })
    }
  }
  else {
    Swal.fire({
      title: `ERROR`,
      text: `Usuario no encontrado`,
      icon: "error",
      confirmButtonText: 'Aceptar',
  }

  )

  //let idDeudor = Number(prompt("Ingrese numero de identificacion del lector: "));

}
  })
}

function crearItemListaLector(lector) {
  const nodotr = document.createElement("tr");
  let nodotd = document.createElement("td");
  nodotd.innerHTML = `${lector.nombre}`;
  nodotr.appendChild(nodotd)

  nodotd = document.createElement("td");
  nodotd.innerHTML = `${lector.apellido}`;
  nodotr.appendChild(nodotd);

  return nodotr
}

function crearListaLectores() {
  const miLista = document.createElement("table");
  miLista.setAttribute("id", "listaLectores");

  const encabezado = document.createElement("tr");

  const thNombre = document.createElement("th");
  thNombre.innerHTML = "Nombre";
  encabezado.appendChild(thNombre);

  const thApellido = document.createElement("th");
  thApellido.innerHTML = "Apellido";
  encabezado.appendChild(thApellido);

  miLista.appendChild(encabezado)

  return miLista
}

function mostrarLista(lectores) {
  const listaLectores = crearListaLectores()
  const lectoresComponentList = lectores.map(crearItemListaLector);
  lectoresComponentList.forEach(x => listaLectores.appendChild(x))

  miTabla.appendChild(listaLectores);
}

function cargarLibros() {
  fetch('libros.json')
    .then(response => response.json())
    .then(data => showLibros(data));
  }
  
  function showLibros(libros) {
    libros.forEach((libro)=>{
      mostrarLibro(libro, librosContainer)
    })
  }
  
  function mostrarLibro(libro, div) {
    const miDivLibros = document.createElement("div");
    miDivLibros.setAttribute("id", "cards");
    miDivLibros.innerHTML=`
                   <h2 id="nombre">${libro.nombre}</h2>
                   <h3 id="autor">${libro.autor}</h3>
                   <img id="imagenes" src="${libro.imagen}">`
    librosContainer.appendChild(miDivLibros);
  }
  