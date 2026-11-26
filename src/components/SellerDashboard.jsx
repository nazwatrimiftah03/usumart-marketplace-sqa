import React, { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { UMKM_CATEGORIES, JASA_CATEGORIES } from '../data/initialProducts';

const ALL_SELLER_CATEGORIES = [
  ...UMKM_CATEGORIES.filter((c) => c !== 'Semua' && c !== 'Favorit Saya'),
  ...JASA_CATEGORIES.filter((c) => c !== 'Semua' && c !== 'Favorit Saya')
];

export default function SellerDashboard({ products, user, onSaveProduct, onDeleteProduct }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Makanan & Minuman',
    price: '',
    stock: '',
    eta: '1x24 Jam',
    description: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.stock) return;

    const formattedProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      eta: productForm.eta || '1x24 Jam',
      seller: user ? user.name : 'Mahasiswa USU',
      description:
        productForm.description || 'Produk & jasa berkualitas dari mahasiswa untuk mahasiswa.',
      image:
        productForm.image ||
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    };

    onSaveProduct(formattedProduct, Boolean(editingProduct));
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Makanan & Minuman',
      price: '',
      stock: '',
      eta: '1x24 Jam',
      description: '',
      image: ''
    });
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      stock: prod.stock,
      eta: prod.eta || '1x24 Jam',
      description: prod.description,
      image: prod.image
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
        <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-cyan-400" />
          {editingProduct ? 'Edit Produk / Jasa' : 'Tambah Produk UMKM / Jasa Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Nama Produk / Jasa *</label>
            <input
              type="text"
              required
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              placeholder="Contoh: Buket Snack Wisuda / Jasa Desain Poster"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">Kategori Usaha</label>
            <select
              value={productForm.category}
              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
            >
              <optgroup label="Produk UMKM Mahasiswa">
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Pakaian & Fashion">Pakaian & Fashion</option>
                <option value="Buket & Hadiah">Buket & Hadiah</option>
              </optgroup>
              <optgroup label="Jasa Mahasiswa">
                <option value="Desain & Kreatif">Desain & Kreatif</option>
                <option value="Coding & IT">Coding & IT</option>
                <option value="Editing & Multimedia">Editing & Multimedia</option>
              </optgroup>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Harga (Rp) *</label>
              <input
                type="number"
                required
                min="1000"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Stok / Slot *</label>
              <input
                type="number"
                required
                min="0"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Estimasi</label>
              <input
                type="text"
                value={productForm.eta}
                onChange={(e) => setProductForm({ ...productForm, eta: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                placeholder="Ready / 1 Hari"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">URL Gambar (Opsional)</label>
            <input
              type="text"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">Deskripsi Produk / Jasa</label>
            <textarea
              rows="3"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              placeholder="Jelaskan detail produk, varian, atau ketentuan pengerjaan jasa..."
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-500 transition"
            >
              {editingProduct ? 'Simpan Perubahan' : 'Publikasikan ke Katalog'}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    category: 'Makanan & Minuman',
                    price: '',
                    stock: '',
                    eta: '1x24 Jam',
                    description: '',
                    image: ''
                  });
                }}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-medium"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="font-bold text-lg text-white mb-4">Daftar Produk & Jasa Aktif di Marketplace</h2>
        <div className="divide-y divide-slate-800">
          {products.map((prod) => (
            <div key={prod.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">
                      {prod.category}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {prod.type === 'jasa' ? 'Jasa' : 'UMKM'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{prod.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Rp {prod.price.toLocaleString('id-ID')} • Stok: {prod.stock} • Penjual:{' '}
                    {prod.seller}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEditClick(prod)}
                  className="p-2 text-cyan-400 hover:bg-slate-800 rounded-xl transition"
                  title="Edit Item"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteProduct(prod.id)}
                  className="p-2 text-red-400 hover:bg-slate-800 rounded-xl transition"
                  title="Hapus Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}