stats();

function stats(){
var playerobject = JSON.parse(localStorage.getItem("player"));
var compobject = JSON.parse(localStorage.getItem("comp"));
console.log(playerobject["Games_Played"]);
console.log(compobject["Games_Played"]);
console.log(playerobject["Total_Losses"]);
console.log("Name" + playerobject["Name"]);
console.log(playerobject);
console.log(compobject);

document.getElementById("game_count").innerHTML = "Games Played:  " + playerobject["Games_Played"];
document.getElementById("win_count").innerHTML = "You have won   " + playerobject["Total_Wins"] + " games";
document.getElementById("loss_count").innerHTML = "You have lost  " + playerobject["Total_Losses"] + " games";
document.getElementById("comp_game_count").innerHTML = "The Opponent's Games Played:   " + compobject["Games_Played"];
document.getElementById("comp_win_count").innerHTML = "The Opponent's has won   " + compobject["Total_Wins"] + " games";
document.getElementById("comp_loss_count").innerHTML = "The Opponent's has lost   " + compobject["Total_Wins"] + " games";





  var player_rock = (((playerobject["Rock_Played"])/(playerobject["Games_Played"])) *100).toFixed(2);
  var player_paper = (((playerobject["Paper_Played"])/(playerobject["Games_Played"]))*100).toFixed(2);
  var player_scissors = (((playerobject["Scissors_Played"]/playerobject["Games_Played"]))*100).toFixed(2);

  var comp_rock = (((compobject["Rock_Played"]/playerobject["Games_Played"])*100)).toFixed(2);
  var comp_paper = (((compobject["Paper_Played"]/playerobject["Games_Played"])*100)).toFixed(2);
  var comp_scissors = (((compobject["Scissors_Played"]/playerobject["Games_Played"])*100)).toFixed(2)

  document.getElementById("player_stats").innerHTML = "Rock: "+player_rock+"% Paper: "+player_paper+"% Scissors: "+player_scissors+"%";
 document.getElementById("comp_stats").innerHTML = "Rock: "+comp_rock+"% Paper: "+comp_paper+"% Scissors: "+comp_scissors+"%";
}
