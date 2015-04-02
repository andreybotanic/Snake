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

function game()
{
	//ion.sound.play("snap");
	$(".form").css({"visibility" : "visible"});
	$("#cover").css({"visibility" : "visible"});
}

function send() 
{
	//ion.sound.play("snap");
	var name = $("#input-txt").val();
	if (name == '' || name === undefined) 
	{
		cncl();
		return false;
	}
	document.location.href = "game.html?name=" + name;
	return false;
 }
 
 function cncl()
 {
	//ion.sound.play("snap");
	$(".form").css({"visibility" : "hidden"});
	$("#cover").css({"visibility" : "hidden"});
 }
 
 function records()
 {
	//ion.sound.play("snap");
	document.location.href = "records.html";
 }
 
  function help()
 {
	//ion.sound.play("snap");
	document.location.href = "help.html";
 }