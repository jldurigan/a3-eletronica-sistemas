var botao = document.getElementById("BotaoCalcular")

botao.addEventListener("click", function (event) {
    var R1 = parseFloat(document.getElementById("R1").value);
    var R2 = parseFloat(document.getElementById("R2").value);
    var R3 = parseFloat(document.getElementById("R3").value);
    var R4 = parseFloat(document.getElementById("R4").value);
    var R5 = parseFloat(document.getElementById("R5").value);
    var R6 = parseFloat(document.getElementById("R6").value);
    var volt1 = parseFloat(document.getElementById("E1").value);
    var volt2 = parseFloat(document.getElementById("E2").value);

    //Sistema com 6 resistores

    //array para os cálculos
    var soma_equacoes = []

    //todas as variáveis envolvidas na primeira equação do sistema
    // 1 - todas que multiplicam i1
    var malha_um_i1 = R1 + R4 + R3 + R2
    // 2 - todos que multiplicam i2
    var malha_um_i2 = R2
    //junção da parte 1 e parte 2 da equação 1 + a voltagem envolvida (volt1)
    var equacao_i1 = [malha_um_i1, malha_um_i2, volt1]
    // 1 - todas que multiplicam i1 
    var malha_dois_i1 = R2
    // 2 - todos que multiplicam i2
    var malha_dois_i2 = R5 + R6 + R2

    //junção da parte 1 e parte 2 da equação 2 + a voltagem envolvida (volt1)
    var equacao_i2 = [malha_dois_i1, malha_dois_i2, volt2]


    function calcular_i1() { //calculando i1
        var t2m1 = -equacao_i1[1] //  -1x --> como i3 é i2 + i2 é necessário deixar um negativo
        var t2m2 = equacao_i2[1]


        for (var i = 0; i < equacao_i1.length; i++) {
            equacao_i1[i] = equacao_i1[i] * t2m2
        }
        //for i, termo in enumerate(equacao_i1): //multiplicando a equação 1 pelo segundo termo da equeação dois
        //equacao_i1[i] = termo * t2m2

        for (var i = 0; i < equacao_i2.length; i++) {
            equacao_i2[i] = equacao_i2[i] * t2m1
        }
        //equacao_i2[i] = termo * t2m1 //multiplicando a equação 2 pelo segundo termo da equação 1

        for (var i = 0; i < equacao_i1.length; i++) {
            var soma = equacao_i1[i] + equacao_i2[i]
            soma_equacoes.push(soma)
        }

        return soma_equacoes[2] / soma_equacoes[0] //resultado de i1 após o corte de i2
    }

    function calcular_i2(i1) { //aplicando o resultado de i1 para descobrir i2
        return ((equacao_i1[2] - (equacao_i1[0] * i1)) / equacao_i1[1])
    }


    var i1 = calcular_i1()
    var i2 = calcular_i2(i1)
    var i3 = (i1 + i2)

    //Criação de respostas
    var resI1 = document.getElementById("i1");
    var resI2 = document.getElementById("i2");
    var resI3 = document.getElementById("i3");
    var resCorrenteR1 = document.getElementById("correnteR1");
    var resCorrenteR2 = document.getElementById("correnteR2");
    var resCorrenteR3 = document.getElementById("correnteR3");
    var resCorrenteR4 = document.getElementById("correnteR4");
    var resCorrenteR5 = document.getElementById("correnteR5");
    var resCorrenteR6 = document.getElementById("correnteR6");
    var resPotenciaR1 = document.getElementById("PotenciaR1")
    var resPotenciaR2 = document.getElementById("PotenciaR2")
    var resPotenciaR3 = document.getElementById("PotenciaR3")
    var resPotenciaR4 = document.getElementById("PotenciaR4")
    var resPotenciaR5 = document.getElementById("PotenciaR5")
    var resPotenciaR6 = document.getElementById("PotenciaR6")
    var resPotenciaGerador1 = document.getElementById("PotenciaGerador1")
    var resPotenciaGerador2 = document.getElementById("PotenciaGerador2")

    //Atricuição de respostas
    resI1.textContent = "i1 = " + i1.toFixed(2) + "A";
    resI2.textContent = "i2 = " + i2.toFixed(2) + "A";
    resI3.textContent = "i3 = " + i3.toFixed(2) + "A";
    resCorrenteR1.textContent = "Corrente no R1 = " + i1.toFixed(2) + "A";
    resCorrenteR2.textContent = "Corrente no R2 = " + i3.toFixed(2) + "A";
    resCorrenteR3.textContent = "Corrente no R3 = " + i1.toFixed(2) + "A";
    resCorrenteR4.textContent = "Corrente no R4 = " + i1.toFixed(2) + "A";
    resCorrenteR5.textContent = "Corrente no R5 = " + i2.toFixed(2) + "A";
    resCorrenteR6.textContent = "Corrente no R6 = " + i2.toFixed(2) + "A";
    resPotenciaR1.textContent = "Potência no R1 = " + (R1 * (i1 * i1)).toFixed(2) + "W";
    resPotenciaR2.textContent = "Potência no R2 = " + (R2 * (i3 * i3)).toFixed(2) + "W";
    resPotenciaR3.textContent = "Potência no R3 = " + (R3 * (i1 * i1)).toFixed(2) + "W";
    resPotenciaR4.textContent = "Potência no R4 = " + (R4 * (i1 * i1)).toFixed(2) + "W";
    resPotenciaR5.textContent = "Potência no R5 = " + (R5 * (i2 * i2)).toFixed(2) + "W";
    resPotenciaR6.textContent = "Potência no R6 = " + (R6 * (i2 * i2)).toFixed(2) + "W";
    resPotenciaGerador1.textContent = "Potência no gerador 1 = " + (volt1 * (i1 * i1)).toFixed(2) + "W";
    resPotenciaGerador2.textContent = "Potência no gerador 2 = " + (volt2 * (i2 * i2)).toFixed(2) + "W";

})

/*
//apresentação do resultado das correntes
console.log("i1 = ", i1.toFixed(2) + "A")
console.log("i2 = ", i2.toFixed(2) + "A")
console.log("i3 = ", i3.toFixed(2) + "A")

//corrente em cada resistor
console.log("Corrente no R1 = ", i1.toFixed(2) + "A")
console.log("Corrente no R2 = ", i3.toFixed(2) + "A")
console.log("Corrente no R3 = ", i1.toFixed(2) + "A")
console.log("Corrente no R4 = ", i1.toFixed(2) + "A")
console.log("Corrente no R5 = ", i2.toFixed(2) + "A")
console.log("Corrente no R6 = ", i2.toFixed(2) + "A")

// potência em cada resistor
// P = U.I^2
console.log("Potência no R1 = ", (R1 * (i1 * i1)).toFixed(2) + "W")
console.log("Potência no R2 = ", (R2 * (i3 * i3)).toFixed(2) + "W")
console.log("Potência no R3 = ", (R3 * (i1 * i1)).toFixed(2) + "W")
console.log("Potência no R4 = ", (R4 * (i1 * i1)).toFixed(2) + "W")
console.log("Potência no R5 = ", (R5 * (i2 * i2)).toFixed(2) + "W")
console.log("Potência no R6 = ", (R6 * (i2 * i2)).toFixed(2) + "W")

// potência nos geradores
// P = U*I
console.log("")
console.log("Potência no gerador 1 = ", (volt1 * (i1 * i1)).toFixed(2) + "W")
console.log("Potência no gerador 2 = ", (volt2 * (i2 * i2)).toFixed(2) + "W")
*/
