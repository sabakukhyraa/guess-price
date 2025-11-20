"use client";

import { useState } from "react";
import ProductItem from "./ProductItem";

const GuessLayout = () => {
  const [guess, setGuess] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold">Guess the Price</h1>
      <p>Can you guess the price of this item?</p>
      <div className="product-item w-[300px] h-[300px] mt-8">
        <ProductItem imageSrc="/jacket.png" name="Blue Jacket" />
      </div>
      <div className="mt-4 flex items-center">
        <label htmlFor="price" className="mr-2">
          Your Guess:
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 outline-0"
          value={guess}
          onChange={(e) => setGuess(Number(e.target.value))}
          type="number"
          name="price"
          id="price"
        />
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Submit Guess
      </button>
      <div className="text-center">
        <h2 className="text-xl font-semibold mt-8">Results:</h2>
        <p className="mt-2">Your guess: $40</p>
        <p>Actual price: $50</p>
        <p>You were off by: $10</p>
        <p>Point: 4000</p>
      </div>
    </div>
  );
};

export default GuessLayout;
