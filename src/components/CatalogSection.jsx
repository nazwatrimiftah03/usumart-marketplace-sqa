import React from 'react';
import { Search, Clock, Star, Heart } from 'lucide-react';

export default function CatalogSection({
  sectionTitle,
  categories,
  products,
  favorites,
  onToggleFavorite,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{sectionTitle}</h3>
        <span className="text-xs text-slate-400">Menampilkan {products.length} item</span>
      </div>

      {/* Search, Filter & Sort Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari produk makanan, buket, pakaian, jasa desain, coding, atau nama penjual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-cyan-400"
          >
            <option value="default">Urutkan: Rekomendasi</option>
            <option value="rating-desc">Rating: Tertinggi</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat === 'Favorit Saya' ? `❤️ Favorit (${favorites.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Item */}
      {products.length === 0 ? (
        <div className="text-center py-14 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
          Belum ada item pada kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/60 hover:-translate-y-1 transition duration-200 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="h-44 w-full object-cover cursor-pointer group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-slate-950/85 backdrop-blur-sm border border-slate-700 px-2.5 py-1 rounded-lg">
                    {product.category}
                  </span>
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 backdrop-blur-sm border border-slate-700 hover:scale-110 transition"
                    title="Simpan ke Favorit"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{product.rating || '4.9'}</span>
                      <span className="text-slate-500">
                        ({product.completedJobs || 12} terjual)
                      </span>
                    </div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-white text-base line-clamp-2 cursor-pointer group-hover:text-cyan-300 transition"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                      <span>
                        By <strong className="text-slate-300">{product.seller}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-indigo-300">
                        <Clock className="w-3 h-3" /> {product.eta || '1x24 Jam'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Harga</span>
                        <span className="font-extrabold text-cyan-400 text-base">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                          product.stock > 2
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : product.stock > 0
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
                      </span>
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 transition"
                    >
                      {product.stock === 0 ? 'Stok Habis' : '+ Tambah ke Keranjang'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}