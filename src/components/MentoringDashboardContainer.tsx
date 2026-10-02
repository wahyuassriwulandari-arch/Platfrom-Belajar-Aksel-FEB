import React, { useState } from 'react';
import { Calendar, Users, CalendarCheck, Clock } from 'lucide-react';
import { MentoringSession } from '../types';
import { UpcomingMentoringSection } from './UpcomingMentoringSection';
import { WeeklyCalendarSection } from './WeeklyCalendarSection';
import { TutorDirectorySection } from './TutorDirectorySection';

interface MentoringDashboardContainerProps {
  sessions: MentoringSession[];
  onToggleEnrollment: (sessionId: string) => void;
}

export const MentoringDashboardContainer: React.FC<MentoringDashboardContainerProps> = ({
  sessions,
  onToggleEnrollment,
}) => {
  const [subTab, setSubTab] = useState<'sessions' | 'calendar' | 'tutors'>('sessions');

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      
      {/* Fixed Sub-Nav Header */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-100">
                <Calendar className="w-4 h-4" />
              </span>
              <h2 className="font-heading font-bold text-xl text-slate-900">
                Sesi Mentoring
              </h2>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {sessions.filter(s => s.isEnrolled).length} Sesi Terdaftar
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Bimbingan intensif dan klinik asistensi bersama asisten dosen berprestasi FEB UNJ.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSubTab('sessions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'sessions'
                  ? 'bg-white text-teal-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Daftar Bimbingan</span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'calendar'
                  ? 'bg-white text-teal-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              <span>Kalender Mingguan</span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('tutors')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'tutors'
                  ? 'bg-white text-teal-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-teal-700" />
              <span>Direktori Tutor Asdos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Internal Scroll Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {subTab === 'sessions' && (
            <UpcomingMentoringSection
              sessions={sessions}
              onToggleEnrollment={onToggleEnrollment}
            />
          )}

          {subTab === 'calendar' && (
            <WeeklyCalendarSection
              sessions={sessions}
              onToggleEnrollment={onToggleEnrollment}
            />
          )}

          {subTab === 'tutors' && (
            <TutorDirectorySection />
          )}
        </div>
      </div>

    </div>
  );
};
