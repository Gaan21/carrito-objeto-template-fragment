const carrito = document.querySelector("#carrito")
const plantilla = document.querySelector("#plantilla")
const fragment = document.createDocumentFragment()

//SELECIONAMOS TODOS LOS BOTONES DE LAS TARJETAS
const botones = document.querySelectorAll(".card .btn-outline-primary")

//DONDE VAMOS A ALMACENAR LOS OBJETOS QUE ENTREN AL CARRITO
const carritoObjeto = []


//FUNCION PARA AGREGAR ELEMENTOS AL CARRITO. E: ES EL EVENTO CLICK DE LA FUNCION DE MAS ABAJO EN ESTE CASO
const agregarCarrito = (evento) => {
    
    //CON LA INFORMACION QUE VIENE DEL OBJETO AL QUE LE HACEMOS CLICK CONSTRUYO UN OBJETO
    const producto = {
        titulo: evento.target.dataset.fruta,//TARGET.DATASET.FRUTA ES PARA ACCEDER A LO QUE HAY EN DATA-FRUTA EN HTML
        id: evento.target.dataset.fruta,
        cantidad: 1
    }
    
    const index = carritoObjeto.findIndex( (item) => {
        return item.id === producto.id      //SI NO SE CUMPLE DEVUELVE -1 Y SI SE CUMPLE DEVUELVE LA POSICION
    })
    
    if (index === -1) {     //SI EL ARRAY ESTA VACIO DEVUELVE -1 Y CREAMOS UN NUEVO ELEMENTO
        carritoObjeto.push(producto)

    } else {                //SI YA EXISTE EL ELEMENTO SUMAMOS 1 A LA CANTIDAD
        carritoObjeto[index].cantidad ++
    }
    
    //PASAMOS EL CARRITOOBJETO COMO PARAMETRO PARA PODER TENER EL BOTON DE AGREGAR Y DISMINUIR
    mostrarCarrito(carritoObjeto)
}


//PARA MOSTRAR EL CONTENIDO DEL CARRITO EN EL HTML. RECIBIMOS UN OBJETO PRODUCTO Y YA HACEMOS COSAS CON EL
const mostrarCarrito = (paramArray) => {

    //PARA QUE NO SE REPITA TODO EL CARRITO DE NUEVO AL PULSAR OTRO BOTON INICIALIZAMOS CON STRING VACIO
    carrito.textContent = ""; 

    //RECORREMOS EL ARRAY CON FOREACH
    paramArray.forEach( (item) =>{

    //CLONAMOS EL TEMPLATE Y COMO TIENE EVENTO PONEMOS EL FIRSTELEMENTCHILD PARA EVITAR PROBLEMAS
    const clone = plantilla.content.firstElementChild.cloneNode(true)
    clone.querySelector(".lead").textContent = item.id
    clone.querySelector("#numero").textContent = item.cantidad

    //EVITAR REFLOW
    fragment.appendChild(clone)
    });
    
    carrito.appendChild(fragment)
};


//POR CADA ELEMENTO DE LA LISTA QUE DEVUELVE BOTONES LE AGREGAMOS A CADA UNO LO SIGUIENTE:
botones.forEach( boton => {
    boton.addEventListener("click",agregarCarrito)
});




