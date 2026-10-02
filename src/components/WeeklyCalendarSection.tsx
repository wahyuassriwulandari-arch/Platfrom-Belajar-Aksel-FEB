import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { MentoringSession } from '../types';

interface WeeklyCalendarSectionProps {
  sessions: MentoringSession[];
  onToggleEnrollment: (sessionId: string) => void;
}

export const WeeklyCalendarSection: React.FC<WeeklyCalendarSectionProps> = ({
  sessions,
  onToggleEnrollment,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Semua');

  const days = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const filteredSessions = selectedDay === 'Semua'
    ? sessions
    : sessions.filter(s => s.day === selectedDay);

  const getSessionTypeBadge = (type: string) => {
    switch (type) {
      case 'Klinik Bedah Soal':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case '1-on-1 Mentoring':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Study Group Terarah':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <section id="section-calendar" className="py-16 md:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Agenda Mentoring Mingguan</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Jadwal Bimbingan Mingguan Tutor FEB
            </h2>
            <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
              Jadwal temu langsung daring maupun luring bersama asisten dosen dan tutor senior. 
              Daftarkan diri pada sesi bimbingan mingguan untuk mengupas tuntas materi yang belum dipahami di kelas.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 shrink-0">
            <span>Pekan Akademik Ke-3 • 21 - 27 September 2026</span>
          </div>
        </div>

        {/* Days of the Week Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                selectedDay === day
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Weekly Calendar Layout Grid of Sessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              id={`session-card-${session.id}`}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div>
                {/* Session Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-heading">
                    <CalendarCheck className="w-4 h-4 text-teal-700" />
                    <span>{session.day}, {session.dateStr}</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${getSessionTypeBadge(session.type)}`}>
                    {session.type}
                  </span>
                </div>

                {/* Course Name */}
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wide mb-1 font-heading">
                  {session.courseTitle}
                </div>

                {/* Session Topic */}
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4 leading-snug">
                  {session.sessionTopic}
                </h3>

                {/* Time & Platform Info */}
                <div className="space-y-2 mb-6 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{session.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{session.meetingPlatform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className={session.availableSlots <= 3 ? 'text-amber-800 font-semibold' : 'text-slate-700'}>
                      Sisa Kursi: {session.availableSlots} dari {session.totalSlots} kuota
                    </span>
                  </div>
                </div>

                {/* Tutor Profile Block */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-800 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                    {session.tutorPhotoInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate font-heading">
                      {session.tutorName}
                    </div>
                    <div className="text-[11px] text-slate-700 truncate font-medium">
                      {session.tutorTitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-4 border-t border-slate-100">
                {session.isEnrolled ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert(`Membuka ruang ${session.meetingPlatform} untuk sesi ${session.sessionTopic}.`)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-heading font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Masuk Ruang Sesi</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleEnrollment(session.id)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      title="Batalkan pendaftaran sesi"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onToggleEnrollment(session.id)}
                    disabled={session.availableSlots === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-heading font-semibold transition-colors cursor-pointer"
                  >
                    {session.availableSlots === 0 ? 'Kuota Penuh' : 'Daftar Ikuti Sesi (Gratis)'}
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
