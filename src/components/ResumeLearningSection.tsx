import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  User,
  Volume2,
  Maximize2,
  RotateCcw,
  X
} from 'lucide-react';
import { Course, PlaylistItem } from '../types';

interface ResumeLearningSectionProps {
  onGoToVideoPlayer: (courseCode?: string) => void;
  onGoToQuiz: (subjectTitle: string) => void;
}

interface InProgressSubject {
  id: string;
  courseCode: string;
  courseTitle: string;
  department: string;
  moduleName: string;
  videoTitle: string;
  tutorName: string;
  tutorRole: string;
  currentTimestamp: string;
  totalDuration: string;
  percent: number;
  thumbnailUrl: string;
  keyConcepts: string[];
  notesSummary: string;
}

const inProgressList: InProgressSubject[] = [
  {
    id: 'act-resume',
    courseCode: 'EKA101',
    courseTitle: 'Pengantar Akuntansi I',
    department: 'Akuntansi',
    moduleName: 'Modul 3: Penyesuaian Akhir Periode',
    videoTitle: 'Jurnal Penyesuaian Akrual & Deferral (Krusial UTS)',
    tutorName: 'Kak Nabila Zahra, S.Ak.',
    tutorRole: 'Asisten Dosen Akuntansi FEB & Valedictorian',
    currentTimestamp: '14:20',
    totalDuration: '31:20',
    percent: 46,
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    keyConcepts: [
      'Beban Dibayar di Muka (Metode Harta vs Beban)',
      'Pendapatan Diterima di Muka (Deferral)',
      'Beban Gaji Akrual yang Masih Harus Dibayar'
    ],
    notesSummary: 'Inti bahasan menit ke-14: Jika saat transaksi awal pembayaran sewa dicatat sebagai HARTA (Sewa Dibayar di Muka), maka jurnal penyesuaian akhir tahun mendebit Beban Sewa sebesar nilai yang SUDAH kedaluwarsa/terpakai. Sebaliknya, bila dicatat sebagai BEBAN, sesuaikan nilai yang BELUM terpakai.'
  },
  {
    id: 'eco-resume',
    courseCode: 'EKI101',
    courseTitle: 'Pengantar Ekonomi Mikro',
    department: 'Ilmu Ekonomi',
    moduleName: 'Modul 2: Teori Perilaku Konsumen',
    videoTitle: 'Elastisitas Permintaan & Analisis Kurva Indiferensi',
    tutorName: 'Kak Fadhil Pratama, S.E.',
    tutorRole: 'Juara National Economics Olympiad & Tutor Senior IE',
    currentTimestamp: '18:50',
    totalDuration: '28:15',
    percent: 67,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    keyConcepts: [
      'Titik Keseimbangan Konsumen (MRS = Px/Py)',
      'Efek Substitusi & Efek Pendapatan (Hicks vs Slutsky)',
      'Elastisitas Silang dan Barang Komplementer'
    ],
    notesSummary: 'Inti bahasan menit ke-18: Penurunan kurva permintaan individu berasal dari pergeseran titik tangensi garis anggaran terhadap peta indiferensi akibat perubahan harga relatif.'
  },
  {
    id: 'mat-resume',
    courseCode: 'EKQ101',
    courseTitle: 'Matematika Ekonomi & Bisnis',
    department: 'Kuantitatif & Umum',
    moduleName: 'Modul 2: Kalkulus Terapan Bisnis',
    videoTitle: 'Aplikasi Turunan: Optimasi Laba Maksimum Tanpa Kendala',
    tutorName: 'Kak Kevin Jonathan, S.Si.',
    tutorRole: 'Instruktur Lab Komputasi FEB',
    currentTimestamp: '08:30',
    totalDuration: '25:00',
    percent: 34,
    thumbnailUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1200&q=80',
    keyConcepts: [
      'Syarat Keharusan (First Order Condition: dTR/dQ = dTC/dQ)',
      'Syarat Kecukupan (Second Order Condition d²π/dQ² < 0)',
      'Break-Even Point vs Profit Maximizing Output'
    ],
    notesSummary: 'Inti bahasan menit ke-8: Laba maksimum tercapai persis ketika Marginal Revenue (MR) sama dengan Marginal Cost (MC), asalkan turunan kedua bernilai negatif.'
  }
];

export const ResumeLearningSection: React.FC<ResumeLearningSectionProps> = ({
  onGoToVideoPlayer,
  onGoToQuiz
}) => {
  const [selectedResumeIndex, setSelectedResumeIndex] = useState(0);
  const [isPlayingQuick, setIsPlayingQuick] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  const activeItem = inProgressList[selectedResumeIndex];

  return (
    <section id="section-resume" className="py-16 md:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
              <Play className="w-4 h-4 text-teal-700 fill-teal-700" />
              <span>Section 3: Lanjutkan Aktivitas Belajar</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Modul Lanjutkan Belajar
            </h2>
            <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
              Sambung kembali materi kuliah terakhirmu secara instan tanpa perlu mencari dari awal.
              Checkpoint waktu otomatis tersimpan di server platform.
            </p>
          </div>

          {/* Quick Subject Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {inProgressList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedResumeIndex(idx);
                  setIsPlayingQuick(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                  selectedResumeIndex === idx
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.courseCode} ({item.percent}%)
              </button>
            ))}
          </div>
        </div>

        {/* Highlighted Resume Learning Card */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 text-white overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left/Top: Visual Video Thumbnail with Large Standout Play Button */}
            <div className="lg:col-span-6 relative bg-slate-950 flex items-center justify-center min-h-[300px] lg:min-h-[420px] overflow-hidden group">
              <img 
                src={activeItem.thumbnailUrl} 
                alt={activeItem.videoTitle} 
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Checkpoint Duration Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 bg-black/75 backdrop-blur-xs text-white text-xs font-mono font-semibold rounded-md border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Checkpoint: {activeItem.currentTimestamp} / {activeItem.totalDuration}</span>
                </span>
                <span className="px-2.5 py-1 bg-teal-600/90 text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                  {activeItem.percent}% Selesai
                </span>
              </div>

              {/* Large Standout Play Button with Pulse Effect */}
              <div className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  id="resume-main-play-button"
                  onClick={() => setIsPlayingQuick(!isPlayingQuick)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 cursor-pointer ring-8 ring-teal-500/20"
                  aria-label={isPlayingQuick ? 'Jeda video' : 'Lanjutkan putar video'}
                >
                  {isPlayingQuick ? (
                    <Pause className="w-10 h-10 fill-slate-950" />
                  ) : (
                    <Play className="w-10 h-10 fill-slate-950 translate-x-0.5" />
                  )}
                </button>
                <span className="text-xs font-semibold text-slate-200 mt-3 tracking-wide">
                  {isPlayingQuick ? 'Sedang Memutar Simulasi' : 'Klik untuk Putar Sekarang'}
                </span>
              </div>

              {/* Video Timeline Preview Overlay at Bottom of Video Area */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 to-transparent z-10">
                <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden mb-2">
                  <div 
                    className="bg-teal-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${activeItem.percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                  <span>{activeItem.currentTimestamp}</span>
                  <span className="text-teal-300 font-sans font-medium">Lanjutan Bab 5 Penyesuaian</span>
                  <span>{activeItem.totalDuration}</span>
                </div>
              </div>
            </div>

            {/* Right/Bottom: Information & Direct Action Buttons */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-slate-900">
              
              <div>
                {/* Course Metadata Pill */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-sm bg-teal-900/80 text-teal-300 text-xs font-mono font-bold border border-teal-700/50">
                    {activeItem.courseCode}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeItem.courseTitle}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-amber-400 font-semibold">
                    {activeItem.department}
                  </span>
                </div>

                {/* Video / Module Title */}
                <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1 font-heading">
                  {activeItem.moduleName}
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {activeItem.videoTitle}
                </h3>

                {/* Tutor / Asdos Senior Profile */}
                <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/70">
                  <div className="w-10 h-10 rounded-full bg-teal-800 text-teal-200 font-heading font-bold text-sm flex items-center justify-center border border-teal-600 shrink-0">
                    NZ
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-white">
                      {activeItem.tutorName}
                    </div>
                    <div className="text-xs text-slate-400">
                      {activeItem.tutorRole}
                    </div>
                  </div>
                </div>

                {/* Key Concepts Preview */}
                <div className="mt-6 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Poin Konsep yang Sedang Dipelajari:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeItem.keyConcepts.map((concept, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons Cluster */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  id="resume-jump-player-button"
                  onClick={() => onGoToVideoPlayer(activeItem.courseCode)}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Buka di Ruang Video Lengkap</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowNotesModal(true)}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Rangkuman Materi</span>
                </button>

                <button
                  type="button"
                  onClick={() => onGoToQuiz(activeItem.courseTitle)}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                  <span>Uji di Kuis</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Rangkuman Materi Modal */}
      {showNotesModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowNotesModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-sm">
                  {activeItem.courseCode}
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-900 mt-1">
                  Catatan Ringkas: {activeItem.videoTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Disusun oleh {activeItem.tutorName} untuk mahasiswa baru FEB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNotesModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                aria-label="Tutup catatan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed font-body">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950 font-medium">
                💡 <strong>Prinsip Inti Ujian:</strong> {activeItem.notesSummary}
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-2">
                  Checklist Konsep yang Harus Dikuasai Sebelum Responsi:
                </h4>
                <ul className="space-y-2 text-xs">
                  {activeItem.keyConcepts.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNotesModal(false);
                  onGoToVideoPlayer(activeItem.courseCode);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
              >
                Putar di Player Video →
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
