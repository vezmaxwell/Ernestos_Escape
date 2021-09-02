
function init(){

  //*-------------------------------------------------------------------------------------------------------MUSIC---------------------------------------------------------------------------------------------  
  const soundtrackAudio = document.querySelector('#soundtrackAudio')
  const safeAudio = document.querySelector('#safeAudio')
  const looseAudio = document.querySelector('#looseAudio')

  function playMusic() {                                                                                      // background music
    soundtrackAudio.src = 'assets/soundtrack.mp3'
    soundtrackAudio.play()
  }

  function playSafeAudio(){                                                                                  // safe audio
    safeAudio.src = 'assets/safeaudio.wav'  
    safeAudio.play()
  }

  function playLooseAudio(){                                                                                 // loosing audio
    looseAudio.src = 'assets/loose.wav'
    looseAudio.play()
  }

  //*-----------------------------------------------------------------------------------------------------ARRAYS, QUERY SELECTORS, LETS, CONSTS--------------------------------------------------------------------------------------------  

  let shortObstacles = [56, 59, 62, 65, 79, 81, 83, 85, 87]
  let longObstacles = [66, 67, 70, 71, 74, 75]
  let shortFloats = [12, 15, 18, 21, 33, 36, 39, 41]
  let longFloats = [23, 24, 27, 28, 30, 31]

  const playBtn = document.querySelector('.play-btn')
  const livesTotal = document.querySelector('.lives')
  const scoreTotal = document.querySelector('.score')
  const timeBar = document.querySelector('.time-remaining')
  const titleScreen = document.querySelector('.title-screen-wrapper')
  const title = document.querySelector('.title')
  const titlePicture = document.querySelector('.title-screen')

  let score = 0
  let safe = 0 
  let gameTime = 120
  let lives = 10

  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  

  function startGame(){

    function updateTimeBar(){
      if ((gameTime <= 120) && (safe >= 5 || lives > 0)){                         
        timeBar.style.width = `${gameTime / 120 * 100}%`
      }
    }

    playMusic()

    titleScreen.style.display = 'none'
    
    if (gameTime > 0){
      setInterval(() => {
        updateTimeBar()
        gameTime--
      }, 1000)

      setTimeout(() => {
        gameTime === 0
        playLooseAudio()
        looseScreen()
      }, 120000)
    }
    
    //*-----------------------------------------------------------------------------------------------------THE GRID-----------------------------------------------------------------------------------------------  
  
    const grid = document.querySelector('.grid')
    const width = 9
    const height = 11
    const cellCount = width * height
    const cells = []
    const water = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
    const land = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
    const safeDen = [1, 3, 5, 7, 9]
    const octopus = 'octopus'
    const startingPosition = 93                 
    let currentPosition = startingPosition
  
    function createGrid(startPos){
      for (let i = 0; i < cellCount; i++){
        const cell = document.createElement('div')
        grid.appendChild(cell)
        cells.push(cell)
      }
      addOctopus(startPos)
    }

    createGrid(startingPosition)
  
    //*---------------------------------------------------------------------------------------------------ERNESTO-(THE OCTOPUS)------------------------------------------------------------------------------------------------  
  
    function addOctopus(position){
      cells[position].classList.add(octopus)
    }
  
    function removeOctopus(position){
      cells[position].classList.remove(octopus) 
    }

    //*----------------------------------------------------------------------------------------------------MOVEMENT------------------------------------------------------------------------------------------------  

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
      
      //*----------------------------------------------------------------------------------------------MOVEMENT FUNCTION:--TRACKING SAFE OCTOPUS------------------------------------------------------------------------------------------------  
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

      //*----------------------------------------------------------------------------------------------MOVEMENT FUNCTION:--TRACKING SAFE OCTOPUS------------------------------------------------------------------------------------------------  

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
  
    //*--------------------------------------------------------------------------------------------------END OF MOVEMENT FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------

    //*--------------------------------------------------------------------------------------------------MOVING SHORT OBSTACLES AND FLOATS---------------------------------------------------------------------------------------------------------------------------------------------------
    
    const shortObstacle = 'shortObstacle'
    const longObstacle = 'longObstacle'
    const shortFloat = 'shortFloat'
    const longFloat = 'longFloat'

    function moveShort() {

      function addShortFloat() {                                               // function to add short car
        for (let i = 0; i < shortFloats.length; i++)
          cells[shortFloats[i]].classList.add(shortFloat)
      }

      function addShortObstacle() {
        for (let i = 0; i < shortObstacles.length; i++)
          cells[shortObstacles[i]].classList.add(shortObstacle)
      }

      function removeShortFloat() {
        for (let i = 0; i < shortFloats.length; i++)                          // function to remove short car
          cells[shortFloats[i]].classList.remove(shortFloat)
      }
      function removeShortObstacle() {
        for (let i = 0; i < shortObstacles.length; i++)                       // function to remove short car
          cells[shortObstacles[i]].classList.remove(shortObstacle)
      }

      addShortFloat()
      addShortObstacle()

      setInterval(() => {                                                     // setting interval for cars to move
        removeShortObstacle()
        removeShortFloat()

        shortFloats = shortFloats.map(el => {                               // mapping through array, if array meets condition sends car back to start of row
          if (el % 11 === 0) {
            return el = el + 11
          } else {
            return el
          }
        })

        shortObstacles = shortObstacles.map(el => { 

          if (el % 11 === 0) {
            return el = el + 11
          } else {
            return el
          }
        })

        removeShortObstacle()
        removeShortFloat()
        shortFloats = shortFloats.map(el => el -= 1)                  // adds 1 to index 
        shortObstacles = shortObstacles.map(el => el -= 1)  
        addShortObstacle()   
        addShortFloat()                                               // adds class of short car to new index 
        checkCollision()

      }, 2000                                                         // moving every 2 seconds 
      )
    }

    //*----------------------------------------------------------------------------------------------------MOVING LONG OBSTACLE AND FLOATS----------------------------------------------------------------------------------------------------------------------------------------------------------------  

    
    function moveLong() {

      function addLongFloat() {                                               // function to add short car
        for (let i = 0; i < longFloats.length; i++)
          cells[longFloats[i]].classList.add(longFloat)
      }

      function addLongObstacle() {
        for (let i = 0; i < longObstacles.length; i++)
          cells[longObstacles[i]].classList.add(longObstacle)
      }

      function removeLongFloat() {
        for (let i = 0; i < longFloats.length; i++)                          // function to remove short car
          cells[longFloats[i]].classList.remove(longFloat)
      }

      function removeLongObstacle() {
        for (let i = 0; i < longObstacles.length; i++)                       // function to remove short car
          cells[longObstacles[i]].classList.remove(longObstacle)
      }

      addLongObstacle()
      addLongFloat()

      setInterval(() => {                                                   // setting interval for cars to move
        removeLongObstacle()
        removeLongFloat()

        longFloats = longFloats.map(el => {                                 // mapping through array, if array meets condition sends car back to start of row
          if (el % 11 === 10) {
            return el = el - 11
          } else {
            return el
          }
        })

        longObstacles = longObstacles.map(el => { 

          if (el % 11 === 10) {
            return el = el - 11
          } else {
            return el
          }
        })

        removeLongObstacle()
        removeLongFloat()
        longFloats = longFloats.map(el => el += 1)                // adds 1 to index 
        longObstacles = longObstacles.map(el => el += 1)  
        addLongObstacle()   
        addLongFloat()                                            // adds class of short car to new index 
        checkCollision()

      }, 1000                                                     // moving every 2 seconds 
      )
    }
  
    moveShort()
    moveLong()


    //*---------------------------------------------------------------------------------------------------CHECKING FOR COLLISIONS, MOVEMENT ON FLOATS-------------------------------------------------------------------------------------------------  
    
    let isInSquareBefore = false
    let isInSquareAfter = false 

    function checkCollision() {
      const sameIndexLongObstacle = longObstacles.some(el => el === currentPosition)                          // checks to see for any instance of current position being same as long cars
      const sameIndexShortObstacle = shortObstacles.some(el => el === currentPosition)                       // checks to see for any instance of current position being same as short cars

      const sameIndexShortFloat = shortFloats.some(el => el === currentPosition)
      const sameIndexLongFloat = longFloats.some(el => el === currentPosition)

      const sameIndexShortPlusOne = shortFloats.some(el => el === currentPosition - 1)                      // checks to see for any instance of current position being same as short cars
      const sameIndexLongPlusOne = longFloats.some(el => el === currentPosition + 1)
      const onLand = land.some(el => el === currentPosition)
      const onWater = water.some(el => el === currentPosition)

      if (onLand) {

        if ((sameIndexLongObstacle) || (sameIndexShortObstacle)) {
          score -= 50
          looseLife()
        }

      } else if (onWater) {
        console.log('onwater')

        if (sameIndexShortFloat) {
          removeOctopus(currentPosition)
          addOctopus(currentPosition)
          isInSquareBefore = true
          console.log('move meh short', currentPosition)
          isInSquareBefore
          
        } else if (sameIndexLongFloat) {
          removeOctopus(currentPosition)
          addOctopus(currentPosition)
          isInSquareAfter = true
          console.log('move meh long', currentPosition)
          isInSquareAfter

        } else if ((sameIndexShortPlusOne && isInSquareBefore === true)) {
          removeOctopus(currentPosition)
          currentPosition -= 1
          console.log('floaty boi', currentPosition)
          addOctopus(currentPosition)

        } else if ((sameIndexLongPlusOne && isInSquareAfter === true)) {
          removeOctopus(currentPosition)
          currentPosition += 1
          console.log('floaty boi', currentPosition)
          addOctopus(currentPosition)
          
        } else {
          looseLife()
          isInSquareBefore = false
          console.log('drown town', currentPosition)
          isInSquareBefore
        }

      } else {
        return
      }
    }

    //*--------------------------------------------------------------------------------------------------------------LOOSE LIFE-------------------------------------------------------------------------------------------------  

    function looseLife(){
      if (lives >= 1){
        playLooseAudio()
        lives -= 1
        livesTotal.innerHTML = `Lives: ${lives}`
        removeOctopus(currentPosition)
        currentPosition = startingPosition
        addOctopus(startingPosition)
      } else {
        looseScreen()
      }
    }
  }

  //*--------------------------------------------------------------------------------------------------------------LOOSE SCREEN, WIN SCREEN, RELOAD PAGE-------------------------------------------------------------------------------------------------  

  function looseScreen(){
    titleScreen.style.display = ''
    titlePicture.style.backgroundImage = 'url(assets/Pictures/loosescreen.gif)'
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
  
  playBtn.addEventListener('click', startGame)

}
  
window.addEventListener('DOMContentLoaded', init)

  
  
