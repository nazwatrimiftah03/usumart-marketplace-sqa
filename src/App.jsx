import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  UMKM_CATEGORIES,
  JASA_CATEGORIES,
  PROMO_CODES
} from './data/initialProducts';
import { supabase } from './lib/supabaseClient';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CatalogSection from './components/CatalogSection';
import SellerDashboard from './components/SellerDashboard';
import OrdersHistory from './components/OrdersHistory';
import SqaMetricsDashboard from './components/SqaMetricsDashboard';
import CartCheckoutDrawer from './components/CartCheckoutDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import AuthModal from './components/AuthModal';

const JASA_CAT_LIST = ['Desain & Kreatif', 'Coding & IT', 'Editing & Multimedia'];

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('usu_it_market_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('usu_it_market_favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sqaLogs, setSqaLogs] = useState([]);

  const [activeTab, setActiveTab] = useState('umkm');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [detailProduct, setDetailProduct] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatePaymentFail, setSimulatePaymentFail] = useState(false);
  const [simulateOffline, setSimulateOffline] = useState(false);
  const [checkoutFeedback, setCheckoutFeedback] = useState(null);
  const [lastResponseTime, setLastResponseTime] = useState(null);

  const inferType = (cat) => (JASA_CAT_LIST.includes(cat) ? 'jasa' : 'umkm');

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, ordRes, logRes] = await Promise.all([
        supabase.from('products').select('*').order('id', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('sqa_logs').select('*').order('id', { ascending: false })
      ]);

      if (prodRes.data && prodRes.data.length > 0) {
        setProducts(prodRes.data.map((p) => ({ ...p, type: inferType(p.category), completedJobs: p.completed_jobs })));
      } else {
        setProducts(INITIAL_PRODUCTS);
      }

      if (ordRes.data) {
        setOrders(
          ordRes.data.map((o) => ({
            ...o,
            paymentMethod: o.payment_method,
            date: new Date(o.created_at).toLocaleString('id-ID')
          }))
        );
      }

      if (logRes.data) {
        setSqaLogs(
          logRes.data.map((l) => ({
            id: l.id,
            time: new Date(l.created_at).toLocaleTimeString('id-ID'),
            scenario: l.scenario,
            detail: l.detail,
            responseTime: l.response_time !== null ? Number(l.response_time) : null,
            isValidTx: l.is_valid_tx,
            passed: l.passed
          }))
        );
      }
    } catch (err) {
      console.error('Gagal mengambil data dari Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    localStorage.setItem('usu_it_market_favs', JSON.stringify(favorites));
  }, [favorites]);

  const handleSelectSection = (section) => {
    setActiveTab(section);
    setSelectedCategory('Semua');
    setSearchQuery('');
  };

  const recordSqaLog = async (scenario, detail, responseTime = null, isValidTx = false) => {
    const tempEntry = {
      id: Date.now() + Math.random(),
      time: new Date().toLocaleTimeString('id-ID'),
      scenario,
      detail,
      responseTime,
      isValidTx,
      passed: true
    };
    setSqaLogs((prev) => [tempEntry, ...prev]);

    await supabase.from('sqa_logs').insert([
      {
        scenario,
        detail,
        response_time: responseTime,
        is_valid_tx: isValidTx,
        passed: true
      }
    ]);
  };

  const handleClearLogs = async () => {
    setSqaLogs([]);
    await supabase.from('sqa_logs').delete().neq('id', 0);
  };

  const handleResetDemoData = async () => {
    setIsLoading(true);
    await supabase.from('orders').delete().neq('id', '');
    await supabase.from('products').delete().neq('id', 0);

    const seedRows = INITIAL_PRODUCTS.map(({ id, type, completedJobs, ...rest }) => ({
      ...rest,
      completed_jobs: completedJobs
    }));
    await supabase.from('products').insert(seedRows);

    setCart([]);
    setPromoCode('');
    setCheckoutFeedback(null);
    await fetchAllData();
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('usu_it_market_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('usu_it_market_user');
    setActiveTab('umkm');
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const addToCart = (product) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCheckoutFeedback(null);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = PROMO_CODES[promoCode.trim()]
    ? Math.min(PROMO_CODES[promoCode.trim()], subtotal)
    : 0;
  const cartTotal = Math.max(0, subtotal - discount);

  const handleCheckout = async (options = {}) => {
    const { simulateStockError = false, simulateDoubleSubmit = false } = options;
    const startTime = performance.now();
    setCheckoutFeedback(null);

    // Skenario 6: Pencegahan Double-Submit
    if (isSubmitting || simulateDoubleSubmit) {
      const endTime = performance.now();
      const durationSec = Number(((endTime - startTime) / 1000).toFixed(3));
      setLastResponseTime(durationSec.toFixed(3));
      setCheckoutFeedback({
        type: 'error',
        text: 'Sistem berhasil mencegah pesanan ganda (double-submit).'
      });
      await recordSqaLog(
        'Skenario 6: Pencegahan Double-Submit',
        'Sistem memblokir permintaan ganda saat tombol diklik berulang',
        durationSec
      );
      return;
    }

    // Skenario 2: Validasi Alamat Kosong
    if (!address.trim()) {
      setCheckoutFeedback({
        type: 'error',
        text: 'Alamat pengiriman / titik COD kampus wajib dilengkapi sebelum checkout!'
      });
      await recordSqaLog('Skenario 2: Alamat Kosong', 'Sistem menolak & meminta alamat dilengkapi');
      return;
    }

    // Skenario 4: Validasi Metode Pembayaran
    if (!paymentMethod) {
      setCheckoutFeedback({
        type: 'error',
        text: 'Silakan pilih metode pembayaran terlebih dahulu!'
      });
      await recordSqaLog(
        'Skenario 4: Tanpa Metode Bayar',
        'Sistem menolak & meminta metode pembayaran dipilih'
      );
      return;
    }

    // Skenario 3: Simulasi Stok Tidak Cukup dari Panel SQA
    if (simulateStockError) {
      const endTime = performance.now();
      const durationSec = Number(((endTime - startTime) / 1000).toFixed(3));
      setLastResponseTime(durationSec.toFixed(3));
      setCheckoutFeedback({
        type: 'error',
        text: 'Pesanan ditolak: Simulasi stok produk tidak mencukupi.'
      });
      await recordSqaLog(
        'Skenario 3: Stok Tidak Cukup',
        'Pesanan ditolak karena simulasi stok kurang',
        durationSec
      );
      return;
    }

    setIsSubmitting(true);

    // Cek stok real-time ke Supabase untuk Skenario 3 normal
    for (const item of cart) {
      const { data: latestProd } = await supabase
        .from('products')
        .select('stock, completed_jobs')
        .eq('id', item.id)
        .single();

      if (!latestProd || item.qty > latestProd.stock) {
        setIsSubmitting(false);
        const endTime = performance.now();
        const durationSec = Number(((endTime - startTime) / 1000).toFixed(3));
        setLastResponseTime(durationSec.toFixed(3));
        setCheckoutFeedback({
          type: 'error',
          text: `Pesanan ditolak: Stok "${item.name}" tidak mencukupi (tersisa ${
            latestProd ? latestProd.stock : 0
          }).`
        });
        await recordSqaLog(
          'Skenario 3: Stok Tidak Cukup',
          `Pesanan ditolak karena stok ${item.name} kurang`,
          durationSec
        );
        return;
      }
    }

    // Skenario 7: Simulasi Koneksi Terputus (Offline)
    if (simulateOffline) {
      const endTime = performance.now();
      const durationSec = Number(((endTime - startTime) / 1000).toFixed(3));
      setLastResponseTime(durationSec.toFixed(3));
      setIsSubmitting(false);
      setCheckoutFeedback({
        type: 'error',
        text: 'Koneksi terputus saat checkout! Transaksi dibatalkan secara aman agar tidak tercatat keliru.'
      });
      await recordSqaLog(
        'Skenario 7: Koneksi Terputus',
        'Transaksi dibatalkan aman tanpa duplikasi/korupsi data',
        durationSec
      );
      return;
    }

    // Skenario 5: Simulasi Pembayaran Gagal
    if (simulatePaymentFail) {
      const endTime = performance.now();
      const durationSec = Number(((endTime - startTime) / 1000).toFixed(3));
      setLastResponseTime(durationSec.toFixed(3));
      setIsSubmitting(false);
      setCheckoutFeedback({
        type: 'error',
        text: 'Pembayaran gagal diverifikasi oleh payment gateway. Silakan coba lagi.'
      });
      await recordSqaLog(
        'Skenario 5: Pembayaran Gagal',
        'Sistem menampilkan pesan error pembayaran gagal',
        durationSec
      );
      return;
    }

    // Skenario 1 & 8: Checkout & Pembayaran Berhasil
    const orderId = `INV-${Date.now().toString().slice(-6)}`;
    const { error: orderErr } = await supabase.from('orders').insert([
      {
        id: orderId,
        buyer: user.name,
        items: cart,
        total: cartTotal,
        address,
        payment_method: paymentMethod,
        status: 'Dikonfirmasi & Diproses'
      }
    ]);

    if (orderErr) {
      setIsSubmitting(false);
      setCheckoutFeedback({
        type: 'error',
        text: `Gagal menyimpan transaksi ke server: ${orderErr.message}`
      });
      return;
    }

    for (const item of cart) {
      const current = products.find((p) => p.id === item.id);
      if (current) {
        await supabase
          .from('products')
          .update({
            stock: Math.max(0, current.stock - item.qty),
            completed_jobs: (current.completedJobs || 0) + item.qty
          })
          .eq('id', item.id);
      }
    }

    const endTime = performance.now();
    const durationSec = Number(((endTime - startTime) / 1000).toFixed(3));
    setLastResponseTime(durationSec.toFixed(3));

    await recordSqaLog(
      'Skenario 1 & 8: Checkout & Pembayaran Valid',
      `Order ${orderId} tersimpan di Supabase, stok berkurang`,
      durationSec,
      true
    );

    setCart([]);
    setPromoCode('');
    setAddress('');
    setPaymentMethod('');
    setIsSubmitting(false);
    setCheckoutFeedback({
      type: 'success',
      text: `Order ${orderId} berhasil dikonfirmasi & tersimpan di database! (Response Time: ${durationSec.toFixed(3)} detik)`
    });

    await fetchAllData();
  };

  const handleAdvanceOrderStatus = async (orderId) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const nextStatus =
      target.status === 'Dikonfirmasi & Diproses'
        ? 'Sedang Diproses Penjual'
        : 'Selesai & Diterima';

    await supabase.from('orders').update({ status: nextStatus }).eq('id', orderId);
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
  };

  const handleSaveProduct = async (formattedProduct, isEdit) => {
    if (isEdit) {
      await supabase
        .from('products')
        .update({
          name: formattedProduct.name,
          category: formattedProduct.category,
          price: formattedProduct.price,
          stock: formattedProduct.stock,
          eta: formattedProduct.eta,
          description: formattedProduct.description,
          image: formattedProduct.image
        })
        .eq('id', formattedProduct.id);
    } else {
      await supabase.from('products').insert([
        {
          name: formattedProduct.name,
          category: formattedProduct.category,
          price: formattedProduct.price,
          stock: formattedProduct.stock,
          eta: formattedProduct.eta,
          rating: 5.0,
          completed_jobs: 0,
          seller: formattedProduct.seller,
          description: formattedProduct.description,
          image: formattedProduct.image
        }
      ]);
    }
    await fetchAllData();
  };

  const handleDeleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const currentSectionType = activeTab === 'jasa' ? 'jasa' : 'umkm';

  const filteredProducts = products
    .filter((p) => p.type === currentSectionType)
    .filter((p) => {
      const matchCat =
        selectedCategory === 'Semua'
          ? true
          : selectedCategory === 'Favorit Saya'
          ? favorites.includes(p.id)
          : p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectSection={handleSelectSection}
        user={user}
        ordersCount={orders.length}
        cartCount={cart.reduce((a, b) => a + b.qty, 0)}
        onResetDemo={handleResetDemoData}
        onOpenCart={() => setShowCartDrawer(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {(activeTab === 'umkm' || activeTab === 'jasa') && (
        <HeroBanner totalServices={products.length} />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-20 text-slate-400 text-sm animate-pulse">
            Menghubungkan ke database cloud Supabase...
          </div>
        ) : (
          <>
            {(activeTab === 'umkm' || activeTab === 'jasa') && (
              <CatalogSection
                sectionTitle={
                  activeTab === 'umkm'
                    ? 'Produk UMKM Mahasiswa (Makanan, Pakaian & Buket)'
                    : 'Eksplor Jasa Mahasiswa (Desain, IT & Kreatif)'
                }
                categories={activeTab === 'umkm' ? UMKM_CATEGORIES : JASA_CATEGORIES}
                products={filteredProducts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onSelectProduct={setDetailProduct}
                onAddToCart={addToCart}
              />
            )}

            {activeTab === 'sqa' && (
              <SqaMetricsDashboard sqaLogs={sqaLogs} onClearLogs={handleClearLogs} />
            )}

            {activeTab === 'seller' && user && (
              <SellerDashboard
                products={products}
                user={user}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersHistory orders={orders} onAdvanceOrderStatus={handleAdvanceOrderStatus} />
            )}
          </>
        )}
      </main>

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={addToCart}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <CartCheckoutDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        subtotal={subtotal}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discount={discount}
        cartTotal={cartTotal}
        address={address}
        setAddress={setAddress}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        simulatePaymentFail={simulatePaymentFail}
        setSimulatePaymentFail={setSimulatePaymentFail}
        simulateOffline={simulateOffline}
        setSimulateOffline={setSimulateOffline}
        lastResponseTime={lastResponseTime}
        checkoutFeedback={checkoutFeedback}
        isSubmitting={isSubmitting}
        onCheckout={handleCheckout}
      />
    </div>
  );
}