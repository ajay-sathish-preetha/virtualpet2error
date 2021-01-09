//Create variables here
var dog,dogImage,dogHappy;
var database,foodStock;
var foodS;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  dogImage = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
 foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  createCanvas(500, 500);

  dog = createSprite(300,400,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  foodObj = new Food();

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
}


function draw() {  
  background(46,139,87);
  foodObj.display();

   fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + "PM" ,350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM", 350,30);
   }else{
     text("Last Feed : "+ lastFed + "AM" ,350,30);
   }
  drawSprites();

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

   if(x<-0){
      x-0;
   } else{
     x=x-1;
   }

   database.ref('/').update({
     Food:x
   })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

 function feedDog(){
    dog.addImage(dogHappy);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
}


