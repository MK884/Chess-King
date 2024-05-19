import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const GamePage = () => {
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStared] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          setStared(true);
          // setChess(new Chess());
          setBoard(chess.board());
          // console.log("game init");

          break;

        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          // console.log("move made");

          break;
        case GAME_OVER:
          // console.log("game over");

          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <>
      <div className="h-screen flex justify-around items-center ">
        <div>
          <ChessBoard
            chess={chess}
            setBoard={setBoard}
            socket={socket}
            board={board}
          />
        </div>
        <div className="w-1/5">
          {!started && (
            <Button
              onClick={() =>
                socket?.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                )
              }
            >
              Play Online
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
