export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Welcome to CryptoDash
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        Track, discover, and favorite the best cryptocurrencies. Use the
        navigation above to explore all coins, top weekly coins, and your
        personal favorites.
      </p>
    </main>
  );
}
