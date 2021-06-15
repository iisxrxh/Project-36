var dog,sadDog,happyDog,bedRoom, database;
var foodS,foodStock;
var addFood, feedFood;
var foodObj;
var fedTime, currentTime;



var feed;
var lastFed = 0;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bedRoom = loadImage("room.jpg")

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('feedTime')
  fedTime.on("value", function(data){
    lastFed = data.val()
  })
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood = createButton("Feed the Dog");
  feedFood.position(900, 100)
  feedFood.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,100);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bedRoom);

  currentTime = hour()
  if(currentTime === (lastFedTime + 1)){
    update("Play")
  }
  else if(currentTime == (lastFedTime +2)){
     update("Sleeping")
  }
  else if(currentTime > (lastFedTime+2) && currentTime <= (lastFedTime+4)){
    update("Bathing")
  }
  foodObj.display();

  //write code to read fedtime value from the database 
  

  
 
  //write code to display text lastFed time here
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}


  

  //write code here to update food stock and last fed time
 var food_stock_val = foodObj.getFoodStock();
 if(food_stock_val <= 0){
   foodObj.updateFoodStock(food_stock_val * 0);
}
else{
  foodObj.updateFoodStock(food_stock_val -1);
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })


}

async function lastFedTime(){

   
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseType = await response.json()
  var datetime = responseType.datetime
  lastFed = datetime.slice(11, 13)

  

}


