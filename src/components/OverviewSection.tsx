import React from 'react';
import { 
  Award, 
  TrendingUp, 
  BookOpen, 
  Video, 
  Calendar, 
  Clock, 
  Play, 
  ChevronRight, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Layers,
  GraduationCap,
  CheckCircle2,
  BarChart3,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Course, MentoringSession, UserProfile } from '../types';

interface OverviewSectionProps {
  user: UserProfile;
  courses: Course[];
  upcomingMentoring: MentoringSession[];
  onNavigate: (tabId: string) => void;
  onGoToVideo: (courseId?: string) => void;
  onGoToQuiz: (subjectTitle: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  user,
  courses,
  upcomingMentoring,
  onNavigate,
  onGoToVideo,
  onGoToQuiz,
}) => {
  const nextSession = upcomingMentoring[0];
  const avgProgress = Math.round(
    courses.reduce((acc, c) => acc + c.progressPercent, 0) / courses.length
  );

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      
      {/* Top Academic Banner */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 font-heading tracking-wide mb-1 flex items-center gap-1.5">
              <span>Beranda</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">Tahun Akademik 2026/2027</span>
            </div>
            <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
              Selamat Datang Kembali, {user.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {user.programStudi} · Semester {user.semester} · FEB Universitas Negeri Jakarta (UNJ)
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onNavigate('progres-belajar')}
              className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold font-heading flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Lihat Progres Belajar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Internal Scrollable Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* HERO BANNER BERANDA */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-3xl">
              <div className="text-xs font-semibold text-teal-200 tracking-wide mb-3 flex items-center gap-2">
                <span>Pusat Pembelajaran Mandiri Maba FEB 2026</span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-3">
                Adaptasi Kuliah Lebih Cepat, Pahami Materi Dasar Tanpa Takut Ketinggalan
              </h2>
              <p className="font-body text-teal-100/90 text-xs md:text-sm leading-relaxed max-w-2xl mb-6">
                Aksel FEB merupakan website pembelajaran daring yang dikembangkan untuk mahasiswa di lingkungan Fakultas Ekonomi dan Bisnis (FEB), Universitas Negeri Jakarta (UNJ). Platform ini berfungsi sebagai sarana penunjang akademik yang memungkinkan mahasiswa mengakses, mempelajari, dan mengulas kembali materi perkuliahan secara mandiri di luar jam kuliah.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('progres-belajar')}
                  className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-heading font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Mulai Belajar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-teal-600/10 pointer-events-none blur-2xl" />
            <div className="absolute right-32 -top-12 w-48 h-48 rounded-full bg-emerald-500/10 pointer-events-none blur-2xl" />
          </div>

          {/* KPI CARDS UTAMA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* KPI 1: IPK */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 font-heading uppercase tracking-wider">
                  Proyeksi IPK
                </span>
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="font-heading font-bold text-3xl text-emerald-800">
                  3.82
                </div>
                <span className="text-xs font-semibold text-emerald-800">
                  Predikat A
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Status on-track target cumlaude
              </div>
            </div>

            {/* KPI 2: Beban SKS */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 font-heading uppercase tracking-wider">
                  Beban Studi
                </span>
                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="font-heading font-bold text-3xl text-slate-900">
                  {user.totalTargetCredits} SKS
                </div>
                <span className="text-xs text-slate-500">
                  6 Mata Kuliah
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Paket kurikulum semester 1
              </div>
            </div>

            {/* KPI 3: Rata-Rata Silabus */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 font-heading uppercase tracking-wider">
                  Capaian Silabus
                </span>
                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="font-heading font-bold text-3xl text-teal-900">
                  {avgProgress}%
                </div>
                <span className="text-xs text-slate-500">
                  Tuntas
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2.5 overflow-hidden">
                <div className="h-full bg-teal-700 rounded-full" style={{ width: `${avgProgress}%` }} />
              </div>
            </div>

            {/* KPI 4: Jam Mentoring */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 font-heading uppercase tracking-wider">
                  Jam Mentoring
                </span>
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="font-heading font-bold text-3xl text-slate-900">
                  {user.mentoringHours} Jam
                </div>
                <span className="text-xs font-semibold text-teal-800">
                  Aktif
                </span>
              </div>
            </div>

          </div>

          {/* GRAFIK RINGKASAN CAPAIAN MATAKULIAH */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Distribusi Silabus Mata Kuliah Semester 1
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pemetaan capaian materi dan modul dari 6 mata kuliah aktif
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('progres-belajar')}
                className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Buka Detail Donut Chart</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bars for 6 Courses */}
            <div className="space-y-4">
              {courses.map((c) => (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-900">{c.code}</span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className="text-slate-800 font-semibold">{c.title}</span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className="text-slate-500">{c.credits} SKS</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-slate-900">{c.progressPercent}%</span>
                      <span className="text-slate-300" aria-hidden="true">·</span>
                      <span className={`text-[11px] font-sans font-medium ${
                        c.progressPercent >= 70 ? 'text-emerald-800' :
                        c.progressPercent >= 50 ? 'text-teal-800' : 'text-amber-800'
                      }`}>
                        {c.progressPercent >= 70 ? 'On-Track (A)' : c.progressPercent >= 50 ? 'Sedang Berjalan' : 'Perlu Perhatian UTS'}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        c.progressPercent >= 70 ? 'bg-emerald-700' :
                        c.progressPercent >= 50 ? 'bg-teal-700' : 'bg-amber-600'
                      }`}
                      style={{ width: `${c.progressPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 IMMEDIATE ACTION HIGHLIGHTS */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Aktivitas Belajar Berjalan
                </h3>
                <p className="text-xs text-slate-500">Lanjutkan materi dan agenda bimbingan terdekat</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Checkpoint Video */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-teal-800">Video Terakhir Ditonton</span>
                    <span className="font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      14:20
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    Jurnal Penyesuaian Akrual & Deferral
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Pengantar Akuntansi I (EKA101) · Kak Nabila Zahra
                  </p>
                  <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-700 rounded-full" style={{ width: '46%' }} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onGoToVideo('act-101')}
                  className="mt-4 w-full py-2 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold font-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Lanjutkan Video Pembelajaran</span>
                </button>
              </div>

              {/* Evaluasi Persiapan UTS */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-amber-800">Prioritas Persiapan UTS</span>
                    <span className="font-mono text-amber-800 font-semibold">2 Mata Kuliah</span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                    Matematika Bisnis & Akuntansi I
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Progres materi silabus masih di bawah 50%. Selesaikan latihan kuis sebelum pekan ujian.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('progres-belajar')}
                  className="mt-4 w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold font-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-teal-800" />
                  <span>Lihat Progres Belajar</span>
                </button>
              </div>

              {/* Mentoring Terdekat */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-teal-800">Sesi Mentoring Terdekat</span>
                    <span className="font-mono text-slate-600 font-medium">
                      {nextSession ? nextSession.day : 'Rabu'}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {nextSession?.sessionTopic || 'Klinik Persiapan UTS: Bedah Soal Jurnal Penyesuaian'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Tutor: {nextSession?.tutorName || 'Kak Nabila Zahra'} · {nextSession?.timeSlot}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('sesi-mentoring')}
                  className="mt-4 w-full py-2 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold font-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jadwal Sesi Mentoring</span>
                </button>
              </div>

            </div>
          </div>

          {/* DIREKTORI SECTION PORTAL */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading mb-3">
              Pintasan Section Aksel FEB
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => onNavigate('progres-belajar')}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left transition-colors cursor-pointer group"
              >
                <div className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-900 flex items-center justify-between">
                  <span>Progres Belajar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-800 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Donut charts, filter ketuntasan nilai, dan target IPK.</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('modul-perkuliahan')}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left transition-colors cursor-pointer group"
              >
                <div className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-900 flex items-center justify-between">
                  <span>Modul Perkuliahan & Bank Soal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-800 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Tabel kurikulum RPS, filter departemen, dan bank soal latihan.</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('video-pembelajaran')}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left transition-colors cursor-pointer group"
              >
                <div className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-900 flex items-center justify-between">
                  <span>Video Pembelajaran</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-800 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Pemutar Full HD, transkrip materi, dan bab perkuliahan.</p>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
