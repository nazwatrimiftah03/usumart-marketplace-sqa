# 🛍️ USUMart — Marketplace Produk UMKM & Jasa Mahasiswa

**USUMart** adalah platform marketplace berbasis web yang dirancang sebagai wadah terpusat bagi wirausaha mahasiswa Universitas Sumatera Utara (USU) untuk memasarkan produk UMKM (makanan, minuman, pakaian, buket wisuda) maupun jasa mahasiswa (desain grafis, pengembangan website/coding, dan editing multimedia) dalam satu ekosistem digital yang terukur kualitasnya.

Proyek ini dikembangkan menggunakan metodologi **Agile (Scrum)** dan dilengkapi dengan sistem telemetri **Software Quality Assurance (SQA)** berbasis standar **ISO/IEC 25010** untuk memenuhi tugas mata kuliah **Penjaminan Kualitas Perangkat Lunak (PKPL)** — Program Studi S1 Ilmu Komputer, FASILKOM-TI, Universitas Sumatera Utara.

---

## ✨ Fitur Utama

- **Katalog Terpisah (Produk UMKM & Eksplor Jasa):**
  - **Produk UMKM:** Kategori *Makanan & Minuman*, *Pakaian & Fashion*, serta *Buket & Hadiah*.
  - **Eksplor Jasa:** Kategori *Desain & Kreatif*, *Coding & IT*, serta *Editing & Multimedia*.
  - Dilengkapi pencarian *real-time*, pengurutan berdasarkan harga maupun rating, serta fitur **Favorit (Wishlist)**.
- **Autentikasi & Akun Pengguna:** Registrasi dan login akun mahasiswa untuk melakukan pemesanan maupun pengelolaan usaha.
- **Manajemen Usaha Penjual (CRUD Cloud):** Penjual dapat menambah, mengubah informasi/stok, dan menghapus produk atau jasa secara langsung di database cloud.
- **Keranjang Belanja, Voucher Promo & Pelacakan Pesanan:** Perhitungan subtotal dan diskon otomatis (`MABAUSU`, `KAMPUS10`), validasi stok *real-time*, serta pembaruan status pengerjaan pesanan.
- **Live SQA Telemetry & Checkout Validation (Bab V & VI):**
  - Eksekusi dan pencatatan otomatis **8 skenario pengujian alur checkout** (validasi alamat, ketersediaan stok, metode pembayaran, pencegahan *double-submit*, simulasi kegagalan pembayaran, dan simulasi gangguan koneksi).
  - Perhitungan metrik kualitas secara *real-time*:
    - **Functional Test Pass Rate** (Target: $\ge 95\%$)
    - **Checkout Response Time** (Target: $\ge 95\%$ respons $\le 2$ detik)
    - **Transaction Success Rate** (Target: $\ge 99\%$ transaksi valid berhasil)

---

## 🛠️ Teknologi yang Digunakan (*Tech Stack*)

- **Frontend:** React (Vite), Tailwind CSS, Lucide React Icons
- **Backend & Database:** Supabase (PostgreSQL & REST API)
- **Version Control & Deployment:** GitHub & Vercel

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone [https://github.com/nazwatrimiftah03/usumart-marketplace-sqa.git](https://github.com/nazwatrimiftah03/usumart-marketplace-sqa.git)
   cd usumart-marketplace-sqa
