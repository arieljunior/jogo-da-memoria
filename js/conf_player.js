var jogadores = JSON.parse(localStorage.getItem('jogadores'));

if (localStorage.getItem('jogadores') == null) {
  var jogadores = '[]';
  localStorage.setItem('jogadores', jogadores);
}

function salvarJogador(){
  var jogador = document.getElementById('nome-form').value;

  var isPlayerExist;

  if (!jogador == '') {
    for (var i = 0; i < jogadores.length; i++) {
      if (jogador == jogadores[i]["nome"]){
        isPlayerExist = true;
        break;
      }
    }

    if (isPlayerExist) {
      alert('Jogador já existe!\nEscolha outro nome ou selecione um jogador clicando em "Jogadores"');
    }else {
      localStorage.setItem('player', jogador);
      jogadores.push({"nome":jogador, "tempo":"--"});
      localStorage.setItem('jogadores', JSON.stringify(jogadores));

      location.href = 'jogo.html'
    }
  }else {
    alert('Informe o nome do jogador');
  }
}

$(function(){

  $(".select-player").flip({
    axis: 'x',
    trigger: 'manual',
    reverse: true
  });


  $('#selecionar-jogador').click(function (){
    $(".select-player").flip(false);
  });

  $('#criar-jogador').click(function(){
    $(".select-player").flip(true);
  });

  for (var i = 0; i < jogadores.length; i++) {
    $('#lista-jogadores').append('<option value="'+jogadores[i]['nome']+'">'+jogadores[i]['nome']+'</option>')
  }



})
