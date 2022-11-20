// variáveis

let voltagem1;
let frequencia1;
let diodo;

// cálculos gerais

function voltagemSecundario() {
    return Math.round((voltagem1 * N2) / N1, 2)
}

function pico() {
    return Math.round(voltagemSecundario() * (Math.sqrt(2)), 2)
}


//Circuito com retificador em ponte

let capacitor = parseFloat(0.0001)
let resistencia = parseFloat(1000)
let N1 = parseFloat(1000)
let N2 = parseFloat(200)


function VRLP() {
    return Math.round(pico() - (2 * diodos), 2)
}
function corrente() {
    return Math.round(VRLP() / resistencia, 2)
}
function ripple() {
    return Math.round(corrente() / (capacitor * (2 * frequencia1)), 2)
}
function tensaoMedia() {
    return Math.round((VRLP() - ripple()), 2)
}
function eficaz() {
    return Math.round(VRLP() / Math.sqrt(2), 2)
}

console.log("Tensão eficaz no V2 = ", voltagemSecundario())
console.log("Tensão de pico do V2 = ", vp())
console.log("Tensão de pico na carga = ", VRLP())
console.log("Tensão média na carga = ", tensaoMedia())
console.log("Tensão eficaz na carga = ", eficaz())
console.log("Tensão de pico no capacitor = ", VRLP())
console.log("Corrente = ", corrente())
console.log("Tensão de Ripple = ", ripple())

function RetificadorEmPonte(){
    //jquery atribuindo todos os retornos em cada span
}

//Circuito com retificador de meia onda

function VPR() {
    return Math.round(pico() - diodo, 2)
}
function VRm() {
    return Math.round(VPR() * 0.318, 2)
}
function VRe() {
    return Math.round(VPR() / (Math.sqrt(2)), 2)
}

console.log("Tensão eficaz no V2 = ", voltSecudario())
console.log("Tensão de pico no secundário = ", pico())
console.log("Tensão de pico no resistor = ", VPR())
console.log("Tensão méida no resistor = ", VRm())
console.log("Tensão eficaz no resistor = ", VRe())

function RetificadorMeiaOnda(){
    //jquery atribuindo os retornos em cada span
}

//Sistema com 6 resistores

let R1 = 30
let R2 = 20
let R3 = 25
let R4 = 50
let R5 = 10
let R6 = 40
let volt1 = 200
let volt2 = 50

//array para os cálculos
let soma_equacoes = []

//todas as variáveis envolvidas na primeira equação do sistema
// 1 - todas que multiplicam i1
let malha_um_i1 = R2 + R1 + R5 + R6
// 2 - todos que multiplicam i2
let malha_um_i2 = R6
//junção da parte 1 e parte 2 da equação 1 + a voltagem envolvida (volt1)
let equacao_i1 = [malha_um_i1, malha_um_i2, voltagem1]
// 1 - todas que multiplicam i1 
let malha_dois_i1 = R6
// 2 - todos que multiplicam i2
let malha_dois_i2 = R4 + R6 + R3

//junção da parte 1 e parte 2 da equação 2 + a voltagem envolvida (volt1)
let equacao_i2 = [malha_dois_i1, malha_dois_i2, voltagem2]


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
    //for i, termo in enumerate(equacao_i2):
    //equacao_i2[i] = termo * t2m1 //multiplicando a equação 2 pelo segundo termo da equação 1

    for (let i = 0; i < equacao_i1.length; i++) {
        let soma = equacao_i1[i] + equacao_i2[i]        
        soma_equacoes.push(soma)
    }
    //for i, termo in enumerate(equacao_i1):
    //soma = equacao_i1[i] + equacao_i2[i]
    //soma_equacoes.insert(len(soma_equacoes), soma)

    return soma_equacoes[2] / soma_equacoes[0] //resultado de i1 após o corte de i2
}

function calcular_i2(i1) { //aplicando o resultado de i1 para descobrir i2
    return ((equacao_i1[2] - (equacao_i1[0] * i1)) / equacao_i1[1])
}

let i1 = calcular_i1().toFixed(2)
let i2 = calcular_i2(i1).toFixed(2)
let i3 = (i1 + i2).toFixed(2)


//apresentação do resultado das correntes
console.log("i1 = ", i1.toFixed(2), "A")
console.log("i2 = ", i2.toFixed(2), "A")
console.log("i3 = ", (i1 + i2).toFixed(2), "A")

//corrente em cada resistor
console.log("Corrente no R1 = ", i1.toFixed(2), "A")
console.log("Corrente no R2 = ", i1.toFixed(2), "A")
console.log("Corrente no R3 = ", i2.toFixed(2), "A")
console.log("Corrente no R4 = ", i2.toFixed(2), "A")
console.log("Corrente no R5 = ", i1.toFixed(2), "A")
console.log("Corrente no R6 = ", i3.toFixed(2), "A")

// potência em cada resistor
// P = U.I^2
console.log("Potência no R1 = ", (R1 * (i1 * i1), "J"))
console.log("Potência no R2 = ", (R2 * (i1 * i1)).toFixed(2), "J")
console.log("Potência no R3 = ", (R3 * (i2 * i2)).toFixed(2), "J")
console.log("Potência no R4 = ", (R4 * (i2 * i2)).toFixed(2), "J")
console.log("Potência no R5 = ", (R5 * (i1 * i1)).toFixed(2), "J")
console.log("Potência no R6 = ", (R6 * ((i1 + i2) * (i1 + i2))).toFixed(2), "J")

// potência nos geradores
// P = U*I^2 ???? (necessário confirmar)
console.log("")
console.log("Potência no gerador 1 = ", (volt1 * (i1 * i1)).toFixed(2), "J")
console.log("Potência no gerador 2 = ", (volt2 * (i2 * i2)).toFixed(2), "J")