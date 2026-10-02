import React, { useState } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { TopHeader } from './components/TopHeader';
import { DashboardNavBar } from './components/DashboardNavBar';
import { OverviewSection } from './components/OverviewSection';
import { ProgressAndResumeSection } from './components/ProgressAndResumeSection';
import { CourseDataTableManagement } from './components/CourseDataTableManagement';
import { VideoPlaylistSection } from './components/VideoPlaylistSection';
import { MentoringDashboardContainer } from './components/MentoringDashboardContainer';
import { StudentProfileSection } from './components/StudentProfileSection';
import { CoreSubjectsSection } from './components/CoreSubjectsSection';
import { AdminManagementHub } from './components/AdminManagementHub';
import { LoginPortalDashboard } from './components/LoginPortalDashboard';
import { TutorHomeOverview } from './components/TutorHomeOverview';

import { 
  studentUserProfile, 
  adminUserProfile, 
  coursesData, 
  playlistVideos, 
  quizQuestionsData, 
  weeklyMentoringData,
  coreMaterialsData 
} from './data/mockData';
import { QuizQuestion, UserProfile } from './types';

export default function App() {
  // Initial state: not logged in by default, so user is greeted by the initial Login Stage!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>(studentUserProfile);
  const [activeTab, setActiveTab] = useState('beranda');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [courses] = useState(coursesData);
  const [playlist, setPlaylist] = useState(playlistVideos);
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestionsData);
  const [materials, setMaterials] = useState(coreMaterialsData);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [mentoringSessions, setMentoringSessions] = useState(weeklyMentoringData);
  const [isMentorAvailable, setIsMentorAvailable] = useState(true);

  // Tab navigation helper: sets active tab and smoothly normalizes names
  const navigateToTab = (tabId: string) => {
    let resolvedId = tabId;
    if (tabId === 'hero' || tabId === 'home' || tabId === 'overview' || tabId === 'dasbor') resolvedId = 'beranda';
    if (tabId === 'materi-inti' || tabId === 'core-subjects' || tabId === 'materi' || tabId === 'materi-bank-soal' || tabId === 'kurikulum') resolvedId = 'modul-perkuliahan';
    if (tabId === 'progress' || tabId === 'resume' || tabId === 'analytics' || tabId === 'daftar-mentee' || tabId === 'daftar-mahasiswa') resolvedId = 'progres-belajar';
    if (tabId === 'courses' || tabId === 'quiz' || tabId === 'management') resolvedId = 'modul-perkuliahan';
    if (tabId === 'video') resolvedId = 'video-pembelajaran';
    if (tabId === 'mentoring' || tabId === 'tutors' || tabId === 'calendar' || tabId === 'jadwal-permintaan' || tabId === 'jadwal-mentoring') resolvedId = 'sesi-mentoring';
    if (tabId === 'panel-admin' || tabId === 'admin') resolvedId = user.role === 'admin' ? 'modul-perkuliahan' : 'panel-admin';
    if (tabId === 'profil' || tabId === 'profile' || tabId === 'settings' || tabId === 'profil-kinerja' || tabId === 'profil-pengajar') resolvedId = 'profil-mahasiswa';

    setActiveTab(resolvedId);
  };

  // Handler for predictive search suggestions
  const handleSelectSuggestion = (targetSection: string, detailId?: string) => {
    navigateToTab(targetSection);
    if (targetSection === 'modul-perkuliahan' || targetSection === 'quiz' || targetSection === 'management') {
      setActiveQuestionIndex(0);
    }
  };

  // Handler when clicking course to watch video
  const handleSelectCourseForVideo = (courseId?: string) => {
    navigateToTab('video-pembelajaran');
  };

  // Handler when clicking course to practice questions
  const handleSelectCourseForQuiz = (courseTitle: string) => {
    const foundIdx = questions.findIndex(q => 
      q.subject.toLowerCase().includes(courseTitle.toLowerCase()) || 
      courseTitle.toLowerCase().includes(q.subject.toLowerCase())
    );
    if (foundIdx !== -1) {
      setActiveQuestionIndex(foundIdx);
    } else {
      setActiveQuestionIndex(0);
    }
    navigateToTab('modul-perkuliahan');
  };

  // Authentication Handlers
  const handleLogin = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setIsLoggedIn(true);
    navigateToTab('beranda');
  };

  const handleExploreGuest = () => {
    setUser(studentUserProfile);
    setIsLoggedIn(true);
    navigateToTab('beranda');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Admin question management
  const handleAddQuestion = (newQ: QuizQuestion) => {
    setQuestions(prev => [newQ, ...prev]);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  // Toggle RSVP for mentoring session
  const handleToggleEnrollment = (sessionId: string) => {
    setMentoringSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          const newStatus = !s.isEnrolled;
          return {
            ...s,
            isEnrolled: newStatus,
            availableSlots: newStatus ? s.availableSlots - 1 : s.availableSlots + 1,
          };
        }
        return s;
      })
    );
  };

  const isSectionActive = (sectionName: string) => {
    if (activeTab === sectionName) return true;
    if (sectionName === 'beranda' && (activeTab === 'overview' || activeTab === 'home')) return true;
    if (sectionName === 'progres-belajar' && (activeTab === 'analytics' || activeTab === 'progress')) return true;
    if (sectionName === 'modul-perkuliahan' && (activeTab === 'materi-inti' || activeTab === 'management' || activeTab === 'quiz' || activeTab === 'courses')) return true;
    if (sectionName === 'video-pembelajaran' && activeTab === 'video') return true;
    if (sectionName === 'sesi-mentoring' && (activeTab === 'mentoring' || activeTab === 'calendar' || activeTab === 'tutors')) return true;
    if (sectionName === 'panel-admin' && (activeTab === 'admin' || activeTab === 'hub')) return true;
    if (sectionName === 'profil-mahasiswa' && (activeTab === 'profil' || activeTab === 'profile' || activeTab === 'settings')) return true;
    return false;
  };

  // 1. TAHAPAN AWAL: JIKA BELUM LOGIN, TAMPILKAN LOGIN DASHBOARD SEBAGAI SEKSI PALING DEPAN
  if (!isLoggedIn) {
    return (
      <LoginPortalDashboard
        onLogin={handleLogin}
        onExploreGuest={handleExploreGuest}
      />
    );
  }

  // 2. SETELAH LOGIN: TAMPILKAN DASHBOARD UTAMA AKSEL FEB DENGAN AKSES EKSPLORASI PENUH
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Navigator Bar Samping (Sidebar) - Fixed on desktop (100vh) */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        user={user}
        isOpenMobile={isMobileNavOpen}
        setIsOpenMobile={setIsMobileNavOpen}
        onLogout={handleLogout}
      />

      {/* 2. Main Frame: Takes Remaining Width & 100vh Height (No Window Scroll) */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header (shrink-0) */}
        <TopHeader
          user={user}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onSelectSuggestion={handleSelectSuggestion}
          onLogout={handleLogout}
          isMentorAvailable={isMentorAvailable}
          onToggleMentorAvailability={() => setIsMentorAvailable(prev => !prev)}
        />

        {/* Dashboard Breadcrumbs & Section Tab Switcher (shrink-0) */}
        <DashboardNavBar
          activeTab={activeTab}
          setActiveTab={navigateToTab}
          user={user}
        />

        {/* 3. Section Container: 100% of remaining height, overflow-hidden */}
        <main className="flex-1 min-h-0 overflow-hidden relative bg-slate-50">
          
          {/* SECTION 1: BERANDA (DIFFERENTIATED FOR TUTOR vs MAHASISWA) */}
          <div 
            id="section-1-beranda" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('beranda') ? 'flex flex-col' : 'hidden'
            }`}
          >
            {user.role === 'admin' ? (
              <TutorHomeOverview
                user={user}
                questions={questions}
                courses={courses}
                mentoringSessions={mentoringSessions}
                onNavigate={navigateToTab}
                onAddNewQuestion={handleAddQuestion}
                isAvailable={isMentorAvailable}
                onToggleAvailability={() => setIsMentorAvailable(prev => !prev)}
              />
            ) : (
              <OverviewSection
                user={user}
                courses={courses}
                upcomingMentoring={mentoringSessions}
                onNavigate={navigateToTab}
                onGoToVideo={handleSelectCourseForVideo}
                onGoToQuiz={handleSelectCourseForQuiz}
              />
            )}
          </div>

          {/* SECTION 2: PROGRES BELAJAR */}
          <div 
            id="section-2-progres-belajar" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('progres-belajar') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <ProgressAndResumeSection
              courses={courses}
              user={user}
              onSelectCourseToStudy={(courseId) => handleSelectCourseForVideo(courseId)}
              onSelectCourseMentoring={() => navigateToTab('sesi-mentoring')}
              onGoToVideoPlayer={(courseCode) => navigateToTab('video-pembelajaran')}
              onGoToQuiz={(subjectTitle) => handleSelectCourseForQuiz(subjectTitle)}
            />
          </div>

          {/* SECTION 3: MODUL PERKULIAHAN & MATERI 4 MATKUL INTI & BANK SOAL */}
          <div 
            id="section-3-modul-perkuliahan" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('modul-perkuliahan') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <CourseDataTableManagement
              courses={courses}
              questions={questions}
              materials={materials}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
              onSelectCourseForVideo={handleSelectCourseForVideo}
              onSelectCourseForQuiz={handleSelectCourseForQuiz}
              user={user}
            />
          </div>

          {/* SECTION 5: VIDEO PEMBELAJARAN */}
          <div 
            id="section-4-video-pembelajaran" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('video-pembelajaran') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <VideoPlaylistSection
              playlist={playlist}
              onOpenQuizForVideo={(subject) => handleSelectCourseForQuiz(subject)}
            />
          </div>

          {/* SECTION 6: SESI MENTORING */}
          <div 
            id="section-5-sesi-mentoring" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('sesi-mentoring') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <MentoringDashboardContainer
              sessions={mentoringSessions}
              onToggleEnrollment={handleToggleEnrollment}
            />
          </div>

          {/* SECTION 7: PANEL ADMIN (Koordinator Asdos) */}
          <div 
            id="section-panel-admin" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('panel-admin') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <AdminManagementHub
              questions={questions}
              onAddQuestion={handleAddQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              courses={courses}
              mentoringSessions={mentoringSessions}
              onSwitchToStudentView={() => {
                setUser(studentUserProfile);
                navigateToTab('beranda');
              }}
            />
          </div>

          {/* SECTION 8: PROFIL MAHASISWA */}
          <div 
            id="section-6-profil-mahasiswa" 
            className={`w-full h-full overflow-hidden ${
              isSectionActive('profil-mahasiswa') ? 'flex flex-col' : 'hidden'
            }`}
          >
            <StudentProfileSection
              user={user}
            />
          </div>

        </main>

        {/* 4. Fixed Slim Status Bar */}
        <footer className="h-8 shrink-0 bg-white border-t border-slate-200 px-4 md:px-6 flex items-center justify-between text-[11px] text-slate-500 font-medium z-10">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-indigo-600' : 'bg-teal-600'}`} />
            <span>Fakultas Ekonomi dan Bisnis • Universitas Negeri Jakarta (UNJ)</span>
          </div>
          <div className="flex items-center gap-4">
            <span>T.A. 2026/2027 Ganjil</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span 
              className="text-rose-700 hover:text-rose-900 font-semibold cursor-pointer hover:underline"
              onClick={handleLogout}
              title="Keluar ke halaman login depan"
            >
              Keluar Akun ({user.role === 'admin' ? 'Admin' : 'Mahasiswa'})
            </span>
          </div>
        </footer>

      </div>

    </div>
  );
}
