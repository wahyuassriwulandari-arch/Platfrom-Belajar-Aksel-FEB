import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Compass, 
  User, 
  LogIn, 
  AlertCircle, 
  Layers,
  KeyRound,
  FileText,
  Users,
  Award,
  BookOpen,
  Calendar,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';
import { studentUserProfile, adminUserProfile } from '../data/mockData';

interface LoginPortalDashboardProps {
  onLogin: (user: UserProfile) => void;
  onExploreGuest: () => void;
}

export const LoginPortalDashboard: React.FC<LoginPortalDashboardProps> = ({
  onLogin,
  onExploreGuest,
}) => {
  // Login Role Tab: 'mahasiswa' vs 'tutor'
  const [activeRole, setActiveRole] = useState<'mahasiswa' | 'tutor'>('mahasiswa');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Switch role handler: resets inputs and adjusts role
  const handleSelectRole = (role: 'mahasiswa' | 'tutor') => {
    setActiveRole(role);
    setErrorMessage('');
    setUsername('');
    setPassword('');
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedUser) {
      setErrorMessage(
        activeRole === 'tutor'
          ? 'Silakan ketik NIP, Kode Asdos, atau email pengajar Anda.'
          : 'Silakan ketik username atau NIM mahasiswa Anda.'
      );
      return;
    }
    if (!trimmedPass) {
      setErrorMessage(
        activeRole === 'tutor'
          ? 'Silakan ketik kunci akses atau sandi staf akademik Anda.'
          : 'Silakan ketik kata sandi mahasiswa Anda.'
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (activeRole === 'tutor') {
        // Tutor / Admin Login
        const tutorUser: UserProfile = {
          ...adminUserProfile,
          name: trimmedUser.includes('kevin') ? adminUserProfile.name : 'Tutor ' + (trimmedUser.charAt(0).toUpperCase() + trimmedUser.slice(1)),
        };
        onLogin(tutorUser);
      } else {
        // Mahasiswa Login
        const loggedStudent: UserProfile = {
          ...studentUserProfile,
          name: trimmedUser === 'wahyu.assri' || trimmedUser === '26/512390/ek/04112' 
            ? studentUserProfile.name 
            : trimmedUser.charAt(0).toUpperCase() + trimmedUser.slice(1),
          nim: trimmedUser.includes('/') ? username : studentUserProfile.nim,
          role: 'mahasiswa',
        };
        onLogin(loggedStudent);
      }
    }, 450);
  };

  // Quick fill helper for student account
  const handleQuickFillStudent = () => {
    setActiveRole('mahasiswa');
    setErrorMessage('');
    setUsername('wahyu.assri');
    setPassword('maba2026');
  };

  // Quick fill helper for tutor/asdos account
  const handleQuickFillTutor = () => {
    setActiveRole('tutor');
    setErrorMessage('');
    setUsername('kevin.jonathan');
    setPassword('asdos2026');
  };

  const isTutor = activeRole === 'tutor';

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between overflow-x-hidden relative transition-colors duration-500 selection:text-white ${
      isTutor 
        ? 'bg-slate-950 selection:bg-indigo-600' 
        : 'bg-slate-900 selection:bg-teal-600'
    }`}>
      
      {/* Background Ambient Glow & Patterns */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          isTutor
            ? 'bg-radial-[at_top_right] from-indigo-950/70 via-slate-950 to-slate-950'
            : 'bg-radial-[at_top_right] from-teal-900/40 via-slate-900 to-slate-950'
        }`} 
      />
      <div 
        className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
          isTutor ? 'bg-indigo-600/15' : 'bg-teal-600/10'
        }`} 
      />
      <div 
        className={`absolute bottom-0 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
          isTutor ? 'bg-violet-600/15' : 'bg-emerald-600/10'
        }`} 
      />

      {/* TOP BRAND BAR */}
      <header className={`relative z-10 w-full border-b backdrop-blur-md px-6 py-4 transition-colors duration-500 ${
        isTutor
          ? 'border-indigo-900/50 bg-slate-950/80'
          : 'border-slate-800/80 bg-slate-950/60'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold font-heading text-lg shadow-md transition-all duration-500 ${
              isTutor
                ? 'bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 shadow-indigo-950/60'
                : 'bg-gradient-to-tr from-teal-700 to-emerald-500 shadow-teal-900/40'
            }`}>
              {isTutor ? <ShieldCheck className="w-5 h-5" /> : 'A'}
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-white tracking-tight flex items-center gap-2">
                <span>Aksel FEB</span>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border transition-colors duration-500 ${
                  isTutor
                    ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
                    : 'bg-teal-950 text-teal-300 border-teal-700/60'
                }`}>
                  {isTutor ? 'Portal Tutor & Asisten Dosen' : 'Portal Mahasiswa Baru'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Fakultas Ekonomi dan Bisnis · Universitas Negeri Jakarta (UNJ)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExploreGuest}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Jelajahi Mode Tamu</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: AUTHENTICATION STAGE */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Presentation & Highlights (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-white">
            
            {/* Stage Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors duration-500 ${
              isTutor
                ? 'bg-indigo-950/90 border-indigo-500/40 text-indigo-300'
                : 'bg-teal-950/90 border-teal-500/30 text-teal-300'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isTutor ? 'text-indigo-400' : 'text-amber-300'}`} />
              <span>
                {isTutor 
                  ? 'Otentikasi Staf Pengajar: Asisten Dosen & Tutor FEB' 
                  : 'Tahapan Awal: Masuk Akun Mahasiswa Baru'}
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {isTutor ? (
                <>
                  Pusat Kendali Pengajaran & <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-100">
                    Asistensi Dosen FEB
                  </span>
                </>
              ) : (
                <>
                  Selamat Datang di Portal <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-100">
                    Pembelajaran Aksel FEB
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {isTutor ? (
                'Area khusus staf asisten dosen dan tutor akademik Fakultas Ekonomi dan Bisnis UNJ untuk mengelola materi modul, memvalidasi bank soal 4 matkul inti, menjadwalkan bimbingan klinik, dan mengevaluasi capaian mahasiswa.'
              ) : (
                'Platform pendampingan belajar terpadu untuk mahasiswa baru Fakultas Ekonomi dan Bisnis. Silakan ketik username dan password Anda untuk masuk ke sistem perkuliahan mandiri, materi modul 4 matkul, dan bimbingan akademik.'
              )}
            </p>

            {/* 4 CARDS STRIP - ADAPTS ACCORDING TO ROLE */}
            {isTutor ? (
              // TUTOR FACULTY FEATURES
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-heading flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Fitur Pengelolaan Asisten Dosen:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-900/60 hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white font-heading">
                        Manajemen Bank Soal & Kuis
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Tambah, edit, dan atur tingkat kesulitan bank soal latihan untuk 4 matkul inti FEB.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-900/60 hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white font-heading">
                        Pembaruan Diktat & Modul
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Kelola ringkasan rumus kunci, materi perkuliahan RPS, dan panduan latihan UTS/UAS.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-900/60 hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white font-heading">
                        Jadwal Klinik Mentoring
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Atur kuota mahasiswa, tautan Google Meet bimbingan, dan topik bedah materi asistensi.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-900/60 hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white font-heading">
                        Monitoring Capaian Maba
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Pantau statistik penyelesaian materi dan identifikasi mahasiswa yang butuh pendampingan.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // MAHASISWA 4 CORE SUBJECTS STRIP
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider font-heading flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>4 Mata Kuliah Inti di Dalam Modul Perkuliahan:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-base">📐</span>
                      <span className="text-xs font-mono font-bold text-teal-400">EKQ101 · 3 SKS</span>
                    </div>
                    <h3 className="text-xs font-bold text-white font-heading">
                      1. Matematika Ekonomi Bisnis
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Diferensial, optimasi laba marjinal MR=MC, elastisitas titik, dan matriks.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-sky-500/50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-base">📈</span>
                      <span className="text-xs font-mono font-bold text-sky-400">EKI102 · 3 SKS</span>
                    </div>
                    <h3 className="text-xs font-bold text-white font-heading">
                      2. Pengantar Ekonomi Makro
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Pendapatan nasional PDB, multiplier APBN kg=1/(1-MPC), inflasi, kurva IS-LM.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-base">📊</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">EKI101 · 3 SKS</span>
                    </div>
                    <h3 className="text-xs font-bold text-white font-heading">
                      3. Pengantar Ekonomi Mikro
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Kurva indiferensi, elastisitas midpoint, maksimasi laba pasar persaingan sempurna.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-base">🌐</span>
                      <span className="text-xs font-mono font-bold text-indigo-400">EKU101 · 2 SKS</span>
                    </div>
                    <h3 className="text-xs font-bold text-white font-heading">
                      4. Bahasa Inggris (Business)
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Economic vocabulary, trends analysis, graph presentation, dan formal inquiry.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Platform Highlights */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${isTutor ? 'text-indigo-400' : 'text-emerald-400'}`} />
                <span>{isTutor ? 'Akses Terverifikasi Asisten Akademik' : 'Rangkuman Rumus Kunci & Panduan UTS'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${isTutor ? 'text-indigo-400' : 'text-emerald-400'}`} />
                <span>{isTutor ? 'Panel Manajemen Bank Soal Terpadu' : 'Modul Perkuliahan & Video Pembelajaran'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className={`w-4 h-4 ${isTutor ? 'text-indigo-400' : 'text-emerald-400'}`} />
                <span>{isTutor ? 'Sinkronisasi Kurikulum FEB UNJ' : 'Klinik Pendampingan Asdos & Tutor'}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DIFFERENTIATED LOGIN CARDS (5 Cols) */}
          <div className="lg:col-span-5">
            
            {/* ROLE SELECTOR TABS AT TOP OF CARD */}
            <div className="p-1.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 mb-3 grid grid-cols-2 gap-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => handleSelectRole('mahasiswa')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold font-heading flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isTutor
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Login Mahasiswa</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('tutor')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold font-heading flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isTutor
                    ? 'bg-gradient-to-r from-indigo-700 to-violet-700 text-white shadow-md shadow-indigo-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Login Tutor / Asdos</span>
              </button>
            </div>

            {/* DYNAMIC CARD CONTAINER */}
            <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl relative transition-all duration-500 ${
              isTutor
                ? 'bg-slate-900 border-2 border-indigo-600/40 shadow-indigo-950/40 text-slate-100'
                : 'bg-white border border-slate-200/90 text-slate-800'
            }`}>
              
              {/* Form Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold font-heading uppercase tracking-wider flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
                    isTutor
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/60'
                      : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}>
                    {isTutor ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-indigo-400" />
                        <span>Otoritas Asisten Dosen</span>
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-4 h-4 text-teal-700" />
                        <span>Portal Mahasiswa S1 FEB</span>
                      </>
                    )}
                  </span>
                  <span className={`text-[11px] font-mono ${isTutor ? 'text-slate-400' : 'text-slate-500'}`}>
                    T.A. 2026/2027 Ganjil
                  </span>
                </div>

                <h2 className={`font-heading font-bold text-2xl tracking-tight ${
                  isTutor ? 'text-white' : 'text-slate-900'
                }`}>
                  {isTutor ? 'Masuk Akses Tutor & Asdos' : 'Masuk ke Akun Anda'}
                </h2>
                
                <p className={`text-xs mt-1 ${isTutor ? 'text-slate-300' : 'text-slate-500'}`}>
                  {isTutor 
                    ? 'Ketik NIP, Kode Asdos, atau email pengajar dan kunci akses Anda.' 
                    : 'Ketik username atau NIM mahasiswa dan kata sandi untuk masuk ke Aksel FEB.'}
                </p>
              </div>

              {/* Error Alert Box */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Field 1: Identifier */}
                <div>
                  <label className={`block text-xs font-bold mb-1.5 font-heading ${
                    isTutor ? 'text-indigo-200' : 'text-slate-700'
                  }`}>
                    {isTutor ? 'NIP / Kode Asdos / Username Tutor' : 'Username atau NIM Mahasiswa'}
                  </label>
                  <div className="relative">
                    {isTutor ? (
                      <ShieldCheck className="w-4 h-4 absolute left-3.5 top-3.5 text-indigo-400" />
                    ) : (
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    )}
                    <input
                      id="input-login-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        isTutor 
                          ? 'Ketik NIP atau username tutor (contoh: kevin.jonathan)...' 
                          : 'Ketik username atau NIM (contoh: wahyu.assri)...'
                      }
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl text-xs sm:text-sm font-sans transition-all focus:outline-none ${
                        isTutor
                          ? 'bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600/30'
                          : 'bg-slate-50 focus:bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-700 focus:border-transparent'
                      }`}
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Field 2: Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`block text-xs font-bold font-heading ${
                      isTutor ? 'text-indigo-200' : 'text-slate-700'
                    }`}>
                      {isTutor ? 'Kunci Akses / Sandi Akademik' : 'Kata Sandi'}
                    </label>
                    <span className={`text-[11px] hover:underline cursor-pointer ${
                      isTutor ? 'text-indigo-400' : 'text-teal-700'
                    }`}>
                      Bantuan login?
                    </span>
                  </div>
                  <div className="relative">
                    {isTutor ? (
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-indigo-400" />
                    ) : (
                      <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    )}
                    <input
                      id="input-login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        isTutor
                          ? 'Ketik kunci sandi otorisasi staf...'
                          : 'Ketik kata sandi akun mahasiswa...'
                      }
                      className={`w-full pl-10 pr-10 py-3 rounded-xl text-xs sm:text-sm font-sans transition-all focus:outline-none ${
                        isTutor
                          ? 'bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600/30'
                          : 'bg-slate-50 focus:bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-700 focus:border-transparent'
                      }`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-300 cursor-pointer"
                      title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Session Checkbox */}
                <div className={`flex items-center justify-between text-xs pt-1 ${
                  isTutor ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className={`rounded w-4 h-4 ${
                        isTutor 
                          ? 'border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500' 
                          : 'border-slate-300 text-teal-800 focus:ring-teal-700'
                      }`}
                    />
                    <span>Ingat sesi perangkat ini</span>
                  </label>
                  {isTutor && (
                    <span className="text-[11px] font-mono text-indigo-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      SSL 256-bit
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="btn-login-submit"
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                    isLoading 
                      ? 'bg-slate-600 cursor-wait text-slate-300' 
                      : isTutor
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-950/50'
                        : 'bg-teal-800 hover:bg-teal-900 text-white shadow-teal-900/20'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isTutor ? 'Memverifikasi Staf Akademik...' : 'Memverifikasi Akun Mahasiswa...'}</span>
                    </div>
                  ) : (
                    <>
                      {isTutor ? <ShieldCheck className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                      <span>{isTutor ? 'Masuk Portal Tutor & Kelola Perkuliahan' : 'Masuk dan Jelajahi Aksel FEB'}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>

              {/* DEMO CREDENTIALS QUICK FILL BAR */}
              <div className={`mt-6 pt-5 border-t ${isTutor ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className={`text-[11px] font-bold uppercase tracking-wider font-heading mb-2.5 ${
                  isTutor ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  Pintasan Demo Kredensial {isTutor ? 'Tutor' : 'Mahasiswa'}:
                </div>
                
                {isTutor ? (
                  <button
                    type="button"
                    onClick={handleQuickFillTutor}
                    className="w-full p-2.5 rounded-xl border border-indigo-800/80 hover:border-indigo-500 bg-slate-950/80 hover:bg-indigo-950/40 text-left transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-900/80 border border-indigo-700/60 text-indigo-300 flex items-center justify-center font-bold text-xs">
                        KJ
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-indigo-200 font-heading text-xs flex items-center gap-1.5">
                          <span>Kak Kevin Jonathan, S.Si.</span>
                          <span className="text-[10px] font-normal text-indigo-300 px-1.5 py-0.2 rounded bg-indigo-950 border border-indigo-700/60">
                            Koord Asdos
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          User: kevin.jonathan · Pass: asdos2026
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-400 group-hover:underline">
                      Isi Form →
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleQuickFillStudent}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/50 text-left transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                        WA
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 group-hover:text-teal-900 font-heading text-xs flex items-center gap-1.5">
                          <span>Wahyu Assri</span>
                          <span className="text-[10px] font-normal text-teal-700 px-1.5 py-0.2 rounded bg-teal-50 border border-teal-200">
                            Maba 2026
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          User: wahyu.assri · Pass: maba2026
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-teal-700 group-hover:underline">
                      Isi Form →
                    </span>
                  </button>
                )}
              </div>

              {/* Guest Explore Link */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={onExploreGuest}
                  className={`text-xs font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer ${
                    isTutor 
                      ? 'text-slate-400 hover:text-indigo-300' 
                      : 'text-slate-500 hover:text-teal-800'
                  }`}
                >
                  <span>Atau jelajahi langsung tanpa mengetik (Mode Tamu)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER OF LOGIN SCREEN */}
      <footer className={`relative z-10 w-full border-t px-6 py-3.5 text-center text-xs transition-colors duration-500 ${
        isTutor
          ? 'border-indigo-950 bg-slate-950 text-slate-400'
          : 'border-slate-800/80 bg-slate-950/80 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Fakultas Ekonomi dan Bisnis • Universitas Negeri Jakarta (UNJ)
          </div>
          <div className="text-[11px] text-slate-400">
            {isTutor 
              ? 'Sistem Manajemen Asistensi Perkuliahan & Pengajaran Akademik FEB' 
              : 'Aksel FEB Platform Pembelajaran Mandiri Mahasiswa Baru'}
          </div>
        </div>
      </footer>

    </div>
  );
};
