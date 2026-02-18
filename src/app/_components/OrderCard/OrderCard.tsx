import React from 'react';
import Image from 'next/image';
import { Calendar, DollarSign } from 'lucide-react';
import { Order } from '@/interfaces/order.interface';

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase mb-1">Order ID</p>
          <p className="font-mono text-yellow-400 font-bold">#{order._id.slice(-6).toUpperCase()}</p>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-slate-400" />
            <span className="font-bold">{order.totalOrderPrice} EGP</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.isPaid ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {order.paymentMethodType}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {order.cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="relative w-14 h-14 bg-white rounded-lg flex-shrink-0">
                <Image src={item.product.imageCover} alt={item.product.title} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm truncate">{item.product.title}</h4>
                <p className="text-xs text-slate-500">{item.count} x {item.price} EGP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}