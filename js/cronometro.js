var centesimas = 0;
var centessimo_total = 0;
var segundos = 0;
var minutos = 0;
// var horas = 0;
var control;
function ativarCronometro () {
  control = setInterval(cronometro,10);
}
function pararCronometro () {
  clearInterval(control);
}
function reiniciarCronometro () {
  clearInterval(control);
  centesimas = 0;
  segundos = 0;
  minutos = 0;
  // horas = 0;
  centessimo_total = 0;
  Centesimas.innerHTML = ":00";
  Segundos.innerHTML = ":00";
  Minutos.innerHTML = "00";
  // Horas.innerHTML = "00";
}
function cronometro () {
  if (centesimas < 99) {
    centesimas++;
    centessimo_total++;
    if (centesimas < 10) { centesimas = "0"+centesimas }
    Centesimas.innerHTML = ":"+centesimas;
  }
  if (centesimas == 99) {
    centesimas = -1;
  }
  if (centesimas == 0) {
    segundos ++;
    if (segundos < 10) { segundos = "0"+segundos}
    Segundos.innerHTML = ":"+segundos;
  }
  if (segundos == 59) {
    segundos = -1;
  }
  if ( (centesimas == 0)&&(segundos == 0) ) {
    minutos++;
    if (minutos < 10) { minutos = "0"+minutos }
    Minutos.innerHTML = minutos;
  }
  if (minutos == 59) {
    minutos = -1;
  }
  // if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
  //   horas ++;
  //   if (horas < 10) { horas = "0"+horas }
  //   Horas.innerHTML = horas;
  // }
}
