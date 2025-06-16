import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CoinChartProps {
  prices: [number, number][];
}

export default function CoinChart({ prices }: CoinChartProps) {
  const data = prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price,
  }));

  return (
 <ResponsiveContainer width="100%" height={200}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
    <YAxis hide domain={['auto', 'auto']} />
    <Tooltip
      contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      labelStyle={{ color: '#6b7280' }}
      formatter={(v: number) => [`$${v.toFixed(2)}`, 'Price']}
    />
    <Area
      type="monotone"
      dataKey="price"
      stroke="#4f46e5"
      fill="url(#gradient)"
      strokeWidth={2}
      dot={false}
      isAnimationActive={false}
    />
  </AreaChart>
</ResponsiveContainer>
  );
}
