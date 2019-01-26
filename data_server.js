var express = require('express');
var fs = require('fs');
var assert = require('assert');
var favicon = require('serve-favicon');
var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

var port = 3000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

var username;
var password;
var villainsthrowsarray=[];

app.get('/', function(request, response){
  var user_data = {
    failure:0
  };

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:user_data});
});

app.get('/login', function(request, response){

  var user_data={
      name: request.query.user_name,
      password: request.query.user_password
  };
  username = user_data.name;
  password = user_data.password;

var c=false;

var users_file = fs.readFileSync('data/users.csv', 'utf8');
var rows = users_file.split('\n');
var user_info = [];
var userstring = "";

for(var i=0; i<rows.length;i++){
  user_info.push(rows[i].trim().split(","));
}

for(var i=0; i<user_info.length;i++){
  if(String(user_info[i][0]) == username && String(user_info[i][8]) == password){
        response.status(200);
        response.setHeader('Content-Type','text/html');
        response.render('game', {user:user_data});
      }
  else if(String(user_info[i][0]) == username && String(user_info[i][8])!= password){
    var userf_data = {
      failure: 4
    };
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('index', {user:userf_data});
    }
  else if(String(user_info[i][0])!=username){
      if(i<user_info.length-1){
        continue;
      }
      else{
        c = true;
        break;
      }
    }
  }
if(c==true){
  for(var i=0; i<user_info.length-1; i++){
    var c = (user_info[i].toString()) + "\n";
    userstring += c
  }


  var nameadd = [user_data.name, 0, 0, 0, 0, 0, 0, 0, user_data.password];
  var file = nameadd.join(",");
  file += "\n";
  userstring += file;
  fs.writeFileSync('data/users.csv', userstring, 'utf8');
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('game', {user:user_data});


  }
});

app.get('/:user/results', function(request, response){

var user_data = {
  name: request.params.user,
  weapon: request.query.weapons
}
var k = randomThrow();
var villain_data = {
  name: request.query.villains,
  weapon: k
}
var vilweapon = String(villain_data.weapon);
var userweapon = String(user_data.weapon);
var villname = villain_data.name;
var arrayswitch;

villain_data.weapon = villainthrow(villname,userweapon,vilweapon)[0];


var c = "Rock";
var k = "Paper";
var d = "Scissors";
var winner;

//console.log("Villainsthrowsarray loading" + villainsthrowsarray);

var compare = vilweapon.localeCompare(userweapon);
if(vilweapon =="Rock" && userweapon=="Paper"){
  compare = 1
}
else if(vilweapon =="Rock" && userweapon=="Scissors"){
  compare = -1;
}

else if(vilweapon =="Paper" && (userweapon=="Scissors" || userweapon=="Rock")){
  compare = -1;
}
else if(vilweapon == "Scissors" && (userweapon =="Paper" || userweapon == "Rock")){
  compare = 1;
}
else{
  compare = 0;
}



//Some villains with throw strategies had to be hardcoded in
  if(villname == "The Boss"){
    if(userweapon == "Paper"){
    compare = 1;
    }
    else if(userweapon == "Scissors"){
    compare = -1;
    }
    else {
    compare = -1;
    }
  }

  if(villname == "Comic Hans"){
    if(userweapon == "Paper"){
    compare = 1;
    }
    else if(userweapon == "Scissors"){
    compare = -1;
    }
    else if(userweapon == "Rock"){
    compare = 1;
    }
  }

  if(villname == "Pixie"){
    villain_data.weapon = "Paper";
    if(userweapon == "Paper"){
    compare = 0;
    }
    else{
    compare = -1;
    }
  }

  if(villname == "Regal"){
    villain_data.weapon = "Rock";
    if(userweapon == "Rock"){
    compare = 0;
    }
    else if(userweapon == "Paper"){
      compare = 1;
    }
    else{
      compare = -1;
    }
  }

  if(villname == "Pixie"){
    villain_data.weapon = "Paper";
    if(userweapon == "Paper"){
    compare = 0;
    }
    else{
    compare = -1;
    }
  }

  if(villname == "Mickey"){
    villain_data.weapon == "Scissors";
    if(userweapon =="Scissors"){
      compare = 0;
    }
    else{
      compare = 1;
    }
  }
  if(villname == "Gato"){
    if(userweapon =="Scissors" && villain_data.weapon == "Scissors" ){
      compare = 0;
      winner = "Tie";
    }
    if(userweapon =="Paper" && villain_data.weapon == "Scissors" ){
      compare = 1;
      winner = "Gato";
    }
    if(userweapon =="Paper" && villain_data.weapon == "Paper" ){
      compare = 0;
      winner = "Tie";
    }
    if(userweapon = "Paper" && villain_data.weapon == "Rock"){
      compare = 1;
      winner = user_data.name;
    }
  }

  if(villname == "Mr Modern"){
    if(userweapon =="Rock" && villain_data.weapon == "Rock" ){
      compare = 0;
      winner = "Tie";
    }
    if(userweapon =="Scissors" && villain_data.weapon == "Scissors" ){
      compare = 0;
      winner = "Tie";
    }
    if(userweapon =="Paper" && villain_data.weapon == "Paper" ){
      compare = 0;
      winner = "Tie";
    }
  }

  if(villname == "The Magician"){

  }


  if(villname == "Harry"){
  }

var index;
var index2;
var user_info = [];
var villain_info = [];

var users_file = fs.readFileSync('data/users.csv', 'utf8');
var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
var rows = users_file.split('\n');
var rows2= villains_file.split('\n');
//var c = true;

for(var i=0; i<rows.length; i++){
  user_info.push(rows[i].trim().split(","));
}
for(var i=0; i<rows2.length;i++){
  villain_info.push(rows2[i].trim().split(","));
}
for(var i=0; i<user_info.length; i++){
  if(String(user_info[i][0]) == String(user_data.name)){
    index = i;
    break;
  }
}
for(var i=0;i<villain_info.length;i++){
  if(String(villain_info[i][0]) == String(villain_data.name)){
    index2 = i;
    break;
  }
}


    user_info[index][1] = changeIndexValue(user_info[index][1]);
    villain_info[index2][1] = changeIndexValue(villain_info[index2][1]);
    //console.log("game user played" + user_info[index][1]);
    if(compare==-1 && String(villain_data.weapon)=="Paper"){
      //console.log("Userweapon" + userweapon);
      if(userweapon=="Rock"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner= villain_info[index2][0];
      }

      else if(userweapon=="Scissors"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner=user_info[index][0];
      }
      //console.log("Winner determined" + winner);
    }
    if(compare==0 && villain_data.weapon=="Paper"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][5] = changeIndexValue(villain_info[index2][5]);
      winner = "Tie";
    //  console.log("Winner determined" + winner);
    }

      //console.log("Winner determined" + winner);
  //  }
    if(compare==0 && villain_data.weapon=="Rock"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner = "Tie";
      //console.log("Winner determined" + winner);
    }
    if(compare==1 && villain_data.weapon=="Rock"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][5] = changeIndexValue(user_info[index][5]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner= user_info[index][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==-1 && villain_data.weapon=="Rock"){
      user_info[index][3] = changeIndexValue(user_info[index][3]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
      villain_info[index2][7] = changeIndexValue(villain_info[index2][7]);
      winner= villain_info[index2][0];
      //console.log("Winner determined" + winner);
    }
    if(compare==1 && String(villain_data.weapon)=="Scissors"){
      //console.log("Tested with Comic Hans");
      if(userweapon=="Rock"){
      user_info[index][2] = changeIndexValue(user_info[index][2]);
      user_info[index][7] = changeIndexValue(user_info[index][7]);
      villain_info[index2][3] = changeIndexValue(villain_info[index2][3]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner= user_info[index][0];
      //console.log("Winner determined" + winner);
      }
      else {
        user_info[index][3] = changeIndexValue(user_info[index][3]);
        user_info[index][5] = changeIndexValue(user_info[index][5]);
        villain_info[index2][2] = changeIndexValue(villain_info[index2][2]);
        villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
        winner = villain_info[index2][0];
        //console.log("Winner determined" + winner);
      }
    }

    if(compare==0 && villain_data.weapon=="Scissors"){
      user_info[index][4] = changeIndexValue(user_info[index][4]);
      user_info[index][6] = changeIndexValue(user_info[index][6]);
      villain_info[index2][4] = changeIndexValue(villain_info[index2][4]);
      villain_info[index2][6] = changeIndexValue(villain_info[index2][6]);
      winner = "Tie";
      //console.log("Winner determined" + winner);
    }

  var winner_data = {
    winner: winner
  }
var userstring = "";
var villainstring = "";

for(var i=0;i<user_info.length-1;i++){
  var c = (user_info[i].toString());
  var k = "\n";
  userstring += (c+k);
}
//console.log("results" + userstring);

for(var i=0; i<villain_info.length-1;i++){
  var c = (villain_info[i].toString());
  var k = "\n";
  villainstring += (c+k);
}
//console.log("results" + villainstring);
var users_file = fs.writeFileSync('data/users.csv', userstring, 'utf8');
var villains_file = fs.writeFileSync('data/villains.csv', villainstring, 'utf8');

    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('results',{user:user_data, villain:villain_data, winner:winner_data});

});

app.get('/playagain',function(request,response){
  var user_data = {
    name: username,
    password: password
  }
  response.status(200);
  response.setHeader('Content-Type','text/html');
  response.render('game', {user:user_data});
});

app.get('/rules', function(request, response){
  //load the csv
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('rules');
});


app.get('/stats', function(request, response){
  var users_file = fs.readFileSync('data/users.csv','utf8');
  //console.log("userfilestat" + users_file);
  var villains_file = fs.readFileSync('data/villains.csv', 'utf8');
  var rows = users_file.split('\n');
  var rows2 = villains_file.split('\n');

  var user_data = [];
  var villain_data = [];
  for(var i=0;i<rows.length;i++){
    var userdata = rows[i].trim().split(",");
    //console.log("Important" + userdata);
    var user = {};
    user["name"] = userdata[0];
    user["total_games"] = parseInt(userdata[1]);
    user["wins"] = parseInt(userdata[2]);
    user["losses"] = parseInt(userdata[3]);
    user["ties"] = parseInt(userdata[4]);
    user["paper"] = parseInt(userdata[5]);
    user["scissors"] = parseInt(userdata[6]);
    user["rock"] = parseInt(userdata[7]);
    user["pswrd"] = userdata[8];
    //console.log(user);
    user_data.push(user);
    //console.log("Data" + user_data)
  }

  for(var i=1;i<rows2.length-1;i++){
    var villaindata = rows2[i].trim().split(",");
    var villain= {};
    //console.log("important" + villaindata);
    villain["name"] = villaindata[0];
    //console.log("Check" + villain["Name"] + typeof(villain["Name"]));
    villain["total_games"] = parseInt(villaindata[1]);
    //console.log(villain["total_games"] + typeof(villain["total_games"]));
    villain["wins"] = parseInt(villaindata[2]);
    villain["losses"] = parseInt(villaindata[3]);
    villain["ties"] = parseInt(villaindata[4]);
    villain["paper"] = parseInt(villaindata[5]);
    villain["scissors"] = parseInt(villaindata[6]);
    villain["rock"] = parseInt(villaindata[7]);
    villain_data.push(villain);
  //  console.log(villain);
  //  console.log("Data2" + villain_data);
  }

villain_data.sort(function(a,b){
  //console.log(a.wins+" "+a.total_games);

if(a.total_games>0 && b.total_games>0){
  if((a.wins/a.total_games) > (b.wins/b.total_games)){
    return -1;
  }
  else if((a.wins/a.total_games) < (b.wins/b.total_games)){
    return 1;
  }
  else{
    return 0;
  }
}
else if(a.total_games == 0 & b.total_games > 0){
  return 1;
}
else{
  return -1;
}

});



  var data = {};
  data["player"] = user_data;
  data["villain"] = villain_data;
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('stats', {user: data});
});

app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('about');
});



function changeIndexValue(element){
  element = (parseInt(element) + 1);
  //console.log("Called");
  return element;
}


function villainthrow(villain,userchoice,villainschoice){
  var user = userchoice;
  var random = (10 * Math.random());
  var index = [];
  var compare;

  var nothrow = false;
  if(villain == "Bones"){
    choice = villainschoice;
    compare = user.localeCompare(choice);
    //console.log("Bones choice" + choice + "userchoice" + user + "Compare" + compare);
  }
  else if(villain == "Pixie"){
    choice = "Paper";
    if(user == "Paper"){
      compare = 0;
    }
    else{
      compare = -1;
    }
  }

  else if(villain == "Comic Hans"){
  //  console.log("userchoiceboss" + userchoice);
    if(userchoice == "Rock"){
      choice = "Scissors";
      compare = 1
    //  console.log("Choicehappened" + choice);

    }
    else if(userchoice == "Paper"){
      choice = "Rock";
      compare = 1
    //  console.log("Choicehappened" + choice);

    }
    else{
      choice = "Paper";
      compare = -1
      //console.log("Choicehappened" + choice);

    }
    //console.log("Comic Hans choice" + choice + "userchoice" + user + "Compare" + compare);
  }

  else if(villain == "Gato"){
    if(random>7){
      choice = villainschoice;
    }
    else if(random<7 && random>5){
      if(userchoice == "Rock"){
        choice = "Scissors";
      }
      if(userchoice == "Paper"){
        choice = "Rock";
      }
      else{
        choice = "Paper";
      }
    }
    else if(random<5 && random>3){
      choice = userchoice;
    }
    else{
      if(userchoice == "Rock"){
        choice = "Paper";
      }
      if(userchoice == "Paper"){
        choice = "Rock";
      }
      else{
        choice = "Scissors";
      }
    }
    compare = user.localeCompare(choice);
    //console.log("Gato choice" + choice + "userchoice" + user + "Compare" + compare);
  }
  else if(villain == "Mr Modern"){
    if(random<2){
      choice = villainschoice;

    }
    else if(random<7 && random>5){
      choice = "Rock"
    }
    else if(random>5 && random<7){
      if(userchoice == "Rock"){
        choice = "Paper";
      }
      if(userchoice == "Paper"){
        choice = "Rock";
      }
      else{
        choice = "Scissors";
      }
    }
    else{
      choice = userchoice;
    }
    compare = user.localeCompare(choice);
    //console.log("Mr.Modern choice" + choice + "userchoice" + user + "Compare" + compare);
  }

  else if(villain == "Regal"){
    choice = "Rock";
    if(user == "Rock"){
    compare = 0;
    }
    else if(user == "Paper"){
      compare = 1;
    }
    else{
      compare = -1;
    }
    //console.log("Regal choice" + choice + "userchoice" + user + "Compare" + compare);
  }

//The Boss: Always Wins
  else if(villain == "The Boss"){
    if(userchoice == "Rock"){
      choice = "Paper";
      compare = 1;
    }
    else if(userchoice == "Paper"){
      choice = "Scissors";
      compare = -1;

    }
    else if(userchoice == "Scissors"){
      choice = "Rock";
      compare = -1;
    }
  }



//throws depending on what last villain chose
  else if(villain == "Harry"){
    choice = villainschoice;
    compare = user.localeCompare(choice);

  }

//Always throw Scissors
  else if(villain == "Mickey"){
    choice = "Scissors";
    if(user =="Scissors"){
      compare = 0;
    }
    else{
      compare = 1;
    }
  }

  else if(villain == "Pixie"){
    choice = villainschoice;
    compare = user.localeCompare(choice);
    //console.log("Pixie choice" + choice + "userchoice" + user + "Compare" + compare);
  }
  else if(villain == "Spock"){
    choice = villainschoice;
    compare = user.localeCompare(choice);
    //console.log("Spock choice" + choice + "userchoice" + user + "Compare" + compare);
  }
//Never Throws the Same Thing Twice
  else if(villain == "The Magician"){
    choice = villainschoice;
    compare = user.localeCompare(choice);
  }


if(choice!=""){
  villainsthrowsarray.push([villain,choice]);
//  console.log("Throw array" + villainsthrowsarray)
}
var k = [choice, compare];
  //console.log("final return vil" + choice);
  return k;
}


function randomThrow(){
  var throwoptions = ["Rock", "Paper", "Scissors"];
  return throwoptions[(3*Math.random())|0];
}
