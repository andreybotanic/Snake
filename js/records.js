var row;
var len;

$(document).ready(function () 
{
	ion.sound({
            sounds: [
				{name: "snap"}
            ],
            path: "sounds/",
            preload: true,
			multiplay: true,
            volume: 1.0
        });	
	$(".button").on("mousedown", function(){
            ion.sound.play("snap");
        });
});

function Compare(left, right)
{
	return left["score"] - right["score"];
} 

function GetRecords()
{
	len = localStorage.length;
	var name;
	for (var i = 0; i < len; i++)
	{
		name = localStorage.key(i);
		row[i] = [];
		row[i]["name"] = name;
		row[i]["score"] = localStorage.getItem(name);
	}
}

$(document).ready(function () 
{
	row = new Array();
	GetRecords();
	row.sort(Compare);
	for (var i = 0; i < len; i++)
	{
		$("#head").after("<tr><td class = 'textbox'>"  + (len - i) +  "</td><td class = 'textbox'>" + row[i]["name"] + "</td><td class = 'textbox'>" + row[i]["score"] + "</td></tr>");
	}
	$(".textbox").css({"left" : "0"});
})

function menu()
{
	document.location.href = "menu.html";
}