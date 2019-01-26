if(document.title==="P,R,S - Game"){
    document.getElementById("hurry").innerHTML="Play the Game";
    document.getElementById("referee").src='/images/ref_imgs/3.png';
    setTimeout(function(){
      document.getElementById("referee").src='/images/ref_imgs/2.png';}, 1000);

    setTimeout(function(){
      document.getElementById("referee").src='/images/ref_imgs/1.png';
    }, 3000);

    setTimeout(function(){
      document.getElementById("referee").src='/images/ref_imgs/go.png';
    }, 6000);

    setTimeout(function(){
      document.getElementById("referee").src='/images/ref_imgs/hurryup.png';
      }, 15000);

}
