// ======================================
// SELECCIONAR DEPORTE
// ======================================

function irDeporte(deporte) {

    window.location.href = "eventos.html?deporte=" + deporte;

}


// ======================================
// MENSAJE
// ======================================

function mostrarMensaje() {

    alert("Esta sección estará disponible próximamente.");

}


// ======================================
// API DEPORTIVA
// ======================================

const apiDeportes = {

    nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",

    nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",

    mlb: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",

    nhl: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",

    fifa: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard"

};


// ======================================
// OBTENER DEPORTE DE LA URL
// ======================================

function obtenerDeporte() {

    const parametros = new URLSearchParams(window.location.search);

    return parametros.get("deporte") || "nba";

}


// ======================================
// CARGAR EVENTOS
// ======================================

async function cargarEventos() {

    const contenedor = document.getElementById("eventos");

    if (!contenedor) {
        return;
    }

    const deporte = obtenerDeporte();

    const selector = document.getElementById("selectorDeporte");

    if (selector) {
        selector.value = deporte;
    }


    // Cambiar título

    const titulo = document.getElementById("tituloDeporte");

    if (titulo) {

        titulo.innerText =
            "Eventos de " + deporte.toUpperCase();

    }


    try {

        const respuesta =
            await fetch(apiDeportes[deporte]);

        const datos =
            await respuesta.json();


        contenedor.innerHTML = "";


        if (!datos.events || datos.events.length === 0) {

            contenedor.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        No hay eventos disponibles en este momento.
                    </div>
                </div>
            `;

            return;
        }


        datos.events.forEach(evento => {

            let nombre = evento.name;

            let fecha = evento.date
                ? new Date(evento.date).toLocaleString()
                : "Fecha no disponible";


            contenedor.innerHTML += `

                <div class="col-12 col-md-6 col-lg-4">

                    <div class="card h-100">

                        <div class="card-body">

                            <div class="text-center mb-3">

                                <i class="bi bi-trophy icono-grande"></i>

                            </div>

                            <h5 class="card-title">
                                ${nombre}
                            </h5>

                            <p class="card-text">

                                <strong>Fecha:</strong>
                                ${fecha}

                            </p>

                            <button
                                class="btn btn-primary w-100"
                                onclick="compararBoletos()">

                                Comparar boletos

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });


    } catch (error) {

        console.log(error);

        contenedor.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning text-center">

                    No se pudieron cargar los eventos.
                    Intenta nuevamente más tarde.

                </div>

            </div>

        `;

    }

}


// ======================================
// BOTÓN DE BOLETOS
// ======================================

function compararBoletos() {

    alert(
        "Aquí podrás comparar precios de boletos entre diferentes plataformas."
    );

}


// ======================================
// CAMBIAR DEPORTE
// ======================================

const selectorDeporte =
    document.getElementById("selectorDeporte");


if (selectorDeporte) {

    selectorDeporte.addEventListener("change", function () {

        const nuevoDeporte = this.value;

        window.location.href =
            "eventos.html?deporte=" + nuevoDeporte;

    });

}


// ======================================
// EJECUTAR API
// ======================================

cargarEventos();