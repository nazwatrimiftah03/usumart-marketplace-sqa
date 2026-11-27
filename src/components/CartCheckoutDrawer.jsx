import React, { useState } from 'react';
import { ShoppingBag, X, WifiOff, CheckCircle2, AlertCircle, CreditCard, Tag, FlaskConical, Play, RotateCcw } from 'lucide-react';

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
  // State tambahan untuk SQA Scenario Testing Panel (Bab 6.2)
  const [selectedScenarioId, setSelectedScenarioId] = useState(1);
  const [simulateStockError, setSimulateStockError] = useState(false);
  const [simulateDoubleSubmit, setSimulateDoubleSubmit] = useState(false);
  const [scenarioLog, setScenarioLog] = useState(null);

  if (!isOpen) return null;

  // Daftar 8 Skenario Pengujian SQA Bab 6.2
  const sqaScenarios = [
    { id: 1, title: "Skenario 1: Checkout Informasi Lengkap", desc: "Checkout dengan info lengkap, pesanan berhasil dibuat." },
    { id: 2, title: "Skenario 2: Alamat Pengiriman Kosong", desc: "Sistem menolak submit & meminta alamat dilengkapi." },
    { id: 3, title: "Skenario 3: Stok Produk Tidak Cukup", desc: "Sistem menolak pesanan & menampilkan informasi stok." },
    { id: 4, title: "Skenario 4: Metode Pembayaran Belum Dipilih", desc: "Sistem meminta metode pembayaran dipilih." },
    { id: 5, title: "Skenario 5: Simulasi Kegagalan Pembayaran", desc: "Sistem menampilkan informasi pembayaran gagal." },
    { id: 6, title: "Skenario 6: Pencegahan Double-Submit", desc: "Sistem mencegah pesanan ganda (double-submit)." },
    { id: 7, title: "Skenario 7: Kehilangan Koneksi (Offline)", desc: "Sistem menangani gangguan koneksi & cegah transaksi keliru." },
    { id: 8, title: "Skenario 8: Konfirmasi Pembayaran Valid", desc: "Pesanan dikonfirmasi & informasi transaksi ditampilkan." }
  ];

  // Handler untuk menjalankan skenario uji secara instan
  const handleApplyScenario = (id) => {
    setSelectedScenarioId(id);
    // Reset flag simulasi awal
    setSimulateStockError(false);
    setSimulatePaymentFail(false);
    setSimulateOffline(false);
    setSimulateDoubleSubmit(false);

    let logText = "";
    switch (id) {
      case 1:
      case 8:
        setAddress("Jl. Dr. Mansyur No. 9, Padang Bulan, Medan (Fasilkom-TI USU)");
        setPaymentMethod("QRIS");
        logText = `Skenario ${id} diterapkan: Alamat dan metode pembayaran lengkap.`;
        break;
      case 2:
        setAddress(""); // Kosongkan alamat
        setPaymentMethod("QRIS");
        logText = "Skenario 2 diterapkan: Alamat pengiriman dikosongkan untuk uji validasi.";
        break;
      case 3:
        setAddress("Jl. Alumni Kampus USU");
        setPaymentMethod("Transfer Bank");
        setSimulateStockError(true);
        logText = "Skenario 3 diterapkan: Simulasi stok tidak mencukupi diaktifkan.";
        break;
      case 4:
        setAddress("Jl. Setiabudi No. 12, Medan");
        setPaymentMethod(""); // Kosongkan metode bayar
        logText = "Skenario 4 diterapkan: Metode pembayaran dikosongkan.";
        break;
      case 5:
        setAddress("Asrama Mahasiswa USU");
        setPaymentMethod("Virtual Account Mandiri");
        setSimulatePaymentFail(true);
        logText = "Skenario 5 diterapkan: Simulasi kegagalan pembayaran diaktifkan.";
        break;
      case 6:
        setAddress("Jl. Pembangunan Kampus USU");
        setPaymentMethod("COD Kampus");
        setSimulateDoubleSubmit(true);
        logText = "Skenario 6 diterapkan: Simulasi pencegahan double-submit diaktifkan.";
        break;
      case 7:
        setAddress("Jl. Jamin Ginting Km. 8, Medan");
        setPaymentMethod("QRIS");
        setSimulateOffline(true);
        logText = "Skenario 7 diterapkan: Simulasi koneksi terputus diaktifkan.";
        break;
      default:
        break;
    }
    setScenarioLog(logText);
  };

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
                      {simulateStockError && <span className="text-rose-400 font-bold ml-1">(Stok Habis)</span>}
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

              {/* SQA SCENARIO TESTING PANEL (BAB 6.2) */}
              <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-3.5 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-cyan-400" /> SQA Scenario Testing Panel
                  </span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-semibold">
                    ISO/IEC 25010
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 text-[11px]">Pilih Skenario Pengujian (1–8):</label>
                  <select
                    value={selectedScenarioId}
                    onChange={(e) => handleApplyScenario(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-indigo-500/40 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    {sqaScenarios.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Deskripsi Skenario Aktif */}
                <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-[11px] text-slate-300">
                  <span className="font-semibold text-cyan-400">Ekspektasi: </span>
                  {sqaScenarios.find(s => s.id === selectedScenarioId)?.desc}
                </div>

                {scenarioLog && (
                  <p className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20">
                    ✓ {scenarioLog}
                  </p>
                )}

                {/* Manual Toggle jika penguji ingin mengatur manual */}
                <div className="pt-2 border-t border-indigo-900/50 space-y-1.5">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Manual Simulation Toggles:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={simulateStockError}
                        onChange={(e) => setSimulateStockError(e.target.checked)}
                        className="accent-cyan-400"
                      />
                      <span>Skon. 3: Stok Habis</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={simulatePaymentFail}
                        onChange={(e) => setSimulatePaymentFail(e.target.checked)}
                        className="accent-cyan-400"
                      />
                      <span>Skon. 5: Gagal Bayar</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={simulateDoubleSubmit}
                        onChange={(e) => setSimulateDoubleSubmit(e.target.checked)}
                        className="accent-cyan-400"
                      />
                      <span>Skon. 6: Double-Submit</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer text-[11px]">
                      <input
                        type="checkbox"
                        checked={simulateOffline}
                        onChange={(e) => setSimulateOffline(e.target.checked)}
                        className="accent-cyan-400"
                      />
                      <span className="flex items-center gap-1">
                        <WifiOff className="w-3 h-3 text-amber-400" /> Skon. 7: Offline
                      </span>
                    </label>
                  </div>
                </div>

                {lastResponseTime && (
                  <p className="text-cyan-300 font-semibold text-[11px] pt-1">
                    ⚡ Response Time Terakhir: {lastResponseTime} detik (Target ≤ 2.000 dtk)
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
            onClick={() => {
              // Teruskan parameter tambahan simulateStockError & simulateDoubleSubmit ke fungsi onCheckout utama
              onCheckout({ simulateStockError, simulateDoubleSubmit });
            }}
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