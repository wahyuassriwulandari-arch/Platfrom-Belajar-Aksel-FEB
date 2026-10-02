import React from 'react';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Home, 
  Users, 
  GraduationCap, 
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  User,
  CreditCard,
  Layers,
  ShieldCheck,
  LogOut,
  Sparkles,
  FileQuestion,
  Plus,
  BellRing,
  ExternalLink,
  Zap
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onOpenLoginPortal?: () => void;
  onLogout?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  user,
  isOpenMobile,
  setIsOpenMobile,
  onOpenLoginPortal,
  onLogout,
}) => {
  const isTutor = user.role === 'admin';

  // Navigation Items customized for Tutor vs Mahasiswa
  const navItems = isTutor
    ? [
        { id: 'beranda', label: 'Beranda', icon: ShieldCheck },
        { id: 'sesi-mentoring', label: 'Jadwal Mentoring', icon: Calendar },
        { id: 'progres-belajar', label: 'Daftar Mahasiswa', icon: Users },
        { id: 'modul-perkuliahan', label: 'Kurikulum', icon: BookOpen },
        { id: 'profil-mahasiswa', label: 'Profil Pengajar', icon: User },
      ]
    : [
        { id: 'beranda', label: 'Beranda Belajar', icon: Home },
        { id: 'progres-belajar', label: 'Progres Belajar Saya', icon: TrendingUp },
        { id: 'modul-perkuliahan', label: 'Modul Perkuliahan', icon: BookOpen },
        { id: 'video-pembelajaran', label: 'Video Pembelajaran', icon: Video },
        { id: 'sesi-mentoring', label: 'Sesi Mentoring', icon: Calendar },
        { id: 'profil-mahasiswa', label: 'Profil Mahasiswa', icon: GraduationCap },
      ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  const isItemActive = (itemId: string) => {
    if (activeTab === itemId) return true;
    if (itemId === 'beranda' && (activeTab === 'overview' || activeTab === 'home' || activeTab === 'dasbor')) return true;
    if (itemId === 'progres-belajar' && (activeTab === 'analytics' || activeTab === 'progress' || activeTab === 'progress-belajar' || activeTab === 'daftar-mahasiswa')) return true;
    if (itemId === 'modul-perkuliahan' && (activeTab === 'materi-inti' || activeTab === 'management' || activeTab === 'quiz' || activeTab === 'courses' || activeTab === 'kurikulum')) return true;
    if (itemId === 'video-pembelajaran' && (activeTab === 'video')) return true;
    if (itemId === 'sesi-mentoring' && (activeTab === 'mentoring' || activeTab === 'calendar' || activeTab === 'tutors' || activeTab === 'jadwal-mentoring')) return true;
    if (itemId === 'panel-admin' && (activeTab === 'admin' || activeTab === 'hub')) return true;
    if (itemId === 'profil-mahasiswa' && (activeTab === 'profil' || activeTab === 'profile' || activeTab === 'settings' || activeTab === 'profil-pengajar')) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="sidebar-nav"
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 h-screen flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isTutor
            ? 'bg-slate-950 border-r border-indigo-950/80 text-slate-200'
            : 'bg-white border-r border-slate-200 text-slate-800'
        }`}
      >
        {/* Brand Header */}
        <div className={`p-5 border-b flex items-center justify-between shrink-0 transition-colors ${
          isTutor ? 'border-indigo-950/80 bg-slate-950' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold font-heading text-lg shadow-sm ${
              isTutor 
                ? 'bg-gradient-to-tr from-indigo-700 to-violet-600 shadow-indigo-950/50' 
                : 'bg-teal-800'
            }`}>
              {isTutor ? <ShieldCheck className="w-5 h-5" /> : 'A'}
            </div>
            <div>
              <div className={`font-heading font-bold text-lg tracking-tight leading-none ${
                isTutor ? 'text-white' : 'text-slate-900'
              }`}>
                Aksel FEB
              </div>
              <div className={`text-[11px] font-medium mt-1 ${
                isTutor ? 'text-indigo-300' : 'text-slate-500'
              }`}>
                {isTutor ? 'Pusat Kendali Pengajar & Asdos' : 'Portal Akademik Mahasiswa'}
              </div>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setIsOpenMobile(false)}
            className={`p-1.5 lg:hidden rounded-lg transition-colors ${
              isTutor ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            aria-label="Tutup navigasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Program Meta Banner */}
        <div className={`px-5 py-3.5 border-b shrink-0 text-xs transition-colors ${
          isTutor ? 'bg-slate-900/60 border-indigo-950/60' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`flex items-center gap-1.5 font-semibold font-heading ${
            isTutor ? 'text-indigo-300' : 'text-teal-900'
          }`}>
            {isTutor ? (
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            ) : (
              <GraduationCap className="w-4 h-4 text-teal-700 shrink-0" />
            )}
            <span>FEB Universitas Negeri Jakarta (UNJ)</span>
          </div>
          <div className={`mt-1 flex items-center gap-1.5 ${isTutor ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>{isTutor ? 'Koordinator Lab & Asdos' : user.programStudi}</span>
            <span aria-hidden="true">·</span>
            <span>{isTutor ? 'Semester Ganjil 2026' : `Semester ${user.semester}`}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 min-h-0 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className={`px-3 pb-2 text-[11px] font-bold uppercase tracking-wider font-heading ${
            isTutor ? 'text-indigo-400/80' : 'text-slate-400'
          }`}>
            {isTutor ? 'Navigasi Pengajar' : 'Menu Belajar Mahasiswa'}
          </div>

          {navItems.map((item: any) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all text-left cursor-pointer group ${
                  active
                    ? isTutor
                      ? 'bg-gradient-to-r from-indigo-700 to-violet-700 text-white font-bold shadow-md shadow-indigo-950/60'
                      : 'bg-teal-800 text-white font-semibold shadow-xs'
                    : isTutor
                      ? 'text-slate-400 hover:bg-slate-900 hover:text-white font-medium'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                    active 
                      ? 'text-white' 
                      : isTutor
                        ? 'text-indigo-400 group-hover:text-white'
                        : 'text-slate-400 group-hover:text-slate-700'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    active 
                      ? 'bg-white/20 text-white' 
                      : isTutor
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/40'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Card & Logout at bottom */}
        <div className={`p-3.5 border-t shrink-0 space-y-2 ${
          isTutor ? 'border-indigo-950/80 bg-slate-950' : 'border-slate-200 bg-white'
        }`}>
          <button
            type="button"
            onClick={() => handleNavClick('profil-mahasiswa')}
            className={`w-full text-left p-2.5 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer group ${
              isTutor 
                ? 'bg-slate-900/90 hover:bg-slate-900 border-indigo-900/60 text-white' 
                : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-900'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 ${
              isTutor 
                ? 'bg-gradient-to-tr from-indigo-700 to-violet-700 text-white shadow-sm' 
                : 'bg-teal-800'
            }`}>
              {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-bold truncate font-heading ${
                isTutor ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-teal-900'
              }`}>
                {user.name}
              </div>
              <div className={`text-[11px] truncate font-mono ${
                isTutor ? 'text-indigo-400' : 'text-slate-500'
              }`}>
                {isTutor ? 'Koordinator Asdos' : user.nim}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-200 shrink-0" />
          </button>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isTutor
                  ? 'border-rose-900/60 bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 hover:border-rose-700'
                  : 'border-dashed border-slate-300 hover:border-rose-400 hover:bg-rose-50/50 text-slate-600 hover:text-rose-700'
              }`}
              title="Keluar dari akun dan kembali ke halaman login depan"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Keluar Akun ({isTutor ? 'Tutor' : 'Mahasiswa'})</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
