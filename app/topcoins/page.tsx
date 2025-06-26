"use client";

import { useEffect, useState } from "react";
import React from "react";
import dayjs from "dayjs";

import CoinCardSkeleton from "../../components/CoinCardSkeleton";
import CoinChartModal from "../../components/CoinChartModal";
import { get24hChartData, getAllCoins } from "../../lib/coingecko";
import type { Coin } from "../../types/coin";

export default function TopCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalCoin, setModalCoin] = useState<Coin | null>(null);

  // Fetch top coins and their chart data
  useEffect(() => {
    async function fetchData() {
      const allCoins = await getAllCoins();
      const oneWeekAgo = dayjs().subtract(7, "day");
      const recentCoins = allCoins.filter((coin: Coin) =>
        dayjs(coin.atl_date).isAfter(oneWeekAgo)
      );
      recentCoins.sort(
        (a: Coin, b: Coin): number =>
          (b.price_change_percentage_24h as number) -
          (a.price_change_percentage_24h as number)
      );
      const coinsWithCharts = await Promise.all(
        recentCoins.slice(0, 10).map(async (coin: Coin) => {
          try {
            const chart = await get24hChartData(coin.id);
            return { ...coin, chart };
          } catch (error) {
            console.warn(`Error fetching chart for ${coin.id}`, error);
            return { ...coin, chart: [] };
          }
        })
      );
      setCoins(coinsWithCharts);
    }
    fetchData();
  }, []);

  function openModal(coin: Coin) {
    setModalCoin(coin);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalCoin(null);
  }

  return (
    <main className="p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        🚀 Best Weekly New Crypto Coins
      </h1>
      <div className="grid gap-3 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {coins.length === 0 ? (
          <CoinCardSkeleton count={8} size="md" />
        ) : (
          coins.map((coin) => {
            const hasChart = coin.chart && coin.chart.length > 0;
            return (
              <div
                key={coin.id}
                className={`flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow p-3 sm:p-6 gap-3 border border-gray-200 dark:border-gray-700 transition cursor-pointer relative ${
                  hasChart
                    ? "hover:shadow-lg hover:border-blue-400"
                    : "opacity-60 cursor-not-allowed"
                }`}
                onClick={() => hasChart && openModal(coin)}
                tabIndex={hasChart ? 0 : -1}
                aria-disabled={!hasChart}
                role="button"
                onKeyDown={(e) => {
                  if (hasChart && (e.key === "Enter" || e.key === " "))
                    openModal(coin);
                }}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  width={56}
                  height={56}
                  className="mb-2 rounded-full border border-gray-300 dark:border-gray-800"
                />
                <div className="font-semibold text-lg">{coin.name}</div>
                <div className="text-gray-500 text-sm mb-1">
                  {coin.symbol.toUpperCase()}
                </div>
                <div className="text-base mb-1">
                  <span className="font-medium">Price:</span>{" "}
                  <span className="text-green-600 dark:text-green-400">
                    ${coin.current_price.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm mb-2">
                  <span className="font-medium">24h Change:</span>{" "}
                  <span
                    className={
                      coin.price_change_percentage_24h &&
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
                {!hasChart && (
                  <div className="text-xs text-red-500 mt-2">
                    No chart available
                  </div>
                )}
                {hasChart && (
                  <div className="absolute bottom-2 right-2 text-xs text-blue-500 opacity-80 pointer-events-none">
                    Click for chart
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <CoinChartModal open={modalOpen} coin={modalCoin} onClose={closeModal} />
    </main>
  );
}
