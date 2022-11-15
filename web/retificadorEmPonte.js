// RETIFICADOR ONDA COMPLETA EM PONTE

let voltagem1 = parseFloat(220)
let frequencia1 = parseFloat(60)
let resistencia = parseFloat(1000)
let N1 = parseFloat(18000)
let N2 = parseFloat(1200)
let diodos = parseFloat(0.7)

      
function voltagemSecundario(){
  return ((voltagem1*N2)/N1).toFixed(2)
}
      
function vp(){
 return (Math.sqrt(2)*voltagemSecundario()).toFixed(2)
}

function VRLP(){
 return (vp() - (2*diodos)).toFixed(2)
}  

function VRLMed(){
  return ((2*VRLP())/Math.PI).toFixed(2)
}

function eficaz(){
  return (VRLP()/Math.sqrt(2)).toFixed(2)
}

function freqCarga(){
  return (2*frequencia1).toFixed(2)
}

console.log("Tensão eficaz no V2 = ", voltagemSecundario(),"v")
console.log("Tensão de pico do V2 = ", vp(),"v")
console.log("Tensão de pico na carga = ", VRLP(),"v")
console.log("Tensão média na carga = ", VRLMed(),"v")
console.log("Tensão eficaz na carga = ", eficaz(),"v")
console.log("Frequência na carda = ", freqCarga(), "Hz")
console.log("Tensão de pico inversa no diodo = ", vp(),"v")