import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password || (isRegisterMode && !authForm.name)) return;

    const userData = {
      name: isRegisterMode ? authForm.name : authForm.email.split('@')[0],
      email: authForm.email
    };

    onLoginSuccess(userData);
    setAuthForm({ name: '', email: '', password: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-white">
            {isRegisterMode ? 'Daftar Akun FasilkomHub' : 'Masuk ke FasilkomHub'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
          {isRegisterMode && (
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Nama Mahasiswa / Tim Dev
              </label>
              <input
                type="text"
                required
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                placeholder="Contoh: Nazwa Tri Mifthah"
              />
            </div>
          )}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Mahasiswa</label>
            <input
              type="email"
              required
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              placeholder="nama@students.usu.ac.id"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-500 transition"
          >
            {isRegisterMode ? 'Buat Akun Sekarang' : 'Masuk'}
          </button>
        </form>
        <p className="text-xs text-center text-slate-400 mt-4">
          {isRegisterMode ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-cyan-400 font-semibold hover:underline"
          >
            {isRegisterMode ? 'Masuk di sini' : 'Daftar di sini'}
          </button>
        </p>
      </div>
    </div>
  );
}