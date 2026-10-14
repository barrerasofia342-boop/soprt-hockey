/* ========================================

   PRODUCTOS

======================================== */

const productos = [

    {

        id: 1,

        nombre: "Paleta Osaka Pro",

        categoria: "Palos",

        precio: 145000,

        emoji: "🏑",

        oferta: true

    },

    {

        id: 2,

        nombre: "Paleta Control 95",

        categoria: "Palos",

        precio: 98000,

        emoji: "🏑",

        oferta: false

    },

    {

        id: 3,

        nombre: "Remera Sport Hockey",

        categoria: "Indumentaria",

        precio: 32000,

        emoji: "👕",

        oferta: true

    },

    {

        id: 4,

        nombre: "Pollera Hockey Pro",

        categoria: "Indumentaria",

        precio: 28000,

        emoji: "🩳",

        oferta: false

    },

    {

        id: 5,

        nombre: "Zapatillas Hockey Speed",

        categoria: "Calzado",

        precio: 125000,

        emoji: "👟",

        oferta: false

    },

    {

        id: 6,

        nombre: "Zapatillas Turf Pro",

        categoria: "Calzado",

        precio: 109000,

        emoji: "👟",

        oferta: true

    },

    {

        id: 7,

        nombre: "Canilleras Elite",

        categoria: "Protecciones",

        precio: 24000,

        emoji: "🛡️",

        oferta: false

    },

    {

        id: 8,

        nombre: "Guantes Hockey Grip",

        categoria: "Protecciones",

        precio: 21000,

        emoji: "🧤",

        oferta: false

    },

    {

        id: 9,

        nombre: "Mochila Hockey Team",

        categoria: "Accesorios",

        precio: 55000,

        emoji: "🎒",

        oferta: true

    },

    {

        id: 10,

        nombre: "Pelota Hockey Match",

        categoria: "Accesorios",

        precio: 15000,

        emoji: "⚪",

        oferta: false

    },

    {

        id: 11,

        nombre: "Kit Arquera Completo",

        categoria: "Arqueros",

        precio: 380000,

        emoji: "🥅",

        oferta: true

    },

    {

        id: 12,

        nombre: "Protector Bucal",

        categoria: "Protecciones",

        precio: 12000,

        emoji: "😁",

        oferta: false

    }

];

/* ========================================

   VARIABLES

======================================== */

let carrito = [];

const grid =

    document.getElementById("productsGrid");

const cartCount =

    document.getElementById("cartCount");

const cartItems =

    document.getElementById("cartItems");

const cartTotal =

    document.getElementById("cartTotal");

const cartOverlay =

    document.getElementById("cartOverlay");

/* ========================================

   FORMATO DE DINERO

======================================== */

function dinero(numero) {

    return "$" +

        numero.toLocaleString("es-AR");

}

/* ========================================

   MOSTRAR PRODUCTOS

======================================== */

function mostrarProductos(lista = productos) {

    grid.innerHTML = "";

    if (lista.length === 0) {

        grid.innerHTML = `

            <p style="

                grid-column: 1 / -1;

                text-align: center;

                padding: 50px;

            ">

                No encontramos productos.

            </p>

        `;

        return;

    }

    lista.forEach(producto => {

        const tarjeta =

            document.createElement("article");

        tarjeta.className = "product";

        tarjeta.innerHTML = `

            ${

                producto.oferta

                ? '<span class="badge">OFERTA</span>'

                : ''

            }

            <div class="product-image">

                <span class="emoji">

                    ${producto.emoji}

                </span>

            </div>

            <div class="product-info">

                <span class="category">

                    ${producto.categoria}

                </span>

                <h3>

                    ${producto.nombre}

                </h3>

                <div class="price">

                    ${dinero(producto.precio)}

                </div>

                <button

                    class="add"

                    data-id="${producto.id}">

                    AGREGAR AL CARRITO

                </button>

            </div>

        `;

        grid.appendChild(tarjeta);

    });

    /* Botones de agregar */

    document

        .querySelectorAll(".add")

        .forEach(boton => {

            boton.addEventListener(

                "click",

                () => {

                    agregarAlCarrito(

                        Number(boton.dataset.id)

                    );

                }

            );

        });

}

/* ========================================

   AGREGAR AL CARRITO

======================================== */

function agregarAlCarrito(id) {

    const producto =

        productos.find(

            producto => producto.id === id

        );

    if (!producto) {

        return;

    }

    carrito.push(producto);

    actualizarCarrito();

    cartOverlay.classList.add("open");

}

/* ========================================

   ACTUALIZAR CARRITO

======================================== */

function actualizarCarrito() {

    cartCount.textContent =

        carrito.length;

    if (carrito.length === 0) {

        cartItems.innerHTML = `

            <p class="empty">

                Tu carrito está vacío 🛒

            </p>

        `;

        cartTotal.textContent = "$0";

        return;

    }

    cartItems.innerHTML = "";

    carrito.forEach(

        (producto, indice) => {

            const item =

                document.createElement("div");

            item.className =

                "cart-item";

            item.innerHTML = `

                <div class="mini">

                    ${producto.emoji}

                </div>

                <div class="cart-item-info">

                    <h4>

                        ${producto.nombre}

                    </h4>

                    <strong>

                        ${dinero(producto.precio)}

                    </strong>

                </div>

                <button

                    class="remove"

                    data-index="${indice}">

                    ✕

                </button>

            `;

            cartItems.appendChild(item);

        }

    );

    const total =

        carrito.reduce(

            (suma, producto) =>

                suma + producto.precio,

            0

        );

    cartTotal.textContent =

        dinero(total);

    /* Eliminar productos */

    document

        .querySelectorAll(".remove")

        .forEach(boton => {

            boton.addEventListener(

                "click",

                () => {

                    carrito.splice(

                        Number(boton.dataset.index),

                        1

                    );

                    actualizarCarrito();

                }

            );

        });

}

/* ========================================

   FILTRAR PRODUCTOS

======================================== */

function filtrarCategoria(categoria) {

    document

        .querySelectorAll(".filter")

        .forEach(boton => {

            boton.classList.toggle(

                "active",

                boton.dataset.filter === categoria

            );

        });

    if (categoria === "Todos") {

        mostrarProductos(productos);

    } else {

        const filtrados =

            productos.filter(

                producto =>

                    producto.categoria === categoria

            );

        mostrarProductos(filtrados);

    }

    document

        .getElementById("productos")

        .scrollIntoView({

            behavior: "smooth"

        });

}

/* ========================================

   BOTONES DE FILTRO

======================================== */

document

    .querySelectorAll(".filter")

    .forEach(boton => {

        boton.addEventListener(

            "click",

            () => {

                filtrarCategoria(

                    boton.dataset.filter

                );

            }

        );

    });

/* ========================================

   BOTONES DE CATEGORÍAS

======================================== */

document

    .querySelectorAll(".categories button")

    .forEach(boton => {

        boton.addEventListener(

            "click",

            () => {

                filtrarCategoria(

                    boton.dataset.category

                );

            }

        );

    });

/* ========================================

   BUSCADOR

======================================== */

function buscarProductos() {

    const texto =

        document

            .getElementById("searchInput")

            .value

            .toLowerCase()

            .trim();

    const resultados =

        productos.filter(producto =>

            producto.nombre

                .toLowerCase()

                .includes(texto)

            ||

            producto.categoria

                .toLowerCase()

                .includes(texto)

        );

    mostrarProductos(resultados);

    document

        .getElementById("productos")

        .scrollIntoView({

            behavior: "smooth"

        });

}

/* BOTÓN BUSCAR */

document

    .getElementById("searchButton")

    .addEventListener(

        "click",

        buscarProductos

    );

/* ENTER EN BUSCADOR */

document

    .getElementById("searchInput")

    .addEventListener(

        "keydown",

        event => {

            if (event.key === "Enter") {

                buscarProductos();

            }

        }

    );

/* ========================================

   BOTÓN OFERTAS

======================================== */

document

    .getElementById("offersButton")

    .addEventListener(

        "click",

        () => {

            const ofertas =

                productos.filter(

                    producto =>

                        producto.oferta === true

                );

            mostrarProductos(ofertas);

            document

                .getElementById("productos")

                .scrollIntoView({

                    behavior: "smooth"

                });

        }

    );

/* ========================================

   ABRIR CARRITO

======================================== */

document

    .getElementById("openCart")

    .addEventListener(

        "click",

        () => {

            cartOverlay.classList.add("open");

        }

    );

/* ========================================

   CERRAR CARRITO

======================================== */

document

    .getElementById("closeCart")

    .addEventListener(

        "click",

        () => {

            cartOverlay.classList.remove("open");

        }

    );

/* Cerrar haciendo clic afuera */

cartOverlay.addEventListener(

    "click",

    event => {

        if (event.target === cartOverlay) {

            cartOverlay.classList.remove("open");

        }

    }

);

/* ========================================

   FINALIZAR COMPRA

======================================== */

document

    .getElementById("checkoutButton")

    .addEventListener(

        "click",

        () => {

            if (carrito.length === 0) {

                alert(

                    "Tu carrito está vacío."

                );

                return;

            }

            alert(

                "¡Gracias por elegir Sport Hockey! 🏑\n\n" +

                "Tu pedido fue preparado correctamente."

            );

        }

    );

/* ========================================

   INICIAR PÁGINA

======================================== */

mostrarProductos();

actualizarCarrito();