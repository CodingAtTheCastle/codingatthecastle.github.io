const canvas = document.querySelector('#castleCodingCanvas');
const ct = canvas.getContext('2d');
let cwidth = canvas.width;
let cheight = canvas.height;
let animationRunning = true;
let framerate = 200;
let blur = 40;
let numbers = [];


function drawNumber(x,y,size) {

    const io = Math.floor( 2 * Math.random() );
    const color = '#a6219e';

    //reset these values
    ct.shadowOffsetX = 0;
    ct.shadowOffsetY = 0;
    ct.shadowBlur = 0;
    ct.globalAlpha = 1;
    
    ct.fillStyle = color;
    ct.font = size + "px Courier New";
    ct.fillText(io,x,y);


    const boxWidth = size * 0.6;
    const boxHeight = size;

    ct.shadowBlur = blur;
    ct.shadowColor = color;
    ct.globalAlpha = 0.4;
    ct.shadowOffsetX = x + (size * 1);
    ct.shadowOffsetY = y + (size * 0.2);

    //render the rext offscreen, the shadow will be in place
    ct.fillRect(-size, -size, boxWidth, boxHeight );

    
    

};

function runAnimation() {
  if (animationRunning) {
    if (numbers.length < 10) {
      //add new number
      const rand = Math.floor( cwidth * Math.random() );

      const randSize = Math.floor( 50 * Math.random() ) + 4;
      
      numbers.push({
        x: rand,
        y: -(randSize / 3),
        size: randSize
      });
    }

    numbers.forEach((number,i) => {
      drawNumber(
        number.x,
        number.y,
        number.size,
      );

      const newY = numbers[i].y + (number.size * 1.1);

      if (newY > cheight + number.size) {
        //remove number so a new one can be created
        numbers.splice(i,1);
      } else {
        numbers[i].y = newY;
      }
      

    });

    
    setTimeout(() => {
      runAnimation()
    },framerate);
    

    //fastest frame rate
    /*
    requestAnimationFrame(() => {
      requestAnimationFrame(runAnimation());
    });
    */
  };
};

function resizeStuff() {
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;

  if(window.innerWidth < 600) {
    canvas.height = window.innerHeight * 0.5;
  }


  cwidth = canvas.width;
  cheight = canvas.height;

  //reset numbers to make a new start
  numbers = [];
}

resizeStuff();

//make sure that castle coding canvas is not running when it is off screen
var headerView = new Waypoint.Inview({
      element: header_background,
      enter: function(direction) {
        animationRunning = true;
        runAnimation();
      },
      exited: function(direction) {
        animationRunning = false;
      }
});

window.addEventListener('resize', resizeStuff);