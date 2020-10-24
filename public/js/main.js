let tempoInicial = $('#tempo-digitacao').text()

$(() => {
  atualizaTamanhoFrase()
  inicializaContadores()
  inicializaCronometro()
  inicializaMarcadores()
  $('#botao-reiniciar').click(reiniciarJogo)
})

let atualizaTamanhoFrase = () => {
  let frase = $('.frase').text()
  let numPalavras = frase.split(' ').length
  let tamanhoFrase = $('#tamanhoFrase').text(numPalavras)
  tamanhoFrase.text(numPalavras)
}

let campo = $('.campo-digitacao')

let inicializaContadores = () => {
  campo.on('input', () => {
    let valorCampo = campo.val()

    let qtdPalavras = valorCampo.split(/\S+/).length - 1
    $('#contador-palavras').text(qtdPalavras)

    let qtdCaracteres = valorCampo.length
    $('#contador-caracteres').text(qtdCaracteres)
  })
}


let inicializaCronometro = () => {
  let tempoRestante = tempoInicial

  campo.one('focus', function(){
    $("#botao-reiniciar").attr("disabled",true);
    let cronometroId = setInterval(()=>{
      tempoRestante--
      console.log(tempoRestante)
      $('#tempo-digitacao').text(tempoRestante)
      if(tempoRestante <= 0){
        campo.attr('disabled', true)
        clearInterval(cronometroId)
        $("#botao-reiniciar").attr("disabled", false);
        // campo.addClass('campo-desativado')
        campo.toggleClass('campo-desativado')
      }
    }, 1000)
  })
}

let inicializaMarcadores = () => {
  var frase = $(".frase").text()
  campo.on("input", function() {
      var digitado = campo.val()
      var comparavel = frase.substr(0 , digitado.length)

      if(digitado == comparavel) {
          campo.addClass("borda-verde")
          campo.removeClass("borda-vermelha")
      } else {
          campo.addClass("borda-vermelha")
          campo.removeClass("borda-verde")
      }
  })
}

let reiniciarJogo = () => {
    campo.attr('disabled', false)
    campo.val("")
    $('#contador-palavras').text("0")
    $('#contador-caracteres').text("0")
    $('#tempo-digitacao').text(tempoInicial)
    campo.removeClass('campo-desativado')
    inicializaCronometro()
    campo.removeClass("borda-vermelha"); 
    campo.removeClass("borda-verde"); 
}


// botaoReiniciar.click(() => {
//   location.reload();
// })