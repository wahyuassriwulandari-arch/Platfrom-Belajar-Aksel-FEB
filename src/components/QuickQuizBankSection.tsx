import React, { useState, useEffect } from 'react';
import { 
  FileQuestion, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Zap, 
  BookOpen, 
  Lightbulb, 
  Calculator,
  ArrowRight,
  Flame,
  Check,
  Timer,
  Play,
  Pause,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { QuizQuestion, QuestionOption } from '../types';

interface QuickQuizBankSectionProps {
  questions: QuizQuestion[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: (idx: number) => void;
}

interface QuickAccessCategory {
  id: string;
  courseTitle: string;
  code: string;
  questionCount: number;
  accuracyRate: string;
  badgeColor: string;
  targetQuestionIdx: number;
}

const quickCategories: QuickAccessCategory[] = [
  {
    id: 'mat-quiz',
    courseTitle: 'Matematika Ekonomi & Bisnis',
    code: 'EKQ101',
    questionCount: 4,
    accuracyRate: '82% Akurasi',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    targetQuestionIdx: 0,
  },
  {
    id: 'makro-quiz',
    courseTitle: 'Pengantar Ekonomi Makro',
    code: 'EKI102',
    questionCount: 4,
    accuracyRate: '78% Akurasi',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    targetQuestionIdx: 4,
  },
  {
    id: 'mikro-quiz',
    courseTitle: 'Pengantar Ekonomi Mikro',
    code: 'EKI101',
    questionCount: 4,
    accuracyRate: '85% Akurasi',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    targetQuestionIdx: 8,
  },
  {
    id: 'eng-quiz',
    courseTitle: 'Bahasa Inggris',
    code: 'EKU101',
    questionCount: 4,
    accuracyRate: '90% Akurasi',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    targetQuestionIdx: 12,
  },
];

const DEFAULT_QUESTION_TIME = 120; // 2 minutes (120 seconds) per question

export const QuickQuizBankSection: React.FC<QuickQuizBankSectionProps> = ({
  questions,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  // Question Timer States
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_QUESTION_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<Record<number, number>>({});
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  const currentQ = questions[activeQuestionIndex] || questions[0];
  const currentSelected = selectedAnswers[currentQ.id];
  const isSubmitted = !!submittedAnswers[currentQ.id];
  const isExplanationOpen = !!showExplanation[currentQ.id];
  const isCorrect = currentSelected === currentQ.correctAnswer;

  // Reset or adjust timer whenever question changes
  useEffect(() => {
    if (submittedAnswers[currentQ.id]) {
      setIsTimerRunning(false);
      setIsTimeUp(false);
      setTimeLeft(DEFAULT_QUESTION_TIME - (timeSpentPerQuestion[currentQ.id] || 0));
    } else {
      setTimeLeft(DEFAULT_QUESTION_TIME);
      setIsTimerRunning(true);
      setIsTimeUp(false);
    }
  }, [currentQ.id, submittedAnswers]);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isSubmitted, timeLeft]);

  const toggleTimer = () => {
    if (isSubmitted || timeLeft <= 0) return;
    setIsTimerRunning(prev => !prev);
  };

  const handleResetTimer = () => {
    setTimeLeft(DEFAULT_QUESTION_TIME);
    setIsTimerRunning(!isSubmitted);
    setIsTimeUp(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleSubmitCurrent = () => {
    if (!currentSelected) return;
    const spent = DEFAULT_QUESTION_TIME - timeLeft;
    setTimeSpentPerQuestion(prev => ({ ...prev, [currentQ.id]: spent }));
    setSubmittedAnswers(prev => ({ ...prev, [currentQ.id]: true }));
    setShowExplanation(prev => ({ ...prev, [currentQ.id]: true }));
    setIsTimerRunning(false);
  };

  const handleResetCurrent = () => {
    setSelectedAnswers(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setSubmittedAnswers(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setShowExplanation(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setTimeSpentPerQuestion(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setTimeLeft(DEFAULT_QUESTION_TIME);
    setIsTimerRunning(true);
    setIsTimeUp(false);
  };

  const completedCount = Object.keys(submittedAnswers).length;

  return (
    <section id="section-quiz" className="py-16 md:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header (No Section number prefix, clean title & badge) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
              <FileQuestion className="w-4 h-4 text-teal-700" />
              <span>Simulasi & Bank Soal Mandiri</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Akses Cepat Bank Soal
            </h2>
            <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
              Latihan terarah format single-question untuk mempersiapkan kuis mingguan dan UTS.
              Disertai timer pengerjaan mandiri, bedah konsep, pembahasan langkah demi langkah, dan tips praktis dari tutor asdos FEB.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Streak Belajar</div>
                <div className="font-heading font-bold text-sm text-slate-900">5 Hari Aktif</div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Latihan Diselesaikan</div>
              <div className="font-heading font-bold text-sm text-teal-800">
                {completedCount} / {questions.length} Soal
              </div>
            </div>
          </div>
        </div>

        {/* Shortcuts: Grid of Quick Access Course Cards */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
            Pintasan Cepat Berdasarkan Mata Kuliah:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {quickCategories.map((cat) => {
              const isSelected = activeQuestionIndex >= cat.targetQuestionIdx && activeQuestionIndex < cat.targetQuestionIdx + cat.questionCount;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveQuestionIndex(cat.targetQuestionIdx)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-teal-800 text-white border-teal-800 shadow-md transform -translate-y-0.5'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm ${
                      isSelected ? 'bg-teal-900 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {cat.code}
                    </span>
                    <div className={`font-heading font-bold text-xs mt-2 line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}>
                      {cat.courseTitle}
                    </div>
                  </div>
                  <div className={`text-[11px] mt-2 flex items-center justify-between ${
                    isSelected ? 'text-teal-200' : 'text-slate-600'
                  }`}>
                    <span>{cat.questionCount} Soal UTS</span>
                    <span className="font-semibold">{cat.accuracyRate}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Question Number Jumpers */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-500 mr-2">Pilih Nomor Soal:</span>
            {questions.map((q, idx) => {
              const isCurrent = activeQuestionIndex === idx;
              const isAnswered = !!submittedAnswers[q.id];
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isCurrent
                      ? 'bg-teal-800 text-white shadow-xs ring-2 ring-teal-500'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={`${q.subject} - Nomor ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Single Question Layout Component Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Question Header & Navigator Bar with Interactive Question Timer */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Question badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 bg-teal-100 text-teal-900 font-mono text-xs font-bold rounded-md">
                Soal {currentQ.questionNumber} dari {questions.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-white text-slate-800 rounded-md border border-slate-200">
                {currentQ.subject}
              </span>
              <span className="text-xs text-slate-600 hidden sm:inline">
                • {currentQ.topic}
              </span>
            </div>

            {/* Center / Right: Interactive Question Timer Component */}
            <div className="flex items-center gap-4">
              
              {/* Question Timer Widget */}
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isSubmitted
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : isTimeUp
                  ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse ring-2 ring-rose-300'
                  : timeLeft <= 30
                  ? 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
                  : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
              }`}>
                <Timer className={`w-4 h-4 shrink-0 ${
                  isSubmitted
                    ? 'text-emerald-600'
                    : isTimeUp
                    ? 'text-rose-600'
                    : timeLeft <= 30
                    ? 'text-amber-600'
                    : 'text-teal-700'
                }`} />

                {isSubmitted ? (
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-slate-500 font-normal">Waktu Pengerjaan:</span>
                    <span className="font-bold text-emerald-800">
                      {formatTimer(timeSpentPerQuestion[currentQ.id] || (DEFAULT_QUESTION_TIME - timeLeft))}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-normal text-[11px] hidden sm:inline">Timer Soal:</span>
                    <span className={`font-mono font-bold text-sm ${
                      isTimeUp ? 'text-rose-700' : timeLeft <= 30 ? 'text-amber-700' : 'text-slate-900'
                    }`}>
                      {formatTimer(timeLeft)}
                    </span>

                    {/* Timer Controls: Pause/Play & Reset */}
                    <div className="flex items-center gap-1 ml-1 pl-1.5 border-l border-slate-200">
                      <button
                        type="button"
                        onClick={toggleTimer}
                        disabled={timeLeft <= 0}
                        title={isTimerRunning ? 'Jeda Timer' : 'Lanjutkan Timer'}
                        className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      >
                        {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleResetTimer}
                        title="Reset Timer Soal Ini"
                        className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Question Switcher Dots */}
              <div className="flex items-center gap-1.5">
                {questions.map((q, idx) => {
                  const qSubmitted = !!submittedAnswers[q.id];
                  const qCorrect = qSubmitted && selectedAnswers[q.id] === q.correctAnswer;
                  const isCurrent = activeQuestionIndex === idx;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-lg font-heading text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-teal-700 bg-teal-700 text-white shadow-xs'
                          : qSubmitted
                            ? qCorrect
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Time Expired Notice Banner */}
          {isTimeUp && !isSubmitted && (
            <div className="px-6 py-3 bg-rose-50 border-b border-rose-200 text-rose-900 text-xs font-semibold flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Waktu pengerjaan (02:00) telah habis! Silakan tentukan opsi jawaban dan tekan <strong>Periksa Jawaban</strong> untuk melihat pembahasan lengkap.</span>
              </div>
              <button
                type="button"
                onClick={handleResetTimer}
                className="px-2.5 py-1 bg-white border border-rose-200 rounded text-rose-800 hover:bg-rose-100 text-xs font-bold cursor-pointer shrink-0"
              >
                Tambah Waktu (+2 Menit)
              </button>
            </div>
          )}

          {/* Question Content Body */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            
            {/* Case Study / Context Box */}
            {currentQ.contextText && (
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border-l-4 border-teal-700 text-slate-800 font-body text-sm leading-relaxed">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-1 font-heading">
                  Studi Kasus Soal Ujian:
                </div>
                <p className="max-w-[70ch]">{currentQ.contextText}</p>
              </div>
            )}

            {/* Prompt */}
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">
                {currentQ.prompt}
              </h3>
            </div>

            {/* Options List (Single-Question Layout with Radio Buttons) */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt: QuestionOption) => {
                const isThisSelected = currentSelected === opt.id;
                const isThisCorrectAnswer = opt.id === currentQ.correctAnswer;

                let optionStyle = 'bg-white border-slate-200 hover:border-teal-700/50 hover:bg-slate-50/70 text-slate-800';

                if (isSubmitted) {
                  if (isThisCorrectAnswer) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                  } else if (isThisSelected && !isThisCorrectAnswer) {
                    optionStyle = 'bg-red-50 border-red-400 text-red-950';
                  } else {
                    optionStyle = 'bg-white border-slate-200 opacity-60 text-slate-600';
                  }
                } else if (isThisSelected) {
                  optionStyle = 'bg-teal-50 border-teal-700 text-teal-950 ring-1 ring-teal-700';
                }

                return (
                  <div
                    key={opt.id}
                    id={`quiz-option-${currentQ.id}-${opt.id}`}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer ${optionStyle}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-xs shrink-0 transition-colors ${
                      isSubmitted
                        ? isThisCorrectAnswer
                          ? 'bg-emerald-600 text-white'
                          : isThisSelected
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        : isThisSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.id}
                    </div>

                    <div className="flex-1 text-sm pt-0.5 leading-relaxed">
                      {opt.text}
                    </div>

                    {isSubmitted && isThisCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isThisSelected && !isThisCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interaction Buttons Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {!isSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitCurrent}
                    disabled={!currentSelected}
                    className={`px-6 py-3 rounded-xl font-heading font-bold text-sm transition-all shadow-xs flex items-center gap-2 ${
                      currentSelected
                        ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Periksa Jawaban</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowExplanation(prev => ({ ...prev, [currentQ.id]: !isExplanationOpen }))}
                      className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>{isExplanationOpen ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCurrent}
                      className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Soal Ini</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Prev / Next Question Nav */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex(Math.min(questions.length - 1, activeQuestionIndex + 1))}
                  disabled={activeQuestionIndex === questions.length - 1}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span className="hidden sm:inline">Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Explanation Breakdown Panel */}
            {isSubmitted && isExplanationOpen && (
              <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                
                {/* Result Banner */}
                <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  )}
                  <div className="text-xs sm:text-sm font-semibold">
                    {isCorrect ? (
                      <span>Luar biasa! Jawabanmu ({currentSelected}) benar. Konsepmu sudah matang untuk materi ini.</span>
                    ) : (
                      <span>Jawabanmu ({currentSelected}) kurang tepat. Jawaban yang benar adalah <strong>{currentQ.correctAnswer}</strong>. Perhatikan langkah di bawah.</span>
                    )}
                  </div>
                </div>

                {/* Core Principle */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    1. Prinsip Inti Teori:
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                    {currentQ.explanation.corePrinciple}
                  </p>
                </div>

                {/* Detailed Walkthrough */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    2. Langkah Pengerjaan Detail:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-body">
                    {currentQ.explanation.detailedWalkthrough}
                  </p>
                </div>

                {/* Formula if available */}
                {currentQ.explanation.relatedFormula && (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-teal-900 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Rumus Kunci: {currentQ.explanation.relatedFormula}</span>
                  </div>
                )}

                {/* Tutor Exam Tips */}
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Tips Ujian dari Asisten Dosen: </span>
                    <span>{currentQ.explanation.tutorTips}</span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
