
//Circuito com retificador em ponte

    

let btnPonte = document.getElementById("BotaoCalcular")
let btnLimpar = document.getElementById("BotaoReset")



btnPonte.addEventListener("click", function (event){
    let voltagem1 = parseFloat(document.getElementById("voltagem").value);
    let frequencia1 = parseFloat(document.getElementById("frequencia").value)
    let capacitor = parseFloat(document.getElementById("capacitor").value)
    let resistencia = parseFloat(document.getElementById("resistencia").value)
    let N1 = parseFloat(document.getElementById("n1").value)
    let N2 = parseFloat(document.getElementById("n2").value)
    let diodos = 0.7

    function voltagemSecundario() {
        return ((voltagem1 * N2) / N1).toFixed(2)
    }
    function picoSecundario() {
        return (Math.sqrt(2) * voltagemSecundario()).toFixed(2)
    }
    function picoCapacitor() {
        return picoSecundario() - (2 * diodos).toFixed(2)
    }
    
    function ripple() {
        return ((picoCapacitor() / resistencia) / ((capacitor * 0.000001) * 2 * frequencia1)).toFixed(2)
    }
    function tensaoMedia() {
        return ((picoCapacitor() + (picoCapacitor() - ripple())) / 2).toFixed(2)
    }

    var resTensaoV2 = document.getElementById("tensaoV2")
    var resTensaoPicoV2 = document.getElementById("tensaoPicoV2")
    var resTensaoPicoCapacitor = document.getElementById("tensaoPicoCapacitor")
    var resTensaoRipple = document.getElementById("tensaoRipple")
    var resTensaoMediaCarga = document.getElementById("tensaoMediaCarga")

    resTensaoV2.textContent = "Tensão eficaz no V2 = "+ voltagemSecundario().replace(".",",") + "v"
    resTensaoPicoV2.textContent = "Tensão de pico do V2 = "+ picoSecundario().replace(".",",") + "v"
    resTensaoPicoCapacitor.textContent = "Tensão de pico no capacitor = "+ picoCapacitor().toFixed(2).replace(".",",") + "v"
    resTensaoRipple.textContent = "Tensão de Ripple = "+ ripple().replace(".",",") + "v"
    resTensaoMediaCarga.textContent = "Tensão média na carga = "+ tensaoMedia().replace(".",",") + "v"

})

btnLimpar.addEventListener("click", function(event){
    var valorVoltagem = document.getElementById("voltagem")
    var valorFrequencia = document.getElementById("frequencia")
    var valorCapacitor = document.getElementById("capacitor")
    var valorResistencia = document.getElementById("resistencia")
    var valorN1 = document.getElementById("n1")
    var valorN2 = document.getElementById("n2")

    var resTensaoV2 = document.getElementById("tensaoV2")
    var resTensaoPicoV2 = document.getElementById("tensaoPicoV2")
    var resTensaoPicoCapacitor = document.getElementById("tensaoPicoCapacitor")
    var resTensaoRipple = document.getElementById("tensaoRipple")
    var resTensaoMediaCarga = document.getElementById("tensaoMediaCarga")

    valorVoltagem.value = ""
    valorFrequencia.value = ""
    valorCapacitor.value = ""
    valorResistencia.value = ""
    valorN1.value = ""
    valorN2.value = ""

    resTensaoV2.textContent = "Tensão eficaz no V2 = "
    resTensaoPicoV2.textContent = "Tensão de pico do V2 = "
    resTensaoPicoCapacitor.textContent = "Tensão de pico no capacitor = "
    resTensaoRipple.textContent = "Tensão de Ripple = "
    resTensaoMediaCarga.textContent = "Tensão média na carga = "
})






/*console.log("Tensão eficaz no V2 = ", voltagemSecundario() + "v")
console.log("Tensão de pico do V2 = ", picoSecundario() + "v")
console.log("Tensão de pico no capacitor = ", picoCapacitor() + "v")
console.log("Tensão de Ripple = ", ripple() + "v")
console.log("Tensão média na carga = ", tensaoMedia() + "v")*/