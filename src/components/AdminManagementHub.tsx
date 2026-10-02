import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  FileQuestion, 
  Users, 
  Calendar, 
  TrendingUp, 
  Search, 
  Filter, 
  X, 
  Save, 
  Sparkles,
  BarChart3,
  Check,
  ChevronRight
} from 'lucide-react';
import { QuizQuestion, Course, MentoringSession, CoreSubjectMaterial } from '../types';

interface AdminManagementHubProps {
  questions: QuizQuestion[];
  onAddQuestion: (newQ: QuizQuestion) => void;
  onDeleteQuestion: (id: number) => void;
  courses: Course[];
  mentoringSessions: MentoringSession[];
  onSwitchToStudentView: () => void;
}

export const AdminManagementHub: React.FC<AdminManagementHubProps> = ({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  courses,
  mentoringSessions,
  onSwitchToStudentView,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'bank-soal' | 'modul' | 'mentoring' | 'analitik'>('bank-soal');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Form State for Adding New Question
  const [newSubject, setNewSubject] = useState<'Matematika Ekonomi & Bisnis' | 'Pengantar Ekonomi Makro' | 'Pengantar Ekonomi Mikro' | 'Bahasa Inggris'>('Matematika Ekonomi & Bisnis');
  const [newTopic, setNewTopic] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Mudah' | 'Sedang' | 'Tantangan UTS'>('Sedang');
  const [newContext, setNewContext] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [optionE, setOptionE] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [corePrinciple, setCorePrinciple] = useState('');
  const [walkthrough, setWalkthrough] = useState('');
  const [tutorTips, setTutorTips] = useState('');
  const [relatedFormula, setRelatedFormula] = useState('');

  const filteredQuestions = questions.filter(q => {
    if (selectedSubjectFilter !== 'Semua' && q.subject !== selectedSubjectFilter) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        q.topic.toLowerCase().includes(query) ||
        q.prompt.toLowerCase().includes(query) ||
        q.subject.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newPrompt.trim() || !optionA.trim() || !optionB.trim()) {
      alert('Mohon isi topik, pertanyaan, dan minimal opsi A dan B.');
      return;
    }

    const created: QuizQuestion = {
      id: Date.now(),
      subject: newSubject,
      topic: newTopic,
      difficulty: newDifficulty,
      questionNumber: questions.length + 1,
      totalQuestions: questions.length + 1,
      contextText: newContext.trim() ? newContext : undefined,
      prompt: newPrompt,
      options: [
        { id: 'A', text: optionA },
        { id: 'B', text: optionB },
        { id: 'C', text: optionC || 'Opsi C default' },
        { id: 'D', text: optionD || 'Opsi D default' },
        { id: 'E', text: optionE || 'Opsi E default' },
      ],
      correctAnswer,
      explanation: {
        corePrinciple: corePrinciple || 'Konsep dasar perkuliahan FEB.',
        detailedWalkthrough: walkthrough || 'Langkah penyelesaian standar ujian asisten dosen.',
        tutorTips: tutorTips || 'Tips: Pelajari kembali silabus materi.',
        relatedFormula: relatedFormula || undefined,
      },
    };

    onAddQuestion(created);
    setIsAddModalOpen(false);
    setSuccessToast(`Soal baru untuk "${newSubject}" berhasil ditambahkan ke Bank Soal!`);
    setTimeout(() => setSuccessToast(''), 4000);

    // Reset Form
    setNewTopic('');
    setNewContext('');
    setNewPrompt('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setOptionE('');
    setCorePrinciple('');
    setWalkthrough('');
    setTutorTips('');
    setRelatedFormula('');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      
      {/* Top Banner */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
                  Panel Pengelolaan Admin & Koordinator Asdos FEB
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Akses Koordinator
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kelola bank soal 4 matkul inti, perbarui rumus & materi, jadwalkan mentoring, dan pantau hasil maba.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSwitchToStudentView}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Lihat Tampilan Mahasiswa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Soal Baru</span>
            </button>
          </div>
        </div>

        {/* Admin Section Tabs */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 border-b border-slate-100">
          <button
            type="button"
            onClick={() => setActiveAdminTab('bank-soal')}
            className={`px-4 py-2.5 text-xs font-heading font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'bank-soal'
                ? 'border-indigo-900 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Kelola Bank Soal ({questions.length} Soal)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('modul')}
            className={`px-4 py-2.5 text-xs font-heading font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'modul'
                ? 'border-indigo-900 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi & Modul 4 Matkul</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('mentoring')}
            className={`px-4 py-2.5 text-xs font-heading font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'mentoring'
                ? 'border-indigo-900 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Jadwal Sesi Mentoring ({mentoringSessions.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('analitik')}
            className={`px-4 py-2.5 text-xs font-heading font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'analitik'
                ? 'border-indigo-900 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Statistik Maba Angkatan 2026</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Toast Notification */}
          {successToast && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successToast}</span>
              </div>
              <button type="button" onClick={() => setSuccessToast('')} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Total Soal Aktif</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-heading text-slate-900">{questions.length}</span>
                <span className="text-xs text-indigo-700 font-semibold font-mono">4 Matkul FEB</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Mahasiswa Aktif Maba</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-heading text-slate-900">1.240</span>
                <span className="text-xs text-emerald-700 font-semibold">98.2% Akses</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Rata-rata Skor Kuis</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-heading text-slate-900">78.4</span>
                <span className="text-xs text-teal-700 font-semibold font-mono">Skala 100</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Klinik Asdos Terjadwal</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-heading text-slate-900">{mentoringSessions.length}</span>
                <span className="text-xs text-amber-700 font-semibold">Minggu Ini</span>
              </div>
            </div>
          </div>

          {/* TAB 1: KELOLA BANK SOAL */}
          {activeAdminTab === 'bank-soal' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              
              {/* Filter and Search Bar */}
              <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600 font-heading">Filter Matkul:</span>
                  {[
                    'Semua',
                    'Matematika Ekonomi & Bisnis',
                    'Pengantar Ekonomi Makro',
                    'Pengantar Ekonomi Mikro',
                    'Bahasa Inggris'
                  ].map(subject => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => setSelectedSubjectFilter(subject)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedSubjectFilter === subject
                          ? 'bg-indigo-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {subject === 'Semua' ? 'Semua (16)' : subject.replace('Pengantar ', '')}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari topik atau soal..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-700 bg-white"
                  />
                </div>
              </div>

              {/* Question Table / List */}
              <div className="divide-y divide-slate-100">
                {filteredQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-900 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900 font-heading">
                          {q.subject}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-600 font-medium">
                          {q.topic}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          q.difficulty === 'Tantangan UTS'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : q.difficulty === 'Sedang'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>

                      {q.contextText && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic bg-slate-100/60 p-1.5 rounded-lg">
                          "{q.contextText}"
                        </p>
                      )}

                      <p className="text-xs text-slate-800 font-medium">
                        {q.prompt}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span className="font-semibold text-emerald-700">
                          Kunci Jawaban: {q.correctAnswer}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{q.options.length} Pilihan Jawaban</span>
                        {q.explanation.relatedFormula && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                              {q.explanation.relatedFormula}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onDeleteQuestion(q.id)}
                        className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Soal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredQuestions.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500">
                    Tidak ada soal yang cocok dengan filter atau pencarian Anda.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: KELOLA MODUL */}
          {activeAdminTab === 'modul' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Matematika Ekonomi & Bisnis', code: 'EKQ101', count: '14 Modul', status: 'Terverifikasi Asdos Lab' },
                { title: 'Pengantar Ekonomi Makro', code: 'EKI102', count: '14 Modul', status: 'Silabus Sesuai RPS 2026' },
                { title: 'Pengantar Ekonomi Mikro', code: 'EKI101', count: '12 Modul', status: 'Lengkap Soal Latihan' },
                { title: 'Bahasa Inggris', code: 'EKU101', count: '10 Modul', status: 'Terintegrasi International Journal' },
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-indigo-900">{m.code}</span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {m.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900">{m.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>{m.count} Perkuliahan</span>
                    <span className="text-indigo-700 font-semibold cursor-pointer hover:underline">
                      Edit Rangkuman & Rumus
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MENTORING */}
          {activeAdminTab === 'mentoring' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100">
              <div className="p-4 bg-slate-50 flex items-center justify-between">
                <span className="font-heading font-bold text-xs text-slate-900">
                  Daftar Sesi Klinik & Office Hours Terjadwal
                </span>
                <span className="text-xs text-indigo-700 font-medium cursor-pointer">
                  + Buat Jadwal Baru
                </span>
              </div>
              {mentoringSessions.map(s => (
                <div key={s.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900 font-heading">{s.courseTitle}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-indigo-800 font-medium">{s.day}, {s.dateStr}</span>
                    </div>
                    <div className="text-xs text-slate-600">{s.sessionTopic}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Tutor: {s.tutorName} · Platform: {s.meetingPlatform}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-700 block">
                      {s.totalSlots - s.availableSlots}/{s.totalSlots} Terisi
                    </span>
                    <span className="text-[10px] text-slate-400">Sisa {s.availableSlots} slot</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ANALITIK */}
          {activeAdminTab === 'analitik' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Tingkat Kelulusan Kuis per Mata Kuliah (Maba 2026)
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>1. Matematika Ekonomi & Bisnis</span>
                      <span className="font-bold text-indigo-900">76% Lulus</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-700 rounded-full" style={{ width: '76%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>2. Pengantar Ekonomi Makro</span>
                      <span className="font-bold text-sky-900">82% Lulus</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-sky-700 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>3. Pengantar Ekonomi Mikro</span>
                      <span className="font-bold text-emerald-900">85% Lulus</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-700 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>4. Bahasa Inggris (Business)</span>
                      <span className="font-bold text-amber-900">91% Lulus</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-700 rounded-full" style={{ width: '91%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Topik yang Memerlukan Bimbingan Ekstra
                </h3>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="font-bold mb-1">1. Turunan Parsial & Optimasi Laba MR=MC</div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Banyak maba keliru pada suku bertanda minus pada π = TR - TC. Disarankan memperbanyak klinik bedah soal online.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
                  <div className="font-bold mb-1">2. Kurva IS-LM & Kebijakan Campuran</div>
                  <p className="text-[11px] leading-relaxed text-sky-800">
                    Membutuhkan latihan simultan aljabar substitusi suku bunga r dan output Y.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: TAMBAH SOAL BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full my-8 p-6 md:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  Tambah Soal Baru ke Bank Soal FEB
                </h2>
                <p className="text-xs text-slate-500">
                  Pastikan menyertakan kunci jawaban dan pembahasan komprehensif.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestionSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Mata Kuliah</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Matematika Ekonomi & Bisnis">Matematika Ekonomi & Bisnis</option>
                    <option value="Pengantar Ekonomi Makro">Pengantar Ekonomi Makro</option>
                    <option value="Pengantar Ekonomi Mikro">Pengantar Ekonomi Mikro</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Tingkat Kesulitan</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tantangan UTS">Tantangan UTS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Topik Spesifik</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Misal: Elastisitas Silang, Nilai Sekarang (PV), Multiplier Pajak..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Konteks / Narasi Soal (Opsional)</label>
                <textarea
                  rows={2}
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  placeholder="Data perekonomian, studi kasus perusahaan, atau teks bacaan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Pertanyaan / Soal Inti</label>
                <textarea
                  rows={2}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Tuliskan pertanyaan ujian dengan jelas..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700 block">Pilihan Jawaban (A s/d E):</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-4">A:</span>
                    <input
                      type="text"
                      value={optionA}
                      onChange={(e) => setOptionA(e.target.value)}
                      placeholder="Teks opsi A..."
                      className="flex-1 p-2 rounded-lg border border-slate-200"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-4">B:</span>
                    <input
                      type="text"
                      value={optionB}
                      onChange={(e) => setOptionB(e.target.value)}
                      placeholder="Teks opsi B..."
                      className="flex-1 p-2 rounded-lg border border-slate-200"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-4">C:</span>
                    <input
                      type="text"
                      value={optionC}
                      onChange={(e) => setOptionC(e.target.value)}
                      placeholder="Teks opsi C..."
                      className="flex-1 p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 w-4">D:</span>
                    <input
                      type="text"
                      value={optionD}
                      onChange={(e) => setOptionD(e.target.value)}
                      placeholder="Teks opsi D..."
                      className="flex-1 p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <span className="font-bold text-slate-600 w-4">E:</span>
                    <input
                      type="text"
                      value={optionE}
                      onChange={(e) => setOptionE(e.target.value)}
                      placeholder="Teks opsi E..."
                      className="flex-1 p-2 rounded-lg border border-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Kunci Jawaban yang Benar</label>
                <div className="flex gap-2">
                  {(['A', 'B', 'C', 'D', 'E'] as const).map(letter => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setCorrectAnswer(letter)}
                      className={`w-10 h-10 rounded-xl font-bold font-heading text-xs transition-colors cursor-pointer ${
                        correctAnswer === letter
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Pembahasan Langkah demi Langkah</label>
                <textarea
                  rows={3}
                  value={walkthrough}
                  onChange={(e) => setWalkthrough(e.target.value)}
                  placeholder="Langkah 1, langkah 2, rumus yang digunakan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Rumus Terkait</label>
                  <input
                    type="text"
                    value={relatedFormula}
                    onChange={(e) => setRelatedFormula(e.target.value)}
                    placeholder="Contoh: MR = MC ; Ed = |ΔQ/Q| / |ΔP/P|"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Tips Asisten Dosen untuk Mahasiswa</label>
                  <input
                    type="text"
                    value={tutorTips}
                    onChange={(e) => setTutorTips(e.target.value)}
                    placeholder="Waspadai jebakan pada turunan kedua..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Soal ke Database</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
