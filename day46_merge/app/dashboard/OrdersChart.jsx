"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div className="h-72" role="img" aria-label="Line chart of orders per day. The same figures are in the table below.">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" interval="preserveStartEnd" />
          <YAxis allowDecimals={false} width={50} label={{ value: "Orders", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={(v) => [v, "Orders"]} />
          <Line type="monotone" dataKey="orders" name="Orders" stroke="#9b2c16" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
