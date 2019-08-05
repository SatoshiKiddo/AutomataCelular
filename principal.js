
var tablero = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var tablero2 = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var intervalo = 0;

function generacion() {
    intervalo++;
    console.log(tablero);
    document.getElementById('generacion').innerHTML = "Generacion " + intervalo;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            status = comprobarAlrededor(i, j);
            console.log(status);
            if ((status == 3)) {
                console.log(status);
                tablero2[i][j] = 1;
                let elemento = 'x' + (i + 1) + 'y' + (j + 1);
                document.getElementById(elemento).style.backgroundColor = 'yellow';
                console.log(elemento);
            }
            if ((status <= 2 || status >= 4)) {
                tablero2[i][j] = 0;
                let elemento = 'x' + (i + 1) + 'y' + (j + 1);
                document.getElementById(elemento).style.backgroundColor = 'gray';
                console.log(elemento);
            }
        }
    }
    console.log(tablero);
    console.log(tablero2);
    tablero = tablero2;
    tablero2 = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
}

for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        let elemento = 'x' + (i + 1) + 'y' + (j + 1);
        document.getElementById(elemento).addEventListener('click', celdaClicked);
    }
}

document.getElementById('RESTART').addEventListener('click', reset);
document.getElementById('START').addEventListener('click', start);
document.getElementById('AUTO').addEventListener('click', auto);

function celdaClicked(event) {
    let set = event.target.id.split('x');
    set = set[1].split('y');
    if (tablero[parseInt(set[0], 10) - 1][parseInt(set[1], 10) - 1] != 1) {
        tablero[parseInt(set[0], 10) - 1][parseInt(set[1], 10) - 1] = 1;
        event.target.style.backgroundColor = 'yellow';
    }
    else {
        tablero[parseInt(set[0], 10) - 1][parseInt(set[1], 10) - 1] = 0;
        event.target.style.backgroundColor = 'gray';
    }
}

function auto(event) {
    alert('entro');
}

function start(event) {
    generacion();
}
//Las celulas estan rodeadas por pesos de 1, por lo tanto segun las condiciones de supervivencia, la misma se elimina, o demas dependiendo de la condicion inicial.
function comprobarAlrededor(x, y) {
    let result = 0;
    if (x + 1 < 6) {
        result = result + tablero[x + 1][y];
        if (y + 1 < 6)
            result = result + tablero[x + 1][y + 1];
        if (y - 1 >= 0)
            result = result + tablero[x + 1][y - 1];
    }
    if (x - 1 >= 0) {
        result = result + tablero[x - 1][y];
        if (y + 1 < 6)
            result = result + tablero[x - 1][y + 1];
        if (y - 1 >= 0)
            result = result + tablero[x - 1][y - 1];
    }
    if (y + 1 < 6)
        result = result + tablero[x][y + 1];
    if (y - 1 >= 0)
        result = result + tablero[x][y - 1];
    return result;
}

function reset(event) {
    intervalo = 0;
    tablero = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            let elemento = 'x' + (i + 1) + 'y' + (j + 1);
            document.getElementById(elemento).style.backgroundColor = 'gray';
        }
    }
    document.getElementById('generacion').innerHTML = "";
}