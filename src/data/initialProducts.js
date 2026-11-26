export const INITIAL_PRODUCTS = [
  {
    id: 1,
    type: 'umkm',
    name: 'Rice Bowl Ayam Teriyaki & Mentai Homemade',
    category: 'Makanan & Minuman',
    price: 18000,
    stock: 15,
    eta: 'Ready / Antar Kampus',
    rating: 4.9,
    completedJobs: 48,
    seller: 'Dapur Mahasiswa USU',
    description: 'Rice bowl hangat porsi kenyang dengan saus teriyaki dan mentai homemade. Cocok untuk makan siang di sela jadwal kuliah, bisa diantar ke area kampus.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    type: 'umkm',
    name: 'Kopi Susu Gula Aren Literan & Cup Cold Brew',
    category: 'Makanan & Minuman',
    price: 15000,
    stock: 20,
    eta: 'Same Day',
    rating: 4.8,
    completedJobs: 62,
    seller: 'Kopi Sela Kuliah',
    description: 'Racikan kopi robusta-arabika lokal dengan gula aren asli dan susu segar. Tersedia kemasan cup siap minum maupun botol 500ml untuk teman nugas.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    type: 'umkm',
    name: 'Buket Bunga Satin, Snack & Wisuda Custom',
    category: 'Buket & Hadiah',
    price: 45000,
    stock: 8,
    eta: '1x24 Jam',
    rating: 5.0,
    completedJobs: 35,
    seller: 'FloCampus Craft',
    description: 'Buket bunga satin, buket snack, dan buket uang untuk hadiah seminar proposal, sidang skripsi, maupun wisuda. Gratis kartu ucapan custom.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    type: 'umkm',
    name: 'Kaos Oversize Sablon DTF & Tote Bag Kanvas Kampus',
    category: 'Pakaian & Fashion',
    price: 65000,
    stock: 10,
    eta: '1-2 Hari',
    rating: 4.9,
    completedJobs: 29,
    seller: 'WearUnik Student',
    description: 'Kaos cotton combed 24s adem dengan desain tipografi mahasiswa dan tote bag kanvas tebal muat laptop 15 inci untuk keperluan kuliah harian.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    type: 'umkm',
    name: 'Dimsum Ayam Udang Mentai (Isi 8 Pcs)',
    category: 'Makanan & Minuman',
    price: 22000,
    stock: 2,
    eta: 'Ready Sore',
    rating: 4.9,
    completedJobs: 44,
    seller: 'Dimsum Anak Kos',
    description: 'Dimsum homemade full daging ayam dan udang dengan topping saus mentai bakar serta chili oil pedas gurih.',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    type: 'jasa',
    name: 'Jasa Desain Poster Event, PPT Sidang & Feed Instagram',
    category: 'Desain & Kreatif',
    price: 30000,
    stock: 12,
    eta: '12-24 Jam',
    rating: 4.9,
    completedJobs: 54,
    seller: 'Kreasi Mahasiswa',
    description: 'Jasa desain poster acara himpunan, slide presentasi seminar/sidang yang rapi dan estetik, serta desain feed media sosial. Free revisi 3x.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    type: 'jasa',
    name: 'Jasa Pembuatan Website, Debugging & Setup Software',
    category: 'Coding & IT',
    price: 50000,
    stock: 6,
    eta: '1-2 Hari',
    rating: 5.0,
    completedJobs: 31,
    seller: 'Ilkom Dev Studio',
    description: 'Bantuan pembuatan website landing page, perbaikan error coding, penyusunan dokumen SRS/UML, serta instalasi software kuliah.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    type: 'jasa',
    name: 'Jasa Editing Video Aftermovie, Reels & Demo Aplikasi',
    category: 'Editing & Multimedia',
    price: 45000,
    stock: 7,
    eta: '1-2 Hari',
    rating: 4.8,
    completedJobs: 23,
    seller: 'Cut & Render Lab',
    description: 'Editing video presentasi proyek, demo aplikasi, video dokumenter mata kuliah, atau Reels/TikTok lengkap dengan subtitle dan color grading.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
  }
];

export const UMKM_CATEGORIES = [
  'Semua',
  'Favorit Saya',
  'Makanan & Minuman',
  'Pakaian & Fashion',
  'Buket & Hadiah'
];

export const JASA_CATEGORIES = [
  'Semua',
  'Favorit Saya',
  'Coding & IT',
  'Desain & Kreatif',
  'Editing & Multimedia'
];

export const PROMO_CODES = {
  MABAUSU: 5000,
  KAMPUS10: 10000
};