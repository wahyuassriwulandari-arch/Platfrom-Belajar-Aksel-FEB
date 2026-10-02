import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  AlertCircle,
  X,
  Share2,
  CalendarCheck
} from 'lucide-react';
import { MentoringSession } from '../types';

interface UpcomingMentoringSectionProps {
  sessions: MentoringSession[];
  onToggleEnrollment: (sessionId: string) => void;
}

export const UpcomingMentoringSection: React.FC<UpcomingMentoringSectionProps> = ({
  sessions,
  onToggleEnrollment,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'enrolled' | 'akuntansi' | 'ekonomi' | 'kuantitatif'>('all');
  const [selectedMeetingModal, setSelectedMeetingModal] = useState<MentoringSession | null>(null);

  const filteredSessions = sessions.filter(session => {
    if (activeFilter === 'enrolled') return session.isEnrolled;
    if (activeFilter === 'akuntansi') return session.courseTitle.toLowerCase().includes('akuntansi');
    if (activeFilter === 'ekonomi') return session.courseTitle.toLowerCase().includes('ekonomi');
    if (activeFilter === 'kuantitatif') return session.courseTitle.toLowerCase().includes('matematika') || session.courseTitle.toLowerCase().includes('statistika');
    return true;
  });

  const handleJoinOrEnroll = (session: MentoringSession) => {
    if (session.isEnrolled) {
      setSelectedMeetingModal(session);
    } else {
      onToggleEnrollment(session.id);
    }
  };

  return (
    <section id="section-sesi-mentoring" className="py-16 md:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
              <CalendarIcon className="w-4 h-4 text-teal-700" />
              <span>Bimbingan & Responsi Asdos</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Sesi Mentoring
            </h2>
            <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
              Daftar kronologis sesi bimbingan tatap muka online bersama asisten dosen dan tutor senior FEB.
              Pilih sesi untuk berdiskusi langsung, bedah kisi-kisi soal, atau pendalaman materi perkuliahan.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                activeFilter === 'all'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua Sesi
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('enrolled')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border flex items-center gap-1.5 ${
                activeFilter === 'enrolled'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-teal-800 border-teal-200 hover:bg-teal-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Terdaftar Saya ({sessions.filter(s => s.isEnrolled).length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('akuntansi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                activeFilter === 'akuntansi'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Akuntansi
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ekonomi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                activeFilter === 'ekonomi'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Ilmu Ekonomi
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('kuantitatif')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                activeFilter === 'kuantitatif'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Kuantitatif
            </button>
          </div>
        </div>

        {/* Chronological List of Mentoring Sessions */}
        <div className="space-y-4">
          {filteredSessions.map((session, index) => {
            const isClosest = index === 0;
            return (
              <div
                key={session.id}
                id={`mentoring-card-${session.id}`}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md ${
                  session.isEnrolled 
                    ? 'border-teal-700/40 bg-linear-to-r from-white via-white to-teal-50/30' 
                    : isClosest 
                      ? 'border-amber-400/80 shadow-xs' 
                      : 'border-slate-200'
                }`}
              >
                {/* Left Block: Chronological Time Badge & Core Information */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-1">
                  
                  {/* Date Pill (High visual clarity) */}
                  <div className={`p-3.5 rounded-xl text-center shrink-0 w-full sm:w-28 border ${
                    session.isEnrolled 
                      ? 'bg-teal-50 border-teal-200 text-teal-900'
                      : isClosest
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {session.day}
                    </div>
                    <div className="font-heading font-bold text-lg text-slate-900 leading-tight my-0.5">
                      {session.dateStr.split(' ')[0]} {session.dateStr.split(' ')[1]}
                    </div>
                    <div className="text-[11px] font-mono font-medium text-slate-600">
                      {session.timeSlot.split(' ')[0]}
                    </div>
                  </div>

                  {/* Topic & Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-sm">
                        {session.courseTitle}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-teal-50 text-teal-800 border border-teal-200">
                        {session.type}
                      </span>
                      {isClosest && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-700" /> Sesi Terdekat
                        </span>
                      )}
                      {session.isEnrolled && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-800 text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Kamu Terdaftar
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-snug">
                      {session.sessionTopic}
                    </h3>

                    {/* Tutor Profile Details */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-[10px] flex items-center justify-center">
                          {session.tutorPhotoInitials}
                        </div>
                        <span className="font-medium text-slate-800">{session.tutorName}</span>
                        <span className="text-slate-400">({session.tutorTitle})</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{session.timeSlot}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Video className="w-3.5 h-3.5 text-teal-700" />
                        <span>{session.meetingPlatform}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Block: Slots & High Contrast "Ikuti Sesi" Button */}
                <div className="flex sm:flex-row lg:flex-col items-center sm:justify-between lg:items-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                  
                  <div className="text-left sm:text-right text-xs">
                    <span className="text-slate-500 font-medium">Kapasitas Kursi:</span>
                    <div className="font-heading font-bold text-sm text-slate-900">
                      <span className={session.availableSlots <= 3 ? 'text-amber-700 font-bold' : 'text-teal-800 font-bold'}>
                        {session.availableSlots} kursi tersisa
                      </span>
                      <span className="text-slate-400 font-normal text-xs"> / {session.totalSlots}</span>
                    </div>
                  </div>

                  {/* High Contrast Primary CTA "Ikuti Sesi" */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id={`btn-ikuti-sesi-${session.id}`}
                      onClick={() => handleJoinOrEnroll(session)}
                      className={`px-5 py-3 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                        session.isEnrolled
                          ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-md'
                          : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md hover:shadow-lg border border-amber-500/40 font-bold active:scale-95'
                      }`}
                    >
                      <Video className={`w-4 h-4 ${session.isEnrolled ? 'text-white' : 'text-slate-950'}`} />
                      <span>{session.isEnrolled ? 'Masuk Ruang Sesi' : 'Ikuti Sesi'}</span>
                    </button>

                    {/* Toggle RSVP / Cancel if enrolled */}
                    {session.isEnrolled && (
                      <button
                        type="button"
                        onClick={() => onToggleEnrollment(session.id)}
                        className="p-2.5 text-xs text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                        title="Batalkan RSVP"
                      >
                        Batal
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Ruang Sesi Mentoring Digital Modal */}
      {selectedMeetingModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedMeetingModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-teal-800 text-white flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-900/80 px-2.5 py-0.5 rounded-sm border border-teal-600">
                  Ruang Pertemuan Digital FEB
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-2">
                  {selectedMeetingModal.sessionTopic}
                </h3>
                <p className="text-xs text-teal-200 mt-1">
                  {selectedMeetingModal.courseTitle} • {selectedMeetingModal.tutorName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMeetingModal(null)}
                className="p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-teal-700 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700">
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Jadwal Sesi:</span>
                  <span className="font-bold text-slate-900">{selectedMeetingModal.day}, {selectedMeetingModal.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Platform:</span>
                  <span className="font-bold text-teal-800">{selectedMeetingModal.meetingPlatform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Meeting ID:</span>
                  <span className="font-bold text-slate-900">892-4122-0941</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passcode Masuk:</span>
                  <span className="font-bold text-teal-700">AKSELFEB26</span>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
                  Tata Tertib Sesi Responsi FEB:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Gunakan format nama: <strong>NIM_Nama Lengkap (Contoh: 04112_Wahyu Assri)</strong>.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Siapkan kalkulator ilmiah atau kertas buram untuk perhitungan kasus.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Sesi akan direkam dan diunggah ke Ruang Video Playlist dalam 1x24 jam.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedMeetingModal(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Tutup
              </button>
              <a
                href="#live-meet-demo"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Membuka sesi Google Meet / Zoom: ${selectedMeetingModal.sessionTopic} bersama ${selectedMeetingModal.tutorName}.`);
                  setSelectedMeetingModal(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4 text-slate-950" />
                <span>Buka Google Meet / Zoom Sekarang</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
