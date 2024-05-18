import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full mx-5 flex justify-around items-center lg:flex-row flex-col">
        <div className="w-1/4">
          <h1 className=" text-white font-serif  text-9xl"> Chess Made Fun!</h1>
          <Button onClick={() => navigate("/home")}>Play</Button>
        </div>
        <div className="border rounded-xl overflow-hidden">
          <img src="./chess.jpg" alt="chessBoard" className=" h-[32rem]" />
        </div>
      </div>
    </>
  );
};
