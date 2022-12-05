//capturando elementos para preenchimento dinâmico do conteudo da modal
var modalCircuitos = document.querySelector("#modalCircuitos");
var modalCircuitosLabel = document.querySelector("#modalCircuitosLabel");
var imgCircuito = document.querySelector("#imagemCircuito");
var modalResultadoCircuitos = document.querySelector("#modalResultadoCircuitos");
var modalResultadoCircuitosLabel = document.querySelector("#modalResultadoCircuitosLabel");


//capturando inputs
var botao_calcular = document.querySelector("#btnCalcularCircuito");
var inputs = document.querySelectorAll("#modalCircuitos input");

var inputVoltagem = document.querySelector("#voltagem");
var inputFrequencia = document.querySelector("#frequencia");
var inputCapacitor = document.querySelector("#capacitor");
var inputResistencia = document.querySelector("#resistencia");

var inputN1 = document.querySelector("#N1");
var inputN2 = document.querySelector("#N2");

//capturando elementos para apresentação do resultado
var spanEficazV2 = document.querySelector("#eficazV2");
var spanPicoV2 = document.querySelector("#picoV2");
var spanPicoCapacitor = document.querySelector("#picoCapacitor");
var spanTensaoRipple = document.querySelector("#tensaoRipple");
var spanTensaoMediaCarga =document.querySelector("#tensaoMediaCarga");

function abrirModalCircuitos(circuito) {
    resetCircuitos();
    switch (circuito) {
        case 'retificadorPonte':
            modalCircuitos.setAttribute("name", "retificadorPonte");
            modalCircuitosLabel.textContent = "Circuito com Retificador em Ponte";
            imgCircuito.setAttribute("src", "img/retificador-ponte.png");
            break;
        case 'retificadorMeiaOnda':
            modalCircuitos.setAttribute("name", "retificadorMeiaOnda");
            modalCircuitosLabel.textContent = "Circuito com Retificador de Meia Onda";
            imgCircuito.setAttribute("src", "img/retificador-meia-onda.png");
            break;
        case 'centerTape':
            modalCircuitos.setAttribute("name", "centerTape");
            modalCircuitosLabel.textContent = "Circuito com Retificador de Onda Completa e Center Tape";
            imgCircuito.setAttribute("src", "img/retificador-onda-completa-center-tape.png");
            break;
    }
}

//controlando disponibilidade do botão conforme o preenchimento do formulário
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        if (inputVoltagem.value.length >= 1
            && inputFrequencia.value.length >= 1
            && inputCapacitor.value.length >= 1
            && inputResistencia.value.length >= 1
            && inputN1.value.length >= 1
            && inputN2.value.length >= 1)
            botao_calcular.disabled = false
        else
            botao_calcular.disabled = true;
    });
}

function resetCircuitos() {
    inputVoltagem.value = "";
    inputFrequencia.value = "";
    inputCapacitor.value = "";
    inputResistencia.value = "";

    inputN1.value = "";
    inputN2.value = "";

    botao_calcular.disabled = true;
}


// variáveis

var voltagem;
var frequencia;
var diodo = 0.7;
var capacitor;
var resistencia
var N1
var N2

function selecionarCircuitoCalculo() {
    return modalCircuitos.getAttribute("name");
}

function calcularCircuito() {
    voltagem = parseFloat(inputVoltagem.value);
    frequencia = parseFloat(inputFrequencia.value);
    capacitor = parseFloat(inputCapacitor.value);
    resistencia = parseFloat(inputResistencia.value);
    N1 = parseFloat(inputN1.value);
    N2 = parseFloat(inputN2.value);

    spanEficazV2.textContent = voltagemSecundario() + "v";
    spanPicoV2.textContent = picoSecundario() + "v";

    var circuitoSelecionado = selecionarCircuitoCalculo();

    switch (circuitoSelecionado) {
        case 'retificadorPonte':
            spanPicoCapacitor.textContent = picoCapacitorPonte() + "v";
            spanTensaoRipple.textContent = ripplePonte() + "v";
            spanTensaoMediaCarga.textContent = tensaoMediaPonte() + "v";
            break;
        case 'retificadorMeiaOnda':
            spanPicoCapacitor.textContent = picoCapacitorMeiaOnda() + "v";
            spanTensaoRipple.textContent = rippleMeiaOnda() + "v";
            spanTensaoMediaCarga.textContent = tensaoMediaMeiaOnda() + "v";
            break;
        case 'centerTape':
            spanPicoCapacitor.textContent = picoCapacitorCenterTape() + "v";
            spanTensaoRipple.textContent = rippleCenterTape() + "v";
            spanTensaoMediaCarga.textContent = tensaoMediaCenterTape() + "v";
            break;
    }
}

//CÁLCULOS GERAIS

function voltagemSecundario() {
    return (voltagem * N2) / N1
}

function picoSecundario() {
    return (voltagemSecundario() * Math.sqrt(2)).toFixed(2)
}

//RETIFICADOR PONTE

function picoCapacitorPonte() {
    return picoSecundario() - (2 * diodo)
}

function ripplePonte() {
    return ((picoCapacitorPonte() / resistencia) / ((capacitor * 0.000001) * 2 * frequencia)).toFixed(2)
}
function tensaoMediaPonte() {
    return ((picoCapacitorPonte() + (picoCapacitorPonte() - ripplePonte())) / 2).toFixed(2)
}

//RETIFICADOR MEIA ONDA

function picoCapacitorMeiaOnda() {
    return picoSecundario() - diodo
}
function rippleMeiaOnda() {
    return ((picoCapacitorMeiaOnda() / resistencia) / ((capacitor * 0.000001) * frequencia)).toFixed(2)
}
function tensaoMediaMeiaOnda() {
    return ((picoCapacitorMeiaOnda() + (picoCapacitorMeiaOnda() - rippleMeiaOnda())) / 2).toFixed(2)
}

//CENTER TAPE
function picoCapacitorCenterTape() {
    return (picoSecundario() / 2) - diodo.toFixed(2)
}

function rippleCenterTape() {
    return ((picoCapacitorCenterTape() / resistencia) / ((capacitor * 0.000001) * 2 * frequencia)).toFixed(2)
}
function tensaoMediaCenterTape() {
    return ((picoCapacitorCenterTape() + (picoCapacitorCenterTape() - rippleCenterTape())) / 2).toFixed(2)
}