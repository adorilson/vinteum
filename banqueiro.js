function VinteUm()
{

	// inicia o jogo, dando uma carta para o banqueiro e duas para o jogador
	this.iniciar = function ()
	{
		this.jogador = new Jogador("jogador");
		this.jogador.areaCarta = document.getElementById("tblP");
		this.jogador.areaNumero = document.getElementById("sumP");

		this.banqueiro = new Jogador("banqueiro");
		this.banqueiro.areaCarta = document.getElementById("tblD");
		this.banqueiro.areaNumero = document.getElementById("sumD");

		// removendo as cartas q estão na mesa
		while (document.getElementById('tblD').firstChild)
			document.getElementById('tblD').removeChild(document.getElementById('tblD').firstChild);
		document.getElementById('sumD').firstChild.data = 0;
		while (document.getElementById('tblP').firstChild)
			document.getElementById('tblP').removeChild(document.getElementById('tblP').firstChild);
		document.getElementById('sumP').firstChild.data = 0;

		this.jogadorPuxaCarta();
		this.banqueiroPuxaCarta();
		this.jogadorPuxaCarta();
	}

	//  faz o jogador puxar uma carta e verificada a pontuacao dele
	this.jogadorPuxaCarta = function ()
	{
		var carta = this.desenhaCarta();
		this.jogador.puxaCarta(carta);
		
		if (this.jogador.fez21)
		{
			this.jogadorVenceu();
		}
		else if (this.jogador.estourou)
		{
			this.jogadorPerdeu();
		}
	}

	// faz o banqueiro puxar uma carta
	this.banqueiroPuxaCarta = function ()
	{
		var carta = this.desenhaCarta();
		this.banqueiro.puxaCarta(carta);
	}

	this.mesa = function ()
	{
		if (this.banqueiro.fez21)
		{
			this.jogadorPerdeu();
		}
		else if (this.banqueiro.estourou)
		{
			this.jogadorVenceu();
		}
		else if (this.banqueiro.getMelhorPontuacao() < 17)
		{
			var carta = this.desenhaCarta();
			this.banqueiro.puxaCarta(carta);
			setTimeout("jogo.mesa()", 250);
		}
		else if (this.banqueiro.getMelhorPontuacao() < this.jogador.getMelhorPontuacao())
		{
			this.jogadorVenceu();
		}
		else if (this.banqueiro.getMelhorPontuacao() > this.jogador.getMelhorPontuacao())
		{
			this.jogadorPerdeu();
		}
		else
		{
			this.empate();
		}
	}

	this.desenhaCarta = function ()
	{
		do
		{
			var carta = new Carta(Math.floor(Math.random()*52));
		} while (this.cartaFoiPuxada(carta));
		return carta;
	}

	this.cartaFoiPuxada = function (carta)
	{
		var cartasPuxadas = this.jogador.cartas.concat(this.banqueiro.cartas);
		for (var i=0; i<cartasPuxadas; i++)
		{
			if (cartasPuxadas[i].toString() == carta.toString())
			{
				return true;
			}
		}
		return false;
	}

	this.jogadorPerdeu = function ()
	{
		alert("Voce perdeu!");
		this.iniciar();
	}

	this.jogadorVenceu = function ()
	{
		alert("Voce venceu!");
		this.iniciar();
	}

	this.empate = function ()
	{
		alert("Empate!");
		this.iniciar();
	}
}