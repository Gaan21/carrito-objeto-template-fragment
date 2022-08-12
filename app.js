const carrito = document.querySelector("#carrito")
const plantilla = document.querySelector("#plantilla")
const fragment = document.createDocumentFragment()

//SELECIONAMOS TODOS LOS BOTONES DE LAS TARJETAS
const botones = document.querySelectorAll(".card .btn-outline-primary")

//DONDE VAMOS A ALMACENAR LOS OBJETOS QUE ENTREN AL CARRITO
const carritoObjeto = {}


//FUNCION PARA AGREGAR ELEMENTOS AL CARRITO. E: ES EL EVENTO CLICK DE LA FUNCION DE MAS ABAJO EN ESTE CASO
const agregarCarrito = (e) => {

    //CON LA INFORMACION QUE VIENE DEL OBJETO AL QUE LE HACEMOS CLICK CONSTRUYO UN OBJETO
    const producto = {
        titulo: e.target.dataset.fruta,//TARGET.DATASET.FRUTA ES PARA ACCEDER A LO QUE HAY EN DATA-FRUTA EN HTML
        id: e.target.dataset.fruta,
        cantidad: 1
    }

    //AÑADIMOS 1 A LA CANTIDAD ANTERIOR SI YA EXISTE EL PRODUCTO EN EL CARRITO ¿?¿DESESTRUCTURACION DE OBJETOS¿¿
    if (carritoObjeto.hasOwnProperty(producto.id)) {
       producto.cantidad = carritoObjeto[producto.id].cantidad + 1
    }

//LLEVAMOS EL OBJETO PRODUCTO Y SUS PROPIEDADES AL CARRITOOBJETO y le damos el nombre del id de cada objeto
    carritoObjeto[producto.id] = producto
    
    mostrarCarrito(producto)
}


//PARA MOSTRAR EL CONTENIDO DEL CARRITO EN EL HTML. RECIBIMOS UN OBJETO PRODUCTO Y YA HACEMOS COSAS CON EL
const mostrarCarrito = (producto) => {

    //PARA QUE NO SE REPITA TODO EL CARRITO DE NUEVO AL PULSAR OTRO BOTON INICIALIZAMOS CON STRING VACIO
    carrito.textContent = ""; 

    //TRANSFORMAMOS EL OBJETO EN UN ARRAY PARA PODER RECORRERLO CON EL FOREACH
    Object.values(carritoObjeto).forEach( (item) =>{

    //CLONAMOS EL TEMPLATE Y COMO TIENE EVENTO PONEMOS EL FIRSTELEMENT PARA EVITAR PROBLEMAS
    const clone = plantilla.content.firstElementChild.cloneNode(true)
    clone.querySelector(".lead").textContent = item.id
    clone.querySelector("#numero").textContent = item.cantidad

    //EVITAR REFLOW
    fragment.appendChild(clone)
    carrito.appendChild(fragment)
    });
}


//POR CADA ELEMENTO DE LA LISTA QUE DEVUELVE BOTONES LE AGREGAMOS A CADA UNO LO SIGUIENTE:
botones.forEach( boton => {
    boton.addEventListener("click",agregarCarrito)
});








