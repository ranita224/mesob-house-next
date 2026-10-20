import { getAllOrders } from "@/lib/db";
import RevenueChart from "./RevenueChart";
import OrdersLineChart from "./OrdersLineChart";
import OrdersTable from "./OrdersTable";
import StatCard from "./StatCard";


export default async function DashboardPage() {
  const orders = await getAllOrders();

  const revenue = [
    { name: "Bole", amount: 12000 },
    { name: "Kazanchis", amount: 8000 },
    { name: "Piassa", amount: 5000 },
    { name: "CMC", amount: 7000 },
  ];

  const ordersPerDay = [
    { day: "Mon", orders: 5 },
    { day: "Tue", orders: 8 },
    { day: "Wed", orders: 6 },
    { day: "Thu", orders: 10 },
    { day: "Fri", orders: 7 },
  ];

  const totalRevenue = revenue.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <main className="p-8">
      <h1>Mesob Eats Dashboard</h1>
      <p>Total Orders: {orders.length}</p>
      <p>Total Revenue: ETB {totalRevenue}</p>
      <RevenueChart revenue={revenue} />

      <OrdersLineChart data={ordersPerDay} />

      <OrdersTable data={ordersPerDay} />
    </main>
  );
}