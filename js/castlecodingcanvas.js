const canvas = document.querySelector('#castleCodingCanvas');
const ct = canvas.getContext('2d');
let cwidth = canvas.width;
let cheight = canvas.height;
let animationRunning = true;
let framerate = 200;
let blur = 40;
let numberofcolors = 10;
let numbers = [];
const colors = generateColor('#a720a1','#d9bc18',numberofcolors)


function drawNumber(x,y,size,color) {

    const io = Math.floor( 2 * Math.random() );

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

      let randSize;
      if(window.innerWidth < 600) {
        randSize = Math.floor( 30 * Math.random() ) + 4;
      } else {
        randSize = Math.floor( 50 * Math.random() ) + 4;
      }

      const colorId = Math.round((rand % (rand / cwidth)) * 10);

      numbers.push({
        x: rand,
        y: -(randSize / 3),
        size: randSize,
        color: colors[colorId],
      });
    }

    numbers.forEach((number,i) => {
      drawNumber(
        number.x,
        number.y,
        number.size,
        number.color,
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

function setCanvasSize() {
  
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

setCanvasSize();

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

function generateColor(colorStart,colorEnd,colorCount){

	// The beginning of your gradient
	var start = convertToRGB (colorStart);    

	// The end of your gradient
	var end   = convertToRGB (colorEnd);    

	// The number of colors to compute
	var len = colorCount;

	//Alpha blending amount
	var alpha = 0.0;

	var saida = [];
	
	for (i = 0; i < len; i++) {
		var c = [];
		alpha += (1.0/len);
		
		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];

		saida.push(convertToHex(c));
  }
  

  saida.reverse()

	return saida;
}

function hex(c) {
  var s = '0123456789abcdef';
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return '00';
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}


/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
  return '#'+hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) { 
  return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
  var color = [];
  color[0] = parseInt((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt((trim(hex)).substring (4, 6), 16);
  return color;
}

//window.addEventListener('resize', setCanvasSize);