import React, { useState } from 'react';
import { 
  FileQuestion, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  Timer, 
  RotateCcw,
  Sparkles,
  BookCheck,
  AlertCircle
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface SingleQuestionSectionProps {
  questions: QuizQuestion[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: (idx: number) => void;
}

export const SingleQuestionSection: React.FC<SingleQuestionSectionProps> = ({
  questions,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  // Store user answers per question: { [questionId]: 'A' | 'B' | ... }
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  // Store whether explanation is revealed per question
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  // Flagged questions for review
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  // Question timer
  const [timeRemaining, setTimeRemaining] = useState('24:15');

  const currentQ = questions[activeQuestionIndex] || questions[0];
  const selectedOption = userAnswers[currentQ.id];
  const isRevealed = !!revealedExplanations[currentQ.id];
  const isCorrect = selectedOption === currentQ.correctAnswer;
  const isFlagged = !!flaggedQuestions[currentQ.id];

  const handleSelectOption = (optionId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) {
      alert('Silakan pilih salah satu opsi jawaban (A/B/C/D/E) terlebih dahulu.');
      return;
    }
    setRevealedExplanations(prev => ({
      ...prev,
      [currentQ.id]: true,
    }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handlePrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  return (
    <section id="section-quiz" className="py-16 md:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
            <FileQuestion className="w-4 h-4 text-teal-700" />
            <span>Simulasi Ujian & Bank Soal Interaktif</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Single Question Layout: Latihan Mandiri
          </h2>
          <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] mx-auto leading-[1.6]">
            Satu soal dalam satu layar untuk memaksimalkan konsentrasi penalaran konsep. 
            Disertai kunci analisis logika dari asisten dosen untuk persiapan UTS/UAS.
          </p>
        </div>

        {/* The Single Question Card (Ruangguru-style Card) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 mb-8">
          
          {/* Question Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-heading">
                Soal {currentQ.questionNumber} dari {questions.length}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-heading">
                {currentQ.subject}
              </span>
              <span className="hidden sm:inline text-xs font-medium text-slate-600">
                • {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                <Timer className="w-3.5 h-3.5 text-slate-600" />
                <span>Sisa Waktu: {timeRemaining}</span>
              </div>
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isFlagged
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Tandai ragu-ragu untuk ditinjau ulang"
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-600' : ''}`} />
                <span className="hidden sm:inline">{isFlagged ? 'Ditandai' : 'Tandai'}</span>
              </button>
            </div>
          </div>

          {/* Question Body: Case Context & Prompt */}
          <div className="mb-8">
            {currentQ.contextText && (
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-teal-700 text-slate-800 text-sm leading-[1.6] mb-5 font-body">
                <span className="font-semibold text-slate-900 block mb-1">Konteks Kasus:</span>
                {currentQ.contextText}
              </div>
            )}
            <h3 className="font-heading font-bold text-lg md:text-xl text-slate-900 leading-snug">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Multiple Choice Options (A, B, C, D, E) */}
          <div className="space-y-3.5 mb-8">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isTheCorrectOne = opt.id === currentQ.correctAnswer;
              
              let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60';
              if (isSelected && !isRevealed) {
                optionStyle = 'bg-teal-50/60 border-teal-700 ring-1 ring-teal-700';
              } else if (isRevealed) {
                if (isTheCorrectOne) {
                  optionStyle = 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600';
                } else if (isSelected && !isTheCorrectOne) {
                  optionStyle = 'bg-rose-50 border-rose-400';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => !isRevealed && handleSelectOption(opt.id)}
                  disabled={isRevealed}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-4 cursor-pointer ${optionStyle}`}
                >
                  <div className={`w-8 h-8 rounded-lg font-heading font-bold text-xs shrink-0 flex items-center justify-center transition-colors ${
                    isSelected && !isRevealed
                      ? 'bg-teal-700 text-white'
                      : isRevealed && isTheCorrectOne
                        ? 'bg-emerald-600 text-white'
                        : isRevealed && isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                  }`}>
                    {opt.id}
                  </div>
                  <div className="flex-1 text-sm font-body text-slate-800 leading-[1.6] pt-0.5">
                    {opt.text}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeQuestionIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Soal Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeQuestionIndex === questions.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Soal Selanjutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              id="check-answer-btn"
              type="button"
              onClick={handleCheckAnswer}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-heading font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <BookCheck className="w-4 h-4" />
              <span>{isRevealed ? 'Pembahasan Sedang Dibuka' : 'Periksa & Buka Pembahasan'}</span>
            </button>
          </div>

          {/* Comprehensive Step-by-Step Explanation Box (Revealed) */}
          {isRevealed && (
            <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-200 animate-in fade-in duration-200">
              <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${
                isCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-rose-50 border border-rose-200 text-rose-950'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-heading font-bold text-sm">
                    {isCorrect ? 'Luar Biasa! Jawaban Anda Tepat.' : `Belum Tepat. Kunci Jawaban yang Benar adalah [ ${currentQ.correctAnswer} ]`}
                  </h4>
                  <p className="text-xs mt-1 leading-normal font-medium">
                    Prinsip Kunci: {currentQ.explanation.corePrinciple}
                  </p>
                </div>
              </div>

              {/* Detailed Walkthrough */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading mb-1.5">
                    Langkah Penalaran & Perhitungan Lengkap:
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-body leading-[1.6] whitespace-pre-line max-prose-ch">
                    {currentQ.explanation.detailedWalkthrough}
                  </div>
                </div>

                {currentQ.explanation.relatedFormula && (
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading mb-1.5">
                      Rumus / Kaidah yang Berlaku:
                    </div>
                    <code className="block p-3 rounded-lg bg-slate-900 text-teal-300 font-mono text-xs">
                      {currentQ.explanation.relatedFormula}
                    </code>
                  </div>
                )}

                {/* Tutor Tips */}
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 font-heading mb-1">
                    <Sparkles className="w-4 h-4 text-teal-700" />
                    <span>Catatan Khusus Penguji UTS FEB:</span>
                  </div>
                  <p className="text-xs text-teal-950 font-body leading-[1.6]">
                    {currentQ.explanation.tutorTips}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Question Navigator Strip (Pills 1 to 5) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
          <div className="text-xs font-semibold text-slate-700">
            Navigasi Nomor Soal:
          </div>
          <div className="flex items-center gap-2">
            {questions.map((q, idx) => {
              const answered = !!userAnswers[q.id];
              const flagged = !!flaggedQuestions[q.id];
              const isCurrent = idx === activeQuestionIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`w-9 h-9 rounded-lg font-heading font-bold text-xs transition-all relative ${
                    isCurrent
                      ? 'bg-teal-700 text-white ring-2 ring-teal-700 ring-offset-2'
                      : answered
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-slate-600 hidden sm:block">
            {Object.keys(userAnswers).length} dari {questions.length} terjawab
          </div>
        </div>

      </div>
    </section>
  );
};
