//Circuito com retificador de meia onda

let volt1 = parseFloat(220)
let N1 = parseFloat(18000)
let N2 = parseFloat(1200)
let diodo = parseFloat(0.7)
let resistencia = parseFloat(4000)

function voltSecudario() {
    return Math.round((volt1 * N2) / N1, 2)
}
function pico() {
    return Math.round(voltSecudario() * (Math.sqrt(2)), 2)
}
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