
const PLAYER = -1, AI = 1, TIE = 2, NONE = 0;

class TicTacToe {
    constructor() {
        this.multiplayer = false;
        this.board = [NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE, NONE];
        this.turn = PLAYER;
        this.go = false;
        this.msg = document.getElementById("go");
        this.mmx = new Minimax();

        document.getElementById("again").addEventListener("click", () => {
            this.go = false;
            this.msg.style.display = "none";
            this.turn = this.turn === AI ? PLAYER : AI;
            
            for(let i = 0; i < 9; i++) {
                this.board[i] = NONE;
                const z = document.getElementById("" + i);
                z.innerHTML = "-";
                z.style.color = "white";
            }

            if(!this.multiplayer && this.turn === AI) {
                //const m = this.mmx.minimax(this.board, AI);
                this.setPiece(Math.floor(Math.random() * 9));
            }
        });
    }

    gameOver(g) {
        this.go = true;
        const z = document.getElementById("txt");
        if( g === TIE) {
            z.innerHTML = "TIE<br />GAME";
        } else {
            z.innerHTML = (g === PLAYER ? "PLAYER" : "AI") + "<br />WINS";
        }
        this.msg.style.display = "block";
    }

    setPiece(id) {
        const el = document.getElementById(id);
        el.innerHTML = this.turn === PLAYER ? "🔵" : "❌";
        el.style.color = this.turn === PLAYER ? "#083" : "#B30";
        this.board[id] = this.turn;
        
        const g = this.mmx.gameOver(this.board);
        if(g === PLAYER || g === AI || g === TIE) {
            this.gameOver(g);
        } else {
            this.turn = this.turn === AI ? PLAYER : AI;
        }
    }

    doTurn(id) {
        if(this.board[id] !== NONE || this.go || (!this.multiplayer && this.turn === AI)) return;
        this.setPiece(id);
        if(!this.multiplayer && this.turn === AI) {
            const m = this.mmx.minimax(this.board, AI);
            this.setPiece(m.idx);
        }
    }
}

function start() {
    const ttt = new TicTacToe();
    for(let t = 0; t < 9; t++) {
        const e = document.getElementById("" + t);
        e.addEventListener("click", (e) => {
            ttt.doTurn(e.srcElement.id);
        }, false);
    }
}