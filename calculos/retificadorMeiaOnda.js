//Circuito com retificador de meia onda

let volt1 = parseFloat(127)
let N1 = parseFloat(10)
let N2 = parseFloat(1)
let diodo = parseFloat(0.7)
let frequencia = parseFloat(60)
let resistencia = parseFloat(1000)
let capacitor = parseFloat(0.0001)

function voltagemSecundario() {
    return (volt1 * N2) / N1
}
function picoSecundario() {
    return (voltagemSecundario()*Math.sqrt(2)).toFixed(2)
}
function picoCapacitor() {
    return picoSecundario() - diodo
}
function ripple() {
    return ((picoCapacitor()/resistencia) / (capacitor * frequencia)).toFixed(2)
}
function tensaoMedia() {
    return ((picoCapacitor()+(picoCapacitor()-ripple()))/2).toFixed(2)
}

console.log("Tensão eficaz no V2 = ", voltagemSecundario()+"v")
console.log("Tensão de pico do V2 = ", picoSecundario()+"v")
console.log("Tensão de pico no capacitor = ", picoCapacitor()+"v")
console.log("Tensão de Ripple = ", ripple()+"v")
console.log("Tensão média na carga = ", tensaoMedia()+"v")