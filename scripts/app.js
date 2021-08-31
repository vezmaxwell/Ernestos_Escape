
function init(){

  const audio = document.querySelector('#audio')

  

//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* global variables ----------------------

  let shortCarStart = [56, 59, 62, 65, 79, 82, 85]
  let longCarStart = [24, 25, 30, 31, 68, 69, 74, 75]
  let shortSafeStart = [12, 15, 18, 21, 35, 38, 41]

  // console.log(safeDen)


  const playBtn = document.querySelector('.play-btn')
  const livesTotal = document.querySelector('.lives')
  const scoreTotal = document.querySelector('.score')
  let score = 0
  let safe = 0 
  let gameTime = 120
  let lives = 10


//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

  const timeBar = document.querySelector('.time-remaining')

  function updateTime(){
    if (gameTime <= 120){
      timeBar.style.width = `${gameTime / 120 * 100}%`
    }
  }


//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

  const titleScreen = document.querySelector('.title-screen-wrapper')
  const title = document.querySelector('.title')


  function startGame(){
    
    audio.play()
    
    titleScreen.style.display = 'none'

    if (gameTime > 0){
      setInterval(() => {
        updateTime()
        gameTime--
        console.log(gameTime)
      }, 1000)

      setTimeout(() => {
        looseScreen()
      }, 120000)
    }
    
  


    //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //* GRID ------
  
    const grid = document.querySelector('.grid')
  
    const width = 9
    const height = 11
    const cellCount = width * height
    const cells = []
    const water = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
    const land = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
    const safeDen = [1, 3, 5, 7, 9]

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
      
      //* ----------- score for octopus  
      function safeOctopus(){
        const home = safeDen.some(el => el === currentPosition)
        if (home){
          score += 100
          safe += 1
          console.log('SAFE SAFE', safe)
          scoreTotal.innerHTML = score
          currentPosition = startingPosition   
          addOctopus(startingPosition)                   // add new octopus back to starting position, need to work out how to take control of the new one instead 
        } else if (safe > 4){
          winScreen()
        }
        
      }
      
      safeOctopus()
    }
  
    
    document.addEventListener('keydown', movement)

    createGrid(startingPosition)
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






    
    //* functions to create and move cars
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
  
      addShortCar()               
      
      setInterval(() => {                                                   // setting interval for cars to move
        removeShortCar()
        
        shortCarStart = shortCarStart.map(el => {                           // mapping through array, if array meets condition sends car back to start of row
          if (el % 11 === 0) {
            return el = el + 11
          } else {
            return el
          } 
        })

        removeShortCar()    
        shortCarStart = shortCarStart.map(el => el -= 1)            // adds 1 to index 
        addShortCar()                                               // adds class of short car to new index 
        checkCollision()

      }, 2000                                                         // moving every 2 seconds 
      )
    }

    //*------------------------------------------------------------------------

    const shortSafe = 'shortSafe'

    function moveShortSafeCars() {
  
      function addSafeCar(){
        console.log(shortSafeStart)
        for (let i = 0; i < shortSafeStart.length; i++)
          cells[shortSafeStart[i].classList.add(shortSafe)]
      }

      function removeSafeCar(){
        for (let i = 0; i < shortSafeStart.length; i++)
          cells[shortSafeStart[i].classList.remove(shortSafe)]
      }

      addSafeCar()

      // setInterval(() => {
      //   removeSafeCar()

      //   shortSafeStart = shortSafeStart.map(el => {
      //     if (el % 11 === 0){
      //       return el = el + 11
      //     } else {
      //       return el
      //     }
      //   })

      //   removeSafeCar()
      //   shortSafeStart = shortSafeStart.map(el => el -= 1)
      //   addSafeCar()
      //   checkCollision()
      // }, 2000)

      // console.log('where am')
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
          if (el % 11 === 10) {
            return el = el - 11
          } else {
            return el
          }
        })
  
        removeLongcars()                                        // removes long car 
        longCarStart = longCarStart.map(el => el += 1)          // adds 1 to index
        addLongCars()                                          // create long car at new index 
        checkCollision()                                        // calling check collision here as well so it checks for both the car and the octopus !
      }, 2000
      )
    }
  
    moveShortCars()
    moveLongCars()
    moveShortSafeCars()


    //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //* function for what happens when you loose a life or get to the top
    
    let isInSquareBefore = false
    let isInSquareAfter = false 

    function checkCollision() {
      const sameIndexLong = longCarStart.some(el => el === currentPosition)                 // checks to see for any instance of current position being same as long cars

      const sameIndexShort = shortCarStart.some(el => el === currentPosition)         // checks to see for any instance of current position being same as short cars
      const sameIndexShortForWater = shortSafeStart.some(el => el === currentPosition - 1)         // checks to see for any instance of current position being same as short cars
      const sameIndexLongForWater = longCarStart.some(el => el === currentPosition + 1)
      const onLand = land.some(el => el === currentPosition)
      const onWater = water.some(el => el === currentPosition)


      if (onLand) {
        console.log('onland')
        if ((sameIndexLong) || (sameIndexShort)) {
          console.log('Oh shit')
          looseLife()
        }

      } else if (onWater) {
        console.log('onwater')
        if ((sameIndexShort)) {
          removeOctopus(currentPosition)
          console.log('move meh', sameIndexShort)
          addOctopus(currentPosition)
          isInSquareBefore = true

        } else if ((sameIndexLong)) {
          removeOctopus(currentPosition)
          console.log('move meh', sameIndexLong)
          addOctopus(currentPosition)
          isInSquareAfter = true

        } else if ((sameIndexShortForWater && isInSquareBefore === true)) {
          console.log('floaty boi', isInSquareBefore)
          removeOctopus(currentPosition)
          currentPosition = currentPosition -= 1
          addOctopus(currentPosition)

        } else if ((sameIndexLongForWater && isInSquareBefore === true)) {
          console.log('floaty boi', isInSquareBefore)
          removeOctopus(currentPosition)
          currentPosition = currentPosition += 1
          addOctopus(currentPosition)

        } else {
          console.log('drown town', isInSquareBefore)
          looseLife()
        }
      } else {
        return
      }
    }
  


  
    function looseLife(){
  
      if (lives >= 1){
        lives -= 1
        livesTotal.innerHTML = `Lives: ${lives}`
        removeOctopus(currentPosition)
        currentPosition = startingPosition
        addOctopus(startingPosition)
        console.log('loose 1 life, lives:', lives)
      } else {
        looseScreen()
      }
    }
  }

  function looseScreen(){
    titleScreen.style.display = ''
    title.innerHTML = 'YOU DIED!'
    playBtn.innerHTML = 'Try Again?'
    playBtn.addEventListener('click', reset)

  }

  function winScreen(){
    titleScreen.style.display = ''
    title.innerHTML = 'ERNESTO IS SAFE!'
    playBtn.innerHTML = 'Play Again?'
    playBtn.addEventListener('click', reset)
  }

  function reset(){
    location.reload()
  }
  


  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* gameEnds - this is what happens when the game ends. this is where i will edit the innerHTML dependent on how they got there



  playBtn.addEventListener('click', startGame)



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
