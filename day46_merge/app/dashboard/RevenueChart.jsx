"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { etb } from "@/lib/format";

export default function RevenueChart({ data }) {
  return (
    <div className="h-72" role="img" aria-label="Bar chart of revenue in ETB by neighbourhood. The same figures are in the table below.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="area" />
          <YAxis tickFormatter={etb} width={90} domain={[0, "auto"]} />
          <Tooltip formatter={(v) => [etb(v), "Revenue"]} />
          <Bar dataKey="revenue" name="Revenue" fill="#9b2c16" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
