function init(){

//* global consts
  let shortCarStart = [12, 15, 18, 21, 35, 38, 41, 56, 59, 62, 65, 79, 82, 85]
  let longCarStart = [24, 25, 30, 31, 68, 69, 74, 75]
  const safeDen = [1, 3, 5, 7, 9]

  console.log(shortCarStart)
  const playBtn = document.querySelector('.play-btn')
  let gameTime = 120
  let lives = 3


// function to start the game on click of play button, title screen goes away
  function startGame(){
    document.querySelector('.title-screen-wrapper').style.display = 'none'
    setInterval(() => {
      gameTime--
      console.log(gameTime)
    }, 1000)
  }

  playBtn.addEventListener('click', startGame)

  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* GRID ------

  const grid = document.querySelector('.grid')

  const width = 9
  const height = 11
  const cellCount = width * height
  console.log(cellCount)
  const cells = []
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

      addOctopus(currentPosition)

    }

    document.addEventListener('keydown', movement)

//* function inside grid to create cars

    // const shortCarStart = [12, 15, 18, 21, 35, 38, 41, 56, 59, 62, 65, 79, 82, 85]
    // const longCarStart = [24, 25, 30, 31, 68, 69, 74, 75]

    const shortCar = 'shortCar'
    const longCar = 'longCar'


//* trying to make a function to add 1 to the array indices every second





    // for (let i = 0; i < shortCarStart.length; i++){
    //   shortCarStart = cells[shortCarStart[i + 1]]
    //   return shortCarStart
    // } 

    // console.log(shortCarStart)

    


//*---------------------------------------------------


    function makeShortCar(){


      for (let i = 0; i < shortCarStart.length; i++)
        cells[shortCarStart[i]].classList.add(shortCar)            // create first short car


      setInterval(() => {
        for (let i = 0; i < shortCarStart.length; i++)          
          cells[shortCarStart[i]].classList.remove(shortCar)      // removes short car 


        if (shortCarStart === shortCarStart[10, 21, 32, 43, 54, 65, 76, 87, 98]) {          // if statement to say if its any of these indices to - 10 instead
          shortCarStart = shortCarStart.map(el => el -= 10)
        } else
          shortCarStart = shortCarStart.map(el => el += 1)          // adds 1 to index 

        for (let i = 0; i < shortCarStart.length; i++)
          cells[shortCarStart[i]].classList.add(shortCar)         // adds class of short car to new index 
        console.log(shortCarStart)

      }, 4000
      )

    }

    // console.log(shortCarStart.map(el => el += 1))


    // function moveShortCar(){
    //   for (let i = 0; i < shortCarStart.length; i++)
    //     cells[shortCarStart[i++]].classList.add(shortCar)
    // }
    
    // function removeShortCar(){
    //   for (let i = 0; i < shortCarStart.length; i++)
    //     cells[shortCarStart[i]].classList.remove(shortCar)
    // } 

    function makeLongCar(){
      for (let i = 0; i < shortCarStart.length; i++)
        cells[longCarStart[i]].classList.add(longCar)
    }

    // function removeLongCar(){
    //   for (let i = 0; i < shortCarStart.length; i++)
    //     cells[shortCarStart[i]].classList.remove(longCar)
    // } 

    addOctopus(startPos)
    makeShortCar()
    makeLongCar()


    // function removeShortCar(position){
    //   cells[position].classList.remove(shortCar)
    // }

  }

  createGrid(startingPosition)




  //* ERNESTO ------
  function addOctopus(position){
    cells[position].classList.add(octopus)
  }

  function removeOctopus(position){
    cells[position].classList.remove(octopus)
  }

  //* CARS ------
  
  // const shortCarStarting = [78, 81, 84, 86]
  // console.log('short car starting', shortCarStarting)


  // const longCar = 'long car'

//*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//* create movement!
  
  






  
  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* audio
    // I don't want the music to restart every single time you die, that would be annoying? Maybe a function that plays the audio when the play button is clicked 
    // I will create an if statement 
    // If start button is pressed play main song
  
  
  
  
  //*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  //* game begins - this is the page that will listen for the click of the button, regardless of what innerHTML says
  // let gameTime = 120000    // full time bar OR clock, this is going to count backwards
  // let lives = 3
  // let safe = 0
  
  
  // function startGame(){
    // put gametime, lives and safe in here so it resets
    // titleScreen display none 
    // set an interval that will count the game time backwards once the play button is pressed 
    // gameTime -= 1000
    // if gameTime === 0 trigger gameLoose 
      // it will be linked to a bar that displays on the page and counts down the time for the player
  // }
  
  // playBtn.addEventListener('click', startGame)

  // const playBtn = document.querySelector('.play-btn')
  // let gameTime = 10
  // let lives = 3

  // function startGame(){
  //   document.querySelector('.title-screen-wrapper').style.display = 'none'
  //   //add title screen later, display: none
  //   setInterval(() => {
  //     gameTime--
  //     console.log(gameTime)
  //   }, 1000)
  // }

  // playBtn.addEventListener('click', startGame)
  
  // if (gameTime < 0){
  //   clearInterval(gameTime)
  //   console.log(gameTime)
  //   console.log('Out of time')
  //   location.reload
  // } else {
  //   console.log(gameTime)
  // }
  


  
  

  
  
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
  
  let score = 0
  let safe = 0 

  function gamePlay(){
// if octopus has same cell index as longCar or shortCar 
    if (currentPosition === shortCarStart) {
      score - 10
      console.log(score)
    }
  } 
  
  gamePlay()


  
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