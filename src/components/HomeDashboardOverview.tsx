import React from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Video, 
  Calendar, 
  Award, 
  ChevronRight, 
  Clock, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Sparkles, 
  Layers, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Course, MentoringSession, UserProfile } from '../types';

interface HomeDashboardOverviewProps {
  user: UserProfile;
  courses: Course[];
  upcomingMentoring: MentoringSession[];
  onNavigate: (tabId: string) => void;
  onGoToVideo: (courseId?: string) => void;
  onGoToQuiz: (subjectTitle: string) => void;
}

export const HomeDashboardOverview: React.FC<HomeDashboardOverviewProps> = ({
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
    <div className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
        
        {/* Row 1: Academic Quick Stats Ribbon */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-heading font-bold text-lg shadow-2xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
                Status Akademik Terkini
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
                Semester 1 (Ganjil 2026) • {user.programStudi}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 divide-x divide-slate-200">
            <div className="pr-2 sm:pr-6">
              <div className="text-xs text-slate-500 font-medium">Proyeksi IPK</div>
              <div className="font-heading font-bold text-lg text-emerald-700 flex items-center gap-1.5">
                <span>3.82</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold">Predikat A</span>
              </div>
            </div>

            <div className="pl-4 sm:pl-6 pr-2 sm:pr-6">
              <div className="text-xs text-slate-500 font-medium">Beban SKS</div>
              <div className="font-heading font-bold text-lg text-slate-900">
                {user.totalTargetCredits} SKS <span className="text-xs font-normal text-slate-500">(6 Matkul)</span>
              </div>
            </div>

            <div className="pl-4 sm:pl-6">
              <div className="text-xs text-slate-500 font-medium">Rata-Rata Silabus</div>
              <div className="font-heading font-bold text-lg text-teal-800">
                {avgProgress}% Tuntas
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 3 Immediate Action Cards (Resume, Academic Focus, Upcoming Mentoring) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
                Aktivitas Belajar Berjalan
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('progress-belajar')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Progress Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Checkpoint Video Terakhir */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold font-mono border border-teal-100 flex items-center gap-1">
                    <Video className="w-3 h-3 text-teal-700" />
                    Video Terakhir Ditonton
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Menit 14:20
                  </span>
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                  Jurnal Penyesuaian Akrual & Deferral
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Pengantar Akuntansi I (EKA101) • Kak Nabila Zahra
                </p>

                {/* Progress bar */}
                <div className="mt-4 mb-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Progres Durasi</span>
                    <span className="font-mono font-semibold text-slate-700">14:20 / 31:20</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-700 rounded-full" style={{ width: '46%' }} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onGoToVideo('act-101')}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold font-heading flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Lanjutkan Menonton</span>
              </button>
            </div>

            {/* Card 2: Status Evaluasi & Target Nilai */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-[11px] font-bold font-mono border border-amber-100 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    Prioritas Persiapan UTS
                  </span>
                  <span className="text-xs font-semibold text-amber-700 font-mono">
                    2 Matkul
                  </span>
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                  Matematika Bisnis & Akuntansi I
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Progres materi masih di bawah 50%. Selesaikan kuis dan modul sebelum pekan ujian untuk menjaga target predikat A.
                </p>

                <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <span className="text-slate-600">Matematika Bisnis (43%)</span>
                  <span className="font-bold text-amber-800">Perlu Kuis Bab 3</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('progress-belajar')}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold font-heading flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
                <span>Buka Evaluasi Nilai Matkul</span>
              </button>
            </div>

            {/* Card 3: Mentoring Terdekat */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-900 text-[11px] font-bold font-mono border border-indigo-100 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-700" />
                    Mentoring Terdekat
                  </span>
                  <span className="text-xs font-semibold text-teal-700 font-mono">
                    {nextSession ? `${nextSession.day}, ${nextSession.dateStr}` : 'Rabu Ini'}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                  {nextSession?.sessionTopic || 'Klinik Persiapan UTS: Bedah Soal Jurnal Penyesuaian'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Tutor: {nextSession?.tutorName || 'Kak Nabila Zahra, S.Ak.'} • {nextSession?.meetingPlatform || 'Google Meet'}
                </p>

                <div className="mt-4 p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs flex items-center justify-between">
                  <span className="text-indigo-900 font-medium">Jam Pelaksanaan:</span>
                  <span className="font-bold text-indigo-950">{nextSession?.timeSlot || '19:30 - 21:00 WIB'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('sesi-mentoring')}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold font-heading flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Masuk Dashboard Mentoring</span>
              </button>
            </div>

          </div>
        </div>

        {/* Row 3: Direktori 5 Dashboard Aksel FEB (Dedicated Dashboard Hub) */}
        <div>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800 font-heading mb-1">
              Direktori Dashboard Fitur
            </div>
            <h3 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
              Pilih Ruang Belajar Terarah
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[70ch]">
              Setiap dashboard dirancang mandiri tanpa scrolling panjang. Klik menu di bawah atau navigasi sidebar untuk langsung menuju fitur yang Anda perlukan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Progress & Lanjutkan Belajar */}
            <div 
              onClick={() => onNavigate('progress-belajar')}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    6 Mata Kuliah
                  </span>
                  <span className="text-[10px] font-semibold text-teal-700">
                    Donut Nilai & SKS
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-teal-900 transition-colors">
                  Progress & Lanjutkan Belajar
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Evaluasi tuntas silabus semester 1, proyeksi nilai huruf A, dan checkpoint materi terakhir tanpa gangguan modul lain.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Buka Dashboard Progress</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Modul Perkuliahan & Bank Soal */}
            <div 
              onClick={() => onNavigate('modul-perkuliahan')}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 border border-sky-100 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    RPS Standar FEB
                  </span>
                  <span className="text-[10px] font-semibold text-sky-700">
                    Timer Soal 02:00
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-teal-900 transition-colors">
                  Modul Perkuliahan & Bank Soal
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Kumpulan materi RPS lengkap 6 matkul semester 1, studi kasus bisnis, dan simulasi soal ujian dengan pembahasan asdos.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Buka Modul & Soal</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Video Pembelajaran */}
            <div 
              onClick={() => onNavigate('video-pembelajaran')}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-100 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Video className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Full HD 1080p
                  </span>
                  <span className="text-[10px] font-semibold text-amber-700">
                    Chapter Navigasi
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-teal-900 transition-colors">
                  Video Pembelajaran
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Pemutar rekaman kuliah terpadu dengan transkrip interaktif, catatan pribadi mahasiswa, dan pemisah bab konsep praktis.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Buka Pemutar Video</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. Sesi Mentoring & Bimbingan */}
            <div 
              onClick={() => onNavigate('sesi-mentoring')}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-100 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Jadwal Mingguan
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-700">
                    Tutor Asdos Senior
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-teal-900 transition-colors">
                  Sesi Mentoring & Tutor FEB
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Booking sesi klinik tanya jawab, kalender bimbingan responsi, serta konsultasi privat bersama tutor berprestasi.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Buka Jadwal Mentoring</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 5. Profil Mahasiswa */}
            <div 
              onClick={() => onNavigate('profil')}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-2"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 border border-purple-100 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Identitas & KRS
                  </span>
                  <span className="text-[10px] font-semibold text-purple-700">
                    Pengaturan & Notifikasi
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-teal-900 transition-colors">
                  Profil Mahasiswa & Pengaturan Belajar
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Kelola identitas NIM, preferensi notifikasi pengingat via WhatsApp/Email, pengaturan kualitas pemutar video, serta rincian langganan Aksel Pro.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Buka Profil Mahasiswa</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
