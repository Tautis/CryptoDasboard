import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

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

export const get24hChartData = async (id) => {
  const res = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: 1,
    },
  });

  return res.data.prices;
};
