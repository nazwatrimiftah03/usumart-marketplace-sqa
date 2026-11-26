import React from 'react';
import { X } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <div className="p-6">
          <div className="flex justify-between items-start gap-3">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase">{product.category}</span>
              <h3 className="text-xl font-bold text-white mt-1">{product.name}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Freelancer: <strong className="text-slate-200">{product.seller}</strong> • Estimasi:{' '}
                {product.eta || '1x24 Jam'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xl font-extrabold text-cyan-400">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-slate-400">Kuota tersedia: {product.stock} slot</p>
            </div>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={product.stock === 0}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-500 disabled:bg-slate-800"
            >
              + Pesan Layanan Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}