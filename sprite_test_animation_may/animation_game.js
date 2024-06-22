// collision control
// borders for movement
let boundaryymax = 110;
let boundaryymin = 320;
let boundaryxmin = 720;
let boundaryxmax = 890;

// discrepencies to level spritesheets (for changing size of window)
// only needed for smaller windows
let discrepencyxrun = 0; //
let discrepencyyrun = 0; //
let discrepencyxjump = 0; //
let discrepencyyjump = 0; //
let discrepencyxduck = 0; //
let discrepencyyduck = 0; //
let discrepencyxbeam = 0; // 720 209 // 928 170
let discrepencyybeam = 0; // 

// size of sprites for box hits etc
let jumpx = Math.round(573 / 7 * 0.7);
let jumpy = 162;
let duckx = jumpx;
let ducky = jumpy;
let leftx = Math.round(860 / 5 * 0.7);
let lefty = Math.round(256 / 2 * 0.7);
let rightx = leftx;
let righty = lefty;

var e = 0;

var discrepencyy = 0, discrepencyx = 0;

var exit = true;

var key, img, canvas1, canvas2, canvas3, canvas;

//var secondMotion, nojump = false;

var state = "no";
var current_animation = "Left_animation";
var previous_animation = "";
var jumpMode = "";

var timer = 0;

var vx = 10;
var vy = 10;

var jumpHeight = 75;
var jumpDelay = 1;

var xPos = 790; //718 602
var yPos = 120; //207 188
var y1 = 0
var x1 = 0
var totalx = 0
var totaly = 0
var window_width = 856; //650 1504
var movex = 1;
//var movey = 10; // for y movement later
var min = -200;//-200
var max = 140;//140
var hit = false;

var timer = 0;
var live_count = 3;

var bx = x1 + 800; //800
var by = y1 + 280; //280
var sprite_run_x = xPos + 660; //770
var sprite_run_y = yPos + 100; //120
var sprite_jump_x = xPos + 650; //840 802
var sprite_jump_y = yPos + 100; //300 355

var runx = (860 / 5 * 0.70);
var runy = (256 / 2 * 0.70);
var jump_x = (573 / 7);
var jump_y = 162;
var boxx = 52;
var boxy = 40;

var offsets = 0, left = 0, top = 0;

var canvas1DOM = document.getElementById("canvas1")
var canvas2DOM = document.getElementById("canvas2")
var canvas3DOM = document.getElementById("canvas3")

// console.log(state);
// console.log(previous_animation);
// console.log(key);
// console.log(vx);
// console.log(vy);
// console.log(xPos);
// console.log(yPos);

const timerInterval = setInterval(timerFunc, 1000);
const enemySpriteInterval = setInterval(boxMovement, 5);

window.addEventListener('keydown', function (e) { doWhichKey(e); }) // can you simplify this
window.addEventListener('keyup', function (e) { doNoKey(e); }) // and this
window.addEventListener("click", printMousePos);
//checkWindowSize();

window.onload = function () {
    var height, width;

    height = 565;
    width = window.innerWidth - 580; //575

    // console.log("width  border 3 : " + width);
    // console.log("height  border 3 : " + height);

    document.getElementById("border3").style.width = width + "px";
    document.getElementById("border3").style.height = height + "px";

    height = 515;
    width = window.innerWidth - 630; //625

    // console.log("width  canvas 3 : " + width);
    // console.log("height  canvas 3 : " + height);

    document.getElementById("canvas3").style.width = width + "px";
    document.getElementById("canvas3").style.height = height + "px";

    width = window.innerWidth - 25;
    height = window.innerHeight - 610;//610

    // console.log("width border 4 : " + width);
    // console.log("height border 4 : " + top);

    document.getElementById("border4").style.width = width + "px";
    document.getElementById("border4").style.height = height + "px";
    // document.getElementById("window3").style.top = top + "px";
    // document.getElementById("window3").style.left = left + "px";

    width = window.innerWidth - 75;
    height = window.innerHeight - 660;// 635

    // console.log("width canvas 4 : " + width);
    // console.log("height canvas 4 : " + top);

    document.getElementById("canvas4").style.width = width + "px";
    document.getElementById("canvas4").style.height = height + "px";

    canvas = canvas1DOM.getContext("2d");
    img = document.getElementById(state + "_key");
    canvas.drawImage(img, 0, 0);
    canvas = canvas3DOM.getContext("2d");

    document.getElementById("keyframeSprites").style.left = xPos + "px";
    document.getElementById("keyframeSprites").style.top = yPos + "px";

}

function getWidth() {
    return window.innerWidth;
}

function getHeight() {
    return window.innerHeight;
}

function checkWindowSize() {
    width_WIN = window.innerWidth;
    height_WIN = window.innerHeight;

    console.log("window width is : " + width_WIN);
    console.log("window height is : " + height_WIN);
}

function movePositionX() {
    document.getElementById(current_animation).style.left = xPos + "px";
}

function printMousePos(event) {
    document.body.textContent = "clientX " + event.clientX + " - clientY: " + event.clientY;

    window.removeEventListener('keydown', function (e) { doWhichKey(e); });
    window.removeEventListener('keyup', function (e) { doNoKey(e); });
    clearInterval(timerInterval);
    clearInterval(enemySpriteInterval);
}

// function accountDiscrepency() {
//     switch (action) {
//         case "jump":
//         case "run":
//         case "charge":
//         case "beam":
//         // case "jump2":
//     }
// }

function clearScreen() {
    document.getElementById("Character_megaman_main_1").style.display = "none";
    document.getElementById("Character_megaman_main_2").style.display = "none";
    document.getElementById("Character_megaman_jumping").style.display = "none";
    document.getElementById("Character_megaman_chargeshot").style.display = "none";
    document.getElementById("Character_megaman_chargeBeam").style.display = "none";
    document.getElementById("portal_sprite").style.display = "none";
    document.getElementById("platform_sprite_1").style.display = "none";
    document.getElementById("platform_sprite_2").style.display = "none";
    document.getElementById("platform_sprite_3").style.display = "none";
}

function doNoKey(e) {
    e = 0;
    canvas = canvas1DOM.getContext("2d");
    img = document.getElementById("no_key");
    canvas.drawImage(img, 0, 0);
}

function doWhichKey(e) {

    //e = e || window.event;

    charCode = e.keyCode || e.which;

    key = String.fromCharCode(charCode);

    // console.log();
    // console.log(document.getElementById(current_animation).style.left);
    // console.log(document.getElementById(current_animation).style.top);
    // console.log();

    //x = document.getElementById(current_animation).style.left;
    //y = document.getElementById(current_animation).style.top;

    discrepencyx = 0;
    discrepencyy = 0;

    nojump = false;

    switch (key) {
        case "a":

            if (xPos == boundaryxmin || yPos == boundaryymax || yPos == boundaryymin) {
                console.log("boundary x min reached");
                //current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            previous_animation = current_animation;
            state = "A";
            current_animation = "Left_animation";

            // xPos += discrepencyx;
            // yPos += discrepencyy;

            xPos -= vx;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.left = xPos + "px";
            document.getElementById("keyframeSprites").style.top = yPos + "px";

            break;
        case "A":

            if (xPos == boundaryxmin || yPos == boundaryymax || yPos == boundaryymin) {
                console.log("boundary x min reached");
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            previous_animation = current_animation;
            state = "A";
            current_animation = "Left_animation";

            // xPos += discrepencyx;
            // yPos += discrepencyy;

            xPos -= vx;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.left = xPos + "px";
            document.getElementById("keyframeSprites").style.top = yPos + "px";

            break;

        //case "e":
        //    state = "E";
        //    current_animation = "Defend_animation";
        //    break;

        //case "E":
        //    state = "E";
        //    current_animation = "Defend_animation";
        //    break;

        case "s":

            if (yPos == (boundaryymin + discrepencyyduck)) {
                console.log("boundary y min reached");
                // current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            state = "S";
            previous_animation = current_animation;
            current_animation = "Character_duck";

            // xPos += discrepencyx;
            // yPos += discrepencyy;

            yPos += vy;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.top = yPos + "px";
            document.getElementById("keyframeSprites").style.left = xPos + "px";

            break;
        case "S":

            if (yPos == boundaryymin + discrepencyyduck) {
                console.log("boundary y min reached");
                // current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            state = "S";
            previous_animation = current_animation;
            current_animation = "Character_duck";

            // xPos += discrepencyx;
            // yPos += discrepencyy;

            yPos += vy;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.top = yPos + "px";
            document.getElementById("keyframeSprites").style.left = xPos + "px";

            break;

        case "d":

            if (xPos == boundaryxmax || yPos == boundaryymin || yPos == boundaryymax) {
                console.log("boundary x max reached");
                console.log("moving right");
                //current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            previous_animation = current_animation;
            state = "D";
            current_animation = "Left_animation";
            console.log("right");

            console.log("moving right success");
            // xPos += discrepencyx;
            // yPos += discrepencyy;

            xPos += vx;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.top = yPos + "px";
            document.getElementById("keyframeSprites").style.left = xPos + "px";

            break;

        case "D":

            if (xPos == boundaryxmax || yPos == boundaryymin || yPos == boundaryymax) {
                console.log("boundary x max reached");
                console.log("moving right");
                //current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            previous_animation = current_animation;
            state = "D";
            current_animation = "Left_animation";
            console.log("right");

            console.log("moving right success");
            // xPos += discrepencyx;
            // yPos += discrepencyy;

            xPos += vx;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.top = yPos + "px";
            document.getElementById("keyframeSprites").style.left = xPos + "px";

            break;

        case "w":

            if (yPos == (boundaryymax + discrepencyxjump)) {
                console.log("boundary y max reached");
                // current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            previous_animation = current_animation;
            state = "W";
            current_animation = "Character_jumping";

            // xPos += discrepencyx;
            // yPos += discrepencyy;

            yPos -= vy;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.top = yPos + "px";
            document.getElementById("keyframeSprites").style.left = xPos + "px";

            break;

        case "W":

            if (yPos == (boundaryymax + discrepencyxjump)) {
                console.log("boundary y max reached");
                //current_animation = previous_animation;
                break;

                // if (previous_animation != current_animation) {
                //     // if the current animation is diff from previous animation

                //     switch (current_animation) {
                //         //case "Left_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         //case "Right_animation": discrepencyy = discrepencyyrun; discrepencyx = discrepencyxrun;
                //         case "Character_duck": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         case "Character_jumping": discrepencyy = discrepencyyjump; discrepencyx = discrepencyxjump;
                //         //const discrepencyxjump2 = 0; //833
                //         //const discrepencyyjump2 = 0; //488
                //         //case "Attack_animation": discrepencyy = discrepencyybeam; discrepencyx = discrepencyxbeam;
                //         //case ""const discrepencyybeam; //615 200
                //     }
                // }
            }

            previous_animation = current_animation;
            state = "W";
            current_animation = "Character_jumping";

            xPos += discrepencyx;
            yPos += discrepencyy;

            yPos -= vy;

            document.getElementById(current_animation).style.display = "block";

            if (current_animation != previous_animation) {
                document.getElementById(previous_animation).style.display = "none";
            }

            document.getElementById("keyframeSprites").style.top = yPos + "px";
            document.getElementById("keyframeSprites").style.left = xPos + "px";

            break;

        // case "q":

        //     previous_animation = current_animation;
        //     state = "Q";
        //     current_animation = "Attack_animation";

        //     document.getElementById(current_animation).style.display = "block";

        //     if (current_animation != previous_animation) {
        //         document.getElementById(previous_animation).style.display = "none";
        //     }

        //     break;

        // case "Q":

        //     previous_animation = current_animation;
        //     state = "Q";
        //     current_animation = "Attack_animation";

        //     document.getElementById(current_animation).style.display = "block";

        //     if (current_animation != previous_animation) {
        //         document.getElementById(previous_animation).style.display = "none";
        //     }

        //     break;

        default:
            state = "no";
    }

    // drawing the key pressed animation

    canvas = canvas1DOM.getContext("2d");
    img = document.getElementById(state + "_key");
    canvas.drawImage(img, 0, 0);

    // console.log(state);
    // console.log(key);

    // console.log(previous_animation);
    // console.log(current_animation);

    // console.log(vx);
    // console.log(vy);

    // console.log("key is pressed\ncurrent animation is : " + current_animation);
    // console.log("");
    // console.log("xPos is : " + xPos);
    // console.log("xPos is : " + yPos);
    // console.log("");
    // console.log("x1 is : " + x1);
    // console.log("y1 is : " + y1);
    // console.log("");

    //console.log(window.innerWidth);
    //console.log(self.innerWidth);

    //console.log(getWidth());
    //console.log(String.fromCharCode(charCode));
}

function timerFunc() {
    timer += 1;
    //console.log(timer);

    document.getElementById("score_text").innerText = "Timer : " + timer;

    if (timer == 999) {
        gameOver;
    }

    //console.log(self.innerHeight);
    //console.log(self.innerWidth);

    //console.log("game over");
    //checkWindowSize();
    //alert("Game Over");
}

function boxMovement() {
    window_width = 770;

    x1 += movex;
    totalx += movex;

    // totaly += movey;
    // console.log("");
    // console.log(x1);
    // console.log(y1);
    // console.log("");
    // console.log(totalx);

    document.getElementById("box_sprite_container").style.right = x1 + "px";

    //console.log("x1 of box is : " + x1);

    if (collision_check() == true) {
        console.log("hit");
        hit = true;
    } else {
        // console.log("hit not registered\ncurrent animation is : " + current_animation);
        // console.log("");
        // console.log("xPos is : " + xPos);
        // console.log("yPos is : " + yPos);
        // console.log("");
        // console.log("sprite run x : " + sprite_run_x);
        // console.log("sprite run y : " + sprite_run_y);
        // console.log("");
        // console.log("sprite jump x : " + sprite_jump_x);
        // console.log("sprite jump y : " + sprite_jump_y);
        // console.log("");
        // console.log("x1 is : " + x1);
        // console.log("y1 is : " + y1);
        // console.log("");
        // console.log("bx : " + bx);
        // console.log("by : " + by);
        // console.log("");
        // console.log("boxx : " + boxx);
        // console.log("boxy : " + boxy);
        // console.log("");
        // console.log("hit : " + hit);
        // console.log("live_count : " + live_count);
    }

    if (totalx == window_width || hit == true) { //set timeout to stop function while collision check is true

        // console.log("hit in progress\ncurrent animation is : " + current_animation);
        // console.log("");
        // console.log("xPos is : " + xPos);
        // console.log("yPos is : " + yPos);
        // console.log("");
        // console.log("sprite run x : " + sprite_run_x);
        // console.log("sprite run y : " + sprite_run_y);
        // // console.log("");
        // // console.log("sprite jump x : " + sprite_jump_x);
        // // console.log("sprite jump y : " + sprite_jump_y);
        // // console.log("");
        // // console.log("x1 is : " + x1);
        // // console.log("y1 is : " + y1);
        // console.log("");
        // console.log("bx : " + bx);
        // console.log("by : " + by);
        // console.log("");
        // // console.log("boxx : " + boxx);
        // // console.log("boxy : " + boxy);
        // // console.log("");
        // console.log("hit : " + hit);
        // console.log("live_count : " + live_count);

        hit = false;
        // setTimeout("", 1000);

        y1 = Math.floor(Math.random() * (max - min) + min);
        x1 = 0;
        totalx = 0; // can be used as a score multiplier

        document.getElementById("box_sprite_container").style.right = x1 + "px";
        document.getElementById("box_sprite_container").style.top = y1 + "px";
    }
}

function lives() {
    live_count -= 1;

    switch (live_count) {
        case 0: document.getElementById("life_counter_1").src = "life_dead.png";
        case 1: document.getElementById("life_counter_2").src = "life_dead.png";
        case 2: document.getElementById("life_counter_3").src = "life_dead.png";
    }

    x1 = 0;
    y1 = Math.floor(Math.random() * (max - min) + min);

    document.getElementById("box_sprite_container").style.right = x1 + "px";
    document.getElementById("box_sprite_container").style.top = y1 + "px";

    if (live_count == 0) {
        gameOver();
    }
}

function collision_check() {
    // offsets = document.getElementById('box_sprite_container').getBoundingClientRect();
    // top = offsets.top;
    // left = offsets.left;

    // console.log("window width : " + window.innerWidth);
    // console.log("");
    // console.log("x1 is : " + x1);
    // console.log("y1 is : " + y1);
    // console.log("");
    // console.log("bx : " + bx);
    // console.log("by : " + by);
    // console.log("");

    //728 - 1368 = 591 //128 - 338
    if (y1 > 0) { bx = 800 - x1 - 5; by = y1 + 310; console.log("low y"); }
    else if (y1 < 0) { bx = 800 - x1; by = 200 - Math.abs(y1) + 112; console.log("high y"); }
    else { bx = 800 - x1 - 5; by = y1 + 310; console.log("even y"); }

    //document.getElementById("box_sprite_container").style.right = "0px"; 
    // document.getElementById("sprite_hb_test").style.left = bx + "px";
    // document.getElementById("sprite_hb_test").style.top = by + "px";

    // offsets = document.getElementById('Left_animation').getBoundingClientRect();
    // top = offsets.top;
    // left = offsets.left;

    //sprite_run_x = xPos; //776
    //sprite_run_y = yPos; //216

    //776
    sprite_run_x = xPos - 600;

    //216
    sprite_run_y = yPos + 85;

    // document.getElementById("box_hb_test_run").style.left = sprite_run_x + "px";
    // document.getElementById("box_hb_test_run").style.top = sprite_run_y + "px";

    // offsets = document.getElementById('Character_jumping').getBoundingClientRect();
    // top = offsets.top;
    // left = offsets.left;

    //sprite_jump_x = xPos;
    //sprite_jump_y = yPos;

    //804
    sprite_jump_x = xPos - 559;

    //227
    sprite_jump_y = yPos + 135;

    // document.getElementById("box_hb_test_jump").style.left = sprite_jump_x + "px";
    // document.getElementById("box_hb_test_jump").style.top = sprite_jump_y + "px";

    // canvas = canvas3DOM.getContext("2d");
    // canvas.beginPath();
    // canvas.arc(bx, by, 100, 0, 2 * Math.PI);
    // canvas.arc(sprite_run_x, sprite_run_y, 100, 0, 2 * Math.PI);
    // canvas.arc(sprite_jump_x, sprite_jump_y, 100, 0, 2 * Math.PI);
    // canvas.stroke();

    // var runx = (860 / 5 * 0.70);
    // var runy = (256 / 2 * 0.70);
    // var jump_x = (573 / 7);
    // var jump_y = 162;
    // var boxx = 52;
    // var boxy = 40;

    // console.log("bx : " + bx);
    // console.log("by : " + by);
    // console.log("boxx : " + boxx);
    // console.log("boxy : " + boxy);
    // console.log("sprite run x : " + sprite_run_x);
    // console.log("sprite run y : " + sprite_run_y);
    // console.log("sprite jump x : " + sprite_jump_x);
    // console.log("sprite jump y : " + sprite_jump_y);

    switch (current_animation) {
        case "Left_animation":
            if (sprite_run_x >= bx && sprite_run_x <= (bx + boxx) && sprite_run_y >= by && sprite_run_y <= (by + boxy)) {
                lives();
                return true;
                //alert("hit");
            }// since there is always a return no break statement is needed
        case "Character_duck":
            if (sprite_jump_x >= bx && sprite_jump_x <= (bx + boxx) && sprite_jump_y >= by && sprite_jump_y <= (by + boxy)) {
                lives();
                return true;
                //alert("hit");
            }
        case "Character_jumping":
            if (sprite_jump_x >= bx && sprite_jump_x <= (bx + boxx) && sprite_jump_y >= by && sprite_jump_y <= (by + boxy)) {
                lives();
                return true;
                //alert("hit");
            }
    }
}

function gameOver() {
    window.removeEventListener('keydown', function (e) { doWhichKey(e); });
    window.removeEventListener('keyup', function (e) { doNoKey(e); });

    clearInterval(timerInterval);
    clearInterval(enemySpriteInterval);

    document.getElementById("keyframeSprites").style.display = "none";
    document.getElementById("box_sprite_container").style.display = "none";

    document.getElementById("game_over_window").style.display = "block";

    width = window.innerWidth / 2 - 400;
    height = window.innerHeight / 2 - 150;

    document.getElementById("game_over_window").style.left = width + "px";
    document.getElementById("game_over_window").style.top = height + "px";

    var hoverElement1 = document.getElementById("game_over_text_1");
    hoverElement1.addEventListener("mouseover", function () {
        console.log("Mouse is over the element");
        hoverElement1.style.color = "blue";
    });
    hoverElement1.addEventListener("mouseout", function () {
        console.log("Mouse is out of the element");
        hoverElement1.style.color = "black";
    });

    var hoverElement2 = document.getElementById("game_over_text_2");
    hoverElement2.addEventListener("mouseover", function () {
        console.log("Mouse is over the element");
        hoverElement2.style.color = "blue";
    });
    hoverElement2.addEventListener("mouseout", function () {
        console.log("Mouse is out of the element");
        hoverElement2.style.color = "black";
    });

    var hoverElement3 = document.getElementById("game_over_text_3");
    hoverElement3.addEventListener("mouseover", function () {
        console.log("Mouse is over the element");
        hoverElement3.style.color = "blue";
    });
    hoverElement3.addEventListener("mouseout", function () {
        console.log("Mouse is out of the element");
        hoverElement3.style.color = "black";
    });

    var upArrowElement = document.getElementById("up_arrow");
    upArrowElement.addEventListener("mouseover", function () {
        console.log("Mouse is over the element");
        upArrowElement.src = "up_arrow_highlight.png";
    });
    upArrowElement.addEventListener("mouseout", function () {
        console.log("Mouse is out of the element");
        upArrowElement.src = "up_arrow.png";
    });

    var downArrowElement = document.getElementById("down_arrow");
    downArrowElement.addEventListener("mouseover", function () {
        console.log("Mouse is over the element");
        downArrowElement.src = "down_arrow_highlight.png";
    });
    downArrowElement.addEventListener("mouseout", function () {
        console.log("Mouse is out of the element");
        downArrowElement.src = "down_arrow.png";
    });

}

function level_1() { }

//gameOver();
