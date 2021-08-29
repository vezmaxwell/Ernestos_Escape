
function init(){


//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* global variables ----------------------

  let shortCarStart = [12, 15, 18, 21, 35, 38, 41, 56, 59, 62, 65, 79, 82, 85]
  let longCarStart = [24, 25, 30, 31, 68, 69, 74, 75]
  const safeDen = [1, 3, 5, 7, 9]

  const playBtn = document.querySelector('.play-btn')
  let score = 0
  let safe = 0 

  // console.log(lives)

//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

// function to start the game on click of play button, title screen goes away
  const titleScreen = document.querySelector('.title-screen-wrapper')
  const title = document.querySelector('.title')

  function startGame(){

    let gameTime = 120
    let lives = 3
    
    titleScreen.style.display = 'none'

    setInterval(() => {
      gameTime--
      console.log(gameTime)
    }, 1000)


    //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //* GRID ------
  
    const grid = document.querySelector('.grid')
  
    const width = 9
    const height = 11
    const cellCount = width * height
    console.log(cellCount)
    const cells = []
    const water = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
    const land = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
    console.log(water)
    // console.log(cells.slice(11, 43))
    // console.log('water', water)
    // console.log('cells', cells)
    // console.log('cellsARR', [78, 99])
  
    const octopus = 'octopus'
    const startingPosition = 93                 // game starting position bottom of screen 
    let currentPosition = startingPosition
  
    function createGrid(startPos){
      for (let i = 0; i < cellCount; i++){
        const cell = document.createElement('div')
        cell.innerText = i
        grid.appendChild(cell)
        cells.push(cell)
      }
      addOctopus(startPos)
    }
  
//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* ERNESTO ------
  
    function addOctopus(position){
      cells[position].classList.add(octopus)
    }
  
    function removeOctopus(position){
      cells[position].classList.remove(octopus) 
      // console.log(currentPosition)                              // this is showing that the class is removed but it is still added to the one above
    }
  
  
//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* MOVEMENT -------
    function movement(event){
  
      removeOctopus(currentPosition)
  
      const key = event.keyCode 
      const right = 39
      const left = 37
      const up = 38
      const down = 40
    
      if (key === right && currentPosition % height !== height - 1){
        currentPosition++ 
      } else if (key === left && currentPosition % height !== 0){
        currentPosition--
      } else if (key === up && currentPosition >= width){
        currentPosition -= height
      } else if (key === down && currentPosition + width <= cellCount - 1){
        currentPosition += height
      } else {
        console.log('invalid')
      }
  
      console.log('score', score)
      addOctopus(currentPosition)
      checkCollision() 
      // console.log(currentPosition)
      
    }
  
  
    document.addEventListener('keydown', movement)

    createGrid(startingPosition)
  
    
//* functions to create and move cars
    //*---------------------------------------------------
    const shortCar = 'shortCar'
    const longCar = 'longCar' 
  
    function moveShortCars() {
  
      function addShortCar(){                                               // function to add short car
        for (let i = 0; i < shortCarStart.length; i++)
          cells[shortCarStart[i]].classList.add(shortCar)            
      }
  
      function removeShortCar(){
        for (let i = 0; i < shortCarStart.length; i++)                      // function to remove short car
          cells[shortCarStart[i]].classList.remove(shortCar)
      }
  
      addShortCar()                                                         // create first short car
      
      setInterval(() => {                                                   // setting interval for cars to move
        removeShortCar()
        shortCarStart = shortCarStart.map(el => {                           // mapping through array, if arary meets condition sends car back to start of row
          if (el % 11 === 10) {
            return el = el - 11
          // console.log(shortCarStart.indexof(el))
          } else {
            return el
          }
        })
  
        removeShortCar()                                            // removes short car if it does meet condition
        shortCarStart = shortCarStart.map(el => el += 1)            // adds 1 to index 
        addShortCar()                                               // adds class of short car to new index 
        checkCollision()
      }, 2000                                                         // moving every 2 seconds 
      )
    }
  
  //*------------------------------------------------------------------------

    function moveLongCars() {
  
      function addLongCars(){
        for (let i = 0; i < longCarStart.length; i++)
          cells[longCarStart[i]].classList.add(longCar)             // function for creating long cars 
      }
  
      function removeLongcars(){
        for (let i = 0; i < longCarStart.length; i++)
          cells[longCarStart[i]].classList.remove(longCar)
      }

      addLongCars()                                                // create first long car
      
      setInterval(() => {
        removeLongcars()
        longCarStart = longCarStart.map(el => {
          if (el % 11 === 0) {
            return el = el + 11
          } else {
            return el
          }
        })
  
        removeLongcars()                                        // removes long car 
        longCarStart = longCarStart.map(el => el -= 1)          // adds 1 to index
        addLongCars()                                          // create long car at new index 
        checkCollision()                                        // calling check collision here as well so it checks for both the car and the octopus !
      }, 2000
      )
    }
  
    moveShortCars()
    moveLongCars()
  
    
    //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //* function for what happens when you loose a life or get to the top
    
    function checkCollision(){
      const sameIndexLong = longCarStart.some(el => el  === currentPosition)          // checks to see for any instance of current position being same as long cars
      const sameIndexShort = shortCarStart.some(el => el === currentPosition)         // checks to see for any instance of current position being same as short cars
      const onLand = land.some(el => el === currentPosition)
      const onWater = water.some(el => el === currentPosition)
  
      if (onLand){
        console.log('onland')
        if ((sameIndexLong) || (sameIndexShort)){
          console.log('Oh shit')
          looseLife()
        }
      } else if (onWater){
        console.log('onwater')
        if ((sameIndexLong) || (sameIndexShort)){
          console.log('floaty boi')
        } else {
          console.log('drown town')
          looseLife()
        }
      } else {
        console.log('nether zone')
      }
    }
  
  
    function looseLife(){
  
      if (lives >= 1){
        lives -= 1
        removeOctopus(currentPosition)
        currentPosition = startingPosition
        addOctopus(startingPosition)
        console.log('loose 1 life, lives:', lives)
      } else {
        looseScreen()
      }
    }
  }



  playBtn.addEventListener('click', startGame)
  
  

  function looseScreen(){
    titleScreen.style.display = ''
    title.innerHTML = 'YOU DIED!'
    playBtn.innerHTML = 'Play Again?'
  }


  function winScreen(){
    titleScreen.style.display = ''
    title.innerHTML = 'ERNESTO IS SAFE!'
    playBtn.innerHTML = 'Play Again?'
  }





//   for (let i = 0; i < longCarStart.length; i++)
//   cells[longCarStart[i]].classList.remove(longCar)

// longCarStart = longCarStart.map(el => {
//   if (el % 11 === 10) {
//     console.log('move me back to start',)
//     return el = el - 11
//   // console.log(shortCarStart.indexof(el))
//   } else {
//     return el
//   }




  
  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* audio
    // I don't want the music to restart every single time you die, that would be annoying? Maybe a function that plays the audio when the play button is clicked 
    // I will create an if statement 
    // If start button is pressed play main song
  
  


  
  
  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* gamePlay - this will determine what happens as the game is played!
  // let score = 0 
  // let safe = 0
  
  // function gamePlay(){
  //   const safeDen = cellPosition[2, 4, 6, 8, 10]
    // for all movements into an empty cell, player gets +10 score
    // if player gets to a safe den, +100 score and addOctopus(cell position)   (SOME ARRAY METHOD, if octopus has an array of ANY of safe den etc)
  
    // if he collides with a land car, -1 life, removeOctopus
    // if he collides with a water car, aka if octopus has same cell position index as water car, the same function moving THAT particular row needs to work on the frog
    
    // if lives < 0, gameLoose
    // if 5 octopus reach the safeDen cells, if safe === 5, gameWin
  // }
  


  // function gamePlay(){
  //   console.log(currentPosition)
  // }

  // gamePlay()






  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* gameEnds - this is what happens when the game ends. this is where i will edit the innerHTML dependent on how they got there
  // const titleScreen = document.querySelector('.title-screen')
  
  
  // function gameWin(){
  //   // using titleScreen const, inner.HTML appropriate for play again button and h1 text to say you won your score was ${score}
  //   // the top event listener will handle the click of button
  // }
  
  // function gameLoose(){
  //   // using titleScreen const, inner.HTML appropriate for try again button and h1 text to say you lost your score was ${score}
  //   //timeout()
  // }
  
  // function timeout(){
  //   // set a timeout so if the player does nothing for a minute the page refreshes
  // }
  
  // timeout() // call so this is always running
  
  function gameOver(){
    
  }







  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //*

}
  
  window.addEventListener('DOMContentLoaded', init)

  
  
  
  
  
  
  // function gameEnds(){
  //   // stop the song
  //   // using titleScreen constant
  //   // score resets here!   do NOT do it in startGame
  //   // the title screen will be the automatic thing that loads when the page loads
  //   // if play button has been pressed, title screen display none (fade it), startGame
  //   // else if gameTime === 0 || (lives =< 0) title screen will display with innerHTML appropriate.
  //             // if player presses button to play again, startGame   -- do i even need these if already listening above??? no?!
  //             // else display title screen 
  //   // else if player gets all characters across (safeOct = 5), display title screen with innerHTML appropriate
  //             // if player presses button to play again, startGame
  //             // else display title screen      
  // }  // maybe i will set a time out that will reload the page if nothing happens for a minute
  











  // function makeShortCar(){


  //   for (let i = 0; i < shortCarStart.length; i++)
  //     cells[shortCarStart[i]].classList.add(shortCar)

  //   setInterval(() => {
  //     for (let i = 0; i < shortCarStart.length; i++)
  //       cells[shortCarStart[i]].classList.remove(shortCar)
  //     shortCarStart = shortCarStart.map(el => el += 1)
  //     for (let i = 0; i < shortCarStart.length; i++)
  //       cells[shortCarStart[i]].classList.add(shortCar)

  //   }, 2000
  //   )
  // }





// function makeLongCar(){

//   for (let i = 0; i < longCarStart.length; i++)
//     cells[longCarStart[i]].classList.add(longCar)

//   setInterval(() => {
//     for (let i = 0; i < longCarStart.length; i++)
//       cells[longCarStart[i]].classList.remove(longCar)
//     longCarStart = longCarStart.map(el => el += 1)
//     for (let i = 0; i < longCarStart.length; i++)
//       cells[longCarStart[i]].classList.add(longCar)
//   }, 2000
//   )
// }






  //   if ((sameIndexLong && onLand) || (sameIndexShort && onLand)) {
  //     console.log('oh shit')
  //     looseLife() 
  //   } else if ((onWater !== sameIndexShort) || (onWater !== sameIndexLong)) {
  //     console.log('drowning')
  //   } 
  // }
