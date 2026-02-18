import React from 'react';
import { getUserOrders } from '../_actions/orders.actions';
import OrdersContent from '../_components/OrdersContent/OrdersContent';

export const dynamic = 'force-dynamic';

export default async function AllOrdersPage() {
  const ordersData = await getUserOrders();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-yellow-400 rounded-full inline-block"></span>
          My Orders
        </h1>

        <OrdersContent ordersData={ordersData} showStartShopping={true} />
      </div>
    </div>
  );
}