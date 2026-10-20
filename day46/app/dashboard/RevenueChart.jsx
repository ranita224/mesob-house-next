"use client";

export default function RevenueChart({ revenue }) {
  const max = Math.max(...revenue.map((item) => item.amount), 1);

  return (
    <section className="mt-8">
      <h2>Revenue by Neighbourhood</h2>

      <div className="mt-4 flex h-64 items-end gap-4 border p-4">
        {revenue.map((item) => (
          <div key={item.name} className="flex-1 text-center">
            <div
              className="bg-orange-500"
              style={{
                height: `${(item.amount / max) * 200}px`,
              }}
            ></div>

            <p>{item.name}</p>
            <p>ETB {item.amount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}