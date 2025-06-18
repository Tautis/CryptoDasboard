import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetch all coins with market data.
 * @returns {Promise<any[]>}
 */
export const getAllCoins = async () => {
  const res = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 250,
      page: 1,
      price_change_percentage: "24h",
    },
  });
  return res.data;
};

/**
 * Fetch 24h chart data for a coin.
 * @param {string} id
 * @returns {Promise<[number, number][]>}
 */
export const get24hChartData = async (id) => {
  const res = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: 1,
    },
  });

  return res.data.prices;
};
