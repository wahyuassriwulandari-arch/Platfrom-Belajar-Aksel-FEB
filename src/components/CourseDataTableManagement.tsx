import React, { useState } from 'react';
import { 
  Table, 
  Search, 
  Filter, 
  BookOpen, 
  FileQuestion, 
  Video, 
  ChevronRight, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Layers, 
  Clock, 
  Download, 
  X, 
  ExternalLink,
  ArrowUpDown,
  FileText,
  LayoutGrid,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { Course, QuizQuestion, CoreSubjectMaterial, UserProfile, DriveMaterialItem } from '../types';
import { QuickQuizBankSection } from './QuickQuizBankSection';
import { CoreSubjectsSection } from './CoreSubjectsSection';
import { GoogleDriveMaterialsHub } from './GoogleDriveMaterialsHub';
import { coreMaterialsData, googleDriveMaterialsData, GOOGLE_DRIVE_FOLDER_URL } from '../data/mockData';

interface CourseDataTableManagementProps {
  courses: Course[];
  questions: QuizQuestion[];
  materials?: CoreSubjectMaterial[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: (idx: number) => void;
  onSelectCourseForVideo: (courseId?: string) => void;
  onSelectCourseForQuiz: (courseTitle: string) => void;
  user?: UserProfile;
}

export const CourseDataTableManagement: React.FC<CourseDataTableManagementProps> = ({
  courses,
  questions,
  materials = coreMaterialsData,
  activeQuestionIndex,
  setActiveQuestionIndex,
  onSelectCourseForVideo,
  onSelectCourseForQuiz,
  user,
}) => {
  const isTutor = user?.role === 'admin';
  const [activeSubTab, setActiveSubTab] = useState<'materi-inti' | 'drive-materi' | 'table' | 'cards' | 'quiz'>('materi-inti');
  const [driveMaterials, setDriveMaterials] = useState<DriveMaterialItem[]>(googleDriveMaterialsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ontrack' | 'studying' | 'attention'>('all');
  const [selectedEntityCourse, setSelectedEntityCourse] = useState<Course | null>(null);
  const [sortField, setSortField] = useState<'code' | 'title' | 'credits' | 'progress'>('code');
  const [sortAsc, setSortAsc] = useState(true);

  const departments = ['Semua', 'Akuntansi', 'Ilmu Ekonomi', 'Manajemen', 'Kuantitatif & Umum'];

  // Filtered courses
  const filteredCourses = courses
    .filter(course => {
      // Dept filter
      if (departmentFilter !== 'Semua' && course.department !== departmentFilter) return false;
      // Status filter
      if (statusFilter === 'ontrack' && course.progressPercent < 70) return false;
      if (statusFilter === 'studying' && (course.progressPercent < 50 || course.progressPercent >= 70)) return false;
      if (statusFilter === 'attention' && course.progressPercent >= 50) return false;
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          course.code.toLowerCase().includes(q) ||
          course.instructor.name.toLowerCase().includes(q) ||
          course.summary.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let comp = 0;
      if (sortField === 'code') comp = a.code.localeCompare(b.code);
      else if (sortField === 'title') comp = a.title.localeCompare(b.title);
      else if (sortField === 'credits') comp = a.credits - b.credits;
      else if (sortField === 'progress') comp = a.progressPercent - b.progressPercent;
      return sortAsc ? comp : -comp;
    });

  const handleSort = (field: 'code' | 'title' | 'credits' | 'progress') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStatusBadge = (progress: number) => {
    if (progress >= 70) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          On-Track (A)
        </span>
      );
    } else if (progress >= 50) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          Sedang Belajar
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Perhatian UTS
        </span>
      );
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      
      {/* Top Filter & Sub-Nav Header */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Title & Stats */}
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-100">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="font-heading font-bold text-xl text-slate-900">
                Modul Perkuliahan & Bank Soal
              </h2>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {courses.length} Mata Kuliah Terdaftar
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Kurikulum RPS resmi FEB UNJ, bahan diktat perkuliahan, dan latihan bank soal mandiri berdurasi.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveSubTab('materi-inti')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'materi-inti'
                  ? 'bg-teal-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Materi 4 Matkul Inti</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('drive-materi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'drive-materi'
                  ? 'bg-teal-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Materi PPT & Video (Google Drive)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-bold">
                Drive
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'table'
                  ? 'bg-white text-teal-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabel Kurikulum</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'cards'
                  ? 'bg-white text-teal-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kartu Modul</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'quiz'
                  ? 'bg-white text-teal-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bank Soal Tryout</span>
            </button>
          </div>

        </div>

        {/* Filter Toolbar (Active ONLY for Table & Cards) */}
        {(activeSubTab === 'table' || activeSubTab === 'cards') && (
          <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode, nama matkul, atau dosen..."
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Department Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" />
                Dept:
              </span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setDepartmentFilter(dept)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    departmentFilter === dept
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                <option value="all">Semua Status Ketuntasan</option>
                <option value="ontrack">On-Track Menuju A (&ge;70%)</option>
                <option value="studying">Sedang Belajar (50-69%)</option>
                <option value="attention">Perlu Perhatian UTS (&lt;50%)</option>
              </select>
            </div>

          </div>
        )}

      </div>

      {/* VIEW 1: MATERI 4 MATKUL INTI */}
      {activeSubTab === 'materi-inti' && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <CoreSubjectsSection
            materials={materials}
            questions={questions}
            onGoToQuizForSubject={(title) => {
              setActiveSubTab('quiz');
              onSelectCourseForQuiz(title);
            }}
            onGoToVideoForSubject={onSelectCourseForVideo}
            isEmbedded={true}
          />
        </div>
      )}

      {/* VIEW 2, 3, 4: SCROLLABLE PANEL FOR TABLE, CARDS, QUIZ */}
      {activeSubTab !== 'materi-inti' && (
        <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* VIEW 2: DATA TABLE */}
            {activeSubTab === 'table' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-semibold font-heading uppercase tracking-wider">
                      <th 
                        className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                        onClick={() => handleSort('code')}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Kode</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th 
                        className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                        onClick={() => handleSort('title')}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Mata Kuliah</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="py-3.5 px-4">Departemen</th>
                      <th 
                        className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                        onClick={() => handleSort('credits')}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>SKS</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="py-3.5 px-4">Dosen Koordinator</th>
                      <th 
                        className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                        onClick={() => handleSort('progress')}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Silabus</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                        </div>
                      </th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500">
                          <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                          <p className="font-semibold text-slate-700">Tidak ada mata kuliah yang cocok dengan filter</p>
                          <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau reset filter.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((course) => (
                        <tr 
                          key={course.id} 
                          className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                          onClick={() => setSelectedEntityCourse(course)}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-teal-800">
                            {course.code}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-heading font-bold text-slate-900 text-sm group-hover:text-teal-900 transition-colors">
                              {course.title}
                            </div>
                            <div className="text-slate-500 text-[11px] truncate max-w-[280px]">
                              {course.summary}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {course.department}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                              {course.credits} SKS
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{course.instructor.name}</div>
                            <div className="text-[11px] text-slate-500">{course.instructor.role}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-800 min-w-[32px]">
                                {course.progressPercent}%
                              </span>
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    course.progressPercent >= 70 ? 'bg-emerald-600' :
                                    course.progressPercent >= 50 ? 'bg-teal-600' : 'bg-amber-600'
                                  }`}
                                  style={{ width: `${course.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            {getStatusBadge(course.progressPercent)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => setSelectedEntityCourse(course)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-teal-800 hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Lihat Detail RPS"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onSelectCourseForVideo(course.id)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-teal-800 hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Putar Video Kuliah"
                              >
                                <Video className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onSelectCourseForQuiz(course.title)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-teal-800 hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Latihan Soal Tryout"
                              >
                                <FileQuestion className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 2: COURSE CARDS */}
          {activeSubTab === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                        {course.code}
                      </span>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {course.credits} SKS
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {course.summary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Departemen:</span>
                        <span className="font-semibold text-slate-800">{course.department}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Dosen Pengampu:</span>
                        <span className="font-semibold text-slate-800">{course.instructor.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Progres Silabus:</span>
                        <span className="font-mono font-bold text-teal-800">{course.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-700 rounded-full" 
                          style={{ width: `${course.progressPercent}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEntityCourse(course)}
                      className="py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold font-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>RPS Lengkap</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectCourseForQuiz(course.title)}
                      className="py-2 px-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold font-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileQuestion className="w-3.5 h-3.5" />
                      <span>Latihan Soal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW: MATERI PPT & VIDEO GOOGLE DRIVE */}
          {activeSubTab === 'drive-materi' && (
            <GoogleDriveMaterialsHub
              materials={driveMaterials}
              user={user}
              onAddMaterial={(newMat) => setDriveMaterials(prev => [newMat, ...prev])}
              onSelectCourseForQuiz={onSelectCourseForQuiz}
            />
          )}

          {/* VIEW 3: BANK SOAL TRYOUT */}
          {activeSubTab === 'quiz' && (
            <QuickQuizBankSection
              questions={questions}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
            />
          )}

        </div>
      </div>
      )}

      {/* DETAIL ENTITY MODAL / DRAWER (RPS & Silabus Rinci) */}
      {selectedEntityCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-teal-900 text-white flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-800 text-teal-200 border border-teal-700 font-bold">
                    {selectedEntityCourse.code}
                  </span>
                  <span className="text-xs text-teal-200">
                    {selectedEntityCourse.department} • {selectedEntityCourse.credits} SKS
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  {selectedEntityCourse.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntityCourse(null)}
                className="p-2 text-teal-200 hover:text-white hover:bg-teal-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Internal Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 text-xs">
              
              {/* Deskripsi & Capaian Pembelajaran */}
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>Deskripsi & Capaian Pembelajaran Lulusan (CPL)</span>
                </h4>
                <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {selectedEntityCourse.summary} Mata kuliah ini membekali mahasiswa baru FEB dengan pemahaman fundamental, kerangka analitis logis, dan penerapan praktis dalam dunia bisnis serta pengambilan keputusan manajerial.
                </p>
              </div>

              {/* Dosen & Informasi Akademik */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 font-medium">
                    {isTutor ? 'Koordinator / Dosen Pengampu' : 'Dosen Koordinator'}
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedEntityCourse.instructor.name}</div>
                  <div className="text-teal-700 font-semibold">{selectedEntityCourse.instructor.role}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 font-medium">
                    {isTutor ? 'Peran Pengajaran Asdos' : 'Status & Target Nilai'}
                  </div>
                  <div className="font-bold text-emerald-700 mt-0.5">
                    {isTutor ? 'Bahan Ajar & Silabus Terverifikasi' : 'Proyeksi Nilai: A (3.82)'}
                  </div>
                  <div className="text-slate-600 font-mono">
                    {isTutor ? `Silabus Selesai: ${selectedEntityCourse.progressPercent}%` : `Tuntas: ${selectedEntityCourse.progressPercent}%`}
                  </div>
                </div>
              </div>

              {/* Garis Besar Rencana Tatap Muka (RPS 16 Minggu) */}
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-700" />
                  <span>Struktur Rencana Pembelajaran Semester (16 Tatap Muka)</span>
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  <div className="p-3 bg-slate-50/80 font-semibold flex items-center justify-between text-slate-800">
                    <span>Minggu 1 - 3: Fondasi Konseptual & Terminologi</span>
                    <span className="text-emerald-700 text-[11px] font-bold">Selesai</span>
                  </div>
                  <div className="p-3 bg-white flex items-center justify-between text-slate-700">
                    <span>Minggu 4 - 7: Aplikasi Analitis & Pencatatan Transaksi</span>
                    <span className="text-teal-700 text-[11px] font-bold">Sedang Berjalan</span>
                  </div>
                  <div className="p-3 bg-amber-50/60 font-semibold flex items-center justify-between text-amber-950">
                    <span>Minggu 8: Ujian Tengah Semester (UTS)</span>
                    <span className="text-amber-800 text-[11px] font-bold">
                      {isTutor ? 'Evaluasi Ujian Tengah Semester' : 'Target Nilai UTS'}
                    </span>
                  </div>
                  <div className="p-3 bg-white flex items-center justify-between text-slate-700">
                    <span>Minggu 9 - 15: Studi Kasus Lanjutan & Analisis Laporan</span>
                    <span className="text-slate-400 text-[11px]">Belum Mulai</span>
                  </div>
                  <div className="p-3 bg-slate-50/80 font-semibold flex items-center justify-between text-slate-800">
                    <span>Minggu 16: Ujian Akhir Semester (UAS)</span>
                    <span className="text-slate-400 text-[11px]">Evaluasi Akhir</span>
                  </div>
                </div>
              </div>

              {/* Buku Referensi & Diktat */}
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-700" />
                  <span>Buku Teks & Diktat Standar RPS</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <li>Diktat Kuliah Mandiri FEB Tim Dosen Pengampu (Edisi Revisi 2026).</li>
                  <li>Referensi Standar Internasional & Buku Pedoman Praktikum Asdos.</li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEntityCourse(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-950 font-bold text-xs hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Buka repositori materi PPT & Video resmi di Google Drive"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Materi Drive (PPT & Video)</span>
                  <ExternalLink className="w-3 h-3 text-amber-700/70" />
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedEntityCourse.title;
                    setSelectedEntityCourse(null);
                    onSelectCourseForQuiz(title);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-bold text-xs hover:bg-teal-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileQuestion className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isTutor ? 'Tugaskan Soal Matkul Ini' : 'Kuis Matkul Ini'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const id = selectedEntityCourse.id;
                    setSelectedEntityCourse(null);
                    onSelectCourseForVideo(id);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{isTutor ? 'Lihat Diktat Rekaman Kuliah' : 'Tonton Video Kuliah'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
