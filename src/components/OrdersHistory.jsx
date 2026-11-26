import React from 'react';
import { Package, ArrowRightCircle } from 'lucide-react';

export default function OrdersHistory({ orders, onAdvanceOrderStatus }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-cyan-400" /> Riwayat Order & Tracking Pengerjaan Jasa
      </h2>
      {orders.length === 0 ? (
        <p className="text-sm text-slate-400">Belum ada transaksi pemesanan jasa yang tercatat.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm">
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-2.5 mb-2.5">
                <div>
                  <span className="font-bold text-cyan-400">{ord.id}</span>
                  <span className="text-xs text-slate-500 ml-2">({ord.date})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      ord.status === 'Selesai & Diterima'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                    }`}
                  >
                    {ord.status}
                  </span>
                  {ord.status !== 'Selesai & Diterima' && (
                    <button
                      onClick={() => onAdvanceOrderStatus(ord.id)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
                      title="Update Tahap Pengerjaan"
                    >
                      <span>Update Status</span>
                      <ArrowRightCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                <strong className="text-slate-200">Catatan / Lokasi COD:</strong> {ord.address} |{' '}
                <strong className="text-slate-200">Metode:</strong> {ord.paymentMethod}
              </p>
              <ul className="text-xs text-slate-300 space-y-1 mb-2">
                {ord.items.map((item) => (
                  <li key={item.id}>
                    • {item.name} ({item.qty} slot) — Rp{' '}
                    {(item.price * item.qty).toLocaleString('id-ID')}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-right text-cyan-300">
                Total Pembayaran: Rp {ord.total.toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}