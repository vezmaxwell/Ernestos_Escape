function init(){


//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* create grid - contains the grid, the cars, 
  // I will make my grid 11 * 11 (so first character can sit right in the middle!)
  // Add class land and water to top half and bottom half of cells
  // addOctopus(cell position) - how I will add more characters, and move around screen !
  // removeOct - to take away from previous square so there aren't a million octopuses 

  //make car objects
    function moveLeft(){}  // was going to put these inside objects? but will need them later
    function moveRight(){} 
  //longCar, shortCar (objects), need to work out how to make the longCar span 2 cells
  //addCar(cell position), addLongCar(cell position)
  //add classes for waterCar or landCar to the cars dependent on the row (use the indexes) as how the octopus interacts with them changes depending on which half of the grid we're on
  //for later styling, access longCar or shortCar with class of water or land, or use their indexes etc if I want to use lots of different images (we'll see haha!)



//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* create movement!
  // here will be the function/ if else statements for mapping the arrow keys to the movement of the octopus 



//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* audio
  // I don't want the music to restart every single time you die, that would be annoying? Maybe a function that plays the audio when the play button is clicked 
  // I will create an if statement 
  // If start button is pressed play main song




//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* game begins - this is the page that will listen for the click of the button, regardless of what innerHTML says
let gameTime = 120000    // full time bar OR clock, this is going to count backwards
let lives = 3
let safe = 0


function startGame(){
  // put gametime, lives and safe in here so it resets
  // titleScreen display none 
  // set an interval that will count the game time backwards once the play button is pressed 
  // gameTime -= 1000
  // if gameTime === 0 trigger gameLoose 
    // it will be linked to a bar that displays on the page and counts down the time for the player
}

playBtn.addEventListener('click', startGame)






//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* gamePlay - this will determine what happens as the game is played!
let score = 0 
let safe = 0

function gamePlay(){
  const safeDen = cellPosition[2, 4, 6, 8, 10]
  // for all movements into an empty cell, player gets +10 score
  // if player gets to a safe den, +100 score and addOctopus(cell position)   (SOME ARRAY METHOD, if octopus has an array of ANY of safe den etc)

  // if he collides with a land car, -1 life, removeOctopus
  // if he collides with a water car, aka if octopus has same cell position index as water car, the same function moving THAT particular row needs to work on the frog
  
  // if lives < 0, gameLoose
  // if 5 octopus reach the safeDen cells, if safe === 5, gameWin
}




//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* gameEnds - this is what happens when the game ends. this is where i will edit the innerHTML dependent on how they got there
const titleScreen = document.querySelector('.title-screen')


function gameWin(){
  // using titleScreen const, inner.HTML appropriate for play again button and h1 text to say you won your score was ${score}
  // the top event listener will handle the click of button
}

function gameLoose(){
  // using titleScreen const, inner.HTML appropriate for try again button and h1 text to say you lost your score was ${score}
  //timeout()
}

function timeout(){
  // set a timeout so if the player does nothing for a minute the page refreshes
}

timeout() // call so this is always running


//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//*

}

window.addEventListener('DOMContentLoaded', init)






function gameEnds(){
  // stop the song
  // using titleScreen constant
  // score resets here!   do NOT do it in startGame
  // the title screen will be the automatic thing that loads when the page loads
  // if play button has been pressed, title screen display none (fade it), startGame
  // else if gameTime === 0 || (lives =< 0) title screen will display with innerHTML appropriate.
            // if player presses button to play again, startGame   -- do i even need these if already listening above??? no?!
            // else display title screen 
  // else if player gets all characters across (safeOct = 5), display title screen with innerHTML appropriate
            // if player presses button to play again, startGame
            // else display title screen      
}  // maybe i will set a time out that will reload the page if nothing happens for a minute
