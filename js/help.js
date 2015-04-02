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

function menu()
{
	document.location.href = "menu.html";
}