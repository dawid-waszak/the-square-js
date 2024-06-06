var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');
window.addEventListener("keydown", keyDown, false);

var kolory = ["#a00", "#0a0", "#a0a", "#aa0", "#0aa"];

var koloryText = ["#d00", "#0d0", "#d0d", "#dd0", "#0dd"];

var speed = 10;

var gracz;

var moneta;

var punkty = 0;

var meteoryty = [];

var koniecGry = false;

window.addEventListener("keydown", function(e) { 
	if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { 
		e.preventDefault();
		e.stopPropagation(); 
	} 
}, false);

function drawStroked(text, x, y)
{
	ctx.textAlign = "center";
	ctx.font = "50px self";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 8;
	ctx.strokeText(text, x, y);
	ctx.fillStyle = "white";
	ctx.fillText(text, x, y);
}

function keyDown(e)
{
	if(gracz.przejscie == false)
	{
		switch(e.keyCode)
		{
			case 37: gracz.kierunek = 3;break;
			case 38: gracz.kierunek = 0;break;
			case 39: gracz.kierunek = 1;break;
			case 40: gracz.kierunek = 2;break;
			default: break;
		}
	}
}

function meteoryt()
{
	this.posX = 0;
	this.posY = 0;
	this.width = 40;
	this.dirX = 0;
	this.dirY = 0;
	this.pos = Math.floor(Math.random() * 12);
	
	this.position = function()
	{
		switch(this.pos)
		{
			case 0:	this.posX = 100 + (100 - this.width) / 2;this.posY = -100;
			this.dirY = 1;this.dirX = 0;break;
			case 1:	this.posX = 200 + (100 - this.width) / 2;this.posY = -100;
			this.dirY = 1;this.dirX = 0;break;
			case 2:	this.posX = 300 + (100 - this.width) / 2;this.posY = -100;
			this.dirY = 1;this.dirX = 0;break;
			case 3:	this.posX = canvas.width + 100;this.posY = 100 + (100 - this.width) / 2;
			this.dirY = 0;this.dirX = -1;break;
			case 4:	this.posX = canvas.width + 100;this.posY = 200 + (100 - this.width) / 2;
			this.dirY = 0;this.dirX = -1;break;
			case 5:	this.posX = canvas.width + 100;this.posY = 300 + (100 - this.width) / 2;
			this.dirY = 0;this.dirX = -1;break;
			case 6:	this.posX = 100 + (100 - this.width) / 2;this.posY = canvas.height + 100;
			this.dirY = -1;this.dirX = 0;break;
			case 7:	this.posX = 200 + (100 - this.width) / 2;this.posY = canvas.height + 100;
			this.dirY = -1;this.dirX = 0;break;
			case 8:	this.posX = 300 + (100 - this.width) / 2;this.posY = canvas.height + 100;
			this.dirY = -1;this.dirX = 0;break;
			case 9:	this.posX = -100;this.posY = 100 + (100 - this.width) / 2;
			this.dirY = 0;this.dirX = 1;break;
			case 10:this.posX = -100;this.posY = 200 + (100 - this.width) / 2;
			this.dirY = 0;this.dirX = 1;break;
			case 11:this.posX = -100;this.posY = 300 + (100 - this.width) / 2;
			this.dirY = 0;this.dirX = 1;break;
			default:break;
		}
	}
	
	this.move = function()
	{
		this.posX += this.dirX * 2;
		this.posY += this.dirY * 2;
		this.checkCol();
	}
	
	this.draw = function()
	{
		ctx.fillStyle = "#303030";
		ctx.fillRect(this.posX, this.posY, this.width, this.width);
	}
	
	this.checkCol = function()
	{
		if(gracz.posX + gracz.width >= this.posX && gracz.posX <= this.posX + this.width && gracz.posY + gracz.width >= this.posY && gracz.posY <= this.posY + this.width)
		{
			koniecGry = true;
		}
	}
}

function coin()
{
	this.pos = Math.floor(Math.random() * 9);
	this.posX = 0;
	this.posY = 0;
	this.width = 20;
	
	this.random = function()
	{
		this.pos = Math.floor(Math.random() * 9);
		this.position();
		if(gracz.posX == this.posX - 20 && gracz.posY == this.posY - 20)
		{
			if(this.pos == 0)
				this.pos++;
			if(this.pos == 8)
				this.pos--;
			else
				this.pos++;
		}
	}
	
	this.position = function()
	{
		switch(this.pos)
		{
			case 0:	this.posX = 100 + (100 - this.width) / 2;this.posY = 100 + (100 - this.width) / 2;break;
			case 1:	this.posX = 200 + (100 - this.width) / 2;this.posY = 100 + (100 - this.width) / 2;break;
			case 2:	this.posX = 300 + (100 - this.width) / 2;this.posY = 100 + (100 - this.width) / 2;break;
			case 3:	this.posX = 100 + (100 - this.width) / 2;this.posY = 200 + (100 - this.width) / 2;break;
			case 4:	this.posX = 200 + (100 - this.width) / 2;this.posY = 200 + (100 - this.width) / 2;break;
			case 5:	this.posX = 300 + (100 - this.width) / 2;this.posY = 200 + (100 - this.width) / 2;break;
			case 6:	this.posX = 100 + (100 - this.width) / 2;this.posY = 300 + (100 - this.width) / 2;break;
			case 7:	this.posX = 200 + (100 - this.width) / 2;this.posY = 300 + (100 - this.width) / 2;break;
			case 8:	this.posX = 300 + (100 - this.width) / 2;this.posY = 300 + (100 - this.width) / 2;break;
		}
	}
	
	this.playerCol = function()
	{
		if(gracz.posX == this.posX - 20 && gracz.posY == this.posY - 20)
		{
			punkty++;
			this.random();
		}
	}	
	
	this.update = function()
	{
		this.position();
		this.playerCol();
	}
	
	this.draw = function()
	{
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.posX, this.posY, this.width, this.width);
	}	
}

function player()
{
	this.width = 60;
	this.kierunek = -1;
	this.posX = 120;
	this.posY = 120;
	this.pos = 0;
	this.przejscie = false;
	this.tempX = 0;
	this.tempY = 0;
	
	this.draw = function()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(this.posX, this.posY, this.width, this.width);
	}	
	
	this.move = function()
	{
		if(this.kierunek == 0 && this.posY > 120 && this.przejscie == false)
		{
			this.kierunek = -1;
			this.tempY = this.posY - 100;
			this.przejscie = true;
		}
		if(this.kierunek == 1 && this.posX < 320 && this.przejscie == false)
		{
			this.kierunek = -1;
			this.tempX = this.posX + 100;
			this.przejscie = true;
		}
		if(this.kierunek == 2 && this.posY < 320 && this.przejscie == false)
		{
			this.kierunek = -1;
			this.tempY = this.posY + 100;
			this.przejscie = true;
		}
		if(this.kierunek == 3 && this.posX > 120 && this.przejscie == false)
		{
			this.kierunek = -1;
			this.tempX = this.posX - 100;
			this.przejscie = true;
		}
		if(this.przejscie)
			this.animacja();
	}
	
	this.animacja = function()
	{
		if(this.posX != this.tempX && this.tempX != 0)
			if(this.posX > this.tempX)
				this.posX-=4;
			else
				this.posX+=4;
		else if(this.posX == this.tempX)
		{
			this.tempX = 0;
			this.tempY = 0;
			this.przejscie = false;
		}
		if(this.posY != this.tempY && this.tempY != 0)
			if(this.posY > this.tempY)
				this.posY-=4;
			else
				this.posY+=4;
		else if(this.posY == this.tempY)
		{
			this.tempX = 0;
			this.tempY = 0;
			this.przejscie = false;
		}
	}	
}

var los = Math.floor(Math.random() * kolory.length)

var kolor = kolory[los];

var kolorText = koloryText[los];

function background()
{
	ctx.fillStyle = kolor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "white";
	ctx.lineWidth = 10;
	ctx.strokeRect(100, 100, 300, 300);
}

function create()
{
	meteoryty.push(new meteoryt());
	meteoryty[meteoryty.length - 1].position();
}

function Start()
{
	gracz = new player();
	moneta = new coin();
	moneta.random();
}

function Update()
{
	if(koniecGry == false)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		background();
		ctx.fillStyle = kolorText;
		ctx.textAlign = "center";
		ctx.font = "200px self";
		ctx.fillText(punkty, canvas.width / 2, canvas.height / 2 + 70);
		moneta.update();
		moneta.draw();
		gracz.draw();
		gracz.move();
		for(var i  = 0;i < meteoryty.length;i++)
		{
			meteoryty[i].move();
			meteoryty[i].draw();
		}
	}
}

window.onload = function()
{
	Start();
	setInterval(Update, speed);
	setInterval(create, (Math.floor(Math.random() * 1) + 1) * 1000);
}