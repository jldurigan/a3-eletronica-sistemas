
//Circuito com retificador em ponte

let voltagem1 = parseFloat(500)
let frequencia1 = parseFloat(60)
let capacitor = parseFloat(0.0001)
let resistencia = parseFloat(5000)
let N1 = parseFloat(1000)
let N2 = parseFloat(400)
let diodos = parseFloat(0.7)

function voltagemSecundario() {
    return (voltagem1*N2)/N1
}
function picoSecundario() {
    return (Math.sqrt(2) * voltagemSecundario()).toFixed(2)
}
function picoCapacitor(){
    return picoSecundario()-(2*diodos)
}

function ripple() {
    return ((picoCapacitor()/resistencia) / (capacitor * 2 * frequencia1)).toFixed(2)
}
function tensaoMedia() {
    return ((picoCapacitor()+(picoCapacitor()-ripple()))/2).toFixed(2)
}


console.log("Tensão eficaz no V2 = ", voltagemSecundario()+"v")
console.log("Tensão de pico do V2 = ", picoSecundario()+"v")
console.log("Tensão de pico no capacitor = ", picoCapacitor()+"v")
console.log("Tensão de Ripple = ", ripple()+"v")
console.log("Tensão média na carga = ", tensaoMedia()+"v")