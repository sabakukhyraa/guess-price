"use client";

import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const PRODUCTS = [
  { name: "Blue Jacket", imageSrc: "/jacket.png", price: 49.99 },
  { name: "Leather Boots", imageSrc: "/boots.png", price: 89.99 },
  { name: "Sunglasses", imageSrc: "/sunglasses.png", price: 24.99 },
  { name: "Backpack", imageSrc: "/backpack.png", price: 59.99 },
  { name: "Watch", imageSrc: "/watch.png", price: 149.99 },
];

const GuessLayout = () => {
  const [guess, setGuess] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [points, setPoints] = useState(0);

  // Initialize with random product
  useEffect(() => {
    selectRandomProduct();
  }, []);

  const selectRandomProduct = () => {
    const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
    setCurrentProduct(PRODUCTS[randomIndex]);
    setGuess("");
    setSubmitted(false);
    setFeedback("");
    setPoints(0);
  };

  const calculatePoints = (actualPrice, guessedPrice) => {
    const difference = Math.abs(actualPrice - guessedPrice);
    const percentageOff = (difference / actualPrice) * 100;

    if (percentageOff === 0) return 10000; // Perfect guess!
    if (percentageOff < 5) return 5000;
    if (percentageOff < 10) return 3000;
    if (percentageOff < 20) return 1500;
    if (percentageOff < 30) return 750;
    if (percentageOff < 50) return 300;
    return 100; // Participation points
  };

  const handleSubmit = () => {
    if (!guess || guess <= 0) {
      setFeedback("Please enter a valid price!");
      return;
    }

    const guessNum = parseFloat(guess);
    const earnedPoints = calculatePoints(currentProduct.price, guessNum);
    setPoints(earnedPoints);
    setTotalScore(totalScore + earnedPoints);
    setRoundsPlayed(roundsPlayed + 1);
    setSubmitted(true);

    // Generate feedback
    const difference = currentProduct.price - guessNum;
    if (difference === 0) {
      setFeedback("Perfect! You guessed it exactly!");
    } else if (Math.abs(difference) < 5) {
      setFeedback("So close!");
    } else if (difference > 0) {
      setFeedback("Too low!");
    } else {
      setFeedback("Too high!");
    }
  };

  const handleNextRound = () => {
    selectRandomProduct();
  };

  if (!currentProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Guess the Price!</h1>
        <p className="text-lg text-gray-600 mt-2">
          How well do you know your prices?
        </p>
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-semibold">Total Score:</span>{" "}
            <span className="text-blue-600 font-bold">{totalScore}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow">
            <span className="font-semibold">Rounds:</span>{" "}
            <span className="text-green-600 font-bold">{roundsPlayed}</span>
          </div>
        </div>
      </div>

      <div className="product-item w-[350px] h-[350px] mt-8 mx-auto">
        <ProductItem
          imageSrc={currentProduct.imageSrc}
          name={currentProduct.name}
        />
      </div>

      {!submitted ? (
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="price" className="text-lg font-semibold">
              Your Guess:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                className="border-2 border-gray-300 rounded-lg p-3 pl-7 w-32 outline-none focus:border-blue-500 transition-colors text-lg"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                type="number"
                step="0.01"
                min="0"
                name="price"
                id="price"
                placeholder="0.00"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Submit Guess
          </button>
          {feedback && !submitted && (
            <p className="mt-4 text-red-500 font-semibold">{feedback}</p>
          )}
        </div>
      ) : (
        <div className="text-center mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {feedback}
          </h2>
          <div className="space-y-2 text-lg">
            <p>
              <span className="font-semibold">Your guess:</span>{" "}
              <span className="text-blue-600">
                ${parseFloat(guess).toFixed(2)}
              </span>
            </p>
            <p>
              <span className="font-semibold">Actual price:</span>{" "}
              <span className="text-green-600">
                ${currentProduct.price.toFixed(2)}
              </span>
            </p>
            <p>
              <span className="font-semibold">Difference:</span>{" "}
              <span className="text-orange-600">
                ${Math.abs(currentProduct.price - parseFloat(guess)).toFixed(2)}
              </span>
            </p>
            <p className="text-2xl font-bold mt-4">
              <span className="text-purple-600">+{points}</span> points!
            </p>
          </div>
          <button
            onClick={handleNextRound}
            className="mt-6 bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Next Round
          </button>
        </div>
      )}
    </div>
  );
};

export default GuessLayout;
