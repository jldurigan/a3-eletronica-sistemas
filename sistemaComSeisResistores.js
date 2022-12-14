//capturando elementos necessario para a função
var botao_calcular_resistores = document.body.querySelector("#btnCalcularSeisResistores");
var inputsResistores = document.querySelectorAll("#modalSeisResistores input");

var inputR1 = document.getElementById("resistor1");
var inputR2 = document.getElementById("resistor2");
var inputR3 = document.getElementById("resistor3");
var inputR4 = document.getElementById("resistor4");
var inputR5 = document.getElementById("resistor5");
var inputR6 = document.getElementById("resistor6");

var inputV1 = document.getElementById("voltagem1");
var inputV2 = document.getElementById("voltagem2");

//capturando elementos para apresentação do resultado
var spanCorrenteI1 = document.getElementById("correnteI1");
var spanCorrenteI2 = document.getElementById("correnteI2");
var spanCorrenteI3 = document.getElementById("correnteI3");

var spanCorrenteR1 = document.getElementById("correnteR1");
var spanCorrenteR2 = document.getElementById("correnteR2");
var spanCorrenteR3 = document.getElementById("correnteR3");
var spanCorrenteR4 = document.getElementById("correnteR4");
var spanCorrenteR5 = document.getElementById("correnteR5");
var spanCorrenteR6 = document.getElementById("correnteR6");

var spanPotenciaR1 = document.getElementById("potenciaR1");
var spanPotenciaR2 = document.getElementById("potenciaR2");
var spanPotenciaR3 = document.getElementById("potenciaR3");
var spanPotenciaR4 = document.getElementById("potenciaR4");
var spanPotenciaR5 = document.getElementById("potenciaR5");
var spanPotenciaR6 = document.getElementById("potenciaR6");

var spanPotenciaGerador1 = document.getElementById("potenciaGerador1");
var spanPotenciaGerador2 = document.getElementById("potenciaGerador2");

//controlando disponibilidade do botão conforme o preenchimento do formulário
for (var i = 0; i < inputsResistores.length; i++) {
    inputsResistores[i].addEventListener("input", function () {
        if (inputR1.value.length >= 1
            && inputR2.value.length >= 1
            && inputR3.value.length >= 1
            && inputR4.value.length >= 1
            && inputR5.value.length >= 1
            && inputR6.value.length >= 1
            && inputV1.value.length >= 1
            && inputV2.value.length >= 1)
            botao_calcular_resistores.disabled = false
        else
            botao_calcular_resistores.disabled = true;
    });
}

function resetSeisResistores() {
    inputR1.value = "";
    inputR2.value = "";
    inputR3.value = "";
    inputR4.value = "";
    inputR5.value = "";
    inputR6.value = "";

    inputV1.value = "";
    inputV2.value = "";

    botao_calcular_resistores.disabled = true;
}

//Sistema com 6 resistores
function calcularSeisResistores() {
    let R1 = parseFloat(inputR1.value);
    let R2 = parseFloat(inputR2.value);
    let R3 = parseFloat(inputR3.value);
    let R4 = parseFloat(inputR4.value);
    let R5 = parseFloat(inputR5.value);
    let R6 = parseFloat(inputR6.value);

    let volt1 = parseFloat(inputV1.value);
    let volt2 = parseFloat(inputV2.value);

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

    let i1 = calcular_i1()
    let i2 = calcular_i2(i1)
    let i3 = (i1 + i2)

    carregarResultadoSeisResistores(i1, i2, i3, R1, R2, R3, R4, R5, R6, volt1, volt2);
}

//apresentação do resultado das correntes
function carregarResultadoSeisResistores(i1, i2, i3, R1, R2, R3, R4, R5, R6, volt1, volt2) {
    spanCorrenteI1.textContent = i1.toFixed(2) + "A";
    spanCorrenteI2.textContent = i2.toFixed(2) + "A";
    spanCorrenteI3.textContent = i3.toFixed(2) + "A";

    spanCorrenteR1.textContent = i1.toFixed(2) + "A";
    spanCorrenteR2.textContent = i3.toFixed(2) + "A";
    spanCorrenteR3.textContent = i1.toFixed(2) + "A";
    spanCorrenteR4.textContent = i1.toFixed(2) + "A";
    spanCorrenteR5.textContent = i2.toFixed(2) + "A";
    spanCorrenteR6.textContent = i2.toFixed(2) + "A";

    spanPotenciaR1.textContent = (R1 * (i1 * i1)).toFixed(2) + "W";
    spanPotenciaR2.textContent = (R2 * (i3 * i3)).toFixed(2) + "W";
    spanPotenciaR3.textContent = (R3 * (i1 * i1)).toFixed(2) + "W";
    spanPotenciaR4.textContent = (R4 * (i1 * i1)).toFixed(2) + "W";
    spanPotenciaR5.textContent = (R5 * (i2 * i2)).toFixed(2) + "W";
    spanPotenciaR6.textContent = (R6 * (i2 * i2)).toFixed(2) + "W";

    spanPotenciaGerador1.textContent = (volt1 * (i1 * i1)).toFixed(2) + "W";
    spanPotenciaGerador2.textContent = (volt2 * (i2 * i2)).toFixed(2) + "W";
}
// console.log("i1 = ", i1.toFixed(2) + "A")
// console.log("i2 = ", i2.toFixed(2) + "A")
// console.log("i3 = ", i3.toFixed(2) + "A")

// //corrente em cada resistor
// console.log("Corrente no R1 = ", i1.toFixed(2) + "A")
// console.log("Corrente no R2 = ", i3.toFixed(2) + "A")
// console.log("Corrente no R3 = ", i1.toFixed(2) + "A")
// console.log("Corrente no R4 = ", i1.toFixed(2) + "A")
// console.log("Corrente no R5 = ", i2.toFixed(2) + "A")
// console.log("Corrente no R6 = ", i2.toFixed(2) + "A")

// // potência em cada resistor
// // P = U.I^2
// console.log("Potência no R1 = ", (R1 * (i1 * i1)).toFixed(2) + "W")
// console.log("Potência no R2 = ", (R2 * (i3 * i3)).toFixed(2) + "W")
// console.log("Potência no R3 = ", (R3 * (i1 * i1)).toFixed(2) + "W")
// console.log("Potência no R4 = ", (R4 * (i1 * i1)).toFixed(2) + "W")
// console.log("Potência no R5 = ", (R5 * (i2 * i2)).toFixed(2) + "W")
// console.log("Potência no R6 = ", (R6 * (i2 * i2)).toFixed(2) + "W")

// // potência nos geradores
// // P = U*I
// console.log("")
// console.log("Potência no gerador 1 = ", (volt1 * (i1 * i1)).toFixed(2) + "W")
// console.log("Potência no gerador 2 = ", (volt2 * (i2 * i2)).toFixed(2) + "W")