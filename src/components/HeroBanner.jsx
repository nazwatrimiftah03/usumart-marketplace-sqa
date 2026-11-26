import React from 'react';
import { Sparkles, Code2, ShieldCheck } from 'lucide-react';

export default function HeroBanner({ totalServices }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-indigo-950/50 via-slate-950 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Platform Kolaborasi & Jasa IT Mahasiswa USU
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Butuh Bantuan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              Coding, UI/UX, Editing,
            </span>{' '}
            atau Setup Laptop?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Temukan layanan teknis, desain kreatif, hingga bantuan penyusunan dokumen IT langsung dari sesama mahasiswa Fasilkom-TI dengan harga ramah kantong kampus.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <Code2 className="w-6 h-6 text-cyan-400 mb-1.5" />
            <p className="text-xl font-bold text-white">{totalServices} Layanan</p>
            <p className="text-xs text-slate-400">Aktif & Siap Dipesan</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1.5" />
            <p className="text-xl font-bold text-white">SQA Verified</p>
            <p className="text-xs text-slate-400">Checkout Cepat & Aman</p>
          </div>
        </div>
      </div>
    </section>
  );
}