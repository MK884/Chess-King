import { Color, PieceSymbol, Square } from "chess.js";

// play from 1:34 minutes

export const ChessBoard = ({ board, socket }:{
    board : ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],
    socket: WebSocket
}) =>{
    return <>
        <div className="">
            {board.map((row, i) =>{
                return <div key={i} className="flex">
                    {row.map((square, j) => {
                        return <div key={j} className={`w-16 h-16 ${(i+j) % 2 === 0 ? 'bg-[#cfcdcd]' : 'bg-[#E8EDF9]'}`}>
                            <div
                                className=" border h-full flex items-center justify-center"
                            >

                                {square ? square.type : ''}
                            </div>
                        </div>
                    })

                    }
                    
                </div>
            })

            }
        </div>
    </>
}