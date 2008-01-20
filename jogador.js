function Jogador (nome)
{
	this.nome = nome; 
	this.cartas = new Array();
	this.estourou = false;
	this.fez21 = false;
	this.minPonto = 0;
	this.maxPonto = 0;

	this.areaCarta = null;
	this.areaNumero = null;

	// atribui uma carta ao jogador
	this.puxaCarta = function (carta)
	{
		this.cartas[this.cartas.length] = carta;

		var imagem = carta.getImagem();
		this.areaCarta.appendChild(imagem);

		this.checaPontos();
		this.areaNumero.firstChild.data = (this.minPonto == this.maxPonto) ? this.minPonto : this.minPonto + " / " + this.maxPonto;
	}

	// retorna a menor pontuacao ( com As valendo 1) ou maior (com As valendo 11)
	this.getMelhorPontuacao = function ()
	{
		return (this.maxPonto <= 21) ? this.maxPonto : this.minPonto;
	}

	// atualiza a pontuacao nas variaveis minPonto (considerando As como 1) e maxPonto (As como 11)
	this.checaPontos = function ()
	{
		var temAs = false;
		this.minPonto = 0;
		this.maxPonto = 0;
		for (var i=0; i<this.cartas.length; i++)
		{
			var num = this.cartas[i].numero;
			switch (num)
			{
				case "t": // fall-thru ??
				case "j": // fall-thru ??
				case "q": // fall-thru ??
				case "k":
					num = 10;
					break;
				case "a":
					num = 1;
					break;
				default:
					break;
			}
			this.minPonto += parseInt(num);
			this.maxPonto += parseInt(num);
			if (num == 1 && !temAs)
			{
				this.maxPonto += 10;
				temAs = true;
			}
		}
		//alert (this.nome + ": " + this.minPonto + " " + this.maxPonto)
		// verifica se fez 21 pontos com duas cartas
		if (this.maxPonto == 21 && this.cartas.length == 2)
		{
			this.fez21 = true;
		}
		// verifica se estourou
		else if (this.minPonto > 21)
		{
			this.estourou = true;
		}
		else if (this.maxPonto > 21)
		{
			this.maxPonto = this.minPonto;
		}
	}
}