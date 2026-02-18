import React from 'react';
import OrderCard from '../OrderCard/OrderCard';
import { Order } from '@/interfaces/order.interface';
import { Package } from 'lucide-react';
import Link from 'next/link';

interface OrdersContentProps {
  ordersData: any;
  showStartShopping?: boolean; 
}

export default function OrdersContent({ ordersData, showStartShopping = false }: OrdersContentProps) {
  let orders: Order[] = [];
  if (ordersData?.status === "success") {
    const rawData = ordersData.data;
    orders = Array.isArray(rawData) ? rawData : (rawData?.data || []);
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-slate-100 p-6 rounded-full">
          <Package size={48} className="text-slate-300" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">No orders found yet</h3>
          <p className="text-slate-500 text-sm">When you place orders, they will appear here.</p>
        </div>
        {showStartShopping && (
          <Link href="/" className="text-yellow-500 font-bold hover:underline mt-2">
            Start Shopping
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}