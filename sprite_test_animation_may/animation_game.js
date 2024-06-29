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

var height, width;

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

var game_over_text = "text_1";
var game_over_entry = "entry_1";
var lowercaseDown = false;
var lowercaseUp = false;
var increment = 1;
var currentChar = 65;
var keyOne = 0, keyTwo = 0; keyThree = 0;
//ASCII 65 (A) - 90 (Z), 97 (a) - 122 (z)
var sprite = document.getElementById("keyframeSprites");
var scoreText = document.getElementById("score_text");
var boxSpriteContainer = document.getElementById("box_sprite_container")
var heart1 = document.getElementById("life_counter_1");
var heart2 = document.getElementById("life_counter_2");
var heart3 = document.getElementById("life_counter_3");
var megamanMain1 = document.getElementById("Character_megaman_main_1");
var megamanMain2 = document.getElementById("Character_megaman_main_2");
var megamanJumping = document.getElementById("Character_megaman_jumping");
var megamanChargeshot = document.getElementById("Character_megaman_chargeshot");
var megamanChargeBeam = document.getElementById("Character_megaman_chargeBeam");
var portalSprite = document.getElementById("portal_sprite");
var platformSprite1 = document.getElementById("platform_sprite_A");
var platformSprite2 = document.getElementById("platform_sprite_B");
var platformSprite3 = document.getElementById("platform_sprite_C");
var border3 = document.getElementById("border3");
var canvas3 = document.getElementById("canvas3");
var border4 = document.getElementById("border4");
var canvas4 = document.getElementById("canvas4");
var window1 = document.getElementById("window1");
var window2 = document.getElementById("window2");
var window3 = document.getElementById("window3");
var gameOverWindow = document.getElementById("game_over_window");
var hoverElement1 = document.getElementById("text_1");
var hoverElement2 = document.getElementById("text_2");
var hoverElement3 = document.getElementById("text_3");
var hoverElement4 = document.getElementById("entry_1");
var hoverElement5 = document.getElementById("entry_2");
var hoverElement6 = document.getElementById("entry_3");
var upArrowElement = document.getElementById("up_arrow");
var downArrowElement = document.getElementById("down_arrow");
var enterButtonElement = document.getElementById("enter_button");
var scoreboardWindow = document.getElementById("scoreboard_window");
var scoreboardWindowBorder = document.getElementById("scoreboard_window_border");
var scoreboardTextWindow = document.getElementById("scoreboard_text_window");
var gameOverTextContainer = document.getElementById("game_over_text_container");
var scoreboardTextContainer1 = document.getElementById("scoreboard_text_container_1");
var scoreboardTextContainer2 = document.getElementById("scoreboard_text_container_2");
var scoreboardTextContainer3 = document.getElementById("scoreboard_text_container_3");
var scoreboardTextContainer4 = document.getElementById("scoreboard_text_container_4");
var scoreboardTextContainer5 = document.getElementById("scoreboard_text_container_5");
var scoreboardText3 = document.getElementById("scoreboard_text_title_3");
var scoreboardText4 = document.getElementById("scoreboard_text_title_4");
var scoreboardText5 = document.getElementById("scoreboard_text_title_5");

var canvas1DOM = document.getElementById("canvas1")
var canvas2DOM = document.getElementById("canvas2")
var canvas3DOM = document.getElementById("canvas3")

const timerInterval = setInterval(timerFunc, 1000);
const enemySpriteInterval = setInterval(boxMovement, 5);

//window.addEventListener("click", printMousePos);
//checkWindowSize();

resetLayout();

canvas = canvas1DOM.getContext("2d");
img = document.getElementById(state + "_key");
canvas.drawImage(img, 0, 0);
canvas = canvas3DOM.getContext("2d");

sprite.style.left = xPos + "px";
sprite.style.top = yPos + "px";

main();


function handleKeyDown(e) {
    doWhichKey(e);
}

function handleKeyUp(e) {
    doNoKey(e);
}

function main() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function removeEventListeners() {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
}
function moveElement(width, height, element) {
    element.style.left = width + "px";
    element.style.top = height + "px";
}

function resizeElement(width, height, element) {
    element.style.width = width + "px";
    element.style.height = height + "px";
}

function resetLayout() {
    resizeElement(window.innerWidth - 580, 565, border3);
    resizeElement(window.innerWidth - 630, 515, canvas3);
    resizeElement(window.innerWidth - 25, window.innerHeight - 610, border4);
    resizeElement(window.innerWidth - 75, window.innerHeight - 660, canvas4);
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

function clearScreen() { //debug function
    megamanMain1.style.display = "none";
    megamanMain2.style.display = "none";
    megamanJumping.style.display = "none";
    megamanChargeshot.style.display = "none";
    megamanChargeBeam.style.display = "none";
    portalSprite.style.display = "none";
    platformSprite1.style.display = "none";
    platformSprite2.style.display = "none";
    platformSprite3.style.display = "none";
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

    discrepencyx = 0;
    discrepencyy = 0;

    nojump = false;

    switch (key) {
        case "a":

            if (xPos == boundaryxmin || yPos == boundaryymax || yPos == boundaryymin) {
                console.log("boundary x min reached");
                //current_animation = previous_animation;
                break;
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

            sprite.style.left = xPos + "px";
            sprite.style.top = yPos + "px";

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
}

function timerFunc() {
    timer += 1;

    scoreText.innerText = "Timer : " + timer;

    if (timer == 999) { gameOver; }
}

function boxMovement() {
    window_width = 770;

    x1 += movex;
    totalx += movex;

    boxSpriteContainer.style.right = x1 + "px";

    if (collision_check() == true) {
        console.log("hit");
        hit = true;
    }

    if (totalx == window_width || hit == true) { //set timeout to stop function while collision check is true
        hit = false;

        y1 = Math.floor(Math.random() * (max - min) + min);
        x1 = 0;
        totalx = 0; // can be used as a score multiplier

        boxSpriteContainer.style.right = x1 + "px";
        boxSpriteContainer.style.top = y1 + "px";
    }
}

function lives() {
    live_count -= 1;

    switch (live_count) {
        case 0: heart1.src = "life_dead.png";
        case 1: heart2.src = "life_dead.png";
        case 2: heart3.src = "life_dead.png";
    }

    x1 = 0;
    y1 = Math.floor(Math.random() * (max - min) + min);

    boxSpriteContainer.style.right = x1 + "px";
    boxSpriteContainer.style.top = y1 + "px";

    if (live_count == 0) {
        gameOver();
    }
}

function collision_check() {
    //728 - 1368 = 591 //128 - 338
    if (y1 > 0) { bx = 800 - x1 - 5; by = y1 + 310; console.log("low y"); }
    else if (y1 < 0) { bx = 800 - x1; by = 200 - Math.abs(y1) + 112; console.log("high y"); }
    else { bx = 800 - x1 - 5; by = y1 + 310; console.log("even y"); }

    //776
    sprite_run_x = xPos - 565;
    //216
    sprite_run_y = yPos + 80;

    //804
    sprite_jump_x = xPos - 545;
    //227
    sprite_jump_y = yPos + 90;

    // document.getElementById("sprite_hb_test").style.left = bx + "px";
    // document.getElementById("sprite_hb_test").style.top = by + "px";

    // document.getElementById("box_hb_test_run").style.left = sprite_run_x + "px";
    // document.getElementById("box_hb_test_run").style.top = sprite_run_y + "px";

    // document.getElementById("box_hb_test_jump").style.left = sprite_jump_x + "px";
    // document.getElementById("box_hb_test_jump").style.top = sprite_jump_y + "px";

    switch (current_animation) {
        case "Left_animation":
            if (sprite_run_x >= bx && sprite_run_x <= (bx + boxx) && sprite_run_y >= by && sprite_run_y <= (by + boxy)) {
                lives();
                return true;
            }// since there is always a return no break statement is needed
        case "Character_duck":
            if (sprite_jump_x >= bx && sprite_jump_x <= (bx + boxx) && sprite_jump_y >= by && sprite_jump_y <= (by + boxy)) {
                lives();
                return true;
            }
        case "Character_jumping":
            if (sprite_jump_x >= bx && sprite_jump_x <= (bx + boxx) && sprite_jump_y >= by && sprite_jump_y <= (by + boxy)) {
                lives();
                return true;
            }
    }
}

function closeGame() {
    //window.removeEventListener('keydown', function (e) { doWhichKey(e); });
    //window.removeEventListener('keyup', function (e) { doNoKey(e); });

    clearInterval(timerInterval);
    clearInterval(enemySpriteInterval);

    document.getElementById("keyframeSprites").style.display = "none";
    document.getElementById("box_sprite_container").style.display = "none";
}

function updateGameOverWindow() {
    moveElement(window.innerWidth / 2 - 400, window.innerHeight / 2 - 150, gameOverWindow)

    resetLayout();
}

function eventListenerUI() {
    startChar = currentChar;

    hoverElement1.innerHTML = "&#" + startChar;
    hoverElement2.innerHTML = "&#" + startChar;
    hoverElement3.innerHTML = "&#" + startChar;
    hoverElement4.innerHTML = "&#" + startChar;
    hoverElement5.innerHTML = "&#" + startChar;
    hoverElement6.innerHTML = "&#" + startChar;

    hoverElement1.addEventListener("mouseover", function hoverOverText1() {
        //console.log("Mouse is over the element");
        hoverElement1.style.color = "blue";
    });
    hoverElement1.addEventListener("mouseout", function hoverOutText1() {
        //console.log("Mouse is out of the element");
        hoverElement1.style.color = "black";
    });

    hoverElement2.addEventListener("mouseover", function hoverOverText2() {
        //console.log("Mouse is over the element");
        hoverElement2.style.color = "blue";
    });
    hoverElement2.addEventListener("mouseout", function hoverOutText2() {
        //console.log("Mouse is out of the element");
        hoverElement2.style.color = "black";
    });

    hoverElement3.addEventListener("mouseover", function hoverOverText3() {
        //console.log("Mouse is over the element");
        hoverElement3.style.color = "blue";
    });
    hoverElement3.addEventListener("mouseout", function hoverOutText3() {
        //console.log("Mouse is out of the element");
        hoverElement3.style.color = "black";
    });

    upArrowElement.addEventListener("mouseover", function hoverOverUpArrow() {
        //console.log("Mouse is over the element");
        upArrowElement.src = "up_arrow_highlight.png";
    });
    upArrowElement.addEventListener("mouseout", function hoverOutUpArrow() {
        //console.log("Mouse is out of the element");
        upArrowElement.src = "up_arrow.png";
    });

    downArrowElement.addEventListener("mouseover", function hoverOverDownArrow() {
        //console.log("Mouse is over the element");
        downArrowElement.src = "down_arrow_highlight.png";
    });
    downArrowElement.addEventListener("mouseout", function hoverOutDownArrow() {
        //console.log("Mouse is out of the element");
        downArrowElement.src = "down_arrow.png";
    });

    enterButtonElement.addEventListener("mouseover", function hoverOverEnterButton() {
        //console.log("Mouse is over the element Enter button");
        enterButtonElement.src = "enter_button_highlight.png";
    });
    enterButtonElement.addEventListener("mouseout", function hoverOutEnterButton() {
        //console.log("Mouse is over the element Enter button");
        enterButtonElement.src = "enter_button.png";
    });
}

function entry(game_over_text, game_over_entry, nextEntry) {
    let currentChar = 65;
    let lowercase = false;

    function handleDownArrowMouseUp() {
        //console.log("Down arrow is pressed for entry");

        if (!lowercase) {
            if (currentChar != 90) { currentChar += 1; }
            else { currentChar = 97; lowercase = true; }
        } else {
            if (currentChar != 122) { currentChar += 1; }
            else { currentChar = 65; lowercase = false; }
        }

        document.getElementById(game_over_text).innerHTML = "&#" + currentChar;
        document.getElementById(game_over_entry).innerHTML = "&#" + currentChar;
    }

    function handleUpArrowMouseUp() {
        //console.log("Up arrow is pressed for entry");

        if (!lowercaseUp) {
            if (currentChar != 65) { currentChar -= 1; }
            else { currentChar = 122; lowercase = true; }
        } else {
            if (currentChar != 97) { currentChar -= 1; }
            else { currentChar = 90; lowercase = true; }
        }

        document.getElementById(game_over_text).innerHTML = "&#" + currentChar;
        document.getElementById(game_over_entry).innerHTML = "&#" + currentChar;
    }

    function handleEnterButtonMouseUpEntry() {
        //console.log("Clicked the element Enter Button");
        downArrowElement.removeEventListener("mouseup", handleDownArrowMouseUp);
        upArrowElement.removeEventListener("mouseup", handleUpArrowMouseUp);
        lowercaseDown = false;
        lowercaseUp = false;

        switch (nextEntry) {
            case entryTwo: keyOne = currentChar; break;
            case entryThree: keyTwo = currentChar; break;
            case null: keyThree = currentChar;
                endGameOver();
                break;
        }

        if (nextEntry) nextEntry();
    }

    downArrowElement.addEventListener("mouseup", handleDownArrowMouseUp);
    upArrowElement.addEventListener("mouseup", handleUpArrowMouseUp);
    enterButtonElement.addEventListener("click", handleEnterButtonMouseUpEntry, { once: true });
}

function entryOne() {
    entry("text_1", "entry_1", entryTwo);
}

function entryTwo() {
    entry("text_2", "entry_2", entryThree);
}

function entryThree() {
    entry("text_3", "entry_3", null);
}

function updateScoreboardWindow() {
    window1.style.display = "none";
    window2.style.display = "none";
    window3.style.display = "none";
    gameOverWindow.style.display = "none";
    scoreboardWindow.style.display = "block";
}

function resetScoreboardLayout() {
    moveElement(0, 0, scoreboardWindow);
    resizeElement(window.innerWidth - 25, window.innerHeight - 25, scoreboardWindowBorder);
    resizeElement(window.innerWidth - 75, window.innerHeight - 75, scoreboardTextWindow);
    moveElement(window.innerWidth / 2 - 350, 0, gameOverTextContainer);
    moveElement(350, 75, scoreboardTextContainer1);
    moveElement(850, 35, scoreboardTextContainer2);
}

function setupScoreboardData() {
    moveElement(100, 100, scoreboardTextContainer3);
    moveElement(350, 60, scoreboardTextContainer4);
    scoreboardText3.innerHTML = "1<br /><br />2";
    moveElement(350, 60, scoreboardTextContainer4);
    scoreboardText4.innerHTML = "1<br /><br />2";
    moveElement(850, 25, scoreboardTextContainer5);
    scoreboardText5.innerHTML = "1<br /><br />2";
}

function endGameOver() {
    console.log(keyThree);
    // setup scoreboard window
    updateScoreboardWindow();
    resetScoreboardLayout();
    // setting up data
    setupScoreboardData();
}

function gameOver() {
    removeEventListeners();
    closeGame();
    updateGameOverWindow();
    eventListenerUI();
    entryOne();
}

function level_1() { }

//gameOver();
//clearScreen();