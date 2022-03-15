var acertos = 0;
var carta1_selecionada = null;
var carta2_selecionada = null;
var hitedsIndex = [];
var vetor_para_verificar_ponto = [
  1, 2, 3, 4, 5, 6, 7, 8, 
  1, 2, 3, 4, 5, 6, 7, 8,
];
var cartas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var cardsSelected = [];
var control_click_start_game = true;
var control_click_stop_game = false;
var isGameRestart = true;
var jogadores = JSON.parse(localStorage.getItem("jogadores"));
var jogador = localStorage.getItem("player");

var firstCard = null;
var secondCard = null;

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function montarTabelaRank() {
  function porCentesimo(tempo1, tempo2) {
    return tempo1.tempo > tempo2.tempo;
  }

  function converterCentesimo(cent) {
    for (var i = 0; i <= cent; i++) {
      if (i == 100) {
      }
    }
  }

  jogadores.sort(porCentesimo);

  var cssLinha = "odd";
  var posicao = 1;
  for (var i = 0; i < jogadores.length; i++) {
    var minutoRank = 0;
    var segundoRank = 0;
    var centessimoRank = 0;
    for (var x = 0; x <= jogadores[i]["tempo"]; x++) {
      centessimoRank++;
      if (centessimoRank == 100) {
        segundoRank++;
        centessimoRank = 0;
      }
      if (segundoRank == 60) {
        minutoRank++;
        segundoRank = 0;
      }
    }
    if (minutoRank > 0) {
      $("#dados-tabela").append(
        '<tr class="' +
          cssLinha +
          '"> <td class="col-xs-1">' +
          posicao +
          '</td> <td class="col-xs-7">' +
          jogadores[i]["nome"] +
          '</td> <td class="col-xs-1">' +
          minutoRank +
          "m" +
          segundoRank +
          "s</td></tr>"
      );
    } else {
      $("#dados-tabela").append(
        '<tr class="' +
          cssLinha +
          '"> <td class="col-xs-1">' +
          posicao +
          '</td> <td class="col-xs-7">' +
          jogadores[i]["nome"] +
          '</td> <td class="col-xs-1">' +
          segundoRank +
          "s</td></tr>"
      );
    }

    if (cssLinha == "odd") {
      cssLinha = "even";
    } else {
      cssLinha = "odd";
    }
    posicao++;
  }
}

function montarTabuleiro() {
  const cardsShuffled = shuffle(cartas);

  const elementBoard = document.querySelector("#board-game");

  cardsShuffled.forEach((card) => {
    elementBoard.append(`
    `);
  });

  for (var i = 0; i < cartas.length; i++) {
    $("#tabuleiro").append(
      '<div class="card" id="' +
        cartas[i] +
        '"><div class="front"><div class="carta-costas"></div></div><div class="back"><div id="carta' +
        cartas[i] +
        '" class="carta"></div></div></div>'
    );
    $("#carta" + cartas[i]).css({
      "background-image": 'url("./img/' + cartas[i] + '.png")',
      transition: "1.5s",
    });
    if (i == 3 || i == 7 || i == 11 || i == 15) {
      $("#tabuleiro").append('<br class="linha">');
    }
  }

  $(".card").flip({
    axis: "y",
    trigger: "manual",
    reverse: true,
  });
}

function virarCarta(carta_id) {
  $("#" + carta_id).flip(true);
}

function showCard(cardIndex, cardElement) {
  cardElement.style.backgroundImage = `url('./img/${cartas[cardIndex]}.png')`;
}

function hideCard(cardElement) {
  cardElement.style.backgroundImage = `url('./img/carta_costas.png')`;
}

function esconderCarta(carta_id) {
  $("#" + carta_id).flip(false);
}

function testarCarta(obj) {
  //Checa a condição inicial da primeira carta se está vazia
  if (carta1_selecionada == null) {
    carta1_selecionada = obj.id;
    $("#" + carta1_selecionada).unbind("click"); //Desabilita o click
    virarCarta(carta1_selecionada);
  } else {
    //Código para exibir a segunda carta
    carta2_selecionada = obj.id;
    virarCarta(carta2_selecionada);

    $(".card").unbind("click"); //Desabilita o click de todas as cartas

    setTimeout(function () {
      //função para o codigo abaixo ser executado depois de um tempo

      //Uso o id da carta como index do vetor (vetor_para_verificar_ponto) para identificar se os valores são iguais
      //OBS.: o vetor tem 16 posições e os valores se repetem a partir da 7 posição
      if (
        vetor_para_verificar_ponto[carta1_selecionada] ===
        vetor_para_verificar_ponto[carta2_selecionada]
      ) {
        acertos += 1;
        $("#" + carta1_selecionada)
          .removeClass("card")
          .addClass("pontuada");
        $("#" + carta2_selecionada)
          .removeClass("card")
          .addClass("pontuada");

        alterarStatus("Acertou", 1000, "success");

        carta1_selecionada = null;
        carta2_selecionada = null;
        $(".card").click(function () {
          //Devolver o click das cartas
          testarCarta(this);
        });
      } else {
        alterarStatus("Errou", 1000, "danger");
        esconderCarta(carta1_selecionada);
        esconderCarta(carta2_selecionada);
        carta1_selecionada = null;
        carta2_selecionada = null;
        $(".card").click(function () {
          testarCarta(this);
        });
      }

      //TESTAR SE O JOGO TERMINOU
      if (acertos == 8) {
        pararCronometro();
        $("#stop_game").addClass("disabled");

        $(".card").unbind("click");

        for (var i = 0; i < jogadores.length; i++) {
          if (jogadores[i]["nome"] == jogador) {
            jogadores[i]["tempo"] = centessimo_total;
            localStorage.setItem("jogadores", JSON.stringify(jogadores));
          }
        }

        if (
          centessimo_total < localStorage.getItem("centessimo") ||
          localStorage.getItem("centessimo") == null
        ) {
          localStorage.setItem("centessimo", centessimo_total);
        }
        alert(
          "Jogo finalizado. Seu tempo foi: " + minutos + "m " + segundos + "s"
        );
        location.reload(true);
      }
    }, 1000);
  }
}

function reiniciarJogo() {
  reiniciarCronometro();
  $(".linha").remove();
  $(".card").remove();
  $(".pontuada").remove();
  acertos = 0;
  carta1_selecionada = null;
  carta2_selecionada = null;
}

const combinationIsCorrect = (firstIndexCard, secondIndexCard) => {
  return (
    vetor_para_verificar_ponto[firstIndexCard] ===
    vetor_para_verificar_ponto[secondIndexCard]
  );
};

function startGame() {
  // montarTabuleiro();

  // alterarStatus("iniciando...", 2000, "warning");
  // setTimeout(function () {
  cartas = shuffle(cartas);

  const cardsEl = document.querySelectorAll(".card");

  cardsEl.forEach((cardElement, index) => {
    cardElement.addEventListener("click", (element) => {
      if (hitedsIndex.indexOf(index) > -1) {
        return;
      }

      if (!firstCard) {
        firstCard = {
          index: cartas[index],
          element: element.target,
        };
        showCard(index, element.target);
      } else if (!secondCard) {
        secondCard = {
          index: cartas[index],
          element: element.target,
        };
        showCard(index, element.target);
      } else {
        setTimeout(() => {
          const { index: firstCardIndex, element: firstCardElement } = firstCard;
          const { index: secondCardIndex, element: secondCardElement } = secondCard;

          const isCorrect = combinationIsCorrect(
            firstCardIndex,
            secondCardIndex
          );
          if (isCorrect) {
            acertos++;

            hitedsIndex.push(firstCardIndex, secondCardIndex);

            firstCardElement.classList.add("hited");
            secondCardElement.classList.add("hited");
          } else {
            hideCard(firstCardElement);
            hideCard(secondCardElement);
          }

          firstCard = null;
          secondCard = null;

        }, 1000);
      }
    });
  });

  // ativarCronometro();

  // control_click_stop_game = true;
  // control_click_start_game = true;
  // $("#stop_game").removeClass("disabled");

  // alterarStatus("Jogo iniciado", 1000, "success");
  // }, 2000);
}

function alterarStatus(msg, tempo, novoTipo) {
  $("#status-game").addClass("alert-" + novoTipo);
  $("#msg-status").text(msg);

  setTimeout(function () {
    $("#status-game").removeClass("alert-" + novoTipo);
    $("#msg-status").text("...");
  }, tempo);
}

// $(function () {
//   $("#player").text(jogador);

//   $("#start_game").click(function () {
//     if (control_click_start_game) {
//       control_click_start_game = false;

//       if (isGameRestart) {
//         isGameRestart = false;
//         reiniciarJogo();
//         startGame();
//         $("#icon-play")
//           .removeClass("glyphicon-play")
//           .addClass("glyphicon-repeat");
//       } else {
//         reiniciarJogo();
//         startGame();
//       }
//     }
//   });
//   $("#stop_game").click(function () {
//     if (control_click_stop_game) {
//       $(".card").unbind("click");
//       $("#icon-play")
//         .removeClass("glyphicon-repeat")
//         .addClass("glyphicon-play");
//       $("#stop_game").addClass("disabled");
//       pararCronometro();
//       isGameRestart = true;
//     }
//   });
// });

// montarTabelaRank();

document.querySelector("#btn-start-game").addEventListener("click", startGame);
