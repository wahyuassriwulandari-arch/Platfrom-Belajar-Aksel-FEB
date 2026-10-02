import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  Globe, 
  BookOpen, 
  FileQuestion, 
  Video, 
  Download, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Info,
  Sliders,
  Check,
  RotateCcw
} from 'lucide-react';
import { CoreSubjectMaterial, QuizQuestion, Course } from '../types';
import { coreMaterialsData } from '../data/mockData';

interface CoreSubjectsSectionProps {
  materials: CoreSubjectMaterial[];
  questions: QuizQuestion[];
  onGoToQuizForSubject: (subjectTitle: string) => void;
  onGoToVideoForSubject: (courseId?: string) => void;
  isEmbedded?: boolean;
}

export const CoreSubjectsSection: React.FC<CoreSubjectsSectionProps> = ({
  materials,
  questions,
  onGoToQuizForSubject,
  onGoToVideoForSubject,
  isEmbedded = false,
}) => {
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<
    'matematika' | 'makro' | 'mikro' | 'inggris'
  >('matematika');

  // Interactive Simulator States
  // 1. Math Econ Simulator: Demand & Supply Equilibrium
  const [demandA, setDemandA] = useState(50);
  const [demandB, setDemandB] = useState(2); // Qd = A - B*P
  const [supplyC, setSupplyC] = useState(10);
  const [supplyD, setSupplyD] = useState(2); // Qs = -C + D*P
  const [taxRate, setTaxRate] = useState(2);

  // 2. Macro Simulator: Multiplier
  const [mpcValue, setMpcValue] = useState(0.75);
  const [deltaGValue, setDeltaGValue] = useState(20); // in Billion IDR

  // 3. Micro Simulator: Midpoint Elasticity
  const [p1, setP1] = useState(20000);
  const [p2, setP2] = useState(16000);
  const [q1, setQ1] = useState(100);
  const [q2, setQ2] = useState(140);

  // 4. English Quiz Drill State
  const [vocabAnswers, setVocabAnswers] = useState<Record<string, string>>({});
  const [vocabChecked, setVocabChecked] = useState(false);

  // Calculations for Math Econ
  // Qd = demandA - demandB*P
  // Qst = -supplyC + supplyD*(P - taxRate) = -supplyC - supplyD*taxRate + supplyD*P
  const peNoTax = Number(((demandA + supplyC) / (demandB + supplyD)).toFixed(2));
  const qeNoTax = Number((demandA - demandB * peNoTax).toFixed(2));
  const peWithTax = Number(((demandA + supplyC + supplyD * taxRate) / (demandB + supplyD)).toFixed(2));
  const qeWithTax = Number((demandA - demandB * peWithTax).toFixed(2));

  // Calculations for Macro
  const multiplierKg = Number((1 / (1 - mpcValue)).toFixed(2));
  const deltaNationalIncome = Number((multiplierKg * deltaGValue).toFixed(2));

  // Calculations for Micro
  const deltaQ = q2 - q1;
  const qAvg = (q1 + q2) / 2;
  const deltaP = p2 - p1;
  const pAvg = (p1 + p2) / 2;
  const elasticityEd = qAvg !== 0 && deltaP !== 0 
    ? Math.abs((deltaQ / qAvg) / (deltaP / pAvg))
    : 0;
  const tr1 = p1 * q1;
  const tr2 = p2 * q2;

  // English Drill Data
  const englishTerms = [
    { term: 'Opportunity Cost', answer: 'Biaya peluang yang dikorbankan demi pilihan lain' },
    { term: 'Plummet', answer: 'Jatuh tajam atau merosot dengan cepat' },
    { term: 'Quantitative Tightening', answer: 'Kebijakan bank sentral menyerap likuiditas moneter' },
    { term: 'Level Off / Plateau', answer: 'Mencapai titik datar setelah periode kenaikan' },
  ];

  const getSubjectTitle = () => {
    switch (selectedSubjectKey) {
      case 'matematika': return 'Matematika Ekonomi & Bisnis';
      case 'makro': return 'Pengantar Ekonomi Makro';
      case 'mikro': return 'Pengantar Ekonomi Mikro';
      case 'inggris': return 'Bahasa Inggris';
    }
  };

  const currentMaterial = materials.find(m => m.subjectTitle.toLowerCase().includes(
    selectedSubjectKey === 'matematika' ? 'matematika' :
    selectedSubjectKey === 'makro' ? 'makro' :
    selectedSubjectKey === 'mikro' ? 'mikro' : 'inggris'
  )) || materials[0];

  const relatedQuestions = questions.filter(q => q.subject.toLowerCase().includes(
    selectedSubjectKey === 'matematika' ? 'matematika' :
    selectedSubjectKey === 'makro' ? 'makro' :
    selectedSubjectKey === 'mikro' ? 'mikro' : 'inggris'
  ));

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      
      {/* Top Banner & Subject Selector Tabs */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        {!isEmbedded && (
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 font-heading tracking-wide mb-1">
                <span>Kurikulum Inti Semester 1</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal">Fakultas Ekonomi dan Bisnis (FEB)</span>
              </div>
              <h1 className="font-heading font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
                Pusat Materi & Bank Soal 4 Matkul Unggulan
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Rangkuman konsep kunci, rumus esensial UTS/UAS, simulasi perhitungan interaktif, dan bank soal terarah.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onGoToQuizForSubject(getSubjectTitle())}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <FileQuestion className="w-3.5 h-3.5" />
                <span>Buka Bank Soal ({relatedQuestions.length} Soal)</span>
              </button>
              <button
                type="button"
                onClick={() => onGoToVideoForSubject()}
                className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Kuliah</span>
              </button>
            </div>
          </div>
        )}

        {/* 4 Interactive Course Selector Tabs */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedSubjectKey('matematika')}
            className={`px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              selectedSubjectKey === 'matematika'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="text-sm">📐</span>
            <span>1. Matematika Ekonomi & Bisnis</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">EKQ101</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSubjectKey('makro')}
            className={`px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              selectedSubjectKey === 'makro'
                ? 'bg-sky-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="text-sm">📈</span>
            <span>2. Pengantar Ekonomi Makro</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">EKI102</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSubjectKey('mikro')}
            className={`px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              selectedSubjectKey === 'mikro'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="text-sm">📊</span>
            <span>3. Pengantar Ekonomi Mikro</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">EKI101</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSubjectKey('inggris')}
            className={`px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              selectedSubjectKey === 'inggris'
                ? 'bg-indigo-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="text-sm">🌐</span>
            <span>4. Bahasa Inggris (Business)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">EKU101</span>
          </button>
        </div>

        {/* Quick Action Buttons in embedded mode */}
        {isEmbedded && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onGoToQuizForSubject(getSubjectTitle())}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileQuestion className="w-3.5 h-3.5" />
              <span>Buka Bank Soal ({relatedQuestions.length} Soal)</span>
            </button>
            <button
              type="button"
              onClick={() => onGoToVideoForSubject()}
              className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Kuliah</span>
            </button>
          </div>
        )}
      </div>
    </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Subject Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-teal-800">{currentMaterial.subjectCode}</span>
                <span aria-hidden="true">·</span>
                <span>3 SKS Wajib FEB</span>
                <span aria-hidden="true">·</span>
                <span>{currentMaterial.estimatedReadTime}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-slate-900">
                {currentMaterial.subjectTitle}
              </h2>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                {currentMaterial.description}
              </p>
            </div>

            <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Tersedia 4 Soal Berbobot UTS
              </span>
              <span className="text-xs text-slate-500">
                Status: Materi & Rumus Terverifikasi Asdos
              </span>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT: Left = Rangkuman & Rumus, Right = Interactive Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: Ringkasan Materi & Rumus Kunci (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Concept Summary Points */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-700" />
                    <h3 className="font-heading font-bold text-sm text-slate-900">
                      Rangkuman Poin Penting: {currentMaterial.topicName}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentMaterial.summaryPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Essential Formulas / Cheat-Sheet */}
              {currentMaterial.keyFormulas && currentMaterial.keyFormulas.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-600" />
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        Rumus Kunci & Model Matematis UTS
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500">Hafalkan Polanya</span>
                  </div>

                  <div className="space-y-3">
                    {currentMaterial.keyFormulas.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 font-heading">{item.name}</span>
                          <span className="text-[11px] text-slate-500 font-normal">{item.note}</span>
                        </div>
                        <div className="font-mono text-xs font-semibold text-teal-900 bg-white p-2 rounded-lg border border-slate-200">
                          {item.formula}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Asdos Exam Advice Box */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs">
                <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block font-heading mb-1">
                    Tips Ujian Langsung dari Asisten Dosen FEB:
                  </span>
                  <p className="text-amber-800/90 leading-relaxed">
                    {currentMaterial.examTips}
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Simulator / Learning Sandbox (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dynamic Simulator based on Subject */}
              {selectedSubjectKey === 'matematika' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-teal-700" />
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        Simulator Keseimbangan Pasar & Pajak
                      </h3>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-semibold border border-teal-200">
                      Live Kalkulator
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Masukkan parameter fungsi permintaan <span className="font-mono font-semibold">Qd = a - bP</span> dan penawaran <span className="font-mono font-semibold">Qs = -c + dP</span>, beserta tarif pajak <span className="font-mono font-semibold">t</span>.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Konstanta a (Qd = a - bP)</label>
                        <input
                          type="number"
                          value={demandA}
                          onChange={(e) => setDemandA(Number(e.target.value) || 0)}
                          className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Kemiringan b (b &gt; 0)</label>
                        <input
                          type="number"
                          value={demandB}
                          onChange={(e) => setDemandB(Number(e.target.value) || 1)}
                          className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Konstanta c (Qs = -c + dP)</label>
                        <input
                          type="number"
                          value={supplyC}
                          onChange={(e) => setSupplyC(Number(e.target.value) || 0)}
                          className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Kemiringan d (d &gt; 0)</label>
                        <input
                          type="number"
                          value={supplyD}
                          onChange={(e) => setSupplyD(Number(e.target.value) || 1)}
                          className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Tarif Pajak Spesifik (t per unit)</label>
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Calculated Output Display */}
                  <div className="p-4 rounded-xl bg-teal-50 border border-teal-200/80 space-y-2 text-xs">
                    <div className="font-semibold text-teal-900 font-heading">Hasil Keseimbangan Otomatis:</div>
                    <div className="flex justify-between items-center py-1 border-b border-teal-200/50">
                      <span className="text-slate-600">Sebelum Pajak (Pe, Qe):</span>
                      <span className="font-mono font-bold text-teal-900">Pe = Rp {peNoTax} · Qe = {qeNoTax} unit</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-teal-200/50">
                      <span className="text-slate-600">Setelah Pajak (Pt, Qt):</span>
                      <span className="font-mono font-bold text-teal-900">Pt = Rp {peWithTax} · Qt = {qeWithTax} unit</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-[11px] text-teal-800">
                      <span>Beban Pajak Konsumen:</span>
                      <span className="font-mono font-semibold">Rp {(peWithTax - peNoTax).toFixed(2)} per unit</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubjectKey === 'makro' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sky-700" />
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        Simulator Multiplier Belanja APBN
                      </h3>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 font-semibold border border-sky-200">
                      Keynesian Model
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Hitung efek berantai peningkatan belanja pemerintah terhadap pendapatan nasional (PDB riil) berdasarkan kecenderungan konsumsi marjinal (MPC).
                  </p>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-slate-700">Marginal Propensity to Consume (MPC):</span>
                        <span className="font-mono font-bold text-sky-800">{mpcValue.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.4"
                        max="0.95"
                        step="0.05"
                        value={mpcValue}
                        onChange={(e) => setMpcValue(Number(e.target.value))}
                        className="w-full accent-sky-700"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>MPC 0.40</span>
                        <span>MPC 0.75 (Standar)</span>
                        <span>MPC 0.95</span>
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Kenaikan Belanja Pemerintah (ΔG dalam Triliun Rp):
                      </label>
                      <input
                        type="number"
                        value={deltaGValue}
                        onChange={(e) => setDeltaGValue(Number(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Macro Output */}
                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200/80 space-y-2 text-xs">
                    <div className="font-semibold text-sky-900 font-heading">Hasil Analisis Multiplier APBN:</div>
                    <div className="flex justify-between items-center py-1 border-b border-sky-200/50">
                      <span className="text-slate-600">Angka Pengganda (kg = 1 / (1 - MPC)):</span>
                      <span className="font-mono font-bold text-sky-900">{multiplierKg}x lipat</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600">Ekspansi PDB Nasional (ΔY):</span>
                      <span className="font-mono font-bold text-emerald-800">+Rp {deltaNationalIncome} Triliun</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubjectKey === 'mikro' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        Kalkulator Elastisitas Midpoint & Revenue
                      </h3>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                      Harga vs Omzet
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Masukkan perubahan harga dan kuantitas produk untuk menghitung koefisien elastisitas busur midpoint dan dampaknya ke Total Revenue (TR).
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Harga Awal (P1)</label>
                      <input
                        type="number"
                        value={p1}
                        onChange={(e) => setP1(Number(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Harga Baru (P2)</label>
                      <input
                        type="number"
                        value={p2}
                        onChange={(e) => setP2(Number(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Pesanan Awal (Q1)</label>
                      <input
                        type="number"
                        value={q1}
                        onChange={(e) => setQ1(Number(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Pesanan Baru (Q2)</label>
                      <input
                        type="number"
                        value={q2}
                        onChange={(e) => setQ2(Number(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Micro Output */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-2 text-xs">
                    <div className="font-semibold text-emerald-900 font-heading">Hasil Analisis Elastisitas:</div>
                    <div className="flex justify-between items-center py-1 border-b border-emerald-200/50">
                      <span className="text-slate-600">Koefisien Elastisitas (|Ed|):</span>
                      <span className="font-mono font-bold text-emerald-900">{elasticityEd.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-emerald-200/50">
                      <span className="text-slate-600">Klasifikasi Sifat:</span>
                      <span className="font-semibold text-emerald-900">
                        {elasticityEd > 1 ? 'Elastis (Ed > 1)' : elasticityEd === 1 ? 'Unitary (Ed = 1)' : 'Inelastis (Ed < 1)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-[11px]">
                      <span className="text-slate-600">Total Revenue:</span>
                      <span className="font-mono font-semibold">
                        Rp {tr1.toLocaleString('id-ID')} ➔ Rp {tr2.toLocaleString('id-ID')} ({tr2 >= tr1 ? 'Meningkat' : 'Menurun'})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubjectKey === 'inggris' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-700" />
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        Latihan Mandiri: Economic Vocabularies
                      </h3>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
                      Interactive Drill
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Uji pemahaman Anda atas istilah ekonomi internasional yang paling sering muncul dalam jurnal dan ujian Business English:
                  </p>

                  <div className="space-y-2.5">
                    {englishTerms.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <div className="font-bold text-indigo-900 font-heading">
                          {idx + 1}. {item.term}
                        </div>
                        <div className="text-slate-600 text-[11px] italic">
                          Artinya: {item.answer}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200/80 text-xs text-indigo-900">
                    <div className="font-semibold font-heading mb-1">Tips Menjawab Soal Grafik:</div>
                    <p className="text-[11px] leading-relaxed">
                      Gunakan preposisi <strong>BY</strong> untuk selisih perubahan (misal: "rose BY 3%"), dan gunakan <strong>TO</strong> untuk tingkat akhir (misal: "fell TO 2.1%").
                    </p>
                  </div>
                </div>
              )}

              {/* Direct Jump to Bank Soal Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="w-4 h-4 text-amber-600" />
                    <h3 className="font-heading font-bold text-xs text-slate-900">
                      Soal Latihan Terkait ({relatedQuestions.length} Soal)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onGoToQuizForSubject(getSubjectTitle())}
                    className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {relatedQuestions.slice(0, 3).map((q) => (
                    <div 
                      key={q.id}
                      onClick={() => onGoToQuizForSubject(q.subject)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50/40 transition-colors cursor-pointer text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900 truncate max-w-[200px]">{q.topic}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          q.difficulty === 'Tantangan UTS' 
                            ? 'bg-rose-50 text-rose-800 border border-rose-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-slate-500 line-clamp-1 text-[11px]">{q.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
