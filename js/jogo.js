var acertos = 0;
var carta1_selecionada = null;
var carta2_selecionada = null;
var vetor_para_verificar_ponto = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var cartas = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var control_click_start_game = true;
var control_click_stop_game = false;
var isGameRestart = true;
var jogadores = JSON.parse(localStorage.getItem('jogadores'));
var jogador = localStorage.getItem('player');

function montarTabelaRank(){

 function porCentesimo(tempo1, tempo2) {
   return tempo1.tempo > tempo2.tempo;
 }

  jogadores.sort(porCentesimo);

  var cssLinha = 'odd';
  var posicao = 1;
  for (var i = 0; i < jogadores.length; i++) {
    $('#dados-tabela').append('<tr class="'+cssLinha+'"> <td class="col-xs-1">'+posicao+'</td> <td class="col-xs-7">'+jogadores[i]['nome']+'</td> <td class="col-xs-1">'+jogadores[i]['tempo']+'</td></tr>');
    if (cssLinha == 'odd') {
      cssLinha = 'even';
    }
    posicao++;
  }
}

function montarTabuleiro()
{
    embaralhar(cartas);

    for (var i = 0; i < cartas.length; i++)
    {
      $('#tabuleiro').append('<div id="'+cartas[i]+'" class="carta"></div>');
      $('#'+cartas[i]).css({'background-image': 'url("./img/carta_costas.png")','transition': '1.5s'});
      if (i == 3 || i == 7 || i == 11 || i == 15)
      {
        $('#tabuleiro').append('<br class="linha">');
      }
    }
    setTimeout(function()
    {
      $(".carta").css({'background-image': 'url("./img/carta_costas.png")'});
    },2000);
}

function embaralhar(array)
{
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex)
   {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function virarCarta(carta_id)
{
  $('#'+carta_id).css({'background-image': 'url("./img/'+carta_id+'.png")','transition': '1.5s'});
}

function esconderCarta(carta_id)
{
  $('#'+carta_id).css({'background-image': 'url("./img/carta_costas.png")','transition': '1s'});
}

function testarCarta(obj)
{
    //Checa a condição inicial da primeira carta se está vazia
    if (carta1_selecionada == null)
    {
      carta1_selecionada = obj.id;
      $('#'+carta1_selecionada).unbind('click');
      virarCarta(carta1_selecionada);
    }
    else
    {
      //Primeira carta já está exibida
      //Código para exibir a segunda carta
      carta2_selecionada = obj.id;
      virarCarta(carta2_selecionada);

      $('.carta').unbind('click'); //Desabilita o click das cartas

      setTimeout(function(){ //função para o codigo abaixo ser executado depois de um tempo

        //Uso o id da carta como posição do vetor "vetor_para_verificar_ponto" que está ordenado com os valores de 1 a 8 e cada valor se repete
        if (vetor_para_verificar_ponto[carta1_selecionada] === vetor_para_verificar_ponto[carta2_selecionada])
        {
          acertos += 1;
          $('#'+carta1_selecionada).removeClass('carta').addClass('pontuada');
          $('#'+carta2_selecionada).removeClass('carta').addClass('pontuada');

          carta1_selecionada = null;
          carta2_selecionada = null;
          $('.carta').click(function(){ //Devolver o click das cartas
            testarCarta(this);
          });

        }else
        {
          esconderCarta(carta1_selecionada);
          esconderCarta(carta2_selecionada);
          carta1_selecionada = null;
          carta2_selecionada = null;
          $('.carta').click(function(){
            testarCarta(this);
          });

        }
        //TESTAR SE O JOGO TERMINOU
        if (acertos == 8)
        {
          pararCronometro();
          $('#stop_game').addClass('disabled');
          // tempo_de_jogo = minutos+segundos;

          $('.carta').unbind('click');

          if (centessimo_total < localStorage.getItem('centessimo') || localStorage.getItem('centessimo') == null)
          {
              alert('Novo record. Parabéns!!! Seu tempo foi'+'\nMinutos: '+minutos+'\nSegundos: '+segundos);
              // localStorage.setItem('menor_tempo', minutos+'m'+segundos);
              localStorage.setItem('centessimo', centessimo_total);
              // location.reload(true);
          }
          else
          {
              alert('Jogo terminado. Seu tempo foi'+'\nMinutos: '+minutos+'\nSegundos: '+segundos);
          }

          for (var i = 0; i < jogadores.length; i++)
          {
            if (jogadores[i]['nome'] == jogador)
            {
              jogadores[i]['tempo'] = centessimo_total;
              localStorage.setItem('jogadores', JSON.stringify(jogadores));
            }
          }

        }
      },1000);
    }
}

function verificarLocalStorage()
{
  if (localStorage.getItem('menor_tempo')==null)
  {
    return '...';
  }
  else
  {
    return localStorage.getItem('menor_tempo');
  }
};

function reiniciarJogo()
{
  reiniciarCronometro();
  $('.linha').remove();
  $('.carta').remove();
  $('.pontuada').remove();
  acertos = 0;
  carta1_selecionada = null;
  carta2_selecionada = null;
}

function comecarJogo()
{
    montarTabuleiro();

    setTimeout(function()
    {
      $('.carta').click(function()
      {
        testarCarta(this);
      });
      ativarCronometro();
      control_click_stop_game = true;
      control_click_start_game = true;
      $('#stop_game').removeClass('disabled');
    },3000);
}

$(function()
{
  montarTabelaRank();
  // var topPontuacao = document.getElementById('menor_tempo');
  // topPontuacao.innerText = 'Menor tempo: '+verificarLocalStorage();

// Habilita o efeito de virar tela do formulario
// $("#view-toggle").flip(true);

  // $(".carta").flip({
  //   axis: 'y',
  //   trigger: 'manual',
  //   reverse: true
  // });

  var tagPlayer = document.getElementById('player');
  tagPlayer.innerText = jogador;



  $('#start_game').click(function() {
    if (control_click_start_game)
    {
      control_click_start_game = false;

      if (isGameRestart)
      {
        isGameRestart = false;
        reiniciarJogo();
        comecarJogo();
        $('#icon-play').removeClass('glyphicon-play').addClass('glyphicon-repeat');
      }
      else
      {
        reiniciarJogo();
        comecarJogo();
      }
    }
  });
  $('#stop_game').click(function(){
    if (control_click_stop_game)
    {
      $('.carta').unbind('click');
      $('#icon-play').removeClass('glyphicon-repeat').addClass('glyphicon-play');
      $('#stop_game').addClass('disabled');
      pararCronometro();
      $('.carta').unbind('click');
      isGameRestart = true;
    }
  });
});
