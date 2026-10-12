const pantalla = document.getElementById('pantalla');
let operacion = '';

function agregar(valor) {
    if (pantalla.value === 'Error') {
        operacion = '';
        pantalla.value = '';
    }

    operacion += valor;
    pantalla.value = operacion;
}

function borrar() {
    operacion = '';
    pantalla.value = '';
}

function calcular() {
    try {
        const resultado = Function('"use strict"; return (' + operacion + ')')();

        if (!Number.isFinite(resultado)) {
            throw new Error('Resultado no válido');
        }

        operacion = String(resultado);
        pantalla.value = operacion;
    } catch {
        operacion = '';
        pantalla.value = 'Error';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('button');

    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const valor = boton.dataset.value;

            if (valor === 'C') {
                borrar();
                return;
            }

            if (valor === '=') {
                calcular();
                return;
            }

            agregar(valor);
        });
    });
});