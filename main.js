
let grid = document.getElementById("game");
let score = document.getElementById("score");
let width;
let squares = [];
let sc = 0;
console.log(test);
// create board
function board() {
    for (let i = 0; i < width * width; i++) {
        let square = document.createElement("div");
        square.innerHTML = " ";
        grid.appendChild(square);
        squares.push(square)
    }
    generate()
    generate()
}

// creating random position for 2.
function generate() {
    let randomnumber = Math.floor(Math.random() * squares.length);
    if (squares[randomnumber].innerHTML == " ") {
        squares[randomnumber].innerHTML = 2;
        color()
        pop(squares[randomnumber])
    }
    else {
        generate()
    }
}

// pop 2
function pop(n) {
    n.style.transition = "background-color 0.5s"
}

// swipe right
function moveRight() {
    for (let i = 0; i < width * width; i++) {
        if (i % width === 0) {
            let row = [];
            for (let j = i; j < width + i; j++) {
                let temp = squares[j].innerHTML;
                row.push(parseInt(temp))
            }

            let filteredrow = row.filter(num => num);
            let missing = width - filteredrow.length
            let zeros = Array(missing).fill(" ")
            let newrow = zeros.concat(filteredrow);
            console.log(row)
            for (let l = i; l < width + i; l++) {
                squares[l].innerHTML = newrow[l - i];
            }
        }
    }
}

// swipe Left
function moveLeft() {
    for (let i = 0; i < width * width; i++) {
        if (i % width === 0) {
            let row = [];
            for (let j = i; j < width + i; j++) {
                let temp = squares[j].innerHTML;
                row.push(parseInt(temp))
            }

            let filteredrow = row.filter(num => num);
            let missing = width - filteredrow.length
            let zeros = Array(missing).fill(" ")
            let newrow = filteredrow.concat(zeros);
            console.log(row)
            for (let j = i; j < width + i; j++) {
                squares[j].innerHTML = newrow[j - i];
            }
        }
    }
}

// swipe down
function moveDown() {
    for (let i = 0; i < width; i++) {
        let column = [];
        for (let j = 0; j < width; j++) {
            let temp = squares[i + j * width].innerHTML;
            column.push(parseInt(temp))
        }

        let filteredcolumn = column.filter(num => num);
        let missing = width - filteredcolumn.length
        let zeros = Array(missing).fill(" ")
        let newcolumn = zeros.concat(filteredcolumn);
        console.log(newcolumn)

        for (let j = 0; j < width; j++) {
            squares[i + j * width].innerHTML = newcolumn[j];
        }
    }
}

// move up 
function moveUp() {
    for (let i = 0; i < width; i++) {
        let column = [];
        for (let j = 0; j < width; j++) {
            let temp = squares[i + j * width].innerHTML;
            column.push(parseInt(temp))
        }
        let filteredcolumn = column.filter(num => num);
        let missing = width - filteredcolumn.length
        let zeros = Array(missing).fill(" ")
        let newcolumn = filteredcolumn.concat(zeros);

        for (let j = 0; j < width; j++) {
            squares[i + j * width].innerHTML = newcolumn[j];
        }
    }
}

// combine row
function combinerow() {
    for (let i = 0; i < width * width - 1; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerText !== " ") {
            let combinetotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
            squares[i].innerHTML = combinetotal
            squares[i + 1].innerHTML = " "
            if (combinetotal === 2 || combinetotal === 4 || combinetotal === 8 || combinetotal === 16 || combinetotal === 32 || combinetotal === 64 || combinetotal === 128 || combinetotal === 256 || combinetotal === 512 || combinetotal === 1024 || combinetotal === 2048) {
                sc += combinetotal
                score.innerText = sc;

            }

        }
    }
}

// combine column
function combinecolumn() {
    for (let i = 0; i < width * width - width; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
            let combinetotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
            squares[i].innerHTML = combinetotal
            squares[i + width].innerHTML = " "
            if (combinetotal === 2 || combinetotal === 4 || combinetotal === 8 || combinetotal === 16 || combinetotal === 32 || combinetotal === 64 || combinetotal === 128 || combinetotal === 256 || combinetotal === 512 || combinetotal === 1024 || combinetotal === 2048) {
                sc += combinetotal
                score.innerText = sc;
            }
        }
    }
}

// controls
function control(e) {
    if (e.code === "ArrowRight") {
        moveRight()
        combinerow()
        moveRight()
        generate()
        color()
    }
    else if (e.code === "ArrowLeft") {
        moveLeft()
        combinerow()
        moveLeft()
        generate()
        color()
    }
    else if (e.code === "ArrowUp") {
        moveUp()
        combinecolumn()
        moveUp()
        generate()
        color()
    }
    else if (e.code === "ArrowDown") {
        moveDown()
        combinecolumn()
        moveDown()
        generate()
        color()
    }

    if (gameover()) {
        document.querySelector("button").style.display = "inline-block"
        document.getElementById("msg").innerText = "Game Over"
        document.getElementById("score").innerText = "Your score: " + `${sc}`
        document.getElementById("info").className = "loose"
        document.removeEventListener("keyup", control)
    }
}

// game over
function gameover() {
    let fill = 0;
    for (let i = 0; i < width*width; i++) {
        if (squares[i].innerHTML !== " ") {
            fill++
        }
    }
    if (fill === width*width) {
        return true;
    }
    else {
        return false;
    }
}

// color
function color() {
    for (let i = 0; i < width * width; i++) {
        if (squares[i].innerHTML === " ") {
            squares[i].className = "c0"
        }
        else if (squares[i].innerHTML === "2") {
            squares[i].className = "c2"
            pop(squares[i])
        }
        else if (squares[i].innerHTML === "4") {
            squares[i].className = "c4"
            pop(squares[i])
        }
        else if (squares[i].innerHTML === "8") {
            squares[i].className = "c8"
        }
        else if (squares[i].innerHTML === "16") {
            squares[i].className = "c16"
        }
        else if (squares[i].innerHTML === "32") {
            squares[i].className = "c32"
        }
        else if (squares[i].innerHTML === "64") {
            squares[i].className = "c64"
        }
        else if (squares[i].innerHTML === "128") {
            squares[i].className = "c128"
        }
        else if (squares[i].innerHTML === "256") {
            squares[i].className = "c256"
        }
        else if (squares[i].innerHTML === "512") {
            squares[i].className = "c512"
        }
        else if (squares[i].innerHTML === "1024") {
            squares[i].className = "c1024"
        }
        else if (squares[i].innerHTML === "2948") {
            squares[i].className = "c2948"
        }
    }
}

// getting mode
function fun4() {

     width = 4;
    document.getElementById("get").style.display = "none"
    document.getElementById("main").style.opacity = "1"
    let game = document.getElementById("game")
    game.style.gridTemplateRows = `repeat(${width},8vw)`
    game.style.gridTemplateColumns = `repeat(${width},8vw)`
    board()
}
function fun5() {
    width = 5;
    document.getElementById("get").style.display = "none"
    document.getElementById("main").style.opacity = "1"
    let game = document.getElementById("game")
    game.style.gridTemplateRows = `repeat(${width},7vw)`
    game.style.gridTemplateColumns = `repeat(${width},7vw)`
    board()
    console.log("called")
}
function fun6() {
     width = 6;
    document.getElementById("get").style.display = "none"
    document.getElementById("main").style.opacity = "1"
    let game = document.getElementById("game")
    game.style.gridTemplateRows = `repeat(${width},6vw)`
    game.style.gridTemplateColumns = `repeat(${width},6vw)`
    board()
}

// reload
function reload() {
    location.reload()
}

document.addEventListener("keyup", control)


