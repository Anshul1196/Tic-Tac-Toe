$(document).ready(function(){
    $(".heading").hide();
    let board=['','','','','','','','',''];
    let currPlayer= 'X';
    let isGameActive="true";
    let PLAYER_O_WON ="PLAYER_O_WON"
    let PLAYER_X_WON="PLAYER_X_WON"
    let TIE="TIE"
    // [0,1,2]
    // [3,4,5]
    // [6,7,8]


    let winningtiles=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    $(".maingrid").click(function(e){
       if(isGameActive){
        let tile = e.target.className
        console.log("tile",tile)
        let index=e.target.className.split('grid-')[1]
        userAction(tile,index);
       }
        
    })

    function userAction(tile,index){
        console.log(tile,index)
          if(isValidAction(tile) && isGameActive){
            $("."+tile).text(currPlayer);
            $("."+tile).addClass('turn'+currPlayer)
            updateBoard(index);
            handleResValidation()
            changePlayer();
         }

    }
    function isValidAction(tile){
        if( $("."+tile).text(currPlayer) === "X" ||  $("."+tile).text(currPlayer) === "O") return false
        else return true
    }
    function updateBoard(index){
        board[index]= currPlayer
        console.log("update",board)
    }
    function changePlayer(){
        $(".display .display-player").removeClass('turn'+currPlayer);
        if(currPlayer == "X") currPlayer = "O"
        else if(currPlayer == "O") currPlayer = "X"
        console.log(currPlayer)
        $(".display .display-player").text(currPlayer +"'s")
        $(".display .display-player").addClass('turn'+currPlayer)
    }

    function announce(type){
        $(".heading").show();
       
        switch(type){
        case 'PLAYER_X_WON': $(".announce .heading").text("Player X has won the game!"); break;
        case 'PLAYER_O_WON':$(".announce .heading").text("Player O has won the game!");break;
        case 'TIE':$(".announce .heading").text("It's a TIE");break;

        }
    }
    function handleResValidation(){
        let roundWon = false
        for(var i=0;i<=7;i++){
            let wintiles= winningtiles[i]
            console.log(wintiles)
            let a = board[wintiles[0]]
            let b = board[wintiles[1]]
            let c = board[wintiles[2]]
            console.log(a,b,c);
            if(a ==='' || b==='' || c===''){
                continue
            }
            else if(a===b && b ===c){
                roundWon=true;
                break;
            }
        }

        if(roundWon){
            announce(currPlayer === "X"? PLAYER_X_WON : PLAYER_O_WON)
            isGameActive=false;
            return
        }
        if(!board.includes('')){
            announce(TIE)
        }
    }

    function resetAll(){
        isGameActive="true"
        if(currPlayer == "O") changePlayer();
        $(".heading").hide();
       
        board=['','','','','','','','',''];
       
        // $(".maingrid div").parent().find('').remove();
        $(".maingrid div").parent().find('div').text("");
        $(".maingrid div").parent().find('div').removeClass('turnX');
        $(".maingrid div").parent().find('div').removeClass('turnO');

    }
    $("#restart").click(function(){
        resetAll();
    })
  });