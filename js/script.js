$(document).ready(function(){
    let origBoard;
    const HUMAN= 'O';
    const JARVIS = 'X';
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    const cells = $('.cell');
    
    
    const startGame = function(){
        
        // Animation part
        animate();
        


        $(".endgame").css("display","none");
        origBoard = Array.from(Array(9).keys());
        
        
        for(let i=0; i < cells.length; i++)
        {   
            cells[i].innerText = " ";
            cells[i].style.removeProperty("background-color");
            $(cells[i]).click(turnClick);
        }
    }




//--------------------------------------------------------------------

    const turnClick = function(event){
        if( typeof origBoard[event.target.id] == 'number'){
            turn(event.target.id, HUMAN);
            if(!checkWin(origBoard,HUMAN) && !checkTie())
                turn(bestSpot(),JARVIS);
        }
    }



//--------------------------------------------------------------------


    const turn = function(squareID, TOKEN){
        origBoard[squareID] = TOKEN;
        document.getElementById(squareID).innerText = TOKEN; 
        let gameWon = checkWin(origBoard, TOKEN);
        if(gameWon)
            gameOver(gameWon);
    }

//--------------------------------------------------------------------

    const checkWin = function(board, TOKEN){
        let plays = board.reduce((a, e, i) => 
            (e === TOKEN) ? a.concat(i) : a, []);
        let gameWon = null;
        
            // Testing each input value against winning combinaiton
            function test(elem){
                if(plays.indexOf(elem)>-1)
                  return true;
                else
                  return false;
            }

        for(let [index,win] of winCombos.entries()){
        
            // if(win.every(elem => plays.indexOf(elem)>-1)){ }
          
            if (win.every(test)){
                gameWon = { index : index, TOKEN: TOKEN};
                console.log(gameWon);
                break;
            }
        }// end of for loop
        return gameWon;
    }

    //---------------------------------------

    const gameOver = function(gameWon){
        
        for (let index of winCombos[gameWon.index]){
            if(gameWon.TOKEN===HUMAN){    
                document.getElementById(index).style.backgroundColor="red";
            }
            else
                document.getElementById(index).style.backgroundColor="blue"; 
        }

        // Removing EventListner from all cells, so thats user cant click after Winning.
        for(let i=0; i<cells.length; i++)  
          $(cells[i]).off("click");

        declareWinner(gameWon.TOKEN == HUMAN ? "You Win!" : "You Lose.");
    
    }//End of gaveOver()

//--------------------------------------------------------------------------

    const declareWinner = function(who){
        $(".endgame").css({"display" : "block"});
        $(".endgame").text(who);
    
    }

//--------------------------------------------------------------------

    const emptySquare = function(){
        return origBoard.filter(s => s != "O" && s != "X");
    }


//--------------------------------------------------------------------

const checkTie = function(){
       let emptyArray = emptySquare();
    if(emptyArray.length === 0){
            for(i=0; i<cells.length; i++){
                    cells[i].style.backgroundColor = "green";
                    $(cells[i]).off("click");
            }

            declareWinner("Tie Game !");
            return true;
    }
    return false;
}

//--------------------------------------------------------------------


const bestSpot = function(){
    return emptySquare()[0];
    
}



//--------------------------------------------------------------------

const animate = function(){
    
    let animationEnd = "webkitAnimationEnd";

    $("table").addClass("animated flip").one(animationEnd, function(){
        $("table").removeClass()
    });
}
//--------------------------------------------------------------------
    
$("button").click(startGame);
    startGame();
    



    
}) // doument.ready end




