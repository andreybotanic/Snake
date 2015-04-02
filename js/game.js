const SIZE = 22;

var dir = 0;
var next_dir = 0;
var score = 0;
var field;
var head = {i:10, j:10};
var food = new Object();
var isGame = false;
var timer;
var name;

function getParam(sParamName)
{
	var Params = location.search.substring(1).split("&");
	for (var i = 0; i < Params.length; i++)
	{
		if (Params[i].split("=")[0] == sParamName)
		{
			if (Params[i].split("=").length > 1)
				variable = Params[i].split("=")[1];
			return variable;
		}
	}
	return "";
}

Object.prototype.clone = function()	// deep copy
{
    var f = function () {};
    f.prototype = this;
    var g = new f();
    g.prototype = this;
    return g;
}

function Rand(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () 
{
    name = getParam("name");	
	field = new Array(SIZE);
	for (var i = 0; i < SIZE; i++)
		field[i] = new Array(SIZE);
	for (var i = 0; i < SIZE; i++)
		for (var j = 0; j < SIZE; j++)
		{
			$("#field").append("<div class = 'cell box i" + i + " j" + j +
								"' style = 'top: " + (i*(SIZE+2)-1) + "px; left: " + 
								(j*(SIZE+2)-1) + "px;'></div>").appendTo(document.body);
			field[i][j] = 0;
		}
	field[head.i][head.j] = 1;
	food.i = Rand(0, SIZE - 1);
	food.j = Rand(0, SIZE - 1);
	ion.sound({
            sounds: [
                {name: "step"},
                {name: "eat"},
				{name: "snap"},
				{name: "boom"}
            ],
            path: "sounds/",
            preload: true,
			multiplay: true,
            volume: 1.0
        });

        $("#step").on("click", function(){
            ion.sound.play("step");
        });
		 $("#eat").on("click", function(){
            ion.sound.play("eat");
        });
		$("#boom").on("click", function(){
            ion.sound.play("boom");
        });
		$(".button").on("mousedown", function(){
            ion.sound.play("snap");
        });
	Render();
});

function Render()
{
	for (var i = 0; i < SIZE; i++)
		for (var j = 0; j < SIZE; j++)
		{
			if (food.i == i && food.j == j)
				$(".i" + i + ".j" + j).addClass("food");
			else
				$(".i" + i + ".j" + j).removeClass("food");
			if (field[i][j])
				$(".i" + i + ".j" + j).addClass("hebi");
			else
				$(".i" + i + ".j" + j).removeClass("hebi");
		}
	var tmp = score, i = 2;
	$("#score1").text(tmp % 10);
	tmp  = tmp / 10 | 0;	// integer division
	while (tmp)
	{
		if (!($("#score"+i).length))
		{
			$("#score"+(i-1)).before("<div id = 'score" + i + "' class = 'textbox score'></div>");
			$("#score"+i).css({"margin-left" : (250 - 23*(i-1)) + "px"});
		}
		$("#score"+i).text(tmp % 10);
		tmp  = tmp / 10 | 0;
		i++;
	}
}

function StoreScore()
{
	var names = new Array();
	var scores = new Array();
	//localStorage.clear();	// uncomment to clear score table
	// getting data
	var len = localStorage.length;
	for (var i = 0; i < len; i++)
	{
		names[i] = localStorage.key(i);
		scores[names[i]] = localStorage.getItem(names[i]);
	}
	i = len - 1;
	if (len == 0)
		localStorage.setItem(name, score);
	else if (score > parseInt(scores[i]) || len < 10)
	{
		var have = false;
		for (i = 0; i < len; i++)
			if (names[i] == name)
			{
				have = true;
				break;
			}
		if (have)
		{
			if (score > parseInt(scores[name]))
				scores[name] = "" + score + "";
		}
		else
		{
			if (len < 10)
			{
				names[i] = name;
				scores[name] = "" + score + "";
				i++;
				len++;
			}
			else
			{
				scores[name] = "" + score + "";
				names[i] = name;
			}
		}
		localStorage.clear();
		for (i = 0; i < len; i++)
			localStorage.setItem(names[i], scores[names[i]]);
	}
}

function GameOver()
{
	clearInterval(timer);
	$('#boom').trigger('click'); 
	$("#cover").css({"visibility" : "visible"});
	$(".form").css({"visibility" : "visible"});
	$(".gameover").css({"visibility" : "visible"});
	StoreScore();
}

function records()
{
	document.location.href = "records.html";
}

function Move()
{
	var new_head = head.clone();
	switch (dir)
	{
		case 1: new_head.i--; break;
		case 2: new_head.j++; break;
		case 3: new_head.i++; break;
		case 4: new_head.j--; break;
	}
	if (new_head.i >= 0 && new_head.i < SIZE && new_head.j >= 0 && new_head.j < SIZE)
	{
		if (field[new_head.i][new_head.j])
			GameOver();
		else
		{
			for (var i = 0; i < SIZE; i++)
				for (var j = 0; j < SIZE; j++)	
					if (field[i][j])
						field[i][j]--;
			field[new_head.i][new_head.j] = field[head.i][head.j] + 1;
			head = new_head;
			if (food.i == head.i && food.j == head.j)
			{
				$('#eat').trigger('click'); 
				score++;
				for (var a = 0; a < SIZE; a++)
					for (var b = 0; b < SIZE; b++)
						if (field[a][b])
							field[a][b]++;
				//	Generate food
				do
				{
					food.i = Rand(0, SIZE - 1);
					food.j = Rand(0, SIZE - 1);
				}
				while (field[food.i][food.j])
			}
			$('#step').trigger('click'); 
		}
	}
	else
	{
		GameOver();
	}
	Render();
	if (next_dir)
	{
		dir = next_dir;
		next_dir = 0;
	}
}

function keycheck()
{
	if (!isGame)
	{
		isGame = true;
		timer = setInterval(function() {Move()} , 200);
	}	
	var code = event.keyCode;
	if (!dir || (dir % 2 == code % 2))
		if (!dir || !next_dir)
			switch (code)
			{
				case 38: dir = 1; next_dir = 1; break;
				case 39: dir = 2; next_dir = 2; break;
				case 40: dir = 3; next_dir = 3; break;
				case 37: dir = 4; next_dir = 4; break;
			}
		else
		{
			switch (code)
			{
				case 38: next_dir = 1; break;
				case 39: next_dir = 2; break;
				case 40: next_dir = 3; break;
				case 37: next_dir = 4; break;
			}
		}
}