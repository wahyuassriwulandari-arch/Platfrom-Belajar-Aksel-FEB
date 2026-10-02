import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  Download, 
  FileText, 
  Clock, 
  BookOpen, 
  HelpCircle,
  Bookmark,
  Share2,
  FolderOpen,
  ExternalLink,
  Presentation
} from 'lucide-react';
import { PlaylistItem } from '../types';
import { GOOGLE_DRIVE_FOLDER_URL } from '../data/mockData';

interface VideoPlaylistSectionProps {
  playlist: PlaylistItem[];
  onOpenQuizForVideo: (subject: string) => void;
}

export const VideoPlaylistSection: React.FC<VideoPlaylistSectionProps> = ({
  playlist,
  onOpenQuizForVideo,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(2); // Default to Module 3 (Jurnal Penyesuaian)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.0x');
  const [bookmarked, setBookmarked] = useState(false);
  const [progressSec, setProgressSec] = useState(380); // simulated seconds

  const activeVideo = playlist[activeVideoIndex] || playlist[0];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedCycle = () => {
    const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div id="section-video-pembelajaran" className="h-full flex flex-col overflow-hidden bg-slate-50">
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-teal-800 font-heading mb-1 flex items-center gap-1.5">
            <Video className="w-4 h-4 text-teal-700" />
            <span>Video Pembelajaran</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Koleksi Full HD 1080p</span>
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Video Pembelajaran
          </h2>
          <p className="font-body text-slate-500 text-xs md:text-sm mt-1 max-w-[70ch] leading-relaxed">
            Dipandu oleh asisten dosen dan tutor senior FEB UNJ. Setiap materi dirancang ringkas, berfokus pada konsep inti, dan dilengkapi bedah soal persiapan ujian.
          </p>
        </div>

        {/* Video Player with Playlist Layout (Side-by-side on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left / Main Column: Video Player & Study Notes (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Realistic Video Canvas Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 shadow-md">
              {/* Video Simulated Screen with Visual Backdrop */}
              <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
                <img 
                  src={activeVideo.videoUrl} 
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />

                {/* Center Big Play Button Overlay */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="relative z-10 w-20 h-20 rounded-full bg-teal-700/90 hover:bg-teal-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
                >
                  {isPlaying ? (
                    <Pause className="w-9 h-9 fill-current" />
                  ) : (
                    <Play className="w-9 h-9 fill-current translate-x-0.5" />
                  )}
                </button>

                {/* Top Video Overlay Info */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-white drop-shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-teal-900/90 border border-teal-600/50 text-teal-200 text-xs font-semibold font-heading">
                      Pengantar Akuntansi I
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {activeVideo.chapter}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                        bookmarked ? 'bg-teal-600 text-white' : 'bg-black/50 text-slate-200 hover:text-white'
                      }`}
                      title="Simpan Bookmark Menit Belajar"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Custom Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col gap-2">
                  {/* Scrubber Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-700 rounded-full cursor-pointer relative overflow-hidden group">
                    <div 
                      className="h-full bg-teal-500 rounded-full relative"
                      style={{ width: isPlaying ? '65%' : '42%' }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-white text-xs pt-1">
                    {/* Controls Left */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="hover:text-teal-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-teal-400 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="font-mono text-[11px] text-slate-300">
                        {isPlaying ? '18:40' : '14:22'} / {activeVideo.duration}
                      </span>
                    </div>

                    {/* Controls Right */}
                    <div className="flex items-center gap-3 font-medium">
                      <button
                        type="button"
                        onClick={handleSpeedCycle}
                        className="px-2 py-0.5 rounded-sm bg-white/20 hover:bg-white/30 text-xs font-mono font-semibold"
                        title="Ubah kecepatan putar"
                      >
                        {playbackSpeed}
                      </button>
                      <button
                        type="button"
                        className="hover:text-teal-400 transition-colors"
                        title="Layar Penuh"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Video Meta Info & Key Concepts */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 font-heading">
                  {activeVideo.chapter}
                </span>
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Durasi: {activeVideo.duration} Menit
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">
                {activeVideo.title}
              </h3>

              <p className="font-body text-slate-700 text-sm leading-[1.6] mb-6">
                {activeVideo.notesSummary}
              </p>

              {/* Key Concept Chips */}
              <div className="mb-6">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-heading">
                  Poin Konsep Kunci yang Dipelajari:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeVideo.keyConcepts.map((concept, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800"
                    >
                      ✓ {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons for Study */}
              <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-200">
                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-heading font-bold transition-colors cursor-pointer shadow-2xs"
                  title="Buka slide presentasi PPT resmi dari Google Drive"
                >
                  <Presentation className="w-4 h-4 text-amber-700" />
                  <span>Buka Slide PPT (Google Drive)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-700/70" />
                </a>

                <a
                  href={GOOGLE_DRIVE_FOLDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-heading font-semibold transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 text-teal-700" />
                  <span>Folder Video & PPT Drive</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenQuizForVideo('Pengantar Akuntansi I')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-heading font-semibold transition-colors cursor-pointer ml-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Uji Pemahaman Materi Ini</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Playlist Layout (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col">
            
            {/* Google Drive Integrated Box */}
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-amber-50/80 via-white to-teal-50/80 border border-amber-200/90 text-xs space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-slate-900 flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-amber-600" />
                  <span>Google Drive Materi FEB</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Terhubung
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Seluruh slide PPT dan video materi tersimpan di Google Drive resmi UNJ:
              </p>
              <a
                href={GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Buka Folder Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  Daftar Playlist Modul
                </h4>
                <p className="text-xs text-slate-700 font-medium mt-0.5">
                  Pengantar Akuntansi I • 5 Video
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-md bg-teal-100 text-teal-800 font-heading">
                2/5 Selesai
              </span>
            </div>

            {/* Scrollable Playlist Items */}
            <div className="space-y-3">
              {playlist.map((item, index) => {
                const isActive = index === activeVideoIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveVideoIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex flex-col gap-2 ${
                      isActive
                        ? 'bg-white border-teal-700 shadow-xs ring-1 ring-teal-700'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-600 uppercase font-heading">
                        Video 0{index + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-teal-800 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                            Selesai
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-600 font-medium">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`font-heading font-bold text-sm leading-snug ${
                      isActive ? 'text-teal-900' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </div>

                    <div className="text-[11px] text-slate-700 line-clamp-1 font-medium">
                      {item.chapter}
                    </div>

                    {isActive && (
                      <div className="mt-1 pt-2 border-t border-teal-100 flex items-center justify-between text-teal-800 font-semibold text-[11px]">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                          Sedang Diputar
                        </span>
                        <span>Klik untuk jeda</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Playlist Bottom Summary */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-700 leading-normal font-medium">
              💡 <strong>Tips Belajar:</strong> Tonton video hingga tuntas sebelum mengerjakan kuis agar alur pencatatan akuntansi terintegrasi dalam ingatan jangka panjang.
            </div>

          </div>

        </div>

        </div>
      </div>
    </div>
  );
};
