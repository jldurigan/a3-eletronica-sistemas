import eel, math
  
eel.init("web")  
  
# Exposing the random_python function to javascript
@eel.expose
def retificadorEmPonte(voltagem1, frequencia1, capacitor, resistencia, N1, N2, diodos):
        def voltagemSecundario():
          return(round((voltagem1*N2)/N1,2))
      
        def vp():
          return(round(math.sqrt(2)*voltagemSecundario(),2))

        def VRLP():
          return(round(vp() - (2*diodos),2))
  
        def corrente():
          return(round(VRLP()/resistencia,2))
      
        def ripple():
          return(round(corrente()/(capacitor*(2*frequencia1)),2))
      
        def tensaoMedia():
          return(round((VRLP()-ripple()),2))
      
        def eficaz():
          return(round(VRLP()/math.sqrt(2),2))

        print("\n")

        print("Tensão eficaz no V2 = ", voltagemSecundario())
        print("Tensão de pico do V2 = ", vp())
        print("Tensão de pico na carga = ", VRLP())
        print("Tensão média na carga = ", tensaoMedia())
        print("Tensão eficaz na carga = ", eficaz())
        print("Tensão de pico no capacitor = ", VRLP())
        print("Corrente = ", corrente())
        print("Tensão de Ripple = ", ripple())
  
# Start the index.html file
eel.start("index.html", size=(300, 200))