class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
   
    car1 = createSprite(375,200,20,50);
    car1.addImage("car1",car1_img);
    car1.scale=0.4;
    car2 = createSprite(575,200, 20, 50);
    car2.addImage("car2",car2_img);
    //car2.scale=0.5;
    car3 = createSprite(775,200,20,50);
    car3.addImage("car3",car3_img);
    car3.scale=0.4;
    car4 = createSprite(975,200, 20, 50);
    car4.addImage("car4",car4_img);
    //car4.scale=0.5;
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
     
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        
        //use data form the database to display the cars in y direction
       cars[index-1].x= allPlayers[plr].xPosition;
        y = displayHeight - allPlayers[plr].distance;

        //cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(cars[player.index-1].x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.xPosition=cars[player.index-1].x
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      cars[player.index-1].x=cars[player.index-1].x+10;
      player.xPosition=cars[player.index-1].x
      player.update();
      x=cars[player.index-1].x;
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      cars[player.index-1].x=cars[player.index-1].x-10;
      player.xPosition=cars[player.index-1].x
      player.update();
      x=cars[player.index-1].x;
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank = player.rank+1;
      Player.updateCarsAtEnd(player.rank); 
    }
  
   
    drawSprites();
  }

  end(){
       console.log("Game Ended");
    console.log(player.name +":"+player.rank);
  }
}
