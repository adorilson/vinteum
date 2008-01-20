function Carta(numero)
{
	// algumas constantes para definir todas as cartas
	var NAIPES = ["d", "c", "h", "s"]; //  paus, ouros, copas, espadas
	var NUMEROS = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "t" , "j", "q", "k"];

	this.numero = NUMEROS[(numero % 13)];
	this.naipe = NAIPES[(Math.floor(numero / 13))];

	this.toString = function ()
	{
		return this.numero + this.naipe;
	}

	this.getImagem = function ()
	{
		var img = document.createElement("IMG");
		img.setAttribute("src", "cartas/"+this.toString()+".gif");
		img.setAttribute("alt", this.toString());
		return img;
	}
}