import React, { useState } from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Clock, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Course, UserProfile } from '../types';

interface LearningProgressSectionProps {
  courses: Course[];
  user: UserProfile;
  onSelectCourseToStudy: (courseId: string) => void;
  onSelectCourseMentoring: () => void;
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
  size = 96,
  strokeWidth = 9,
  colorClass
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100"
        />
        {/* Animated Progress Ring */}
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
      {/* Center Percentage Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-heading font-bold text-lg text-slate-900 leading-none">
          {percent}%
        </span>
        <span className="text-[10px] text-slate-500 font-medium mt-0.5">
          Tuntas
        </span>
      </div>
    </div>
  );
};

export const LearningProgressSection: React.FC<LearningProgressSectionProps> = ({
  courses,
  user,
  onSelectCourseToStudy,
  onSelectCourseMentoring
}) => {
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);

  // Helper color logic based on department or progress
  const getDepartmentTheme = (department: Course['department']) => {
    switch (department) {
      case 'Akuntansi':
        return {
          bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          donutStroke: 'text-emerald-600',
          accent: 'emerald',
          projectedGrade: 'A (88.5)',
        };
      case 'Ilmu Ekonomi':
        return {
          bgBadge: 'bg-sky-50 text-sky-800 border-sky-200',
          donutStroke: 'text-sky-600',
          accent: 'sky',
          projectedGrade: 'A- (84.0)',
        };
      case 'Manajemen':
        return {
          bgBadge: 'bg-amber-50 text-amber-800 border-amber-200',
          donutStroke: 'text-amber-600',
          accent: 'amber',
          projectedGrade: 'A (91.0)',
        };
      default:
        return {
          bgBadge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          donutStroke: 'text-indigo-600',
          accent: 'indigo',
          projectedGrade: 'B+ (79.5)',
        };
    }
  };

  const totalCompletedModules = courses.reduce((acc, c) => acc + c.completedModules, 0);
  const totalAllModules = courses.reduce((acc, c) => acc + c.totalModules, 0);
  const overallPercentage = Math.round((totalCompletedModules / totalAllModules) * 100);

  return (
    <section id="section-progress" className="py-16 md:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Heading with Contrast & Typography Rules */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>Section 2: Visualisasi Capaian Akademik</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Panel Visualisasi Progres Belajar
            </h2>
            <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
              Pantau matriks penyelesaian per mata kuliah secara konkret. Ritme belajar yang terukur
              mencegah ketertinggalan materi di tengah padatnya jadwal kuliah semester pertama.
            </p>
          </div>

          {/* Aggregate Semester Summary Badge */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-5 shrink-0">
            <div className="text-left">
              <div className="text-xs text-slate-500 font-medium">Ketuntasan Semester 1</div>
              <div className="font-heading font-bold text-2xl text-teal-800">
                {overallPercentage}% <span className="text-xs font-normal text-slate-600">Rata-rata</span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {totalCompletedModules} dari {totalAllModules} modul terselesaikan
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-left">
              <div className="text-xs text-slate-500 font-medium">Proyeksi IPK</div>
              <div className="font-heading font-bold text-2xl text-slate-900">
                3.82 <span className="text-xs font-normal text-emerald-700 font-semibold">Sangat Baik</span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Berdasarkan kuis & tugas
              </div>
            </div>
          </div>
        </div>

        {/* Row of Donut Chart Cards (Grid-Based Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const theme = getDepartmentTheme(course.department);
            return (
              <div
                key={course.id}
                id={`progress-card-${course.id}`}
                onClick={() => setSelectedCourseForDetail(course)}
                className="group relative bg-white rounded-2xl border border-slate-200 hover:border-teal-700/40 hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer"
              >
                {/* Card Top: Code & Department */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md">
                      {course.code}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${theme.bgBadge}`}>
                      {course.department}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-teal-900 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {course.summary}
                  </p>
                </div>

                {/* Card Middle: Donut Chart & Quantitative Progress */}
                <div className="my-6 py-4 px-3 bg-slate-50/70 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
                  <DonutProgress
                    percent={course.progressPercent}
                    colorClass={theme.donutStroke}
                    size={88}
                    strokeWidth={8}
                  />

                  <div className="flex-1 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-700">
                      <span className="font-medium">Modul Tuntas:</span>
                      <span className="font-bold text-slate-900">
                        {course.completedModules} / {course.totalModules}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span className="font-medium">Bobot SKS:</span>
                      <span className="font-bold text-slate-900">{course.credits} SKS</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span className="font-medium">Prediksi Nilai:</span>
                      <span className="font-bold text-teal-800">{theme.projectedGrade}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: CTA Relevan "Cek Rincian Nilai" */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 truncate max-w-[170px]">
                    {course.nextTopic}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourseForDetail(course);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Cek Rincian Nilai</span>
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal: Rincian Nilai & Capaian Belajar Per Mata Kuliah */}
      {selectedCourseForDetail && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCourseForDetail(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-sm">
                    {selectedCourseForDetail.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {selectedCourseForDetail.credits} SKS • Semester {selectedCourseForDetail.semester}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Rincian Nilai: {selectedCourseForDetail.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Pengajar/Tutor: {selectedCourseForDetail.instructor.name} ({selectedCourseForDetail.instructor.role})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
                aria-label="Tutup modal rincian nilai"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Top Banner with Progress Donut & Projection */}
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <DonutProgress 
                    percent={selectedCourseForDetail.progressPercent}
                    size={72}
                    strokeWidth={7}
                    colorClass="text-teal-700"
                  />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-900">
                      Capaian Kumulatif Saat Ini
                    </div>
                    <div className="font-heading font-bold text-xl text-teal-950">
                      {selectedCourseForDetail.completedModules} dari {selectedCourseForDetail.totalModules} Modul Diselesaikan
                    </div>
                    <div className="text-xs text-teal-800 mt-0.5">
                      Target UTS FEB: Bab 1 sampai Bab 7 harus tuntas dalam 3 pekan.
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-right pr-2">
                  <div className="text-xs text-slate-500 font-medium">Prediksi Huruf</div>
                  <div className="font-heading font-bold text-2xl text-teal-900">
                    {getDepartmentTheme(selectedCourseForDetail.department).projectedGrade}
                  </div>
                </div>
              </div>

              {/* Assessment Breakdown Matrix */}
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-700" />
                  <span>Komposisi Penilaian & Nilai Berjalan</span>
                </h4>
                <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                  <div className="p-3 bg-slate-50 grid grid-cols-12 font-bold text-slate-700">
                    <span className="col-span-5">Komponen Evaluasi</span>
                    <span className="col-span-2 text-center">Bobot</span>
                    <span className="col-span-2 text-center">Skor Kamu</span>
                    <span className="col-span-3 text-right">Status Capaian</span>
                  </div>

                  <div className="p-3 grid grid-cols-12 items-center text-slate-700 hover:bg-slate-50">
                    <span className="col-span-5 font-semibold text-slate-900">Presensi & Partisipasi Diskusi</span>
                    <span className="col-span-2 text-center">10%</span>
                    <span className="col-span-2 text-center font-bold text-teal-800">100 / 100</span>
                    <span className="col-span-3 text-right text-emerald-700 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Lengkap (10/10 Sesi)
                    </span>
                  </div>

                  <div className="p-3 grid grid-cols-12 items-center text-slate-700 hover:bg-slate-50">
                    <span className="col-span-5 font-semibold text-slate-900">Tugas Individu & Analisis Kasus</span>
                    <span className="col-span-2 text-center">20%</span>
                    <span className="col-span-2 text-center font-bold text-teal-800">88 / 100</span>
                    <span className="col-span-3 text-right text-emerald-700 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 4 dari 4 Tugas Dinilai
                    </span>
                  </div>

                  <div className="p-3 grid grid-cols-12 items-center text-slate-700 hover:bg-slate-50">
                    <span className="col-span-5 font-semibold text-slate-900">Kuis & Bank Soal Mandiri</span>
                    <span className="col-span-2 text-center">20%</span>
                    <span className="col-span-2 text-center font-bold text-teal-800">92 / 100</span>
                    <span className="col-span-3 text-right text-emerald-700 font-semibold flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Akurasi Sangat Tinggi
                    </span>
                  </div>

                  <div className="p-3 grid grid-cols-12 items-center text-slate-700 hover:bg-slate-50">
                    <span className="col-span-5 font-semibold text-slate-900">Ujian Tengah Semester (UTS)</span>
                    <span className="col-span-2 text-center">25%</span>
                    <span className="col-span-2 text-center text-slate-400 italic">Belum Ujian</span>
                    <span className="col-span-3 text-right text-amber-700 font-semibold flex items-center justify-end gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Jadwal: Pekan Ke-8
                    </span>
                  </div>

                  <div className="p-3 grid grid-cols-12 items-center text-slate-700 hover:bg-slate-50">
                    <span className="col-span-5 font-semibold text-slate-900">Ujian Akhir Semester (UAS)</span>
                    <span className="col-span-2 text-center">25%</span>
                    <span className="col-span-2 text-center text-slate-400 italic">Belum Ujian</span>
                    <span className="col-span-3 text-right text-slate-500 font-semibold">
                      Jadwal: Pekan Ke-16
                    </span>
                  </div>
                </div>
              </div>

              {/* Target Rekomendasi Mentor */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Saran Tutor Asdos untuk Mempertahankan Nilai A:
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Pertahankan kebiasaan menyelesaikan latihan soal sebelum kuliah tatap muka. Topik berikutnya adalah{' '}
                  <strong className="text-teal-900">{selectedCourseForDetail.nextTopic}</strong>. Segera selesaikan video modul
                  dan ikuti sesi responsi bersama mentor minggu ini.
                </p>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const courseId = selectedCourseForDetail.id;
                  setSelectedCourseForDetail(null);
                  onSelectCourseMentoring();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                Jadwalkan Mentoring Khusus
              </button>
              <button
                type="button"
                onClick={() => {
                  const courseId = selectedCourseForDetail.id;
                  setSelectedCourseForDetail(null);
                  onSelectCourseToStudy(courseId);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Lanjut Belajar Modul Ini →
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
