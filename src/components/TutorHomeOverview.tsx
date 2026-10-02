import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Video, 
  UserCheck, 
  ExternalLink, 
  ChevronRight, 
  AlertCircle, 
  BookOpen, 
  Users, 
  Check, 
  Copy, 
  X,
  TrendingUp,
  FileText,
  FolderOpen
} from 'lucide-react';
import { Course, MentoringSession, UserProfile, QuizQuestion } from '../types';
import { GOOGLE_DRIVE_FOLDER_URL } from '../data/mockData';

interface MentoringRequest {
  id: string;
  studentName: string;
  nim: string;
  major: string;
  avatarInitials: string;
  topic: string;
  courseTitle: string;
  sessionType: 'Privat (1-on-1)' | 'Grup Kecil (3-5 Mhs)';
  proposedTime: string;
  submittedAgo: string;
  studentNote: string;
  status: 'pending' | 'accepted' | 'declined';
  quizAverage: number;
  weakConcept: string;
}

interface ScheduledSessionToday {
  id: string;
  timeSlot: string;
  countdownMinutes: number;
  studentName: string;
  nim: string;
  major: string;
  sessionTopic: string;
  courseTitle: string;
  sessionType: 'Privat' | 'Grup';
  meetingPlatform: string;
  meetLink: string;
  // Student diagnostic (No IPK included!)
  quizHistory: { name: string; score: number; date: string }[];
  weakPoints: string[];
  mentorNotes: string;
}

interface TutorHomeOverviewProps {
  user: UserProfile;
  courses: Course[];
  mentoringSessions: MentoringSession[];
  onNavigate: (tabId: string) => void;
  questions?: QuizQuestion[];
  onAddNewQuestion?: (newQ: QuizQuestion) => void;
  isAvailable?: boolean;
  onToggleAvailability?: () => void;
}

export const TutorHomeOverview: React.FC<TutorHomeOverviewProps> = ({
  user,
  courses,
  mentoringSessions,
  onNavigate,
  isAvailable = true,
  onToggleAvailability,
}) => {
  // Local availability fallback if not passed from parent
  const [internalAvailable, setInternalAvailable] = useState(isAvailable);
  const mentorAvailable = onToggleAvailability ? isAvailable : internalAvailable;
  const toggleMentorStatus = onToggleAvailability || (() => setInternalAvailable(prev => !prev));

  // State: Permintaan Mentoring (Menunggu Konfirmasi)
  const [requests, setRequests] = useState<MentoringRequest[]>([
    {
      id: 'req-1',
      studentName: 'Aditya Pratama',
      nim: '26/512401/EK/04115',
      major: 'S1 Manajemen',
      avatarInitials: 'AP',
      topic: 'Jurnal Penyesuaian & Neraca Lajur 10 Kolom',
      courseTitle: 'Pengantar Akuntansi I (EKA101)',
      sessionType: 'Privat (1-on-1)',
      proposedTime: 'Hari ini, 15:30 - 16:30 WIB',
      submittedAgo: '10 menit lalu',
      studentNote: 'Masih bingung perbedaan penyesuaian beban dibayar di muka pendekatan neraca vs laba rugi.',
      status: 'pending',
      quizAverage: 58,
      weakConcept: 'Jurnal Penyesuaian Deferral & Akrual',
    },
    {
      id: 'req-2',
      studentName: 'Siti Nurhaliza',
      nim: '26/512445/EK/04128',
      major: 'S1 Akuntansi',
      avatarInitials: 'SN',
      topic: 'Perhitungan Elastisitas Titik vs Busur & Surplus Konsumen',
      courseTitle: 'Pengantar Ekonomi Mikro (EKI101)',
      sessionType: 'Grup Kecil (3-5 Mhs)',
      proposedTime: 'Besok, 10:00 - 11:30 WIB',
      submittedAgo: '35 menit lalu',
      studentNote: 'Kami berempat dari kelas Manajemen A ingin bedah soal latihan UTS tentang turunan kurva permintaan.',
      status: 'pending',
      quizAverage: 65,
      weakConcept: 'Elastisitas Permintaan Turunan Parsial',
    },
    {
      id: 'req-3',
      studentName: 'Budi Santoso',
      nim: '26/512480/EK/04140',
      major: 'S1 Ilmu Ekonomi',
      avatarInitials: 'BS',
      topic: 'Penurunan Kurva IS-LM 3 Sektor dengan Pajak Proporsional',
      courseTitle: 'Pengantar Ekonomi Makro (EKI102)',
      sessionType: 'Privat (1-on-1)',
      proposedTime: 'Besok, 14:00 - 15:00 WIB',
      submittedAgo: '1 jam lalu',
      studentNote: 'Perlu bimbingan perhitungan angka pengganda pengeluaran jika ada pajak t=0.2.',
      status: 'pending',
      quizAverage: 52,
      weakConcept: 'Keseimbangan Pasar Barang & Multiplier',
    },
  ]);

  // State: Sesi Terjadwal Hari Ini
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSessionToday[]>([
    {
      id: 'ses-today-1',
      timeSlot: '14:00 - 15:30 WIB',
      countdownMinutes: 45,
      studentName: 'Wahyu Assri',
      nim: '26/512390/EK/04112',
      major: 'S1 Manajemen',
      sessionTopic: 'Optimasi Marjinal MR=MC & Turunan Parsial Cobb-Douglas',
      courseTitle: 'Matematika Ekonomi & Bisnis (EKQ101)',
      sessionType: 'Privat',
      meetingPlatform: 'Google Meet FEB',
      meetLink: 'https://meet.google.com/aksel-feb-klinik',
      quizHistory: [
        { name: 'Kuis 1: Fungsi Linear & Keseimbangan Pasar', score: 88, date: '12 Sep 2026' },
        { name: 'Kuis 2: Diferensiasi Aljabar & Nilai Kritis', score: 70, date: '19 Sep 2026' },
        { name: 'Kuis 3: Optimasi Laba Marjinal (MR=MC)', score: 56, date: '24 Sep 2026' },
      ],
      weakPoints: [
        'Perlu penguatan konsep turunan parsial berantai fungsi Cobb-Douglas.',
        'Masih kesulitan menguji turunan kedua untuk menentukan titik laba maksimum.',
      ],
      mentorNotes: 'Mahasiswa aktif berdiskusi. Fokuskan 40 menit awal pada bedah soal fungsi pangkat 3, dilanjutkan latihan soal mandiri.',
    },
    {
      id: 'ses-today-2',
      timeSlot: '16:30 - 17:30 WIB',
      countdownMinutes: 195,
      studentName: 'Rian Ardiansyah & Tim Studi',
      nim: '26/512395/EK/04118',
      major: 'S1 Akuntansi',
      sessionTopic: 'Klinik Jurnal Penyesuaian Akrual & Beban Dibayar di Muka',
      courseTitle: 'Pengantar Akuntansi I (EKA101)',
      sessionType: 'Grup',
      meetingPlatform: 'Lab Komputasi FEB B.302',
      meetLink: 'https://meet.google.com/aksel-feb-lab',
      quizHistory: [
        { name: 'Kuis 1: Persamaan Dasar Akuntansi', score: 92, date: '10 Sep 2026' },
        { name: 'Kuis 2: Analisis Transaksi & Jurnal Umum', score: 85, date: '17 Sep 2026' },
        { name: 'Kuis 3: Penyesuaian & Neraca Lajur', score: 62, date: '25 Sep 2026' },
      ],
      weakPoints: [
        'Sering tertukar antara pendapatan diterima di muka (kewajiban) vs piutang pendapatan.',
        'Butuh panduan pembuatan neraca saldo setelah penyesuaian kolom 10.',
      ],
      mentorNotes: 'Sesi di Lab Komputasi. Siapkan lembar kerja spreadsheet neraca lajur di proyektor.',
    },
  ]);

  // Modal State: Lihat Progres Mahasiswa
  const [selectedStudent, setSelectedStudent] = useState<ScheduledSessionToday | null>(null);

  // Modal State: Mulai Sesi (Virtual Room)
  const [activeSessionRoom, setActiveSessionRoom] = useState<ScheduledSessionToday | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Toast / Confirmation notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle Accept Mentoring Request
  const handleAcceptRequest = (req: MentoringRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'accepted' } : r));
    
    // Add to scheduled sessions list
    const newSession: ScheduledSessionToday = {
      id: `ses-${Date.now()}`,
      timeSlot: req.proposedTime,
      countdownMinutes: 120,
      studentName: req.studentName,
      nim: req.nim,
      major: req.major,
      sessionTopic: req.topic,
      courseTitle: req.courseTitle,
      sessionType: req.sessionType.includes('Privat') ? 'Privat' : 'Grup',
      meetingPlatform: 'Google Meet FEB',
      meetLink: 'https://meet.google.com/aksel-feb-klinik',
      quizHistory: [
        { name: 'Rata-rata Skor Kuis Matkul Terkait', score: req.quizAverage, date: 'Terbaru' },
      ],
      weakPoints: [
        `Kendala utama mahasiswa: ${req.weakConcept}.`,
        `Catatan: "${req.studentNote}"`,
      ],
      mentorNotes: 'Sesi baru saja disetujui oleh pengajar. Waktu slot telah dikonfirmasi.',
    };

    setScheduledSessions(prev => [newSession, ...prev]);
    showToast(`Permintaan bimbingan dari ${req.studentName} berhasil diterima.`);
  };

  // Handle Decline / Reschedule Mentoring Request
  const handleDeclineRequest = (reqId: string, studentName: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'declined' } : r));
    showToast(`Permintaan dari ${studentName} diarahkan untuk jadwal ulang.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyMeetUrl = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-950 text-slate-100">
      
      {/* TOAST NOTIFICATION (Minimalist) */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. MINIMALIST CLEAN HEADER BAR */}
      <div className="shrink-0 bg-slate-950 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-semibold text-base text-white">
                  Beranda Pengajar
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  FEB UNJ
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pengajar: <span className="text-slate-300 font-medium">{user.name}</span>
              </p>
            </div>
          </div>

          {/* Toggle Switch Status Ketersediaan & Action Links */}
          <div className="flex items-center gap-3">
            
            {/* Interactive Availability Toggle */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">
                Ketersediaan:
              </span>
              <button
                type="button"
                onClick={toggleMentorStatus}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  mentorAvailable ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={mentorAvailable}
                title={mentorAvailable ? "Status: Tersedia untuk Sesi" : "Status: Sedang Sibuk"}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                    mentorAvailable ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-medium ${
                mentorAvailable ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {mentorAvailable ? 'Tersedia' : 'Sedang Sibuk'}
              </span>
            </div>

            {/* Quick clean navigation links */}
            <button
              type="button"
              onClick={() => onNavigate('sesi-mentoring')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Jadwal Mentoring</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('modul-perkuliahan')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer hidden md:flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Kurikulum</span>
            </button>

            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-700/60 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors cursor-pointer hidden lg:flex items-center gap-1.5"
              title="Buka repositori Google Drive Materi Kuliah FEB (1VYC-dn...)"
            >
              <FolderOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>Drive Materi (PPT & Video)</span>
              <ExternalLink className="w-3 h-3 text-teal-400/70" />
            </a>

          </div>

        </div>

        {/* Minimalist Notice if Busy */}
        {!mentorAvailable && (
          <div className="max-w-6xl mx-auto mt-3 p-2.5 px-3.5 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mode Sedang Sibuk aktif. Pemesanan slot baru oleh mahasiswa ditutup sementara.</span>
            </div>
            <button
              type="button"
              onClick={toggleMentorStatus}
              className="text-xs font-semibold text-amber-400 hover:text-amber-200 underline cursor-pointer"
            >
              Ubah ke Tersedia
            </button>
          </div>
        )}
      </div>

      {/* 2. SCROLLABLE WORKSPACE (CLEAN & MINIMALIST) */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-7 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="max-w-6xl mx-auto space-y-7">

          {/* QUICK STATS (3 Minimalist Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Stat 1: Total Sesi Selesai */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div className="text-xs font-medium text-slate-400">
                Total Sesi Selesai
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-heading font-bold text-2xl text-white">24</span>
                <span className="text-xs text-slate-400">Sesi</span>
                <span className="text-[11px] text-emerald-400 font-mono ml-auto">+6 bulan ini</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Akumulasi sesi bimbingan selesai
              </div>
            </div>

            {/* Stat 2: Jam Mentoring */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div className="text-xs font-medium text-slate-400">
                Jam Mentoring
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-heading font-bold text-2xl text-white">36</span>
                <span className="text-xs text-slate-400">Jam</span>
                <span className="text-[11px] text-indigo-400 font-mono ml-auto">Bulan berjalan</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Waktu bimbingan terverifikasi
              </div>
            </div>

            {/* Stat 3: Rating Rata-rata */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div className="text-xs font-medium text-slate-400">
                Rating Rata-rata
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-bold text-2xl text-amber-400">4.8</span>
                  <span className="text-xs text-slate-500">/ 5.0</span>
                </div>
                <div className="flex items-center text-amber-400 gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400/50" />
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Berdasarkan 42 ulasan mahasiswa
              </div>
            </div>

          </div>

          {/* PERMINTAAN MENTORING (MENUNGGU KONFIRMASI) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-semibold text-sm text-white">
                  Permintaan Mentoring
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-amber-400 border border-slate-800">
                  {requests.filter(r => r.status === 'pending').length} Menunggu Konfirmasi
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div 
                  key={req.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    req.status === 'pending'
                      ? 'bg-slate-900/70 border-slate-800'
                      : req.status === 'accepted'
                      ? 'bg-slate-900/30 border-emerald-900/40'
                      : 'bg-slate-900/20 border-slate-800/40 opacity-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Student Info & Topic */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-semibold text-white">
                          {req.studentName}
                        </span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          ({req.nim})
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{req.major}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400 font-mono text-[11px]">{req.sessionType}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 text-[11px]">{req.submittedAgo}</span>
                      </div>

                      <div className="text-xs text-slate-300">
                        <span className="text-slate-400">Topik: </span>
                        <span className="text-white font-medium">{req.topic}</span>
                        <span className="text-slate-500 text-[11px] ml-1.5">({req.courseTitle})</span>
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-2 pt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Waktu diajukan: <strong className="text-slate-200">{req.proposedTime}</strong></span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                      {req.status === 'pending' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleDeclineRequest(req.id, req.studentName)}
                            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                          >
                            Tolak / Jadwal Ulang
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAcceptRequest(req)}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Terima</span>
                          </button>
                        </>
                      ) : req.status === 'accepted' ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Disetujui</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-xl">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Ditolak</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SESI TERJADWAL HARI INI */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-sm text-white">
                Sesi Terjadwal Hari Ini
              </h2>
              <span className="text-xs text-slate-400">
                {scheduledSessions.length} Sesi Terkonfirmasi
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduledSessions.map((ses) => (
                <div 
                  key={ses.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    
                    {/* Time Slot & Countdown */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {ses.timeSlot}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-amber-400 border border-slate-700">
                        Mulai dalam {ses.countdownMinutes} menit
                      </span>
                    </div>

                    {/* Student Name & Info */}
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-white">
                        {ses.studentName}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {ses.nim} · {ses.major} · {ses.sessionType}
                      </p>
                    </div>

                    {/* Topic */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-0.5">
                      <div className="text-slate-400 font-medium">{ses.sessionTopic}</div>
                      <div className="text-[11px] text-slate-500">{ses.courseTitle}</div>
                    </div>

                    <div className="text-xs text-slate-400">
                      Platform: <span className="text-slate-300">{ses.meetingPlatform}</span>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                    
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(ses)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Lihat Progres Mahasiswa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveSessionRoom(ses)}
                      className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Mulai Sesi</span>
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL 1: LIHAT PROGRES MAHASISWA (Clean & Free of IPK) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-heading font-semibold text-base text-white">
                  Profil & Riwayat Belajar Mahasiswa
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Informasi diagnostik materi sebelum memulai sesi asistensi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* Student Info */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{selectedStudent.studentName}</div>
                <div className="text-slate-400 font-mono mt-0.5">NIM: {selectedStudent.nim} · {selectedStudent.major}</div>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                {selectedStudent.sessionType}
              </span>
            </div>

            {/* Quiz History */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Riwayat Skor Kuis Terakhir:</span>
              </div>
              <div className="space-y-1.5">
                {selectedStudent.quizHistory.map((q, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium text-slate-200">{q.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{q.date}</div>
                    </div>
                    <div className="font-mono font-bold text-sm">
                      <span className={q.score >= 75 ? 'text-emerald-400' : q.score >= 60 ? 'text-amber-400' : 'text-rose-400'}>
                        {q.score}
                      </span>
                      <span className="text-slate-500 text-xs">/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Concepts */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Konsep yang Perlu Penguatan:</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                {selectedStudent.weakPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-rose-400">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidance Note */}
            <div className="space-y-1 text-xs">
              <div className="text-slate-400 font-medium">Catatan Persiapan Pengajar:</div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                {selectedStudent.mentorNotes}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = selectedStudent;
                  setSelectedStudent(null);
                  setActiveSessionRoom(target);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Lanjut Mulai Sesi</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: MULAI SESI (Minimalist Video Room) */}
      {activeSessionRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <h3 className="font-heading font-semibold text-base text-white">
                  Ruang Pertemuan Mentoring
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSessionRoom(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="text-slate-400">Mahasiswa: <strong className="text-white">{activeSessionRoom.studentName}</strong></div>
              <div className="text-slate-400">Topik: <span className="text-slate-200">{activeSessionRoom.sessionTopic}</span></div>
              <div className="text-slate-400">Waktu: <span className="font-mono text-slate-200">{activeSessionRoom.timeSlot}</span></div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-medium block">
                Tautan Google Meet:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activeSessionRoom.meetLink}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyMeetUrl(activeSessionRoom.meetLink)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveSessionRoom(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Batal
              </button>

              <a
                href={activeSessionRoom.meetLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Google Meet</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
