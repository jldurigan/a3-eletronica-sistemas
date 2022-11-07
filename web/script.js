// Onclick of the button


function retificadorEmPonte(){
  var voltagem1 = 220;
  var frequencia1 = 60;
  var capacitor = 0.0001;
  var resistencia = 1000;
  var N1 = 18000;
  var N2 = 1200;
  diodos = 0.7;
  eel.retificadorEmPonte()(function(voltagem1, frequencia1, capacitor, resistencia, N1, N2, diodos){})
}

$("button").click(function(){
  retificadorEmPonte();
});