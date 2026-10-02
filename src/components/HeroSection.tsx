import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Award, Calendar, Users, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroSectionProps {
  user: UserProfile;
  onStartLearning: () => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  user,
  onStartLearning,
  onExploreCourses,
}) => {
  return (
    <section id="section-beranda" className="py-16 md:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Personal Greeting Tag */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs md:text-sm font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
          <span>Beranda • Selamat datang kembali, <strong>{user.name}</strong> (Maba FEB 2026)</span>
        </div>

        {/* Big Bold H1 (Minimal 48px, Poppins Bold) */}
        <h1 className="font-heading font-bold text-slate-900 text-4xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.18] mb-6 max-w-4xl">
          Adaptasi Kuliah Lebih Cepat, Pahami Materi Dasar Tanpa Takut Ketinggalan
        </h1>

        {/* Subtitle Body Text: Open Sans, line-height 1.6, max 70ch */}
        <p className="font-body text-slate-700 text-base md:text-lg leading-[1.6] max-w-[70ch] mb-10">
          Aksel FEB merupakan website pembelajaran daring yang dikembangkan untuk mahasiswa di lingkungan Fakultas Ekonomi dan Bisnis (FEB), Universitas Negeri Jakarta (UNJ). Platform ini berfungsi sebagai sarana penunjang akademik yang memungkinkan mahasiswa mengakses, mempelajari, dan mengulas kembali materi perkuliahan secara mandiri di luar jam kuliah.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          {/* CTA Primer */}
          <button
            id="hero-cta-primary"
            type="button"
            onClick={onStartLearning}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-heading font-semibold text-base shadow-xs transition-colors cursor-pointer"
          >
            <span>Mulai Belajar</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* CTA Sekunder */}
          <button
            id="hero-cta-secondary"
            type="button"
            onClick={onExploreCourses}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 font-heading font-semibold text-base transition-colors cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-slate-600" />
            <span>Jelajahi Mata Kuliah</span>
          </button>
        </div>

        {/* Value Highlights Row: Clean section cards, no gradients, clean simple borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-slate-100">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">Kurikulum Resmi FEB</h4>
              <p className="text-xs text-slate-700 mt-1 leading-normal">
                Diselaraskan dengan RPS mata kuliah semester 1 semua jurusan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Users className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">Tutor Asisten Dosen</h4>
              <p className="text-xs text-slate-700 mt-1 leading-normal">
                Mentor senior dengan IPK di atas 3.85 dan pengalaman asistensi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">Pembahasan Step-by-Step</h4>
              <p className="text-xs text-slate-700 mt-1 leading-normal">
                Setiap latihan soal disertai logika hitungan dan tips ujian dari mentor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Calendar className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">Mentoring Interaktif</h4>
              <p className="text-xs text-slate-700 mt-1 leading-normal">
                Sesi klinik mingguan tanya jawab tatap muka virtual tanpa biaya tambahan.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
