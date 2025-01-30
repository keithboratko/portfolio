

function activateButton() {

    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {

            // Team Choice //

            if (button.classList.contains("team-button")) {
                document.querySelectorAll(".team-button").forEach((button) => {
                    button.classList.remove("active");
                })
                button.classList.add("active");
                if (document.querySelector(".active").classList.contains("team-x")) {
                    document.querySelector(".score-x-item .item-text").textContent = "X (YOU!)";
                }
                else if (button.classList.contains("team-o")) {
                    document.querySelector(".score-o-item .item-text").textContent = "O (YOU!)";
                }
            }

            // Opponent Choice //

            if (button.classList.contains("opponent-choice")) {
                document.querySelectorAll(".opponent-choice").forEach((button) => {
                    button.classList.remove("opponent-active");
                })
                button.classList.add("opponent-active");
                if (button.classList.contains("player")) {   
                    if (document.querySelector(".active").classList.contains("team-x")) {
                        document.querySelector(".score-o-item .item-text").textContent = "O (P2)"
                    }
                    else if (document.querySelector(".active").classList.contains("team-o")) {
                        document.querySelector(".score-x-item .item-text").textContent = "X (P2)";
                    }
                }
                else if (button.classList.contains("cpu")) {
                    if (document.querySelector(".active").classList.contains("team-x")) {
                        document.querySelector(".score-o-item .item-text").textContent = "O (CPU)"
                    }
                    else if (document.querySelector(".active").classList.contains("team-o")) {9
                        document.querySelector(".score-x-item .item-text").textContent = "X (CPU)";
                    }
                }
                document.querySelector(".game-board").style.display = "flex";
                document.querySelector(".new-game-menu").style.display = "none";
            }
        })
    })
}

// function opponentSelect() {

//     /* 
//     For every opponent choice button, add a click listener which performs the following:
//     - If class list of button contains "cpu", set opponent to cpu.
//         - If player1 teamSelect is X:
//             -display game-board, hide new-game-menu.
//         - If player1 teamSelect is O:
//             - edit score-x-item item-text: "X (CPU)"
//             - edit score-o-item item-text: "O (YOU!)"
//     */

//     document.querySelectorAll(".opponent-choice").forEach((button) => {
//         button.addEventListener("click", () => {
//             if (button.classList.contains("player")) {
//                 document.querySelector(".game-board").style.display = "flex";
//                 document.querySelector(".new-game-menu").style.display = "none";
//             }
//         })
//     })
// }

// function teamSelect() {
//     document.querySelectorAll(".team-button .active").forEach((button) => {
//         button.addEventListener("click", () => {
//             console.log(button.classList);
//             if (!button.classList.contains("team-x")) {
//                 document.querySelector(".score-x-item .item-text").textContent = "X (P1)";
//                 document.querySelector(".score-o-item .item-text").textContent = "O (YOU!)";
//             }
//         })
//     })
// }


// Outlines functionality of restart-menu buttons.
function restartClick() {
    // When restart-button is clicked, bring up the restart menu. //
    document.querySelector(".restart-button").addEventListener("click", () => {
        document.querySelector(".end-of-round").style.display = "flex";
        document.querySelectorAll(".decision-item").forEach((item) => {
            item.style.display = "none";
        })
        document.querySelector(".restart-menu").style.display = "flex";
        document.querySelector(".game-board").style.filter = "brightness(50%)";
        console.log("new round started");
    })

    // When cancel is clicked, revert display back to current game in game-board. //
    document.querySelector(".cancel").addEventListener("click", () => {
        document.querySelector(".game-board").style.display = "flex";
        document.querySelector(".restart-menu").style.display = "none";
        document.querySelector(".end-of-round").style.display = "none";
        document.querySelector(".game-board").style.filter = "brightness(100%)";
    })

    // When confirm-restart is clicked, revert display to emptied game-board, reset turn-logo icon to x-icon.
    document.querySelector(".confirm-restart").addEventListener("click", () => {
        document.querySelector(".game-board").style.display = "flex";
        document.querySelector(".restart-menu").style.display = "none";
        document.querySelector(".end-of-round").style.display = "none";
        document.querySelector(".turn-logo").src = "assets/icon-x.svg";
        document.querySelector(".game-board").style.filter = "brightness(100%)";

        document.querySelectorAll(".game-box").forEach((box) => {
            if (box.classList.contains("x-filled")) {
                box.classList.remove("x-filled");
            }
            else if (box.classList.contains("o-filled")) {
                box.classList.remove("o-filled");
            }
        })
        
    })
}

// Sets functionality for filling a game-box per active team. //
function boxFill() {

    // Initialize turn variable, iterate over each box. //
    var turn = "x";
    var empty_boxes = [];
    document.querySelectorAll(".game-box").forEach((box) => {
        if (!box.classList.contains("x-filled") && !box.classList.contains("o-filled")) {
            empty_boxes.push(box);
            console.log(empty_boxes);
            // if (document.querySelector(".active").classList.contains(`team-${turn}`)) {
            //     // box.addEventListener("mouseover", () => {
            //     //     box.style.backgroundImage = `assets/icon-${turn}-outline.svg`;
            //     // })
            //     // box.addEventListener("mouseout", () => {
            //     //     box.style.backgroundImage = "none";
            //     // })
            // }
        }
        
        box.addEventListener("click", () => {

            // Set turn to X for first turn. //
            // if (turn == null) {
            //     turn = "x";
            // }

            //Check if box is already filled - if so, do break. //
            if (box.classList.contains("x-filled") || box.classList.contains("o-filled")) {
                return;
            }

            // If it is X's turn, fill box with the x-icon, change turn to "o". //

            if (document.querySelector(".opponent-active").classList.contains("player")) {
                
                // Refactor: Use template literals to handle box-filling logic, inputting the turn variable to determine which images and classes to fill and assign.

                box.classList.add(`${turn}-filled`);
                if (turn == "x") {
                    turn = "o";
                }
                else {
                    turn = "x";
                }
                document.querySelector(".turn-logo").src = `assets/icon-${turn}.svg`;
                var box_index = empty_boxes.indexOf(box);
                empty_boxes.splice(box_index, 1);

            }

            else if (document.querySelector(".opponent-active").classList.contains("cpu")) {
                if (empty_boxes.length == 0) {
                    return;
                }
                document.querySelectorAll(".game-box").forEach((box) => {
                    console.log("turning off pointer events");
                    box.style.pointerEvents = "none";
                })
                // if (turn == "x" && document.querySelector(".active").classList.contains("team-x")) {
                //     box.classList.add("x-filled");
                //     turn = "o";
                //     document.querySelector(".turn-logo").src = "assets/icon-o.svg";
                //     var box_index = empty_boxes.indexOf(box);
                //     empty_boxes.splice(box_index, 1);
                // }
                // else if (turn == "o" && document.querySelector(".active").classList.contains("team-o")) {
                //     box.classList.add("o-filled");
                //     turn = "x";
                //     document.querySelector(".turn-logo").src = "assets/icon-x.svg";
                //     var box_index = empty_boxes.indexOf(box);
                //     empty_boxes.splice(box_index, 1);
                // }
                
                // Refactor: Use template literals to handle box-filling logic, inputting the turn variable to determine which images and classes to fill and assign.
                
                if (document.querySelector(".active").classList.contains(`team-${turn}`)) {
                    box.classList.add(`${turn}-filled`);
                    if (turn == "x") {
                        turn = "o";
                    }
                    else {
                        turn = "x";
                    }
                    document.querySelector(".turn-logo").src = `assets/icon-${turn}.svg`;
                    var box_index = empty_boxes.indexOf(box);
                    empty_boxes.splice(box_index, 1);
                }

                // if (turn == "x" && document.querySelector(".active").classList.contains("team-o")) {
                //     console.log("CPU's Turn");
                //     console.log("empty boxes cpu turn start", empty_boxes);

                //     setTimeout(() => {
                //         var cpu_choice = empty_boxes[(Math.floor(Math.random() * empty_boxes.length))];
                //         cpu_choice.classList.add("x-filled");
                //         cpu_choice.click(); // This will be used to simply fire the boxFill logic, triggering the CPU to click.
                //         turn = "o";
                //         document.querySelector(".turn-logo").src = "assets/icon-o.svg";
                //         var box_index = empty_boxes.indexOf(cpu_choice);
                //         empty_boxes.splice(box_index, 1);
                //         console.log("empty boxes cpu turn end", empty_boxes);
                //         document.querySelectorAll(".game-box").forEach((box) => {
                //             console.log("turning on pointer events");
                //             box.style.pointerEvents = "auto";
                //         })
                //     }, 1000);
                // }
                // else if (turn == "o" && document.querySelector(".active").classList.contains("team-x")) {
                //     console.log("CPU's Turn");
                //     console.log("empty boxes cpu turn start", empty_boxes);
                //     setTimeout(() => {
                //         var cpu_choice = empty_boxes[(Math.floor(Math.random() * empty_boxes.length))];
                //         cpu_choice.classList.add("o-filled");
                //         cpu_choice.click(); // This will be used to simply fire the boxFill logic, triggering the CPU to click.
                //         turn = "x";
                //         document.querySelector(".turn-logo").src = "assets/icon-x.svg";
                //         var box_index = empty_boxes.indexOf(cpu_choice);
                //         empty_boxes.splice(box_index, 1);
                //         console.log("empty boxes cpu turn end:", empty_boxes);
                //         document.querySelectorAll(".game-box").forEach((box) => {
                //             console.log("turning on pointer events");
                //             box.style.pointerEvents = "auto";
                //         })
                //     }, 1000);
                // }

                // Refactor: Use template literals to handle box-filling logic, inputting the turn variable to determine which images and classes to fill and assign.

                if (!document.querySelector(".active").classList.contains(`team-${turn}`)) {
                    console.log("CPU's Turn");
                    console.log("empty boxes cpu turn start", empty_boxes);
                    setTimeout(() => {
                        var cpu_choice = empty_boxes[(Math.floor(Math.random() * empty_boxes.length))];
                        cpu_choice.classList.add(`${turn}-filled`);
                        cpu_choice.click(); // This will be used to simply fire the boxFill logic, triggering the CPU to click.
                        if (turn == "x") {
                            turn = "o";
                        }
                        else {
                            turn = "x";
                        }
                        document.querySelector(".turn-logo").src = `assets/icon-${turn}.svg`;
                        var box_index = empty_boxes.indexOf(cpu_choice);
                        empty_boxes.splice(box_index, 1);
                        console.log("empty boxes cpu turn end:", empty_boxes);
                        document.querySelectorAll(".game-box").forEach((box) => {
                            console.log("turning on pointer events");
                            box.style.pointerEvents = "auto";
                        })
                    }, 1000);
                }
            }
        })
    })

    // At click of .confirm-restart, .quit-button, and .next-round-button, set turn to "x". // 
    document.querySelector(".confirm-restart").addEventListener("click", () => {
        turn = "x";
        empty_boxes = [];
        document.querySelectorAll(".game-box").forEach((box) => {
            empty_boxes.push(box);
        })
    })
    document.querySelector(".quit-button").addEventListener("click", () => {
        turn = "x";
        console.log("empty boxes at delete start:", empty_boxes);
        empty_boxes = []
        document.querySelectorAll(".game-box").forEach((box) => {
            empty_boxes.push(box);
        })
    })
    document.querySelector(".next-round-button").addEventListener("click", () => {
        turn = "x";
        console.log("empty boxes at delete start:", empty_boxes);
        empty_boxes = [];
        document.querySelectorAll(".game-box").forEach((box) => {
            empty_boxes.push(box);
        })
    })
}

// Checks game-board against win cases, tallies wins and ties. //
function winCheck() {

    // Set tallies for team X, O and ties, set variable selectors for each box. //

    var score_x = 0;
    var score_o = 0;
    var ties_tally = 0;
    var box1 = document.querySelector(".box1");
    var box2 = document.querySelector(".box2");
    var box3 = document.querySelector(".box3");
    var box4 = document.querySelector(".box4");
    var box5 = document.querySelector(".box5");
    var box6 = document.querySelector(".box6");
    var box7 = document.querySelector(".box7");
    var box8 = document.querySelector(".box8");
    var box9 = document.querySelector(".box9");

    // Overrides to set all displays of various end-of-round menu elements to none //

    document.querySelector(".end-of-round").style.display = "none";
    document.querySelector(".restart-menu").style.display = "none";
    document.querySelector(".tie-game").style.display = "none";

    // Iterate over each box, add a click event listener. //
    document.querySelectorAll(".game-box").forEach((box) => {
        box.addEventListener("click", () => {
 
            /* X win conditions:
                -Row 1, Row 2, Row 3
                -Column 1, Column 2, Column 3
                -Diagonal Right, Diagonal Left
            */

            if ((box1.classList.contains("x-filled") && box2.classList.contains("x-filled") && box3.classList.contains("x-filled")) || (box4.classList.contains("x-filled") && box5.classList.contains("x-filled") && box6.classList.contains("x-filled")) || (box7.classList.contains("x-filled") && box8.classList.contains("x-filled") && box9.classList.contains("x-filled")) || (box1.classList.contains("x-filled") && box4.classList.contains("x-filled") && box7.classList.contains("x-filled")) || (box2.classList.contains("x-filled") && box5.classList.contains("x-filled") && box8.classList.contains("x-filled")) || (box3.classList.contains("x-filled") && box6.classList.contains("x-filled") && box9.classList.contains("x-filled")) || (box1.classList.contains("x-filled") && box5.classList.contains("x-filled") && box9.classList.contains("x-filled")) || (box3.classList.contains("x-filled") && box5.classList.contains("x-filled") && box7.classList.contains("x-filled"))) {

                // Display end-of-round container. //
                document.querySelector(".end-of-round").style.display = "flex";
                document.querySelector(".game-board").style.filter = "brightness(50%)";

                
                // If player 1 is team O, display win decision for player 2. //
                if (document.querySelector(".active").classList.contains("team-o")) {
                    document.querySelector(".player-win").style.display = "flex";
                    document.querySelector(".player-number").textContent = " " + "2" + " ";
                    document.querySelector(".win").style.display = "none";
                }
                
                // else if player 1 is team X, display win decision for player 1. //
                else if (document.querySelector(".active").classList.contains("team-x")) {
                    document.querySelector(".player-win").style.display = "flex";
                    document.querySelector(".player-number").textContent = " " + "1" + " ";
                    document.querySelector(".loss").style.display = "none";
                }

                // Toggle display settings of end-of-round elements to display win decision for Team X. //
                document.querySelectorAll(".decision-item").forEach((item) => {
                    item.style.display = "flex";
                })
                document.querySelector(".tie-game").style.display = "none";
                document.querySelector(".winning-team .image-container").style.backgroundImage = "url(assets/icon-x.svg)";
                document.querySelector(".winning-team").style.display = "flex";
                
                document.querySelector(".winning-team .win-text-container").style.color = "var(--x-blue)";
                
                // Increment X score. //
                score_x += 1;
            }

            /* O win conditions:
                -Row 1, Row 2, Row 3
                -Column 1, Column 2, Column 3
                -Diagonal Right, Diagonal Left
            */
            else if ((box1.classList.contains("o-filled") && box2.classList.contains("o-filled") && box3.classList.contains("o-filled")) || (box4.classList.contains("o-filled") && box5.classList.contains("o-filled") && box6.classList.contains("o-filled")) || (box7.classList.contains("o-filled") && box8.classList.contains("o-filled") && box9.classList.contains("o-filled")) || (box1.classList.contains("o-filled") && box4.classList.contains("o-filled") && box7.classList.contains("o-filled")) || (box2.classList.contains("o-filled") && box5.classList.contains("o-filled") && box8.classList.contains("o-filled")) || (box3.classList.contains("o-filled") && box6.classList.contains("o-filled") && box9.classList.contains("o-filled")) || (box1.classList.contains("o-filled") && box5.classList.contains("o-filled") && box9.classList.contains("o-filled")) || (box3.classList.contains("o-filled") && box5.classList.contains("o-filled") && box7.classList.contains("o-filled"))) {
                // Display end-of-round container. //
                document.querySelector(".end-of-round").style.display = "flex";
                document.querySelector(".game-board").style.filter = "brightness(50%)";

                
                // If Player 1 is Team X, display win decision for Player 2. //
                if (document.querySelector(".active").classList.contains("team-x")) {
                    document.querySelector(".player-win").style.display = "flex";
                    document.querySelector(".win").style.display = "none";
                    document.querySelector(".player-number").textContent = "2";
                }

                // Else if Player 1 is Team O, display win desicion for player 1. //
                else if (document.querySelector(".active").classList.contains("team-o")) {
                    document.querySelector(".player-win").style.display = "flex";
                    document.querySelector(".player-number").textContent = "1";
                }

                // Toggle end-of-round display elements to display win desicion for Team O. //
                document.querySelectorAll(".decision-item").forEach((item) => {
                    item.style.display = "flex";
                })
                document.querySelector(".tie-game").style.display = "none";
                document.querySelector(".winning-team .image-container").style.backgroundImage = "url(assets/icon-o.svg)";
                document.querySelector(".winning-team").style.display = "flex";
                document.querySelector(".winning-team .win-text-container").style.color = "var(--o-yellow)";

                // Increment O score. //
                score_o += 1;
            }

            /*
                Tie Condition:
                - If all boxes are filled with either an X or an O, and win conditions fail.
            */

            else if ((box1.classList.contains("x-filled") || box1.classList.contains("o-filled")) && (box2.classList.contains("x-filled") || box2.classList.contains("o-filled")) && (box3.classList.contains("x-filled") || box3.classList.contains("o-filled")) && (box4.classList.contains("x-filled") || box4.classList.contains("o-filled")) && (box5.classList.contains("x-filled") || box5.classList.contains("o-filled")) && (box6.classList.contains("x-filled") || box6.classList.contains("o-filled")) && (box7.classList.contains("x-filled") || box7.classList.contains("o-filled")) && (box8.classList.contains("x-filled") || box8.classList.contains("o-filled")) && (box9.classList.contains("x-filled") || box9.classList.contains("o-filled"))) {
                // Display end-of-round container. //
                document.querySelector(".end-of-round").style.display = "flex";
                document.querySelector(".game-board").style.filter = "brightness(50%)";

                // Display end-of-round display elements to display a tie decision. //
                document.querySelector(".decision-text").style.display = "none";
                document.querySelector(".winning-team").style.display = "none";
                document.querySelector(".decision-info").style.display = "flex";
                document.querySelector(".tie-game").style.display = "flex";
                document.querySelector(".round-decision-buttons-container").style.display = "flex";

                // Increment tie tally. //
                ties_tally += 1;
            }

            // Set text content of Score X, Score O, and Ties to their incremented variables. //
            document.querySelector(".score-x").textContent = score_x;
            document.querySelector(".score-o").textContent = score_o;
            document.querySelector(".ties").textContent = ties_tally;
        })

    })

    // When quit-button is clicked, set all tallies to 0 and display new variable values.
    document.querySelector(".quit-button").addEventListener("click", () => {
        score_x = 0;
        score_o = 0;
        ties_tally = 0;
        document.querySelector(".score-x").textContent = score_x;
        document.querySelector(".score-o").textContent = score_o;
        document.querySelector(".ties").textContent = ties_tally;
    })
}

// Outlines funtionality of the end-of-round decision buttons. //
function menuTraverse() {

    // When quit-button is clicked, revert display back to new-game-menu. (Remove all fills from game-boxes, remove active class from team-button, reset turn-logo icon to x-icon.)
    document.querySelector(".quit-button").addEventListener("click", () => {
        document.querySelector(".end-of-round").style.display = "none";
        document.querySelector(".game-board").style.filter = "brightness(100%)";
        document.querySelector(".game-board").style.display = "none";
        document.querySelector(".new-game-menu").style.display = "flex";
        document.querySelector(".active").classList.remove("active");
        document.querySelector(".opponent-active").classList.remove("opponent-active");
        document.querySelectorAll(".game-box").forEach((box) => {
            if (box.classList.contains("x-filled")) {
                box.classList.remove("x-filled");
            }
            if (box.classList.contains("o-filled")) {
                box.classList.remove("o-filled");
            }
            document.querySelector(".turn-logo").src = "assets/icon-x.svg";
        })
        console.log("new round started");

    })

    // When next-round-button clicked, revert display to emptied game-board, reset turn-logo icon to x-icon.
    document.querySelector(".next-round-button").addEventListener("click", () => {
        console.log("next round clicked");
        document.querySelector(".game-board").style.filter = "brightness(100%)";
        document.querySelector(".end-of-round").style.display = "none";
        document.querySelectorAll(".game-box").forEach((box) => {
            if (box.classList.contains("x-filled")) {
                box.classList.remove("x-filled");
            }
            if (box.classList.contains("o-filled")) {
                box.classList.remove("o-filled");
            }
            document.querySelector(".turn-logo").src = "assets/icon-x.svg";
        })
        console.log("new round started");

    })
}

document.addEventListener("DOMContentLoaded", (event) => {
	activateButton();
    // opponentSelect();
    boxFill();
    // teamSelect();
    restartClick();
    winCheck();
    menuTraverse();

});

/* 
    Functional elements needed:

- Stores team choice
- Stores opponent choice
- On opponent click, display game board, hide menu
- Opponent (CPU or player) is set to opposite team.
- Base hover and active/filled states based on team turn, alternate between the two.
- Change svg team logo in turn container iteravely.

Win checks:
var win-check = "tie";
- if (box1, box2, box3 contain .x-filled || .o-filled)
- if (box4, box5, box6 contain .x-filled || .o-filled)
- if (box7, box8, box9 contain .x-filled || .o-filled)
- if (box1, box4, box7 contain .x-filled || .o-filled)
- if (box2, box5, box8 contain .x-filled || .o-filled)
- if (box3, box6, box9 contain .x-filled || .o-filled)
- if (box1, box5, box9 contain .x-filled || .o-filled)
- if (box3, box5, box7 contain .x-filled || .o-filled)
    - If any are true for either case, set winCheck to either "x " or "o"

If (win-check == "x") {
    - Display decision menu showing X won (player1, player2, or CPU)
    - Increment winning team score
}
Else if (win-check == "o") {
    - Display decision menu showing O won (player1, player2, or CPU)
    - Increment winning team score
}
Else {
    (Tie check:)
If (all boxes contain .x-filled || .o-filled && all win checks fail --> This would be easiest if checking for three variable settings: "x", "o", or "tie". Initialize winCheck as "tie" and only change it if a win check passes. So, this would be: "if (win-check") {
    - Display tie menu
    - Increment tie tally
}
}

On completion of round, per decision type, implement all end-of-round menu button functions:

- Quit: display main-menu, hide game-board, hide end-of-round menu, set all tally variables back to 0, set team-choice variable back to null.
- Next Round: display empty game-board with proper tallies of round wins and ties thus far.
(Restart Menu)
- No, cancel: hide restart-menu, continue round
- Yes, restart: clear came-board, keep current tallies of round wins and ties.

CPU Playing logic:

First idea:

-Iterate through all boxes until you find one with opponent's team class that is filled (eg. if CPU is team-X, iterate through all game-boxes until you find one with class of .o-filled).
-Identify which box number it is.
-Check box before, after, above, below, and all diagonal corners, if applicable, for a box with no filled class on.
-Select the first unfilled box encountered to fill.

*/