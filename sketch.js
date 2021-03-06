/*******************************************************************************************************************
    Mood State Machine 
    by Mindy Quach

   This project uses P5js and state machines. Our task was to edit a csv document and 
   modify the UI features of our website. 
*********************************************************************************************************************/

var simpleStateMachine;           // the SimpleStateManager class
var selectedTransitionNum = 0;    // index into the array of transitions
var transitions = [];
var moodImage;

function preload() {
  simpleStateMachine = new SimpleStateManager("assets/moodStates.csv");
}

// Setup code goes here
function setup() {
  createCanvas(1300, 900);
  imageMode(CENTER);

  // setup the state machine with callbacks
  simpleStateMachine.setup(setImage, setTransitionNames);
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawUI();
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  moodImage = loadImage(imageFilename);
} 

// this is a callback, which we use to diplay next state labels
function setTransitionNames(transitionArray) {
  transitions = transitionArray;
}

//==== KEYPRESSED ====/
function keyPressed() {
  // forward one, check for overflow
  if (keyCode === RIGHT_ARROW) {
    selectedTransitionNum++;
    if( selectedTransitionNum === transitions.length ) {
      selectedTransitionNum = 0;
    }
  }
  
  // back one, check for underflow
  if (keyCode === LEFT_ARROW ) {
    selectedTransitionNum--;
    if( selectedTransitionNum === -1 ) {
      selectedTransitionNum = transitions.length -1;
      if( selectedTransitionNum === -1 ) {
        console.log("error: transition array probably empty");
      }
    }
  }

  // Space or ENTER or RETURN will activate a sections
  if( key === ' ' || keyCode === RETURN || keyCode === ENTER ) {
    simpleStateMachine.newState(transitions[selectedTransitionNum]);
  }
}

function drawBackground() {
  background('#F2E3BC');
}

function drawImage() {
  fill('#ED6A5A');
  noStroke();
  rect(400,150,500,500,20);

  if( moodImage !== undefined ) {
    image(moodImage, width/2, height/2 - 30);
  }  
}

function drawUI() {
  push();
  textAlign(CENTER);
  textSize(20);

  for( let i = 0; i < transitions.length; i++ ) {
    fill('#412722');
    textStyle(NORMAL);

    if( selectedTransitionNum === i ) {
      textStyle(BOLDITALIC);
      fill('#E08DAC');
    }
    text(transitions[i], (width/2 - 300) + (i*450), (height/2 + 300), 220);
    
  }

  pop();
}
