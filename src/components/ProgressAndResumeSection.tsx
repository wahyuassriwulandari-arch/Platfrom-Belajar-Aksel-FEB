import React, { useState } from 'react';
import { 
  TrendingUp, 
  Play, 
  Pause, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  X, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  RotateCcw,
  BarChart3,
  Calendar,
  ArrowRight,
  User,
  Video,
  FileQuestion,
  Layers,
  Check,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { Course, UserProfile } from '../types';

interface ProgressAndResumeSectionProps {
  courses: Course[];
  user: UserProfile;
  onSelectCourseToStudy: (courseId: string) => void;
  onSelectCourseMentoring: () => void;
  onGoToVideoPlayer: (courseCode?: string) => void;
  onGoToQuiz: (subjectTitle: string) => void;
}

// Donut Chart SVG component
interface DonutProgressProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  colorClass: string;
}

const DonutProgress: React.FC<DonutProgressProps> = ({
  percent,
  size = 92,
  strokeWidth = 9,
  colorClass
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className={`${colorClass} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading font-bold text-lg text-slate-900 leading-none">
          {percent}%
        </span>
        <span className="text-[10px] text-slate-500 font-medium mt-0.5">Tuntas</span>
      </div>
    </div>
  );
};

export type ActivityType = 'video' | 'quiz' | 'module';

export interface RecentActivityItem {
  id: string;
  type: ActivityType;
  typeLabel: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  title: string;
  subtitle: string;
  lastAccessed: string;
  progressPercent: number;
  checkpointInfo: string;
  thumbnailUrl: string;
  instructorName: string;
  instructorRole: string;
  keyConcepts: string[];
  notesSummary: string;
}

const recentActivities: RecentActivityItem[] = [
  {
    id: 'act-video-last',
    type: 'video',
    typeLabel: 'Video Terakhir Ditonton',
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    badgeText: 'text-sky-800',
    courseCode: 'EKA101',
    courseTitle: 'Pengantar Akuntansi I',
    department: 'Akuntansi',
    title: 'Jurnal Penyesuaian Akrual & Deferral (Krusial UTS)',
    subtitle: 'Modul 3: Penyesuaian Akhir Periode Akuntansi',
    lastAccessed: '15 menit yang lalu',
    progressPercent: 46,
    checkpointInfo: 'Menit 14:20 dari 31:20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'Kak Nabila Zahra, S.Ak.',
    instructorRole: 'Asdos Akuntansi FEB & Valedictorian',
    keyConcepts: [
      'Beban Dibayar di Muka (Metode Harta vs Metode Beban)',
      'Pendapatan Diterima di Muka (Deferral Liability)',
      'Beban Gaji Akrual yang Masih Harus Dibayar'
    ],
    notesSummary: 'Inti bahasan menit ke-14: Jika saat pembayaran sewa dicatat sebagai HARTA (Sewa Dibayar di Muka), maka jurnal penyesuaian akhir tahun mendebit Beban Sewa sebesar nilai yang SUDAH kedaluwarsa. Jika awalnya dicatat sebagai BEBAN, sesuaikan nilai yang BELUM kedaluwarsa.'
  },
  {
    id: 'act-quiz-last',
    type: 'quiz',
    typeLabel: 'Kuis Terakhir Dikerjakan',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    courseCode: 'EKI101',
    courseTitle: 'Pengantar Ekonomi Mikro',
    department: 'Ilmu Ekonomi',
    title: 'Simulasi UTS: Midpoint Elastisitas Permintaan & TR',
    subtitle: 'Bank Soal Latihan Mandiri Mikroekonomi',
    lastAccessed: '1 jam yang lalu',
    progressPercent: 60,
    checkpointInfo: '3 dari 5 Soal Selesai (Akurasi 80%)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'Kak Dimas Pratama, S.E.',
    instructorRole: 'Asdos Teori Ekonomi Mikro FEB',
    keyConcepts: [
      'Midpoint Formula untuk Mengukur Elastisitas Harga',
      'Hubungan Elastisitas dengan Total Penerimaan (P x Q)',
      'Perbedaan Elastisitas Permintaan Jangka Pendek vs Panjang'
    ],
    notesSummary: 'Prinsip Kunci: Pada kurva permintaan elastis (|Ed| > 1), persentase penurunan harga lebih kecil dibandingkan lonjakan persentase kuantitas terjual. Akibatnya, strategi diskon justru meningkatkan Total Revenue (TR) produsen.'
  },
  {
    id: 'act-module-last',
    type: 'module',
    typeLabel: 'Modul Terakhir Dibuka',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-800',
    courseCode: 'EKU101',
    courseTitle: 'Matematika Bisnis',
    department: 'Kuantitatif',
    title: 'Diktat RPS: Penerapan Derivatif dalam Optimasi Laba',
    subtitle: 'Slide Bahan Ajar & Kertas Kerja Perhitungan',
    lastAccessed: 'Kemarin, 21:15',
    progressPercent: 43,
    checkpointInfo: 'Halaman 18 dari 42 Slide (Bab 2)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'Kak Kevin Jonathan, S.E.',
    instructorRole: 'Asisten Laboratorium Komputasi FEB',
    keyConcepts: [
      'Syarat Orde Pertama (FOC): Marginal Revenue = Marginal Cost',
      'Syarat Orde Kedua (SOC): Uji Kecekungan Laba Maksimum (d²π/dQ² < 0)',
      'Aplikasi Elastisitas Permintaan dalam Fungsi Marginal'
    ],
    notesSummary: 'Slide 18 merangkum: Laba maksimum tercapai mutlak ketika Marginal Revenue (MR) memotong Marginal Cost (MC) dari atas, memastikan kemiringan kurva penerimaan marginal lebih landai daripada biaya marginal.'
  }
];

export const ProgressAndResumeSection: React.FC<ProgressAndResumeSectionProps> = ({
  courses,
  user,
  onSelectCourseToStudy,
  onSelectCourseMentoring,
  onGoToVideoPlayer,
  onGoToQuiz,
}) => {
  // Modal for Grade Breakdown
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);

  // Sub-filter tabs: 'both' | 'resume' | 'progress'
  const [activeTab, setActiveTab] = useState<'both' | 'resume' | 'progress'>('both');

  // Filter & sort for "Progres Belajar" view
  const [progressStatusFilter, setProgressStatusFilter] = useState<'all' | 'ontrack' | 'studying' | 'attention'>('all');
  const [progressSortBy, setProgressSortBy] = useState<'default' | 'progress-desc' | 'progress-asc' | 'credits'>('default');

  // Active selected recent activity (video / quiz / module)
  const [selectedActivityId, setSelectedActivityId] = useState<string>('act-video-last');
  const [isPlayingSim, setIsPlayingSim] = useState(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);

  const currentActivity = recentActivities.find(a => a.id === selectedActivityId) || recentActivities[0];

  // Helper colors
  const getProgressColor = (percent: number) => {
    if (percent >= 70) return 'text-emerald-600';
    if (percent >= 50) return 'text-teal-700';
    return 'text-amber-600';
  };

  const getStatusBadge = (percent: number) => {
    if (percent >= 70) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          On-Track Menuju A
        </span>
      );
    }
    if (percent >= 50) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
          <Clock className="w-3 h-3 text-teal-600" />
          Sedang Dipelajari
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
        <AlertCircle className="w-3 h-3 text-amber-600" />
        Perlu Perhatian UTS
      </span>
    );
  };

  const getProjectedGrade = (percent: number) => {
    if (percent >= 75) return { grade: 'A', score: '3.85 - 4.00' };
    if (percent >= 65) return { grade: 'A-', score: '3.65 - 3.75' };
    if (percent >= 55) return { grade: 'B+', score: '3.30 - 3.50' };
    return { grade: 'B', score: '3.00 - 3.25' };
  };

  const handleExecuteActivityAction = (item: RecentActivityItem) => {
    if (item.type === 'video') {
      onGoToVideoPlayer(item.courseCode);
    } else if (item.type === 'quiz') {
      onGoToQuiz(item.courseTitle);
    } else {
      onSelectCourseToStudy(item.courseCode === 'EKA101' ? 'course-1' : item.courseCode === 'EKI101' ? 'course-2' : 'course-4');
    }
  };

  // Filtered & sorted courses calculation
  const displayedCourses = courses
    .filter(course => {
      if (activeTab !== 'progress') return true;
      if (progressStatusFilter === 'ontrack') return course.progressPercent >= 70;
      if (progressStatusFilter === 'studying') return course.progressPercent >= 50 && course.progressPercent < 70;
      if (progressStatusFilter === 'attention') return course.progressPercent < 50;
      return true;
    })
    .sort((a, b) => {
      if (activeTab !== 'progress') return 0;
      if (progressSortBy === 'progress-desc') return b.progressPercent - a.progressPercent;
      if (progressSortBy === 'progress-asc') return a.progressPercent - b.progressPercent;
      if (progressSortBy === 'credits') return b.credits - a.credits;
      return 0;
    });

  // Dynamic Header Content based on active view mode
  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'progress':
        return {
          badgeText: 'Evaluasi Silabus & Proyeksi Nilai',
          badgeIcon: BarChart3,
          title: 'Progres Belajar: Evaluasi Silabus & Nilai',
          description: 'Pantau persentase ketuntasan silabus, filter mata kuliah berdasarkan status kelulusan, dan proyeksi nilai huruf semester 1 FEB UNJ.'
        };
      case 'resume':
        return {
          badgeText: 'Checkpoint Aktivitas Belajar',
          badgeIcon: RotateCcw,
          title: 'Progres Belajar: Aktivitas Berjalan',
          description: 'Akses cepat materi yang sedang dipelajari: lanjutkan video perkuliahan, kuis latihan, dan bahan diktat dari titik terakhir.'
        };
      case 'both':
      default:
        return {
          badgeText: 'Progres Belajar Mahasiswa',
          badgeIcon: Layers,
          title: 'Progres Belajar',
          description: 'Evaluasi ketuntasan silabus 6 mata kuliah aktif, pemetaan capaian materi UTS/UAS, dan kelanjutan aktivitas belajar terakhir Anda.'
        };
    }
  };

  const headerInfo = getHeaderInfo();
  const HeaderBadgeIcon = headerInfo.badgeIcon;

  return (
    <div id="section-progress-belajar" className="h-full flex flex-col overflow-hidden bg-slate-50">
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
        
        {/* Section Header with dynamic context based on active tab */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold text-teal-800 font-heading mb-1 flex items-center gap-1.5">
              <HeaderBadgeIcon className="w-4 h-4 text-teal-700" />
              <span>{headerInfo.badgeText}</span>
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
              {headerInfo.title}
            </h2>
            <p className="font-body text-slate-500 text-xs md:text-sm mt-1 max-w-[75ch] leading-relaxed">
              {headerInfo.description}
            </p>
          </div>

          {/* Distinct Tab Buttons with Icons & Specific Badges */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'both' 
                  ? 'bg-teal-700 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Semua Tampilan</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                activeTab === 'both' ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-500'
              }`}>
                2 Modul
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'resume' 
                  ? 'bg-teal-700 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Lanjutkan Belajar</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                activeTab === 'resume' ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-500'
              }`}>
                Checkpoint
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'progress' 
                  ? 'bg-teal-700 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Progres Belajar</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                activeTab === 'progress' ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-500'
              }`}>
                Nilai & SKS
              </span>
            </button>
          </div>
        </div>

        {/* Pembeda Jelas Antara "Semua Tampilan", "Lanjutkan Belajar", dan "Progres Belajar" */}
        {activeTab === 'both' && (
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-200 text-teal-950 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-xs uppercase tracking-wider text-teal-900">
                  Mode: Semua Tampilan (Gabungan Dual-Modul)
                </div>
                <p className="text-xs text-teal-800 mt-0.5 max-w-[75ch]">
                  Anda sedang melihat kedua modul secara komprehensif: <strong>Bagian 1 (Checkpoint Lanjutkan Belajar)</strong> di bagian atas dan <strong>Bagian 2 (Donut Progres & Nilai 6 Mata Kuliah)</strong> di bagian bawah.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a 
                href="#subpart-resume" 
                className="px-3 py-1.5 rounded-lg bg-white border border-teal-200 text-teal-900 hover:bg-teal-100 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>Bagian 1: Lanjutkan Belajar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#subpart-progress" 
                className="px-3 py-1.5 rounded-lg bg-white border border-teal-200 text-teal-900 hover:bg-teal-100 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>Bagian 2: Donut Progres Nilai</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-sky-950 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-700 text-white flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-xs uppercase tracking-wider text-sky-900">
                  Mode: Fokus Progres Belajar & Evaluasi Nilai
                </div>
                <p className="text-xs text-sky-800 mt-0.5 max-w-[75ch]">
                  Mode khusus untuk memantau performa 6 mata kuliah inti, simulasi target nilai akhir, dan filter ketuntasan SKS. Widget aktivitas terakhir disembunyikan agar Anda dapat fokus mengevaluasi akademik.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className="px-3 py-1.5 rounded-lg bg-white border border-sky-200 text-sky-900 hover:bg-sky-100 text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              Lihat Semua Tampilan
            </button>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-xs uppercase tracking-wider text-amber-900">
                  Mode: Fokus Lanjutkan Belajar (Checkpoint Aktif)
                </div>
                <p className="text-xs text-amber-800 mt-0.5 max-w-[75ch]">
                  Menampilkan langsung pemutar video, kuis berjalan, dan slide diktat modul terakhir tanpa gangguan kartu evaluasi nilai semester.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              Lihat Semua Tampilan
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-PART 1: MODUL LANJUTKAN BELAJAR (VIDEO, KUIS, MODUL TERAKHIR) */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'resume') && (
          <div id="subpart-resume" className="mb-14">
            
            {/* Tag Penjelas Bagian untuk Mode Semua Tampilan */}
            {activeTab === 'both' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-100/90 text-teal-950 font-mono text-xs font-bold mb-4">
                <Layers className="w-3.5 h-3.5 text-teal-700" />
                <span>[Bagian 1 dari 2] Checkpoint Lanjutkan Aktivitas Belajar Terakhir</span>
              </div>
            )}

            {/* Header Lanjutkan Belajar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Lanjutkan Aktivitas Terakhir Belajar
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Pilih kartu untuk melanjutkan video, kuis latihan, atau slide modul
              </span>
            </div>

            {/* 3 Quick Cards: Video Terakhir, Kuis Terakhir, Modul Terakhir */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {recentActivities.map((act) => {
                const isSelected = selectedActivityId === act.id;
                const IconComponent = act.type === 'video' ? Video : act.type === 'quiz' ? FileQuestion : BookOpen;
                
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      setSelectedActivityId(act.id);
                      setIsPlayingSim(false);
                      setShowNotesDrawer(false);
                    }}
                    className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected
                        ? 'bg-white border-teal-700 ring-2 ring-teal-700/20 shadow-md'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Top Badge & Time */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border ${act.badgeBg} ${act.badgeBorder} ${act.badgeText}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                          <span>{act.typeLabel}</span>
                        </span>
                        <span className="text-[11px] text-slate-600 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{act.lastAccessed}</span>
                        </span>
                      </div>

                      {/* Course Title & Code */}
                      <div className="text-xs font-mono font-bold text-slate-600 mb-1">
                        {act.courseCode} • {act.department}
                      </div>
                      <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-teal-900 transition-colors line-clamp-2 leading-snug">
                        {act.title}
                      </h4>
                    </div>

                    {/* Progress & Checkpoint Row */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-600">{act.checkpointInfo}</span>
                        <span className="font-bold text-teal-800">{act.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            act.type === 'video' ? 'bg-sky-600' : act.type === 'quiz' ? 'bg-amber-600' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${act.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* High-Impact Interactive Detail Card for the Selected Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Thumbnail & Action Trigger (5 Cols) */}
                <div className="lg:col-span-5 relative group rounded-xl overflow-hidden shadow-xs border border-slate-200">
                  <div className="aspect-video relative bg-slate-900">
                    <img 
                      src={currentActivity.thumbnailUrl} 
                      alt={currentActivity.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                    
                    {/* Activity Type & Checkpoint Badge */}
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentActivity.checkpointInfo}</span>
                    </div>

                    {/* Big Action Button (Center Trigger) */}
                    {currentActivity.type === 'video' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsPlayingSim(!isPlayingSim);
                          if (!isPlayingSim) {
                            setTimeout(() => onGoToVideoPlayer(currentActivity.courseCode), 800);
                          }
                        }}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                        aria-label="Lanjutkan putar video"
                      >
                        {isPlayingSim ? (
                          <Pause className="w-8 h-8 fill-slate-950" />
                        ) : (
                          <Play className="w-8 h-8 fill-slate-950 ml-1" />
                        )}
                      </button>
                    ) : currentActivity.type === 'quiz' ? (
                      <button
                        type="button"
                        onClick={() => onGoToQuiz(currentActivity.courseTitle)}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                        aria-label="Lanjutkan kuis latihan"
                      >
                        <FileQuestion className="w-8 h-8" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleExecuteActivityAction(currentActivity)}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
                        aria-label="Buka modul perkuliahan"
                      >
                        <BookOpen className="w-8 h-8" />
                      </button>
                    )}

                    {/* Progress Bar inside Thumbnail */}
                    <div className="absolute bottom-0 inset-x-0 bg-slate-800/80 h-1.5">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          currentActivity.type === 'video' ? 'bg-sky-400' : currentActivity.type === 'quiz' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${currentActivity.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Details, Instructor, & Key Concepts (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${currentActivity.badgeBg} ${currentActivity.badgeBorder} ${currentActivity.badgeText}`}>
                        {currentActivity.typeLabel}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {currentActivity.courseCode} • {currentActivity.courseTitle}
                      </span>
                      <span className="text-xs text-slate-500">
                        Diakses {currentActivity.lastAccessed}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-xl md:text-2xl text-slate-900 tracking-tight leading-snug">
                      {currentActivity.title}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-teal-700" />
                        {currentActivity.instructorName}
                      </span>
                      <span>•</span>
                      <span>{currentActivity.instructorRole}</span>
                    </div>
                  </div>

                  {/* Key Concepts Checklist */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
                      Poin Konsep & Indikator Pada Checkpoint Ini:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {currentActivity.keyConcepts.map((concept, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                          <span className={idx === 0 ? 'font-semibold text-slate-900' : ''}>
                            {concept} {idx === 0 && <span className="text-teal-700 text-[11px]">(Sedang aktif)</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {currentActivity.type === 'video' ? (
                      <button
                        type="button"
                        onClick={() => onGoToVideoPlayer(currentActivity.courseCode)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-heading font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Lanjutkan di Pemutar Video</span>
                      </button>
                    ) : currentActivity.type === 'quiz' ? (
                      <button
                        type="button"
                        onClick={() => onGoToQuiz(currentActivity.courseTitle)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-heading font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                      >
                        <FileQuestion className="w-4 h-4" />
                        <span>Lanjutkan Kerjakan Soal</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleExecuteActivityAction(currentActivity)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-heading font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Buka Diktat & Slide Modul</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>{showNotesDrawer ? 'Tutup Catatan' : 'Catatan Ringkas Mentor'}</span>
                    </button>

                    {currentActivity.type !== 'quiz' && (
                      <button
                        type="button"
                        onClick={() => onGoToQuiz(currentActivity.courseTitle)}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-teal-800 hover:bg-teal-50 text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <span>Uji di Bank Soal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Collapsible Notes Drawer */}
              {showNotesDrawer && (
                <div className="mt-6 pt-6 border-t border-slate-100 bg-teal-50/50 p-5 rounded-xl border border-teal-100 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-900 font-heading">
                      <Sparkles className="w-4 h-4 text-teal-700" />
                      <span>Catatan Dosen & Asdos Pendamping</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNotesDrawer(false)}
                      className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-serif">
                    {currentActivity.notesSummary}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-PART 2: PROGRES BELAJAR (DONUT CHARTS & RINCIAN NILAI) */}
        {/* ========================================================================= */}
        {activeTab === 'both' && (
          <div className="my-14 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t-2 border-dashed border-slate-300" />
            </div>
            <div className="relative bg-slate-50 px-5 py-2 rounded-full border border-slate-300 shadow-2xs text-xs font-heading font-bold text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>Batas Pemisah Modul • Lanjut ke Bagian 2 di Bawah</span>
            </div>
          </div>
        )}

        {(activeTab === 'both' || activeTab === 'progress') && (
          <div id="subpart-progress">
            
            {/* Tag Penjelas Bagian untuk Mode Semua Tampilan */}
            {activeTab === 'both' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-100/90 text-teal-950 font-mono text-xs font-bold mb-4">
                <BarChart3 className="w-3.5 h-3.5 text-teal-700" />
                <span>[Bagian 2 dari 2] Donut Progres & Rekapitulasi Capaian 6 Mata Kuliah</span>
              </div>
            )}

            {/* Semester Academic Summary Banner */}
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">
                    {user.role === 'admin' 
                      ? 'Daftar Mahasiswa (Mentee) & Pemetaan Capaian Kurikulum'
                      : 'Rekapitulasi Capaian Semester 1 (Ganjil 2026)'}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                    {user.role === 'admin'
                      ? 'Akses profil mentee, riwayat skor kuis, dan pemetaan materi sebelum sesi bimbingan dimulai'
                      : 'Total 6 Mata Kuliah Inti • 20 SKS Terdaftar • Beban Belajar Terjadwal'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8 text-xs">
                <div>
                  <span className="text-slate-500 block">Ketuntasan Semester</span>
                  <span className="font-heading font-bold text-2xl text-teal-800">62%</span>
                </div>
                {user.role !== 'admin' && (
                  <div className="border-l border-slate-200 pl-6">
                    <span className="text-slate-500 block">Proyeksi IPK Sementara</span>
                    <span className="font-heading font-bold text-2xl text-slate-900">3.82 <span className="text-xs text-slate-400 font-normal">/ 4.00</span></span>
                  </div>
                )}
                {user.role === 'admin' ? (
                  <div className="border-l border-slate-200 pl-6">
                    <span className="text-slate-500 block">Mentee Aktif</span>
                    <span className="font-heading font-bold text-2xl text-indigo-700">142 <span className="text-xs text-slate-400 font-normal">Mhs</span></span>
                  </div>
                ) : (
                  <div className="border-l border-slate-200 pl-6">
                    <span className="text-slate-500 block">SKS Tuntas</span>
                    <span className="font-heading font-bold text-2xl text-emerald-700">12 <span className="text-xs text-slate-400 font-normal">/ 20</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Khusus Mode "Progres Belajar": Filter Status, Sort, dan Rekomendasi Tutor */}
            {activeTab === 'progress' && (
              <div className="mb-6 space-y-4">
                {/* Advisor Note */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-amber-950 font-heading block">
                      Analisis Akademik & Rekomendasi Belajar:
                    </span>
                    {user.role === 'admin' ? (
                      <p className="text-amber-900 mt-0.5 leading-relaxed">
                        Dua mata kuliah memiliki persentase ketuntasan di bawah 50% (<strong>Pengantar Akuntansi I - 46%</strong> dan <strong>Matematika Bisnis - 43%</strong>). Disarankan membuka slot klinik mentoring tambahan untuk topik jurnal penyesuaian dan turunan parsial bagi mentee yang akan dibimbing.
                      </p>
                    ) : (
                      <p className="text-amber-900 mt-0.5 leading-relaxed">
                        Dua mata kuliah memiliki persentase di bawah 50% (<strong>Pengantar Akuntansi I - 46%</strong> dan <strong>Matematika Bisnis - 43%</strong>). Keduanya bernilai bobot total 7 SKS. Disarankan menyelesaikan kuis dan modul dua matkul ini sebelum jadwal UTS untuk menjaga proyeksi IPK di angka <strong>3.82 (Predikat A)</strong>.
                      </p>
                    )}
                  </div>
                </div>

                {/* Filter Status Chips & Sort Controls */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Status Filter Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mr-1">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      Filter Status:
                    </span>

                    <button
                      type="button"
                      onClick={() => setProgressStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        progressStatusFilter === 'all'
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Semua ({courses.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setProgressStatusFilter('ontrack')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        progressStatusFilter === 'ontrack'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      On-Track Menuju A (2)
                    </button>

                    <button
                      type="button"
                      onClick={() => setProgressStatusFilter('studying')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        progressStatusFilter === 'studying'
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
                      }`}
                    >
                      Sedang Dipelajari (3)
                    </button>

                    <button
                      type="button"
                      onClick={() => setProgressStatusFilter('attention')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        progressStatusFilter === 'attention'
                          ? 'bg-amber-700 text-white shadow-xs'
                          : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      Perlu Perhatian UTS (1)
                    </button>
                  </div>

                  {/* Sort Control */}
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      Urutkan:
                    </span>
                    <select
                      value={progressSortBy}
                      onChange={(e) => setProgressSortBy(e.target.value as any)}
                      className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
                    >
                      <option value="default">Sesuai Kurikulum RPS</option>
                      <option value="progress-desc">Progres Tertinggi (%)</option>
                      <option value="progress-asc">Prioritas Belajar (Terendah)</option>
                      <option value="credits">Beban SKS Terbesar</option>
                    </select>

                    {progressStatusFilter !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setProgressStatusFilter('all')}
                        className="text-xs text-teal-800 font-semibold underline hover:text-teal-950 cursor-pointer ml-1"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Courses Donut Cards */}
            {displayedCourses.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="font-heading font-bold text-slate-800 text-base">Tidak ada mata kuliah pada kategori ini</h4>
                <p className="text-xs text-slate-500 mt-1">Coba ubah pilihan filter status di atas.</p>
                <button
                  type="button"
                  onClick={() => setProgressStatusFilter('all')}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 cursor-pointer"
                >
                  Tampilkan Semua Mata Kuliah
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCourses.map((course) => {
                const projected = getProjectedGrade(course.progressPercent);
                const colorClass = getProgressColor(course.progressPercent);

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Top Header info */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-500">
                              {course.code}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-semibold">
                              {course.department}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-lg text-slate-900 mt-1.5 group-hover:text-teal-900 transition-colors">
                            {course.title}
                          </h4>
                        </div>
                        {getStatusBadge(course.progressPercent)}
                      </div>

                      {/* Donut Chart & Key Metrics Row */}
                      <div className="flex items-center gap-5 my-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <DonutProgress
                          percent={course.progressPercent}
                          colorClass={colorClass}
                        />

                        <div className="flex-1 space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Modul Tuntas:</span>
                            <span className="font-semibold text-slate-900">{course.completedModules} dari {course.totalModules} Bab</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Beban SKS:</span>
                            <span className="font-semibold text-slate-900">{course.credits} SKS</span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                            <span className="text-slate-500">Proyeksi Nilai:</span>
                            <span className="font-heading font-bold text-teal-800 text-sm">{projected.grade} ({projected.score})</span>
                          </div>
                        </div>
                      </div>

                      {/* Next Topic Preview */}
                      <div className="text-xs text-slate-600 mb-5">
                        <span className="font-semibold text-slate-700 block mb-0.5">Topik Berjalan:</span>
                        <p className="line-clamp-1 italic text-slate-600">
                          {course.nextTopic}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCourseForDetail(course)}
                        className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Cek Rincian Nilai</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectCourseToStudy(course.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        Buka Modul
                      </button>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        )}

        {/* Modal: Rincian Nilai & Komponen Penilaian Akademik */}
        {selectedCourseForDetail && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 animate-scaleUp max-h-[90vh] overflow-y-auto">
              
              {/* Header Modal */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
                    <span>{selectedCourseForDetail.code}</span>
                    <span>•</span>
                    <span>{selectedCourseForDetail.credits} SKS</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                    {selectedCourseForDetail.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Rincian Komponen Evaluasi Akademik Semester 1
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCourseForDetail(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Modal */}
              <div className="py-6 space-y-6">
                
                {/* Visual Projection Card */}
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                      Target & Proyeksi Indeks Prestasi
                    </span>
                    <div className="text-xl font-heading font-bold text-teal-950 mt-0.5">
                      Proyeksi Nilai: {getProjectedGrade(selectedCourseForDetail.progressPercent).grade}
                    </div>
                    <span className="text-xs text-teal-700">
                      Tingkat Ketuntasan Silabus: {selectedCourseForDetail.progressPercent}%
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-teal-700 text-white font-heading font-bold text-xl flex items-center justify-center shadow-xs">
                    {getProjectedGrade(selectedCourseForDetail.progressPercent).grade}
                  </div>
                </div>

                {/* Breakdown Komponen Penilaian Standar FEB */}
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 mb-3">
                    Bobot Komponen Penilaian (RPS FEB):
                  </h4>
                  
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900 block">Presensi & Keaktifan Kelas (10%)</span>
                        <span className="text-slate-500">Minimal 75% kehadiran untuk mengikuti ujian</span>
                      </div>
                      <span className="font-bold text-emerald-700">100% (Aman)</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900 block">Tugas Mandiri & Studi Kasus (20%)</span>
                        <span className="text-slate-500">Laporan studi kasus dan kertas kerja</span>
                      </div>
                      <span className="font-bold text-teal-700">Rata-rata 88/100</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900 block">Kuis Mingguan & Bank Soal (20%)</span>
                        <span className="text-slate-500">Evaluasi pemahaman konsep bab</span>
                      </div>
                      <span className="font-bold text-teal-700">Rata-rata 85/100</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900 block">Ujian Tengah Semester / UTS (25%)</span>
                        <span className="text-slate-500">Jadwal UTS: Minggu ke-8 Perkuliahan</span>
                      </div>
                      <span className="font-semibold text-amber-700">Target: ≥ 85</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900 block">Ujian Akhir Semester / UAS (25%)</span>
                        <span className="text-slate-500">Jadwal UAS: Minggu ke-16 Perkuliahan</span>
                      </div>
                      <span className="font-semibold text-slate-500">Belum Terlaksana</span>
                    </div>
                  </div>
                </div>

                {/* Tutor FEB Info */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Asisten Dosen Pendamping:</span>
                    <span className="font-semibold text-sm text-slate-900">{selectedCourseForDetail.instructor.name}</span>
                    <span className="text-xs text-slate-600 block">{selectedCourseForDetail.instructor.role}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseForDetail(null);
                      onSelectCourseMentoring();
                    }}
                    className="px-3 py-1.5 rounded-lg border border-teal-700 text-teal-800 hover:bg-teal-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Jadwal Mentoring
                  </button>
                </div>

              </div>

              {/* Footer Modal */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourseForDetail(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedCourseForDetail.id;
                    setSelectedCourseForDetail(null);
                    onSelectCourseToStudy(id);
                  }}
                  className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Pelajari Materi Ini
                </button>
              </div>

            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
