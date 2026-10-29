"use client";

export default function OrdersLineChart({ data }) {
  return (
    <section className="mt-10">
      <h2>Orders Per Day</h2>

      <ul className="mt-4">
        {data.map((item) => (
          <li key={item.day}>
            {item.day} - {item.orders}
          </li>
        ))}
      </ul>
    </section>
  );
}