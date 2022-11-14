let entradaA = false
let entradaB = true
function portaNot (entradaA){
    if(!entradaA){
        return true
    }
    return false
}

function portaAnd (entradaA, entradaB){
    if(entradaA && entradaB){
        return true
    }
    return false
}

function portaNand (entradaA, entradaB){
    if(!entradaA && !entradaB || entradaA != entradaB){
        return true
    }
    return false
}

function portaOr (entradaA, entradaB){
    if(entradaA != entradaB || entradaA && entradaB){
        return true
    }
    return false
}

function portaNor (entradaA, entradaB){
    if(!entradaA && !entradaB){
        return true
    }
    return false
}

function portaXor (entradaA, entradaB){
    if(entradaA && !entradaB || !entradaA && entradaB){
        return true
    }
    return false
}

function portaNxor (entradaA, entradaB){
    if(entradaA && entradaB || !entradaA && !entradaB){
        return true
    }
    return false
}


console.log(portaNxor(entradaA,entradaB))