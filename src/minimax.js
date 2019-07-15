
class Minimax {
    gameOver(board) {
        let p = 0, c = 0;
        for(let l = 0; l < 9; l += 3) {
            p = c = 0;
            for(let t = 0; t < 3; t++) {
                if(board[t + l] === PLAYER) p++;
                else if(board[t + l] === AI) c++;
            }
            if(p > 2 || c > 2) return p > c ? PLAYER : AI; 
        }
        for(let l = 0; l < 3; l++) {
            p = c = 0;
            for(let t = 0; t < 9; t += 3) {
                if(board[t + l] === PLAYER) p++;
                else if(board[t + l] === AI) c++;
            }
            if(p > 2 || c > 2) return p > c ? PLAYER : AI; 
        }
        p = c = 0;
        for(let t = 0; t < 9; t += 4) {
            if(board[t] === PLAYER) p++;
            else if(board[t] === AI) c++;
        }
        if(p > 2 || c > 2) return p > c ? PLAYER : AI;
        p = c = 0;
        for(let t = 2; t < 7; t += 2) {
            if(board[t] === PLAYER) p++;
            else if(board[t] === AI) c++;
        }
        if(p > 2 || c > 2) return p > c ? PLAYER : AI;

        for(let t = 0; t < board.length; t++) {
            if(board[t] === NONE) return NONE;
        }

        return TIE;
    }

    minimax(board, player) {
        const g = this.gameOver(board);
        if(g === PLAYER || g === AI) return {idx:0, score:g * 10};
        else if(g === TIE) return {idx:0, score:0};
        

        let moves = [];
        for(let x = 0; x < 9; x++) {
            if(board[x] === NONE) {
                board[x] = player;
                const m = {idx:x, score:0};
                m.score = this.minimax(board, player === AI ? PLAYER : AI).score;
                moves.push(m);
                board[x] = NONE;
            }
        }

        let bestM = 0;
        if(player === AI) {
            let best = -Infinity;
            for(let mm = 0; mm < moves.length; mm++) {
                if(moves[mm].score > best) {
                    best = moves[mm].score;
                    bestM = mm;
                }
            }
        } else {
            let best = Infinity;
            for(let mm = 0; mm < moves.length; mm++) {
                if(moves[mm].score < best) {
                    best = moves[mm].score;
                    bestM = mm;
                }
            }
        }
        return moves[bestM];
    }
}