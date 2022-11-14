
//Circuito com retificador em ponte

let voltagem1 = parseFloat(200)
let frequencia1 = parseFloat(60)
let capacitor = parseFloat(0.0001)
let resistencia = parseFloat(1000)
let N1 = parseFloat(1000)
let N2 = parseFloat(200)
let diodos = parseFloat(0.7)

function voltagemSecundario() {
    return Math.round((voltagem1 * N2) / N1, 2)
}
function vp() {
    return Math.round(Math.sqrt(2) * voltagemSecundario(), 2)
}
function VRLP() {
    return Math.round(vp() - (2 * diodos), 2)
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