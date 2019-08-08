(function() {
    function decimalAdjust(type, value, exp) {
      // Si el exp no está definido o es cero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // Si el valor no es un número o el exp no es un entero...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
  
    // Decimal round
    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
      };
    }
    // Decimal floor
    if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
      };
    }
    // Decimal ceil
    if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
      };
    }
  })();

function generacion() {
    intervalo++;
    console.log(tablero);
    document.getElementById('generacion').innerHTML = "Generacion " + intervalo;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            status = comprobarAlrededor(i, j);
            tablero2[i][j] = Math.round10(status, -1);
            let elemento = 'x' + (i + 1) + 'y' + (j + 1);
            colorPeso(tablero2[i][j], elemento);
        }
    }
    tablero = tablero2;
    tablero2 = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
}

function celdaClicked(event) {
    let set = event.target.id.split('x');
    set = set[1].split('y');
    if (tablero[parseInt(set[0], 10) - 1][parseInt(set[1], 10) - 1] == 0) {
        let peso = Math.round10(Math.random(), -1);
        tablero[parseInt(set[0], 10) - 1][parseInt(set[1], 10) - 1] = peso;
        colorPeso(peso, event.target.id);
    }
    else {
        tablero[parseInt(set[0], 10) - 1][parseInt(set[1], 10) - 1] = 0;
        event.target.style.backgroundColor = 'yellow';
    }
}

function colorPeso(peso, elemento){
    if(peso >= 0.8){
        document.getElementById(elemento).style.backgroundColor = 'red';
    }
    else if (peso < 0.8 && peso >= 0.5){
        document.getElementById(elemento).style.backgroundColor = 'blue';
    }
    else if (peso < 0.5 && peso >= 0.3){
        document.getElementById(elemento).style.backgroundColor = 'green';
    }
    else if (peso < 0.3){
        document.getElementById(elemento).style.backgroundColor = 'yellow';
    }
    document.getElementById(elemento).innerText= peso;
}

function auto(event) {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            let elemento = 'x' + (i + 1) + 'y' + (j + 1);
            let peso = Math.round10(Math.random(), -1);
            tablero[i][j]=peso;
            colorPeso(peso, elemento);
        }
    }
}

function start(event) {
    generacion();
}
//Las celulas estan rodeadas por pesos de 1, por lo tanto segun las condiciones de supervivencia, la misma se elimina, o demas dependiendo de la condicion inicial.
function comprobarAlrededor(x, y) {
    let result = 1;
    if (x + 1 < 6) {
        result =  result + result * tablero[x + 1][y];
        if (y + 1 < 6)
            result = result + result * tablero[x + 1][y + 1];
        if (y - 1 >= 0)
            result = result + result * tablero[x + 1][y - 1];
    }
    if (x - 1 >= 0) {
        result = result + result * tablero[x - 1][y];
        if (y + 1 < 6)
            result = result + result * tablero[x - 1][y + 1];
        if (y - 1 >= 0)
            result = result + result * tablero[x - 1][y - 1];
    }
    if (y + 1 < 6)
        result = result + result * tablero[x][y + 1];
    if (y - 1 >= 0)
        result = result + result * tablero[x][y - 1];
    return nivelacion(result);
}

function nivelacion(result){
    if(result < 10 && result >= 1){
        return result / 10;
    }
    else if(result < 100 && result >= 10){
        return result / 100;
    }
    else if( result < 1000 && result >= 100){
        return result / 1000;
    }
    return result;
}

function reset(event) {
    intervalo = 0;
    tablero = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            let elemento = 'x' + (i + 1) + 'y' + (j + 1);
            document.getElementById(elemento).style.backgroundColor = 'gray';
            document.getElementById(elemento).innerText= 0;
        }
    }
    document.getElementById('generacion').innerHTML = "";
}



for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        let elemento = 'x' + (i + 1) + 'y' + (j + 1);
        document.getElementById(elemento).addEventListener('click', celdaClicked);
    }
}

var tablero = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var tablero2 = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var intervalo = 0;

document.getElementById('RESTART').addEventListener('click', reset);
document.getElementById('START').addEventListener('click', start);
document.getElementById('AUTO').addEventListener('click', auto);