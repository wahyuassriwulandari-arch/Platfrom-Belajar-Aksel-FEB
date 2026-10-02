import React, { useState } from 'react';
import { BookOpen, UserCheck, CheckCircle, Clock, ChevronRight, Sparkles, Filter, ArrowUpRight } from 'lucide-react';
import { Course } from '../types';

interface CourseGridSectionProps {
  courses: Course[];
  onSelectCourseForVideo: (courseId: string) => void;
  onSelectCourseForQuiz: (courseTitle: string) => void;
}

export const CourseGridSection: React.FC<CourseGridSectionProps> = ({
  courses,
  onSelectCourseForVideo,
  onSelectCourseForQuiz,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('Semua');

  const departments = ['Semua', 'Akuntansi', 'Ilmu Ekonomi', 'Manajemen', 'Kuantitatif & Umum'];

  const filteredCourses = selectedDept === 'Semua'
    ? courses
    : courses.filter(c => c.department === selectedDept);

  return (
    <section id="section-modul-perkuliahan" className="py-16 md:py-20 lg:py-24 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-3 font-heading">
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>Modul Kuliah FEB</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Modul Perkuliahan
            </h2>
            <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
              Setiap mata kuliah disusun secara sistematis berdasarkan Rencana Pembelajaran Semester (RPS). 
              Lengkap dengan video panduan, slide rangkuman materi, serta bank soal latihan.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDept === dept
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Grid-Based Card Layout (Generous spacing & large card padding) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white rounded-2xl border border-slate-200 p-7 md:p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 tracking-wide font-heading">
                    {course.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                      {course.credits} SKS
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-700">
                      Sem. {course.semester}
                    </span>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-2 leading-snug">
                  {course.title}
                </h3>

                {/* Summary / Description (Line height 1.6) */}
                <p className="font-body text-slate-700 text-sm leading-[1.6] mb-6">
                  {course.summary}
                </p>

                {/* Tutor / Asisten Dosen Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-heading font-bold text-xs flex items-center justify-center">
                      {course.instructor.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate font-heading">
                        {course.instructor.name}
                      </div>
                      <div className="text-[11px] text-slate-700 truncate font-medium">
                        {course.instructor.role} • IPK {course.instructor.gpa}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Next Topic */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-700">Progres Belajar Mandiri</span>
                    <span className="text-teal-800 font-bold">{course.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-teal-700 rounded-full transition-all duration-300"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 font-medium">
                    <span>{course.completedModules} dari {course.totalModules} modul selesai</span>
                    <span className="text-slate-700 truncate ml-2 font-medium">Lanjut: {course.nextTopic}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectCourseForVideo(course.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-heading font-semibold text-center transition-colors cursor-pointer"
                >
                  Tonton Video Modul
                </button>
                <button
                  type="button"
                  onClick={() => onSelectCourseForQuiz(course.title)}
                  className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-heading font-semibold text-center transition-colors cursor-pointer"
                  title="Latihan Soal Mapel Ini"
                >
                  Latihan Soal
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
