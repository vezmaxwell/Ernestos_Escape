
## **Project 1: Ernesto's Escape**

**Overview**

Ernesto's Esacpe is a take on the classic game of Frogger. I had been wanting to make a little octopus character for a game and thought Frogger would fit the idea therefore bringing Ernesto alive for my first project.

**Gameplay**

The original game character is a frog who must dodge the traffic on the bottom half of the screen and then use the floats on the top half of the screen to reach safety. 
Ernesto's Escape uses an octopus who must dodge the carnivorous fish on the bottom half and then manouvere the currents on the shells on the top half of the screen to reach a clam bed.
He can move in any direction, and moves with the objects that floats if he is on them.

**Technologies Used**

 - HTML5
 - CSS 
 - JavaScript ES6
 - Google Fonts 
 - Procreate

**Day 1**

Day one was about creating the grid. I decided to go with a grid that had an odd number of cells for its width in order to be able to play the game character directly in the centre of the row. 

    function  createGrid(startPos){
    for (let  i  =  0; i  <  cellCount; i++){
    const  cell  =  document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
    }
    addOctopus(startPos)
    }

I also created the movement function in order to map the keys to which direction my game character would be going. 
   
    function  movement(event){
    removeOctopus(currentPosition)  
    const  key  =  event.keyCode    
    const  right  =  39    
    const  left  =  37    
    const  up  =  38    
    const  down  =  40
    
    if (key  ===  right  &&  currentPosition  %  height  !==  height  -  1){    
    currentPosition++    
    score  +=  10    
    } else  if (key  ===  left  &&  currentPosition  %  height  !==  0){    
    currentPosition--    
    score  +=  10    
    } else  if (key  ===  up  &&  currentPosition  >=  width){    
    currentPosition  -=  height   
    score  +=  10    
    } else  if (key  ===  down  &&  currentPosition  +  width  <=  cellCount  -  1){    
    currentPosition  +=  height    
    score  +=  10    
    } else {    
    console.log('invalid')    
    }


**Day 2 **

The next day consisted of adding in the obstacles, this would later cause a little delay in working out how to stop them from going onto the next line. I used the map method in order to map through the array of obstacles and move them as long as they met the condition. The following clip of code shows an example of what was repeated in order to move all the obstacles and floats.

        function  addShortObstacle() {
    for (let  i  =  0; i  <  shortObstacles.length; i++)
    cells[shortObstacles[i]].classList.add(shortObstacle)
    }

    function  removeShortObstacle() {
    for (let  i  =  0; i  <  shortObstacles.length; i++) // function to remove short car
    cells[shortObstacles[i]].classList.remove(shortObstacle)
    }

    shortObstacles  =  shortObstacles.map(el  => {
    if (el  %  11  ===  0) {
    return  el  =  el  +  11
    } else {
    return  el
    }
    })


**Day 3 **

Day 3 was a shorter day however it was the day the check collision function was made. This was in order to check for the octopus colliding with either the floats or the obstacles. It uses the array method 'some' to check for any instance of the octopus having the same index as any of the obstacles or floats by going through their arrays. These are saved as variables to call in an if/else statement.

    function  checkCollision() {    
    const  sameIndexLongObstacle  =  longObstacles.some(el  =>  el  ===  currentPosition)     
    const  sameIndexShortObstacle  =  shortObstacles.some(el  =>  el  ===  currentPosition) 
    const  sameIndexShortFloat  =  shortFloats.some(el  =>  el  ===  currentPosition)
    const  sameIndexLongFloat  =  longFloats.some(el  =>  el  ===  currentPosition)       
    const  onLand  =  land.some(el  =>  el  ===  currentPosition)    
    const  onWater  =  water.some(el  =>  el  ===  currentPosition)          
    
    if (onLand) {          
    if ((sameIndexLongObstacle) || (sameIndexShortObstacle)) {    
    score  -=  50
    looseLife()
    }
   
    } else  if (onWater) {
    console.log('onwater')

This function is then called in the movement function for the octopus moving as well as the movement functions for the obstacles moving. 

**Day 4 **

Sunday was mostly about the looseLife() function. I successfully managed to get a new octopus to appear in the starting position once you reached the goal and when he died. I was having trouble before with the octopus dying and re-spawning in the starting position as well as the position he died in once a key was pressed. This was solved by making sure to call the function addOctopus() after setting the current position to the starting position again.

	function  looseLife(){
	    if (lives  >=  1){
	     playLooseAudio()
	     lives  -=  1
	     livesTotal.innerHTML  =  `Lives: ${lives}`
	     removeOctopus(currentPosition)
	     currentPosition  =  startingPosition
	     addOctopus(startingPosition)
		} else {
		 looseScreen()
		    }
		 }
	  }

**Day 5 **

Monday I managed to get the octopus to sit on top of the floats on the top half of the screen. However I really struggled in getting him to move with them. This became a back and forth theme for the next few days.

After really hitting a wall with a weekend of some problems, I decided to spend the rest of my time on Monday on CSS and drawing the obstacle gifs, the home page and grid background on Procreate. 

**Day 6 **

Day 6 involved a lot of trouble shooting. Eventually a solution was reached with moving the octopus on the floats. However, I also needed a solution in order to style the obstacles and floats different, as the same function was making them move. This involved writing new functions and adding classes to separate out the obstacles from the floats, yet call them in the same function for movement. The code was an extension of the code snippet from day 2, repeating in order to assign new classes in order to style the floats and obstacles differently. This unfortunately created a new problem with the octopus on the floats, as now new arrays had been added in order for the classlists to work. The function to make him float needed to be edited again. 

The following code snippet shows the arrays, which were previously just 2. These represent the starting indexes of the obstacles and floats which are updated in the function that creates and moves them. 

    let  shortObstacles  = [56, 59, 62, 65, 77, 80, 83, 86]
    let  longObstacles  = [66, 67, 70, 71, 74, 75]=
    let  shortFloats  = [12, 15, 18, 21, 33, 36, 39, 41]
    let  longFloats  = [23, 24, 27, 28, 30, 31]


**Day 7 **

On Wednesday I managed to fix function which in turn allowed the octopus to float along with the floats. It ended up being an extension of my check collision function.

    if (sameIndexShortFloat) {
    removeOctopus(currentPosition)
    addOctopus(currentPosition)
    isInSquareBefore  =  true
    
    } else  if ((sameIndexShortPlusOne  &&  isInSquareBefore  ===  true)) {
    removeOctopus(currentPosition)
    currentPosition  -=  1
    addOctopus(currentPosition)

**Day 8 **

Thursday was for the final bits of css and trying to fix some minor bugs.  I tidied up the code, took out unnecessary console logs and renamed some variables that no longer made sense. 

As the game started out with the idea of the original Frogger game where he is on land, my variable names reflected that. However, I made mine completely underwater when I started styling it. The variable names no longer made sense! I kept them during the build and changed them at the end.  

I added some game information that popped up when you hovered over the play button.
