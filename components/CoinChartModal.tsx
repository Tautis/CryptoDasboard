import type { Coin } from "@/types/coin";

import CoinChart from "./CoinChart";

export default function CoinChartModal({
  open,
  coin,
  onClose,
}: {
  open: boolean;
  coin: Coin | null;
  onClose: () => void;
}) {
  if (!open || !coin) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2"
      onClick={onClose}
    >
      <div
        className="sticky top-1/3 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3 sm:p-6 max-w-full sm:max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{coin.name}</div>
            <div className="text-gray-500 text-xs">
              {coin.symbol.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {coin.chart && coin.chart.length > 0 ? (
            <CoinChart prices={coin.chart} />
          ) : (
            <div className="mx-auto text-center text-red-500 text-xs py-8">
              No chart available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
