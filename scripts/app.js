
function init(){

  const soundtrackAudio = document.querySelector('#soundtrackAudio')

  function playMusic() {
    soundtrackAudio.src = 'assets/soundtrack.mp3'
    soundtrackAudio.play()
  }


  const safeAudio = document.querySelector('#safeAudio')

  function playSafeAudio(){
    safeAudio.src = 'assets/safeaudio.wav'
    safeAudio.play()
  }


  const looseAudio = document.querySelector('#looseAudio')

  function playLooseAudio(){
    looseAudio.src = 'assets/loose.wav'
    looseAudio.play()
  }

//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* global variables ----------------------

  let shortCarStart = [56, 59, 62, 65, 79, 81, 83, 85, 87]
  let longCarStart = [66, 67, 70, 71, 74, 75]
  let shortSafeStart = [12, 15, 18, 21, 33, 36, 39, 41]
  let longSafeStart = [23, 24, 27, 28, 30, 31]

  const playBtn = document.querySelector('.play-btn')
  const livesTotal = document.querySelector('.lives')
  const scoreTotal = document.querySelector('.score')
  let score = 0
  let safe = 0 
  let gameTime = 120
  let lives = 10

//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

  const timeBar = document.querySelector('.time-remaining')


//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

  const titleScreen = document.querySelector('.title-screen-wrapper')
  const title = document.querySelector('.title')


  function startGame(){
    

    function updateTime(){
      if ((gameTime <= 120) && (safe >= 5 || lives > 0)){                     // test this
        timeBar.style.width = `${gameTime / 120 * 100}%`
      }
    }

    playMusic()
    

    titleScreen.style.display = 'none'
    titleScreen.style.backgroundImage = 'none'
    
    if (gameTime > 0){
      setInterval(() => {
        updateTime()
        gameTime--
      }, 1000)

      setTimeout(() => {
        gameTime === 0
        playLooseAudio()
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
        // cell.innerText = i
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
        score += 10
      } else if (key === left && currentPosition % height !== 0){
        currentPosition--
        score += 10
      } else if (key === up && currentPosition >= width){
        currentPosition -= height
        score += 10
      } else if (key === down && currentPosition + width <= cellCount - 1){
        currentPosition += height
        score += 10
      } else {
        console.log('invalid')
      }
      
      updateScore()
      addOctopus(currentPosition)
      checkCollision() 
      
      //* ----------- score for octopus  
      function safeOctopus(){
        const home = safeDen.some(el => el === currentPosition)
        if (home){
          playSafeAudio()
          score += 100
          safe += 1
          scoreTotal.innerHTML = score
          currentPosition = startingPosition   
          addOctopus(startingPosition)                   // add new octopus back to starting position, need to work out how to take control of the new one instead 
        } else if (safe > 4){
          winScreen()
        }
        
      }

      function updateScore(){
        if (lives > 0){
          scoreTotal.innerHTML = score
        } else {
          return 
        }
      }

      
      safeOctopus()
    }
  
    
    document.addEventListener('keydown', movement)

    createGrid(startingPosition)
    
    //* functions to create and move cars
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const shortCar = 'shortCar'
    const longCar = 'longCar'
    const shortSafe = 'shortSafe'
    const longSafe = 'longSafe'

    function moveShortCars() {

      function addShortCar() {                                               // function to add short car
        for (let i = 0; i < shortSafeStart.length; i++)
          cells[shortSafeStart[i]].classList.add(shortSafe)
      }

      function addLandCar() {
        for (let i = 0; i < shortCarStart.length; i++)
          cells[shortCarStart[i]].classList.add(shortCar)
      }

      function removeShortCar() {
        for (let i = 0; i < shortSafeStart.length; i++)                      // function to remove short car
          cells[shortSafeStart[i]].classList.remove(shortSafe)
      }
      function removeLandCar() {
        for (let i = 0; i < shortCarStart.length; i++)                      // function to remove short car
          cells[shortCarStart[i]].classList.remove(shortCar)
      }

      addShortCar()
      addLandCar()

      setInterval(() => {                                                   // setting interval for cars to move
        removeShortCar()
        removeLandCar()

        shortSafeStart = shortSafeStart.map(el => {                           // mapping through array, if array meets condition sends car back to start of row
          if (el % 11 === 0) {
            return el = el + 11
          } else {
            return el
          }
        })

        shortCarStart = shortCarStart.map(el => { 

          if (el % 11 === 0) {
            return el = el + 11
          } else {
            return el
          }
        })

        removeLandCar()
        removeShortCar()
        shortSafeStart = shortSafeStart.map(el => el -= 1)            // adds 1 to index 
        shortCarStart = shortCarStart.map(el => el -= 1)  
        addShortCar()   
        addLandCar()                                            // adds class of short car to new index 
        checkCollision()

      }, 2000                                                         // moving every 2 seconds 
      )
    }

    //*------------------------------------------------------------------------  
    //*------------------------------------------------------------------------

    function moveLongCars() {

      function addLongCar() {                                               // function to add short car
        for (let i = 0; i < longSafeStart.length; i++)
          cells[longSafeStart[i]].classList.add(longSafe)
      }

      function addLongLandCar() {
        for (let i = 0; i < longCarStart.length; i++)
          cells[longCarStart[i]].classList.add(longCar)
      }

      function removeLongCar() {
        for (let i = 0; i < longSafeStart.length; i++)                      // function to remove short car
          cells[longSafeStart[i]].classList.remove(longSafe)
      }

      function removeLongLandCar() {
        for (let i = 0; i < longCarStart.length; i++)                      // function to remove short car
          cells[longCarStart[i]].classList.remove(longCar)
      }

      addLongCar()
      addLongLandCar()

      setInterval(() => {                                                   // setting interval for cars to move
        removeLongCar()
        removeLongLandCar()

        longSafeStart = longSafeStart.map(el => {                           // mapping through array, if array meets condition sends car back to start of row
          if (el % 11 === 10) {
            return el = el - 11
          } else {
            return el
          }
        })

        longCarStart = longCarStart.map(el => { 

          if (el % 11 === 10) {
            return el = el - 11
          } else {
            return el
          }
        })

        removeLongLandCar()
        removeLongCar()
        longSafeStart = longSafeStart.map(el => el += 1)            // adds 1 to index 
        longCarStart = longCarStart.map(el => el += 1)  
        addLongCar()   
        addLongLandCar()                                            // adds class of short car to new index 
        checkCollision()

      }, 2000                                                         // moving every 2 seconds 
      )
    }
  
    moveShortCars()
    moveLongCars()


    //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    //* function for what happens when you loose a life or get to the top
    
    let isInSquareBefore = false
    let isInSquareAfter = false 

    function checkCollision() {
      const sameIndexLong = longCarStart.some(el => el === currentPosition)                          // checks to see for any instance of current position being same as long cars
      const sameIndexShort = shortCarStart.some(el => el === currentPosition)                       // checks to see for any instance of current position being same as short cars

      const sameIndexShortB = shortSafeStart.some(el => el === currentPosition)
      const sameIndexLongB = longSafeStart.some(el => el === currentPosition)

      const sameIndexShortForWater = shortSafeStart.some(el => el === currentPosition - 1)         // checks to see for any instance of current position being same as short cars
      const sameIndexLongForWater = longSafeStart.some(el => el === currentPosition + 1)
      const onLand = land.some(el => el === currentPosition)
      const onWater = water.some(el => el === currentPosition)

      if (onLand) {
        // console.log('onland')

        if ((sameIndexLong) || (sameIndexShort)) {
          score -= 50
          looseLife()
        }

      } else if (onWater) {
        console.log('onwater')

        if (sameIndexShortB) {
          removeOctopus(currentPosition)
          addOctopus(currentPosition)
          isInSquareBefore = true
          console.log('move meh short', isInSquareBefore)
          return isInSquareBefore

        } else if (sameIndexLongB) {
          removeOctopus(currentPosition)
          addOctopus(currentPosition)
          isInSquareAfter = true
          console.log('move meh long', isInSquareAfter)
          return isInSquareAfter

        } else if ((sameIndexShortForWater && isInSquareBefore === true)) {
          removeOctopus(currentPosition)
          currentPosition = currentPosition -= 1
          console.log('floaty boi', isInSquareBefore)
          addOctopus(currentPosition)
          return

        } else if ((sameIndexLongForWater && isInSquareAfter === true)) {
          removeOctopus(currentPosition)
          currentPosition = currentPosition += 1
          console.log('floaty boi', isInSquareBefore)
          addOctopus(currentPosition)
          return
        
        } else {
          looseLife()
          isInSquareBefore = false
          console.log('drown town', isInSquareBefore)
          return isInSquareBefore
        }

      } else {
        return
      }
    }

  
    function looseLife(){
      if (lives >= 1){
        playLooseAudio()
        lives -= 1
        livesTotal.innerHTML = `Lives: ${lives}`
        removeOctopus(currentPosition)
        currentPosition = startingPosition
        addOctopus(startingPosition)
        // console.log('loose 1 life, lives:', lives)
      } else {
        looseScreen()
      }
    }
  }

  function looseScreen(){
    // titleScreen.id = 'loosescreen'
    titleScreen.style.display = ''
    titleScreen.style.backgroundImage = 'url(assets/Pictures/loosescreen.gif)'
    title.innerHTML = 'YOU DIED!'
    playBtn.innerHTML = 'Try Again?'
    playBtn.addEventListener('click', reset)
  }

  function winScreen(){
    titleScreen.style.display = ''
    title.innerHTML = 'ERNESTO IS SAFE!'
    playBtn.innerHTML = 'Reset Game?'
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
