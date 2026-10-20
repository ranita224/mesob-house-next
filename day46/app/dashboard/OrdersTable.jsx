export default function OrdersTable({ data }) {
  return (
    <section className="mt-10">
      <h2>Orders Data</h2>

      <table className="mt-4 border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Day</th>
            <th className="border border-black p-2">Orders</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.day}>
              <td className="border border-black p-2">{item.day}</td>
              <td className="border border-black p-2">{item.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
