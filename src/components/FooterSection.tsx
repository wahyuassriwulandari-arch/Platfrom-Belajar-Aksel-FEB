import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

interface FooterSectionProps {
  onNavigate?: (tabId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const handleLinkClick = (tabId: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-16 text-slate-700">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold font-heading text-lg">
                A
              </div>
              <span className="font-heading font-bold text-xl text-slate-900 tracking-tight">
                Aksel FEB
              </span>
            </div>
            <p className="font-body text-xs text-slate-700 leading-[1.6] max-w-[70ch]">
              Platform akselerasi belajar terpadu bagi mahasiswa baru Fakultas Ekonomika dan Bisnis. 
              Menghubungkan maba dengan mentor, tutor asisten dosen, dan bank soal berkualitas tinggi.
            </p>
          </div>

          {/* Col 2: Kurikulum Dasar FEB */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-4">
              Mata Kuliah Dasar FEB
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('modul-perkuliahan', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Pengantar Akuntansi I (EKA101)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('modul-perkuliahan', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Pengantar Ekonomi Mikro (EKI101)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('modul-perkuliahan', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Pengantar Manajemen (EKM101)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('modul-perkuliahan', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Matematika Ekonomi & Bisnis (EKQ101)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('modul-perkuliahan', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Statistika Bisnis I (EKQ102)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Belajar */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-4">
              Fitur Pembelajaran
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('video-pembelajaran', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Ruang Video & Playlist Materi
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('modul-perkuliahan', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Bank Soal Tryout Mandiri (Single Question)
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('sesi-mentoring', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Weekly Mentoring Calendar
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('sesi-mentoring', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Konsultasi Asisten Dosen Senior
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={(e) => handleLinkClick('beranda', e)} 
                  className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                >
                  Panduan Orientasi Mahasiswa Baru
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Integritas Akademik */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-4">
              Integritas & Etika
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-[1.6]">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Bimbingan Edukasi Murni</span>
              </div>
              <p className="text-slate-700 text-[11px]">
                Aksel FEB menolak segala bentuk plagiarisme dan joki tugas. Fokus platform adalah pemahaman logika konsep serta penguasaan keilmuan mahasiswa.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            © 2026 <strong>Aksel FEB</strong>. Hak Cipta Dilindungi. Dibuat untuk ekosistem mahasiswa baru FEB.
          </div>
          <div className="flex items-center gap-4 text-slate-700">
            <span>Standar Kurikulum FEB</span>
            <span>•</span>
            <span>Didukung oleh Komunitas Tutor Sebaya</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
