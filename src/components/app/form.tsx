import { Button } from "../ui/button";
import mainBG from "../../assets/main-bg.webp";
import { useState } from "react";
import { NoBlock } from "./noUi";
import { YesBlock } from "./yesUi";

type PositionProp = {
  x: number;
  y: number;
};

export default function ValentineForm() {
  const [position, setPosition] = useState<PositionProp | null>(null);
  const [hasTriedNo, setHasTriedNo] = useState<boolean>(false);
  const [triedNoCount, setTriedNoCount] = useState<number>(0);
  const [frustrationLevel, setFrustrationLevel] = useState<string>("");
  const [showYesUI, setShowYesUI] = useState<boolean>(false);
  const [showNoUI, setShowNoUI] = useState<boolean>(false);

  const emojiCountObject: Record<number, string> = {
    0: "😠",
    1: "😡",
    2: "😤",
    3: "🤬",
  };

  const moveButton = () => {
    if (triedNoCount < 4) {
      const x = Math.random() * (window.innerWidth - 150);
      const y = Math.random() * (window.innerHeight - 150);
      setPosition({ x, y });
      setHasTriedNo(true);
      setTriedNoCount((prev) => prev + 1);
      setFrustrationLevel((prev) => prev + emojiCountObject[triedNoCount]);
    } else {
      //   setHasTriedNo(false);
      //   setTriedNoCount(0);
      setFrustrationLevel("");
      setPosition(null);
    }
    console.log(triedNoCount);
  };

  return (
    <div className="w-screen flex justify-center items-center">
      {!showNoUI && !showYesUI && (
        <div className="text-center w-[600px]  ">
          <img src={mainBG} alt="Choose one" className="m-auto w-1/2" />
          <h1 className="text-4xl font-bold mt-2">Will you be my valentine?</h1>
          <p className="text-xl">
            {!hasTriedNo
              ? 'Choose wisely the "No" button is playing hard to get'
              : triedNoCount < 5
              ? "Wait... did you just try to click No?"
              : "Okay Go ahead and click"}
          </p>
          <p className={`text-3xl`}>
            {triedNoCount > 0 && triedNoCount < 5 ? frustrationLevel : "🙃"}
          </p>
          <div className="flex gap-1 justify-between items-center mt-">
            <Button
              onClick={() => setShowYesUI(true)}
              className="cursor-pointer "
            >
              Yes &#128077;
            </Button>
            <Button
              onMouseOver={moveButton}
              variant="outline"
              className="cursor-pointer"
              onClick={() => setShowNoUI(true)}
              style={
                position
                  ? {
                      position: "fixed",
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transition: "all 0.2s ease-out",
                      zIndex: 50,
                    }
                  : {}
              }
            >
              No &#128078;
            </Button>
          </div>
        </div>
      )}
      {showYesUI && <YesBlock />}
      {showNoUI && <NoBlock />}
    </div>
  );
}
