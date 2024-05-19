import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/GamePage";

export const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<null | Square>(null);

  return (
    <>
      <div className="">
        {board.map((row, i) => {
          return (
            <div key={i} className="flex">
              {row.map((square, j) => {
                const squareRepresentation = (String.fromCharCode(
                  97 + (j % 8)
                ) +
                  "" +
                  (8 - i)) as Square;
                return (
                  <div
                    onClick={() => {
                      if (!from) {
                        setFrom(squareRepresentation);
                      } else {
                        // setTo(square?.square ?? null);
                        socket.send(
                          JSON.stringify({
                            type: MOVE,
                            payload: {
                                move:{
                                    from,
                                    to: squareRepresentation,
                                }
                              
                            },
                          })
                        );
                        chess.move({
                            from,
                            to: squareRepresentation
                        });
                        setBoard(chess.board());
                        setFrom(null);
                        console.log({
                          from,
                          to: squareRepresentation,
                        });
                      }
                    }}
                    key={j}
                    className={` w-24 h-24 ${
                      // (i + j) % 2 === 0 ? "bg-[#cfcdcd]" : "bg-[#E8EDF9]"
                      (i + j) % 2 === 0 ? "bg-[#B7C0D8]" : "bg-[#E8EDF9]"
                    }`}
                  >
                    <div className=" border h-full flex items-center justify-center">
                      {
                        square ? <img className="" src={`/${square?.color === 'b' ? `${square?.type}_b` : `${square?.type}_w`}.png`}  alt={square?.type}/> : null
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
