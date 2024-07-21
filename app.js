let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados= [];
let numeroMaximo = 10;
let maximosIntentos = 3;

function asignarTextoElemento (elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numerodeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numerodeUsuario == numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez':'veces'} !`);
        document.getElementById('reiniciar').removeAttribute('disabled');//Habilitamos el botón de Nuevo Juego
    }else{
        //El usuario no acertó.
        if(numerodeUsuario < numeroSecreto){
            asignarTextoElemento('p','El número secreto es mayor');
        }else {
            asignarTextoElemento('p','El número secreto es menor');
        }
        intentos++;
        limpiarCaja();

        if (intentos > maximosIntentos){
            asignarTextoElemento('p',`Llegaste al número máximo de ${maximosIntentos} intentos. El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');//Habilitamos el botón de Nuevo Juego
        }
        
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
   let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
   console.log(numeroGenerado);
   console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números posibles
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }else{
        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto(); //APLICACIÓN DE LA RECURSIVIDAD
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indique un número entre 1 y ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();
    //Indicar el mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();