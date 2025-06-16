"use client";
import { useEffect, useState } from 'react';
import { getAllCoins } from '../lib/coingecko';
import { Coin } from '../types/coin';
import CoinChart from '../components/CoinChart';
import { get24hChartData } from '../lib/coingecko';

import dayjs from 'dayjs';

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
  async function fetchData() {
    const allCoins = await getAllCoins();
    const oneWeekAgo = dayjs().subtract(7, 'day');

    const recentCoins = allCoins.filter((coin:Coin) =>
      dayjs(coin.atl_date).isAfter(oneWeekAgo)
    );

    recentCoins.sort(
      (a: Coin, b: Coin): number =>
      (b.price_change_percentage_24h as number) - (a.price_change_percentage_24h as number)
    );

    const coinsWithCharts = await Promise.all(
      recentCoins.slice(0, 10).map(async (coin:Coin) => {
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

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🚀 Best Weekly New Crypto Coins</h1>
      <ul>
        {coins.length === 0 ? (
          <p>Loading or no recent coins found...</p>
        ) : (
          coins.map((coin) => (
            <li key={coin.id} style={{ marginBottom: '1rem' }}>
              <img src={coin.image} alt={coin.name} width={24} height={24} />
              <strong> {coin.name} </strong> ({coin.symbol.toUpperCase()}) — ${coin.current_price}
              <br />
              24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%
    {coin.chart && coin.chart.length > 0 && <CoinChart prices={coin.chart} />}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
