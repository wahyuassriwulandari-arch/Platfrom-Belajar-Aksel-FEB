import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, X, CheckCircle2, ChevronRight, BookOpen, Video, FileQuestion, Calendar, User, LogOut } from 'lucide-react';
import { UserProfile, SearchSuggestion } from '../types';
import { searchSuggestionsData } from '../data/mockData';

interface TopHeaderProps {
  user: UserProfile;
  onOpenMobileNav: () => void;
  onSelectSuggestion: (targetSection: string, detailId?: string) => void;
  onLogout?: () => void;
  isMentorAvailable?: boolean;
  onToggleMentorAvailability?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  onOpenMobileNav,
  onSelectSuggestion,
  onLogout,
  isMentorAvailable = true,
  onToggleMentorAvailability,
}) => {
  const isTutor = user.role === 'admin';
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filtered suggestions based on query
  const filteredSuggestions = query.trim() === ''
    ? searchSuggestionsData.slice(0, 5)
    : searchSuggestionsData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.meta.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchSuggestion) => {
    setQuery(item.title);
    setIsDropdownOpen(false);
    onSelectSuggestion(item.sectionTarget, item.id);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mata Kuliah': return <BookOpen className="w-4 h-4 text-teal-700" />;
      case 'Video Materi': return <Video className="w-4 h-4 text-sky-700" />;
      case 'Latihan Soal': return <FileQuestion className="w-4 h-4 text-amber-700" />;
      case 'Sesi Mentoring': return <Calendar className="w-4 h-4 text-indigo-700" />;
      default: return <User className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <header id="section-nav-global" className={`sticky top-0 z-30 border-b px-4 md:px-8 py-3.5 transition-colors ${
      isTutor
        ? 'bg-slate-950 border-indigo-950/80 text-white'
        : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile Nav Toggle & Personal Greeting */}
        <div className="flex items-center gap-3 md:gap-4 min-w-[200px]">
          <button
            type="button"
            onClick={onOpenMobileNav}
            className={`p-2 -ml-1 rounded-lg lg:hidden transition-colors ${
              isTutor 
                ? 'text-slate-400 hover:text-white hover:bg-slate-900' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Sapaan Personal */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`font-heading font-bold text-base md:text-lg ${
                isTutor ? 'text-white' : 'text-slate-900'
              }`}>
                Halo, {user.name} 👋
              </span>
              <span className={`hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                isTutor
                  ? 'text-indigo-300 bg-indigo-950/80 border-indigo-700/60'
                  : 'text-teal-800 bg-teal-50 border-teal-200'
              }`}>
                {isTutor ? '🛡️ Koordinator Asdos' : 'Maba FEB 2026'}
              </span>
            </div>
            <span className={`text-xs hidden md:inline ${isTutor ? 'text-slate-400' : 'text-slate-600'}`}>
              {isTutor ? 'Pusat Kendali Pengajar & Asistensi FEB UNJ' : `Fakultas Ekonomika dan Bisnis • ${user.programStudi}`}
            </span>
          </div>
        </div>

        {/* Center: Bilah Pencarian Prediktif */}
        <div ref={searchContainerRef} className="flex-1 max-w-xl relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="predictive-search-input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder={isTutor ? "Cari butir soal, silabus kurikulum, jadwal bimbingan..." : "Cari Mata Kuliah, Materi, Mentor..."}
              className={`w-full pl-10 pr-9 py-2 text-sm rounded-lg border transition-all ${
                isTutor
                  ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:bg-slate-950 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30'
                  : 'bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-500 border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20'
              }`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Predictive Dropdown Result */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>{query ? 'Hasil Pencarian Prediktif' : 'Pencarian Populer Mahasiswa Baru FEB'}</span>
                <span className="text-[11px] text-teal-700 font-medium">Tekan untuk menuju materi</span>
              </div>
              
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-4 py-3 hover:bg-teal-50/50 flex items-start gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded-md bg-slate-100 group-hover:bg-teal-100 transition-colors mt-0.5">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                            {item.category}
                          </span>
                          <span className="text-sm font-medium text-slate-900 group-hover:text-teal-900 truncate">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 truncate">
                          {item.meta}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 self-center" />
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    Tidak ditemukan hasil untuk "{query}". Coba kata kunci lain seperti <em>Akuntansi</em>, <em>Elastisitas</em>, atau <em>Matematika</em>.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Availability Toggle (Tutor only), Logout & Notifications */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Mentor Availability Toggle Switch (Header Atas Modul 1) */}
          {isTutor && onToggleMentorAvailability && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-300 hidden lg:inline">
                Status Mentor:
              </span>
              <button
                type="button"
                onClick={onToggleMentorAvailability}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isMentorAvailable ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={isMentorAvailable}
                title={isMentorAvailable ? "Status: Tersedia untuk Sesi" : "Status: Sedang Sibuk"}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isMentorAvailable ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-[11px] font-bold font-heading whitespace-nowrap ${
                isMentorAvailable ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {isMentorAvailable ? 'Tersedia' : 'Sibuk'}
              </span>
            </div>
          )}

          {/* Logout / Switch Account Button */}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              title="Keluar dari akun dan kembali ke halaman login utama"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative cursor-pointer"
              title="Notifikasi Akademik"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-600 rounded-full ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-slate-600">
                    Pengingat Akademik
                  </span>
                  <span className="text-xs font-semibold text-teal-700">2 Baru</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3 hover:bg-slate-50">
                    <p className="font-semibold text-slate-900">Klinik Jurnal Penyesuaian Dimulai Senin</p>
                    <p className="text-slate-600 mt-1">Sesi bersama Kak Nabila Zahra pukul 16:00 WIB via Google Meet.</p>
                  </div>
                  <div className="p-3 hover:bg-slate-50">
                    <p className="font-semibold text-slate-900">Materi Baru Modul 4 Diunggah</p>
                    <p className="text-slate-600 mt-1">Neraca Lajur 10 Kolom siap dipelajari di Ruang Video.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`hidden xl:flex items-center gap-2 pl-2 border-l text-xs font-medium ${
            isTutor ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isTutor ? 'bg-indigo-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span>{isTutor ? 'Sesi Klinik Hari Ini: 16:00 (Lab FEB)' : 'Sesi Terdekat: Senin, 16:00'}</span>
          </div>
        </div>

      </div>
    </header>
  );
};
