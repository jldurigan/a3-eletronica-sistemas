var selectCalculo = document.getElementById("selectCalculo");
var imgRetificadorPonte = document.getElementById("imgPonte");
var imgRetificadorMeiaOnda = document.getElementById("imgMeiaOnda");
var imgRetificadorOndaCompleta = document.getElementById("imgOndaCompleta");
var imgRetificadorSeisResistores = document.getElementById("imgSeisResistores");
var divPortaLogica = document.getElementById("divPortaLogica")

selectCalculo.addEventListener("change", function () {
    var calculo = this.options[this.selectedIndex].value;
    if (calculo == "RetificadorPonte") {
        imgRetificadorMeiaOnda.style.display = "none";
        imgRetificadorOndaCompleta.style.display = "none";
        imgRetificadorSeisResistores.style.display = "none";
    }
})

// variáveis

let voltagem1;
let frequencia1;
let diodo = 0.7;
let capacitor;
let resistencia
let N1
let N2

let R1 = 10
let R2 = 40
let R3 = 20
let R4 = 30
let R5 = 50
let R6 = 25
let volt1 = 200
let volt2 = 50

selectCalculo.addEventListener("change", function () {
    divPortaLogica.className = this.options[this.selectedIndex].value;

    if (divPortaLogica.className == "portaNot") {


    }
    if (divPortaLogica.className == "portaAnd") {

    }
    if (divPortaLogica.className == "portaNand") {

    }
    if (divPortaLogica.className == "portaOr") {

    }
    if (divPortaLogica.className == "portaNor") {

    }
    if (divPortaLogica.className == "portaXor") {

    }
    if (divPortaLogica.className == "portaNxor") {
    
    }
    if (divPortaLogica.className == "default") {

    }
});



// cálculos gerais

function voltagemSecundario() {
    return (voltagem1 * N2) / N1
}

function picoSecundario() {
    return (voltagemSecundario()*Math.sqrt(2)).toFixed(2)
}



//Circuito com retificador em ponte


function picoCapacitorPonte(){
    return picoSecundario()-(2*diodo)
}

function ripplePonte() {
    return ((picoCapacitorPonte()/resistencia) / (capacitor * 2 * frequencia1)).toFixed(2)
}
function tensaoMediaPonte() {
    return ((picoCapacitorPonte()+(picoCapacitorPonte()-ripplePonte()))/2).toFixed(2)
}


console.log("Tensão eficaz no V2 = ", voltagemSecundario()+"v")
console.log("Tensão de pico do V2 = ", picoSecundario()+"v")
console.log("Tensão de pico no capacitor = ", picoCapacitorPonte()+"v")
console.log("Tensão de Ripple = ", ripplePonte()+"v")
console.log("Tensão média na carga = ", tensaoMediaPonte()+"v")

function RetificadorEmPonte(){
    //jquery atribuindo todos os retornos em cada span
}


//Circuito com retificador de meia onda

function picoCapacitorMeiaOnda() {
    return picoSecundario() - diodo
}
function rippleMeiaOnda() {
    return ((picoCapacitorMeiaOnda()/resistencia) / (capacitor * frequencia1)).toFixed(2)
}
function tensaoMediaMeiaOnda() {
    return ((picoCapacitorMeiaOnda()+(picoCapacitorMeiaOnda()-rippleMeiaOnda()))/2).toFixed(2)
}

console.log("Tensão eficaz no V2 = ", voltagemSecundario()+"v")
console.log("Tensão de pico do V2 = ", picoSecundario()+"v")
console.log("Tensão de pico no capacitor = ", picoCapacitorMeiaOnda()+"v")
console.log("Tensão de Ripple = ", rippleMeiaOnda()+"v")
console.log("Tensão média na carga = ", tensaoMediaMeiaOnda()+"v")

function RetificadorMeiaOnda(){
    //jquery atribuindo os retornos em cada span
}

//CENTER TAPE
function picoCapacitorCenterTape(){
    return (picoSecundario()/2)-diodo.toFixed(2)
}

function rippleCenterTape() {
    return ((picoCapacitorCenterTape()/resistencia) / (capacitor * 2 * frequencia1)).toFixed(2)
}
function tensaoMediaCenterTape() {
    return ((picoCapacitorCenterTape()+(picoCapacitorCenterTape()-rippleCenterTape()))/2).toFixed(2)
}


console.log("Tensão eficaz no V2 = ", voltagemSecundario()+"v")
console.log("Tensão de pico do V2 = ", picoSecundario()+"v")
console.log("Tensão de pico no capacitor = ", picoCapacitorCenterTape()+"v")
console.log("Tensão de Ripple = ", rippleCenterTape()+"v")
console.log("Tensão média na carga = ", tensaoMediaCenterTape()+"v")

//Sistema com 6 resistores

//array para os cálculos
let soma_equacoes = []

//todas as variáveis envolvidas na primeira equação do sistema
// 1 - todas que multiplicam i1
let malha_um_i1 = R1 + R4 + R3 + R2
// 2 - todos que multiplicam i2
let malha_um_i2 = R2
//junção da parte 1 e parte 2 da equação 1 + a voltagem envolvida (volt1)
let equacao_i1 = [malha_um_i1, malha_um_i2, volt1]
// 1 - todas que multiplicam i1 
let malha_dois_i1 = R2
// 2 - todos que multiplicam i2
let malha_dois_i2 = R5 + R6 + R2

//junção da parte 1 e parte 2 da equação 2 + a voltagem envolvida (volt1)
let equacao_i2 = [malha_dois_i1, malha_dois_i2, volt2]


function calcular_i1() { //calculando i1
    let t2m1 = -equacao_i1[1] //  -1x --> como i3 é i2 + i2 é necessário deixar um negativo
    let t2m2 = equacao_i2[1]


    for (let i = 0; i < equacao_i1.length; i++) {
        equacao_i1[i] = equacao_i1[i] * t2m2
    }
    //for i, termo in enumerate(equacao_i1): //multiplicando a equação 1 pelo segundo termo da equeação dois
    //equacao_i1[i] = termo * t2m2

    for (let i = 0; i < equacao_i2.length; i++) {
        equacao_i2[i] = equacao_i2[i] * t2m1
    }
    //equacao_i2[i] = termo * t2m1 //multiplicando a equação 2 pelo segundo termo da equação 1

    for (let i = 0; i < equacao_i1.length; i++) {
        let soma = equacao_i1[i] + equacao_i2[i]        
        soma_equacoes.push(soma)
    }

    return soma_equacoes[2] / soma_equacoes[0] //resultado de i1 após o corte de i2
}

function calcular_i2(i1) { //aplicando o resultado de i1 para descobrir i2
    return ((equacao_i1[2] - (equacao_i1[0] * i1)) / equacao_i1[1])
}

let i1 = calcular_i1()
let i2 = calcular_i2(i1)
let i3 = (i1 + i2)


//apresentação do resultado das correntes
console.log("i1 = ", i1.toFixed(2)+ "A")
console.log("i2 = ", i2.toFixed(2)+ "A")
console.log("i3 = ", i3.toFixed(2)+ "A")

//corrente em cada resistor
console.log("Corrente no R1 = ", i1.toFixed(2)+ "A")
console.log("Corrente no R2 = ", i3.toFixed(2)+ "A")
console.log("Corrente no R3 = ", i1.toFixed(2)+ "A")
console.log("Corrente no R4 = ", i1.toFixed(2)+ "A")
console.log("Corrente no R5 = ", i2.toFixed(2)+ "A")
console.log("Corrente no R6 = ", i2.toFixed(2)+ "A")

// potência em cada resistor
// P = U.I^2
console.log("Potência no R1 = ", (R1 * (i1 * i1)).toFixed(2)+"W")
console.log("Potência no R2 = ", (R2 * (i3 * i3)).toFixed(2)+"W")
console.log("Potência no R3 = ", (R3 * (i1 * i1)).toFixed(2)+"W")
console.log("Potência no R4 = ", (R4 * (i1 * i1)).toFixed(2)+"W")
console.log("Potência no R5 = ", (R5 * (i2 * i2)).toFixed(2)+"W")
console.log("Potência no R6 = ", (R6 * (i2 * i2)).toFixed(2)+"W")

// potência nos geradores
// P = U*I
console.log("")
console.log("Potência no gerador 1 = ", (volt1 * (i1 * i1)).toFixed(2)+"W")
console.log("Potência no gerador 2 = ", (volt2 * (i2 * i2)).toFixed(2)+"W")