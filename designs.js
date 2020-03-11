$(document).ready(function() {
	/*VARIABLES*/
	const myCanvas = $("#pixelCanvas");
	const cell = $("td");
	const colorPicker = $("#colorPicker");
	const swatches = $(".swatches");
	const swatchColor = ".swatchColor";
	const submitButton = $("#submitButton");
	const clearCanvas = $("#clearButton");
	const deleteCanvas = $("#deleteCanvasButton");
	const instructions = $("#instButton");
	const bucket = $("#paintCanvas");
	const hashtag = $("#toggleLinesButton");
	const canvasBkg = $("#canvasBkgColor");
	const downloadBtn = $("#downloadButton");
	const body = $("body");

	/*FUNCTIONS*/

	// function to make canvas
	function makeGrid() {
		//store values height and width
		let width = $("#canvasWidth").val();
		let height = $("#canvasHeight").val();
		// If value is >100, alert
		if (width <= 0 || width > 50 || height <= 0 || height > 50) {
			alert("Please insert values between 5 and 50!");
			return true;
		}
		//remove any previous canvas
		myCanvas.children().remove();
		//Create canvas : a table is created by iterrating over its rows and (nested for loop) columns
		for (var r = 0; r < height; r++) {
			myCanvas.append("<tr></tr>");
			for (var c = 0; c < width; c++) {
				myCanvas
					.children()
					.last()
					.append("<td></td>");
			}
		}
	}

	/*EVENT LISTENERS*/

	/*toggle dropdowns*/

	//Toggle open/close dropdown button -> instructions
	instructions.on("click", function(e) {
		e.preventDefault();
		$(".dropdown")
			.stop()
			.slideToggle(750);
	});

	//Toggle open/close canvasMenu (dropdown button -> left bar)
	$("#canvasMenuButton").on("click", function(e) {
		e.preventDefault();
		$(".barHiddenL")
			.stop()
			.slideToggle(750);
	});

	//Toggle open/close colorMenu (dropdown button -> right bar)
	$("#colorMenuButton").on("click", function(e) {
		e.preventDefault();
		$(".barHiddenR")
			.stop()
			.slideToggle(750);
	});

	//Open canvasMenu and colorMenu when clicked on setUp Button
	$("#setUpButton").on("click", function(e) {
		e.preventDefault();
		$(".barHiddenL")
			.stop()
			.slideToggle(750);
		$(".barHiddenR")
			.stop()
			.slideToggle(750);
	});

	/*submit-> create canvas*/

	//Event listener-> on click on submit button -> create canvas
	submitButton.click(function(e) {
		e.preventDefault();
		makeGrid();
	});

	/*left bar*/

	/*-------------drawing options-------------------*/
	//Event listener-> stroke drawing with mousedown & mousemove combo

	myCanvas.on("mousedown", "td", function(event) {
		event.preventDefault();
		let selectedColor = $("#colorPicker").val();
		$(this).css("background-color", selectedColor);
		$(this).css("cursor", "url(images\brush-png.png), auto");
		if (event.which == 3) {
			$(this).css("background-color", "");
		}
	});

	myCanvas.on("mouseover", "td", function(event) {
		if (event.buttons == 1) {
			let selectedColor = $("#colorPicker").val();
			$(this).css("background-color", selectedColor);
			$(this).css("cursor", "url(images\brush-png.png), auto");
		} else if (event.buttons == 2) {
			$(this).css("background-color", "");
			myCanvas.css;
		}
	});

	myCanvas.on("dragstart", function(event) {
		event.preventDefault();
	});

	//Event listener-> on double-click remove the filled color from the cell
	myCanvas.on("dblclick", "td", function() {
		$(this).css("background-color", "");
	});

	//Event listener-> on click paint whole canvas
	bucket.on("click", function() {
		let selectedColor = $("#colorPicker").val();
		myCanvas.attr("style", "background-color: " + selectedColor + ";");
	});

	/*------------canvas view options--------------------*/
	//Event listener-> set cell size
	// small
	$(".cellS").on("click", function() {
		$("tr").css("height", "10px");
		$("td").css("width", "10px");
	});

	// medium
	$(".cellM").on("click", function() {
		$("tr").css("height", "15px");
		$("td").css("width", "15px");
	});

	//  big
	$(".cellL").on("click", function() {
		$("tr").css("height", "20px");
		$("td").css("width", "20px");
	});

	//Event listener-> on click show/hide lines
	hashtag.on("click", function() {
		$("td").toggleClass("hiddenLines");
	});

	//Event listener-> on click on table color button button -> toggle white/transparent
	canvasBkg.on("click", function() {
		$("tr").toggleClass("canvasBkg");
	});

	//Event listener-> on click on clear button -> remove drawing
	clearCanvas.click(function() {
		$("td").each(function() {
			$("td").css("background-color", "");
		});
	});

	/*-------------actions-------------------*/

	//Event listener-> on click on delete button -> remove canvas
	deleteCanvas.click(function() {
		$("#canvasHeight, #canvasWidth").val("");
		myCanvas.empty();
	});

	//Event listener-> on click save masterpiece!
	//  -- needs a HTML2CANVAS plugin; not working here----still trying to figure it out ¯\_(ツ)_/¯
  $("#downloadButton").click(function() {
    html2canvas(document.querySelector(".printableCanvas")).then(canvas => {

      let link = document.createElement('a');
      link.download = "YourPixelMasterpiece.png";
      link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      link.click();
    });
  });

	/*right bar*/
	//swatches

	//create color palette
	swatches.each(function(color) {
		color = [
			"#00529a",
			"#433980",
			"#4c2468",
			"#af1f6a",
			"#be1e2d",
			"#ee3023",
			"#f37320",
			"#ffca2b",
			"#fbee35",
			"#add036",
			"#087b3e",
			"#ffffff",
			"#bbbdc0",
			"#000"
		];
		let palette = "";
		for (let i = 0; i < color.length; i++) {
			palette +=
				'<li class="swatchColor" title=" ' +
				color[i] +
				'" data-color="' +
				color[i] +
				'" style="background-color: ' +
				color[i] +
				';"></li>';
		}
		$(this).append(palette);
	});

	//function to pick swatch
	function pickSwatch(swatchColor, selectedColor) {
		selectedColor = $(swatchColor).attr("data-color");
		console.log("hex : " + selectedColor);
		colorPicker.val(selectedColor);
	}
	//Event listener-> on click pick swatch
	swatches.on("click", swatchColor, function() {
		pickSwatch(this);
	});
	//show swatch as selected color in color Picker
	colorPicker.val(selectedColor);

	//function to fill cell with color
	function draw(cell, color) {
		color = colorPicker.val();
		$(cell).css("background-color", color);
	}
	//function to remove color from cell
	function erease(cell) {
		$(cell).css("background-color", "");
	}

	/*hidden features*/
	// Event Handler  -> prevent right-click menu
	$(document).bind("contextmenu", function(e) {
		return false;
	});
}); //jQ doc-ready closing

/*-------------THE ᕕ( ᐛ )ᕗ END-----------------*/




// Variables to get canvas table, height, width, color
const grid = document.getElementById('pixel_canvas');
let gridH   = $('#input_height'),
    gridW   = $('#input_width'),
    color   = $('#colorPicker'),
    submit  = $('#input_submit');

function makeGrid() {

    //A function that fills color in the cell that was clicked and changes the color.

    let addEvent = function(cell) {
        $( cell ).on('click', function() {
            $( cell ).css('background', color.val());
        });
    }

    // Select size input

    grid.innerHTML = '';
    let height  = gridH.val();
    let width   = gridW .val();

    // loop to insert cells whenever the function is called

    for (let i = 0; i < height; i++) {
        let row = grid.insertRow(i);
        for (let j = 0; j < width; j++) {
            let cell = row.insertCell(j);
            $( cell ).on('click', addEvent(cell));
        }
    }
}

//Event listener that comes into action when submit button is clicked .
submit.click(function(prevent) {
    prevent.preventDefault();
    makeGrid();
});

// Start Animation

// Options
var options = {
  /* Which hue should be used for the first batch of rockets? */
  startingHue: 120,
  /* How many ticks the script should wait before a new firework gets spawned, if the user is holding down his mouse button. */
  clickLimiter: 5,
  /* How fast the rockets should automatically spawn, based on ticks */
  timerInterval: 40,
  /* Show pulsing circles marking the targets? */
  showTargets: true,
  /* Rocket movement options, should be self-explanatory */
  rocketSpeed: 2,
  rocketAcceleration: 1.03,
  /* Particle movement options, should be self-explanatory */
  particleFriction: 0.95,
  particleGravity: 1,
  /* Minimum and maximum amount of particle spawns per rocket */
  particleMinCount: 25,
  particleMaxCount: 40,
  /* Minimum and maximum radius of a particle */
  particleMinRadius: 3,
  particleMaxRadius: 5
};

// Local variables
var fireworks = [];
var particles = [];
var mouse = {down: false, x: 0, y: 0};
var currentHue = options.startingHue;
var clickLimiterTick = 0;
var timerTick = 0;
var cntRocketsLaunched = 0;

// Helper function for canvas animations
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(cb) {
      window.setTimeout(callback, 1000 / 60);
    }
})();

// Helper function to return random numbers within a specified range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Helper function to calculate the distance between 2 points
function calculateDistance(p1x, p1y, p2x, p2y) {
  var xDistance = p1x - p2x;
  var yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Setup some basic variables
var canvas = document.getElementById('canvas');
var canvasCtx = canvas.getContext('2d');
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

// Resize canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Firework class
function Firework(sx, sy, tx, ty) {
  // Set coordinates (x/y = actual, sx/sy = starting, tx/ty = target)
  this.x = this.sx = sx;
  this.y = this.sy = sy;
  this.tx = tx; this.ty = ty;

  // Calculate distance between starting and target point
  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;

  // To simulate a trail effect, the last few coordinates will be stored
  this.coordinates = [];
  this.coordinateCount = 3;

  // Populate coordinate array with initial data
  while(this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }

  // Some settings, you can adjust them if you'd like to do so.
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = options.rocketSpeed;
  this.acceleration = options.rocketAcceleration;
  this.brightness = random(50, 80);
  this.hue = currentHue;
  this.targetRadius = 1;
  this.targetDirection = false;  // false = Radius is getting bigger, true = Radius is getting smaller

  // Increase the rockets launched counter
  cntRocketsLaunched++;
};

// This method should be called each frame to update the firework
Firework.prototype.update = function(index) {
  // Update the coordinates array
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);

  // Cycle the target radius (used for the pulsing target circle)
  if(!this.targetDirection) {
    if(this.targetRadius < 8)
      this.targetRadius += 0.15;
    else
      this.targetDirection = true;
  } else {
    if(this.targetRadius > 1)
      this.targetRadius -= 0.15;
    else
      this.targetDirection = false;
  }

  // Speed up the firework (could possibly travel faster than the speed of light)
  this.speed *= this.acceleration;

  // Calculate the distance the firework has travelled so far (based on velocities)
  var vx = Math.cos(this.angle) * this.speed;
  var vy = Math.sin(this.angle) * this.speed;
  this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

  // If the distance traveled (including velocities) is greater than the initial distance
  // to the target, then the target has been reached. If that's not the case, keep traveling.
  if(this.distanceTraveled >= this.distanceToTarget) {
    createParticles(this.tx, this.ty);
    fireworks.splice(index, 1);
  } else {
    this.x += vx;
    this.y += vy;
  }
};

// Draws the firework
Firework.prototype.draw = function() {
  var lastCoordinate = this.coordinates[this.coordinates.length - 1];

  // Draw the rocket
  canvasCtx.beginPath();
  canvasCtx.moveTo(lastCoordinate[0], lastCoordinate[1]);
  canvasCtx.lineTo(this.x, this.y);
  canvasCtx.strokeStyle = 'hsl(' + this.hue + ',100%,' + this.brightness + '%)';
  canvasCtx.stroke();

  // Draw the target (pulsing circle)
  if(options.showTargets) {
    canvasCtx.beginPath();
    canvasCtx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
    canvasCtx.stroke();
  }
};

// Particle class
function Particle(x, y) {
  // Set the starting point
  this.x = x;
  this.y = y;

  // To simulate a trail effect, the last few coordinates will be stored
  this.coordinates = [];
  this.coordinateCount = 5;

  // Populate coordinate array with initial data
  while(this.coordinateCount--) {
    this.coordinates.push([this.x, this.y]);
  }

  // Set a random angle in all possible directions (radians)
  this.angle = random(0, Math.PI * 2);
  this.speed = random(1, 10);

  // Add some friction and gravity to the particle
  this.friction = options.particleFriction;
  this.gravity = options.particleGravity;

  // Change the hue to a random number
  this.hue = random(currentHue - 20, currentHue + 20);
  this.brightness = random(50, 80);
  this.alpha = 1;

  // Set how fast the particles decay
  this.decay = random(0.01, 0.03);
}

// Updates the particle, should be called each frame
Particle.prototype.update = function(index) {
  // Update the coordinates array
  this.coordinates.pop();
  this.coordinates.unshift([this.x, this.y]);

  // Slow it down (based on friction)
  this.speed *= this.friction;

  // Apply velocity to the particle
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed + this.gravity;

  // Fade out the particle, and remove it if alpha is low enough
  this.alpha -= this.decay;
  if(this.alpha <= this.decay) {
    particles.splice(index, 1);
  }
}

// Draws the particle
Particle.prototype.draw = function() {
  var lastCoordinate = this.coordinates[this.coordinates.length - 1];
  var radius = Math.round(random(options.particleMinRadius, options.particleMaxRadius));

  // Create a new shiny gradient
  var gradient = canvasCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
  gradient.addColorStop(0.0, 'white');
  gradient.addColorStop(0.1, 'white');
  gradient.addColorStop(0.1, 'hsla(' + this.hue + ',100%,' + this.brightness + '%,' + this.alpha + ')');
  gradient.addColorStop(1.0, 'black');

  // Draw the gradient
  canvasCtx.beginPath();
  canvasCtx.fillStyle = gradient;
  canvasCtx.arc(this.x, this.y, radius, Math.PI * 2, false);
  canvasCtx.fill();
}

// Create a bunch of particles at the given position
function createParticles(x, y) {
  var particleCount = Math.round(random(options.particleMinCount, options.particleMaxCount));
  while(particleCount--) {
    particles.push(new Particle(x, y));
  }
}

// Add an event listener to the window so we're able to react to size changes
window.addEventListener('resize', function(e) {
  canvas.width = canvasWidth = window.innerWidth;
  canvas.height = canvasHeight = window.innerHeight;
});

// Add event listeners to the canvas to handle mouse interactions
canvas.addEventListener('mousemove', function(e) {
  e.preventDefault();
  mouse.x = e.pageX - canvas.offsetLeft;
  mouse.y = e.pageY - canvas.offsetTop;
});

canvas.addEventListener('mousedown', function(e) {
  e.preventDefault();
  mouse.down = true;
});

canvas.addEventListener('mouseup', function(e) {
  e.preventDefault();
  mouse.down = false;
});

// Main application / script, called when the window is loaded
function gameLoop() {
  // This function will rund endlessly by using requestAnimationFrame (or fallback to setInterval)
  requestAnimFrame(gameLoop);

  // Increase the hue to get different colored fireworks over time
  currentHue += 0.5;

  // 'Clear' the canvas at a specific opacity, by using 'destination-out'. This will create a trailing effect.
  canvasCtx.globalCompositeOperation = 'destination-out';
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
  canvasCtx.globalCompositeOperation = 'lighter';

  // Loop over all existing fireworks (they should be updated & drawn)
  var i = fireworks.length;
  while(i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  // Loop over all existing particles (they should be updated & drawn)
  var i = particles.length;
  while(i--) {
    particles[i].draw();
    particles[i].update(i);
  }

  // Draw some text
  canvasCtx.fillStyle = 'white';
  canvasCtx.font = '14px Arial';
//  canvasCtx.fillText('Rockets launched: ' + cntRocketsLaunched, 10, 24);

  // Launch fireworks automatically to random coordinates, if the user does not interact with the scene
  if(timerTick >= options.timerInterval) {
    if(!mouse.down) {
      fireworks.push(new Firework(canvasWidth / 2, canvasHeight, random(0, canvasWidth), random(0, canvasHeight / 2)));
      timerTick = 0;
    }
  } else {
    timerTick++;
  }

  // Limit the rate at which fireworks can be spawned by mouse
  if(clickLimiterTick >= options.clickLimiter) {
    if(mouse.down) {
      fireworks.push(new Firework(canvasWidth / 2, canvasHeight, mouse.x, mouse.y));
      clickLimiterTick = 0;
    }
  } else {
    clickLimiterTick++;
  }
}

window.onload = gameLoop();

function sorryDelay() {
    $('#sorry').css('opacity', '1');
}
setTimeout(sorryDelay,5000)

function wattsonDelay() {
    $('#wattson').css('opacity', '1');
}
setTimeout(wattsonDelay,24000)
function wait() {
    $('#wait').css('opacity', '1');
}
setTimeout(wait,26000)

function remove() {
    $('section').hide('slow');
    $('canvas').fadeOut('slow');
}
setTimeout(remove,35000)
