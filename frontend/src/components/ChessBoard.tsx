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
  let num = 8;
  return (
    <>
      <div className="">
        {board.map((row, i) => {
          return (
            <>
              <div key={i} className="flex">
                {row.map((square, j) => {
                  const squareRepresentation = (String.fromCharCode(
                    97 + (j % 8)
                  ) +
                    "" +
                    (8 - i)) as Square;
                  return (
                    <>
                      {j === 0 && (
                        <p className="text-white flex items-center mx-2">
                          {num - i}
                        </p>
                      )}

                      <div
                        onClick={() => {
                          if (!from) {
                            setFrom(squareRepresentation);
                          } else {
                            socket.send(
                              JSON.stringify({
                                type: MOVE,
                                payload: {
                                  move: {
                                    from,
                                    to: squareRepresentation,
                                  },
                                },
                              })
                            );
                            chess.move({
                              from,
                              to: squareRepresentation,
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
                        className={`size-24 ${
                          // (i + j) % 2 === 0 ? "bg-[#cfcdcd]" : "bg-[#E8EDF9]"
                          (i + j) % 2 === 0 ? "bg-[#B7C0D8]" : "bg-[#E8EDF9]"
                        }`}
                      >
                        <div className=" border h-full flex items-center justify-center">
                          {square ? (
                            <img
                              className=""
                              src={`/${
                                square?.color === "b"
                                  ? `${square?.type}_b`
                                  : `${square?.type}_w`
                              }.png`}
                              alt={square?.type}
                            />
                          ) : null}
                        </div>
                        {i == 7 && (
                          <span className="text-white flex justify-center my-2">
                            {String.fromCharCode(65 + j)}
                          </span>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
