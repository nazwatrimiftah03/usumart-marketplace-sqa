import React from 'react';
import { Store, RotateCcw, ShoppingBag, LogOut, User, Activity, Briefcase } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onSelectSection,
  user,
  ordersCount,
  cartCount,
  onResetDemo,
  onOpenCart,
  onOpenAuth,
  onLogout
}) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div
          onClick={() => onSelectSection('umkm')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 p-2 rounded-xl text-slate-950 shadow-lg shadow-indigo-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition">
              USU<span className="text-cyan-400">Mart</span>
            </h1>
            <p className="text-[11px] text-slate-400">Marketplace UMKM & Jasa Mahasiswa</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-2.5 text-sm font-medium flex-wrap">
          <button
            onClick={() => onSelectSection('umkm')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'umkm'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Produk UMKM</span>
          </button>

          <button
            onClick={() => onSelectSection('jasa')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'jasa'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Eksplor Jasa</span>
          </button>

          <button
            onClick={() => setActiveTab('sqa')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'sqa'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>SQA Metrics</span>
          </button>

          {user && (
            <>
              <button
                onClick={() => setActiveTab('seller')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'seller'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Kelola Usaha
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'orders'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Pesanan ({ordersCount})
              </button>
            </>
          )}

          <button
            onClick={onResetDemo}
            title="Reset data ke kondisi awal pengujian"
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative bg-cyan-400 text-slate-950 px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:bg-cyan-300 transition shadow-md shadow-cyan-500/10"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order</span>
            {cartCount > 0 && (
              <span className="bg-indigo-700 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <span className="hidden sm:inline text-xs bg-slate-800 border border-slate-700 text-cyan-300 px-3 py-1 rounded-full">
                @{user.name}
              </span>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-slate-800 border border-slate-700 text-white px-3.5 py-1.5 rounded-lg font-semibold hover:bg-slate-700 transition flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-cyan-400" /> Masuk
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}