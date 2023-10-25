const carrito = document.querySelector("#carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const contenidoCarrito = document.querySelector("#lista-carrito tbody")
const listaCursos = document.querySelector("#lista-cursos")

let articulosCarrito = []

cargarEventListeners()

function cargarEventListeners() {
    document.addEventListener("DOMContentLoaded", recuperarCursos)
    listaCursos.addEventListener("click", añadirCurso)
    carrito.addEventListener("click", eliminarCurso)
    vaciarCarrito.addEventListener("click", eliminarCarrito)
}

function recuperarCursos() {
    //Si se borra el almacenamiento interno, o nunca ha existido un almacenamiento interno, dará error por ser null
    if (localStorage.getItem("Carrito") === null) {
        localStorage.setItem("Carrito", "")
    }
    else {
        articulosCarrito = JSON.parse(localStorage.getItem("Carrito"))
    }
    carritoHTML()
}

function eliminarCarrito() {
    articulosCarrito = []
    localStorage.setItem("Carrito", JSON.stringify(articulosCarrito))
    limpiarHTML()
}

function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id")
        articulosCarrito = articulosCarrito.filter((curso) => 
            curso.id !== cursoId
        ) //Filtra para devolver solamente los cursos que no son el que se ha borrado
        localStorage.setItem("Carrito", JSON.stringify(articulosCarrito))
        carritoHTML()
    }
}

function añadirCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement
        console.log(curso)
        leerDatosCurso(curso)
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    const existeCurso = articulosCarrito.some((curso)=>curso.id === infoCurso.id) //Recorre el array buscando si el ID del curso seleccionado existe
    if (existeCurso) {
        const cursos = articulosCarrito.map((curso) => { 
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                localStorage.setItem("Carrito", JSON.stringify(articulosCarrito))
                return curso
            }
            else {
                return curso
            }
        })
    }
    else {
        articulosCarrito = [...articulosCarrito, infoCurso]
        localStorage.setItem("Carrito", JSON.stringify(articulosCarrito))
    }
    
    carritoHTML(articulosCarrito)
}

function carritoHTML() {
    limpiarHTML()
    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td><img src = ${curso.imagen} width=200px height=100px></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `
        contenidoCarrito.appendChild(row)
    })
}

function limpiarHTML() {
    contenidoCarrito.innerHTML = ""
}