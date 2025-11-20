import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8 bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Guess the Price!
        </h1>
        <p className="text-xl text-white/90 max-w-md">
          Test your shopping knowledge! Can you guess the price of everyday items?
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 space-y-4 text-white">
        <h2 className="text-2xl font-semibold text-center">How to Play:</h2>
        <ul className="space-y-2 text-lg">
          <li>✓ Look at the product image</li>
          <li>✓ Guess the price</li>
          <li>✓ Earn points based on accuracy</li>
          <li>✓ Perfect guesses = 10,000 points!</li>
        </ul>
      </div>

      <Link
        href="/guess"
        className="bg-white text-purple-600 px-12 py-4 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 hover:bg-purple-50"
      >
        Start Playing
      </Link>

      <div className="mt-8 text-white/80 text-sm">
        <p>Challenge yourself and see how well you know prices!</p>
      </div>
    </div>
  );
}
