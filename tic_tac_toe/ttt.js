

const GameBoard = (() => {
    let gameboard = ["", "", "", "", "", "","", "", ""]

    return { gameboard }
})()

// Player object
const Player = (player_name, player_symbol) => {
    return {player_name, player_symbol}
}

const GameControl = (() => {
    let board = GameBoard.gameboard
    let display = document.querySelector(".display")
    let tiles = document.querySelectorAll('.tile')
    let p1_score = 0
    let p2_score = 0

    let p1 = ""
    let p2 = ""
    let name = ""
    const getNameAndStart = () => {
        let form = document.querySelector('.name')
        let r = document.querySelector("#replay")
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            p1 = form['player1-name'].value
            p2 = form['player2-name'].value
            let v = document.querySelectorAll(".visible");
            v.forEach(v_item => {
                v_item.classList.remove('visible')
            })
            form.classList.add('visible')
            r.classList.add("visible")
            display.innerHTML = `<h2>${p1} vs ${p2}</h2>`
            name = () => {return {p1, p2}}
        })
        return {name}

    }

    // Update page with players selections on gameboard
    const updatePage = () => {
        i = 0
        while (i < tiles.length) {
            tiles[i].innerHTML = board[i]
            // Change text color 
            if (tiles[i].innerHTML == 'x'){
                tiles[i].style.color = "blue"
            }
            else if (tiles[i].innerHTML == "o"){
                tiles[i].style.color = "green"
            }
            i++
        }
        
    }
    // Create players and check turns
    const trackPlayers = () => {
        const player1 = Player('Player X', 'x')
        const player2 = Player('Player O', 'o')
        let current_player = true

        return {player1, player2, current_player}
    } 

    // Click and fill tile
    const markTile = () => {
        let turns = trackPlayers()

        let tiles = document.querySelectorAll('.tile')
        for(let i = 0; i < board.length; i++) {
            tiles[i].addEventListener('click', ()=> {
                if (tiles[i].innerHTML ==  "" && board[i] == "") {
                    if (turns.current_player == true) {
                        board[i] = turns.player1.player_symbol
                        turns.current_player = false
                    }
                    else{
                        board[i] = turns.player2.player_symbol
                        turns.current_player = true
                    }
                    let p_name_1 = GameControl.getNameAndStart().name().p1
                    let p_name_2 = GameControl.getNameAndStart().name().p2

                    display.innerHTML = `<h2>${p_name_1} vs ${p_name_2}</h2>`

                    GameControl.updatePage()
                    GameControl.declareWinner()

                }
                else{
                    
                }    
            })
        };
        return
    };
    
    const declareWinner = () => {
        let p_name_1 = GameControl.getNameAndStart().name().p1
        let p_name_2 = GameControl.getNameAndStart().name().p2
        const sequence = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for(let i = 0; i < sequence.length; i++) {
            if (board[sequence[i][0]] != "" && board[sequence[i][0]] == board[sequence[i][1]] && board[sequence[i][1]] == board[sequence[i][2]]) {
                let winner = board[sequence[i][0]]
                if (trackPlayers().player1.player_symbol == winner) {
                    p1_score += 1
                    GameControl.clear()
                    display.innerHTML = `<h2>${p_name_1} Wins!</h2>`
                    display.innerHTML += `<h3>${p1_score} - ${p2_score}</h3>`
                    GameControl.replay()
                    

                }
                else {
                    GameControl.clear()
                    p2_score += 1
                    display.innerHTML = `<h2>${p_name_2} Wins!</h2>`
                    display.innerHTML += `<h3>${p1_score} - ${p2_score}</h3>`

                    GameControl.replay()


                }
            }      
            else if (board[0] !== '' && board[1] !== '' && board[2] !== '' && board[3] !== '' && board[4] !== '' && board[5] !== '' && board[6] !== '' && board[7] !== '' && board[8] !== '') {
                GameControl.clear()
                display.innerHTML = "<h2>The game ended in a tie</h2>"
                display.innerHTML += `<h3>${p1_score} - ${p2_score}</h3>`

                GameControl.replay()

            };
  
        }

    };
    const replay = () => {
        let replay = document.querySelector("#replay");
        let p_name_1 = GameControl.getNameAndStart().name().p1
        let p_name_2 = GameControl.getNameAndStart().name().p2

        replay.addEventListener('click', () => {
            let g = document.querySelector(".gameboard");
            let b = document.querySelector(".buttons");

            g.classList.remove("visible")
            b.classList.remove("visible")
            replay.classList.add("visible")
            display.innerHTML = `<h2>${p_name_1} vs ${p_name_2}</h2>`


    })}
    
    const clear = () => {
        for (i=0; i < board.length; i++) {
            tiles[i].innerHTML = ""
            board[i] = ""
            display.innerHTML = ""
            let g = document.querySelector(".gameboard");
            let b = document.querySelector(".buttons");
            let r = document.querySelector("#replay");

            g.classList.add("visible")
            b.classList.add("visible")
            r.classList.remove("visible")
        }
    }
    const resetButton = () => {
        function event_function() {
            // for (i=0; i < board.length; i++) {
                // board[i] = ""
                // GameControl.trackPlayers().current_player = true
                window.location.reload()
            // }

        }
        let reset = document.querySelector("#reset-btn")
        reset.addEventListener('click', event_function)
        // reset.removeEventListener('click', event_function)
    }
    return { getNameAndStart, updatePage, markTile, trackPlayers, declareWinner, replay, clear, resetButton}
})()

GameControl.markTile()
GameControl.getNameAndStart()
GameControl.resetButton()

