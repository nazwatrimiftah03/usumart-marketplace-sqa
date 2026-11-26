import React from 'react';
import { ShoppingBag, X, WifiOff, CheckCircle2, AlertCircle, CreditCard, Tag } from 'lucide-react';

export default function CartCheckoutDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  subtotal,
  promoCode,
  setPromoCode,
  discount,
  cartTotal,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  simulatePaymentFail,
  setSimulatePaymentFail,
  simulateOffline,
  setSimulateOffline,
  lastResponseTime,
  checkoutFeedback,
  isSubmitting,
  onCheckout
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between p-5 overflow-y-auto shadow-2xl">
        <div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-3.5 mb-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" /> Ringkasan Order & Checkout
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-sm text-slate-400 py-10 text-center">
              Belum ada layanan IT di keranjangmu.
            </p>
          ) : (
            <div className="space-y-3 mb-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-slate-800 pb-2.5 text-sm"
                >
                  <div className="pr-2">
                    <p className="font-semibold text-white line-clamp-1">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      Rp {item.price.toLocaleString('id-ID')} (Tersedia {item.stock} slot)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-white w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* Input Kode Promo Mahasiswa */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" /> Kode Voucher Kampus (Coba:{' '}
                  <span className="text-cyan-400">MABAUSU</span> /{' '}
                  <span className="text-cyan-400">FASILKOM10</span>)
                </label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Masukkan kode promo..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase"
                />
                {discount > 0 && (
                  <p className="text-[11px] text-emerald-400 font-semibold">
                    Voucher aktif! Potongan Rp {discount.toLocaleString('id-ID')}
                  </p>
                )}
              </div>

              <div className="space-y-1 pt-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal Layanan</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Diskon Voucher</span>
                    <span>- Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base pt-1 border-t border-slate-800">
                  <span className="text-slate-200">Total Pembayaran</span>
                  <span className="text-cyan-400">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <div className="space-y-3.5 border-t border-slate-800 pt-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Lokasi COD Kampus / Kontak Pengiriman File *
                </label>
                <textarea
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Contoh: COD Lab Fasilkom-TI / WA 0812xxxx untuk kirim brief & repo..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Metode Pembayaran *
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                >
                  <option value="">-- Pilih Metode Pembayaran --</option>
                  <option value="QRIS">QRIS (Dana / GoPay / OVO / ShopeePay)</option>
                  <option value="Transfer Bank">Transfer Bank (BSI / Mandiri / BCA)</option>
                  <option value="COD Kampus">COD (Bayar Langsung Saat Ketemu di Kampus)</option>
                </select>
              </div>

              {/* PANEL SIMULASI PENGUJIAN SQA BAB 6.2 */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs space-y-2">
                <p className="font-bold text-amber-300">Panel Simulasi QA Tester (Bab 6.2):</p>
                <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulatePaymentFail}
                    onChange={(e) => setSimulatePaymentFail(e.target.checked)}
                    className="accent-amber-400"
                  />
                  <span>Simulasi Skenario 5: Pembayaran Gagal</span>
                </label>
                <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateOffline}
                    onChange={(e) => setSimulateOffline(e.target.checked)}
                    className="accent-amber-400"
                  />
                  <span className="flex items-center gap-1">
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" /> Simulasi Skenario 7: Koneksi
                    Terputus
                  </span>
                </label>
                {lastResponseTime && (
                  <p className="text-emerald-400 font-semibold pt-1">
                    Metrik Response Time Terakhir: {lastResponseTime} detik (Target ≤ 2.000 dtk)
                  </p>
                )}
              </div>
            </div>
          )}

          {checkoutFeedback && (
            <div
              className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                checkoutFeedback.type === 'success'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-red-500/15 text-red-300 border border-red-500/30'
              }`}
            >
              {checkoutFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              )}
              <span>{checkoutFeedback.text}</span>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <button
            onClick={onCheckout}
            disabled={isSubmitting}
            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition"
          >
            <CreditCard className="w-4 h-4" />
            {isSubmitting ? 'Memproses Transaksi...' : 'Konfirmasi & Bayar Layanan'}
          </button>
        )}
      </div>
    </div>
  );
}