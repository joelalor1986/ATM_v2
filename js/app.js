
const usuarios = [
    { usuario: 'mali', password: '12345', saldo: 250 },
    { usuario: 'pepe', password: '12345', saldo: 350 },
    { usuario: 'juan', password: '12345', saldo: 20 },
    { usuario: 'jose', password: '12345', saldo: 230 },
    { usuario: 'roman', password: '12345', saldo: 330 },
    { usuario: 'gero', password: '12345', saldo: 400 }
]
let usuarioLogueado = null;
const $ = id => document.querySelector(id);

document.addEventListener('DOMContentLoaded', function () {
    crearModal($('#frmLogin'), "Iniciar sesion", false);
    crearModal($('#mostrarSaldo'), "Tu saldo actual");
    crearModal($('#frmAgregarSaldo'), "Escribe el monto para agregar");
    crearModal($('#frmRetirarSaldo'), "Escribe el monto a retirar");
    showModal("modalfrmLogin");
    $(".navegacion").classList.add("off");
});

$('.navegacion').addEventListener('click', function (event) {
    if (event.target.id === 'btnAgregarSaldo') {
        showModal("modalfrmAgregarSaldo");
    }
    if (event.target.id === 'btnRetirar') {
        showModal("modalfrmRetirarSaldo");
    }
    if (event.target.id === 'btnSaldo') {
        showModal("modalmostrarSaldo");
        notificacion(`tu saldo actua es $${usuarioLogueado.saldo}`, "ok", $("#mostrarSaldo"), 0)
    }
})
$("#frmLogin").addEventListener('submit', function (e) {
    e.preventDefault();
    usuarioLogueado = obtenerUsuario($("#usuario").value, $("#password").value);
    if (usuarioLogueado) {
        $(".navegacion").classList.remove("off");
        $("#modalfrmLogin").classList.add("off");
        $(".saludo").innerHTML = `Bienvenido <span>${usuarioLogueado.usuario}</span> ¿que deseas hacer?`
    }
    else {
        notificacion("Credendiales incorrectas", "error", $("#frmLogin"));
    }
})

$("#frmAgregarSaldo").addEventListener('submit', function (e) {
    e.preventDefault();
    let montoAgregar = parseFloat($("#montoAgregar").value);
    if(usuarioLogueado.saldo+montoAgregar < 990){
        usuarioLogueado.saldo += montoAgregar;
        notificacion(`tu saldo actua es $${usuarioLogueado.saldo}`, "ok", $("#frmAgregarSaldo"))
    }else{
        notificacion(`No puedes agregar ese monto ya que supera el maximo permitido`, "error", $("#frmAgregarSaldo"))
    }
    
})

$("#frmRetirarSaldo").addEventListener('submit', function (e) {
    e.preventDefault();
    let montoRetirar = parseFloat($("#montoRetirar").value);
    if(usuarioLogueado.saldo - montoRetirar > 10){
        usuarioLogueado.saldo -= montoRetirar;
        notificacion(`tu saldo actua es $${usuarioLogueado.saldo}`, "ok", $("#frmRetirarSaldo"))
    }else{
        notificacion(`No puedes retirar esa cantidad el monto minimo en saldo es de $10`, "error", $("#frmRetirarSaldo"),10)
    }
    
})

function crearModal(elemento, titulo, cerrar = true) {
    let modal = document.createElement("DIV");
    let modalContenerdor = document.createElement("DIV");
    let modalTituloContenedor = document.createElement("DIV");
    let modalTituloTexto = document.createElement("DIV");
    let modalTituloCerrar = document.createElement("DIV");
    let modalCuerpo = document.createElement("DIV");

    modal.classList.add('modal');
    modal.id = "modal" + elemento.id;
    modal.classList.add('off');
    modalContenerdor.classList.add('modal__content');

    modalTituloContenedor.classList.add('modal__titulo');
    modalTituloCerrar.classList.add('cerrar');
    modalCuerpo.classList.add('modal__cuerpo');
    modalTituloTexto.textContent = titulo;
    modalTituloCerrar.textContent = "x";

    modalTituloContenedor.appendChild(modalTituloTexto);


    modalContenerdor.appendChild(modalTituloContenedor);
    modalCuerpo.appendChild(elemento);
    modalContenerdor.appendChild(modalCuerpo);

    modal.appendChild(modalContenerdor);
    $("body").appendChild(modal);
    if (cerrar) {
        modalTituloContenedor.appendChild(modalTituloCerrar);
        $("#" + modal.id + " .cerrar").addEventListener('click', function (e) {
            modal.classList.add('off');
        });
    }

}
function showModal(id) {
    let modal = $("#" + id);
    modal.classList.remove('off');
}

function notificacion(msg, tipo = "ok", elemento, tiempo = 5) {
    let notificacion = document.createElement('P');
    notificacion.classList.add('notificacion');

    if (elemento.querySelector(".notificacion")) {
        elemento.querySelector(".notificacion").remove();
    }

    if (tipo === "error") {
        notificacion.classList.add("error");
    } else {
        notificacion.classList.add("ok");
    }
    notificacion.textContent = msg;
    elemento.appendChild(notificacion);
    if (tiempo != 0) {
        setTimeout(() => {
            notificacion.remove();
        }, tiempo * 1000)
    }
}

function obtenerUsuario(nombreUsuario, pass) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === nombreUsuario && usuarios[i].password === pass)
            return usuarios[i]
    }
    return null;
}