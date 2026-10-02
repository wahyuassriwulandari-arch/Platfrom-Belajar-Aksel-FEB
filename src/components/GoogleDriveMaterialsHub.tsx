import React, { useState } from 'react';
import { 
  FolderOpen, 
  ExternalLink, 
  Play, 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Plus, 
  Maximize2, 
  Clock, 
  User, 
  Video, 
  BookOpen, 
  Presentation, 
  Layers,
  Copy,
  Check,
  Share2
} from 'lucide-react';
import { DriveMaterialItem, UserProfile } from '../types';
import { GOOGLE_DRIVE_FOLDER_URL } from '../data/mockData';

interface GoogleDriveMaterialsHubProps {
  materials: DriveMaterialItem[];
  user?: UserProfile;
  onAddMaterial?: (newMaterial: DriveMaterialItem) => void;
  onSelectCourseForQuiz?: (subjectTitle: string) => void;
}

export const GoogleDriveMaterialsHub: React.FC<GoogleDriveMaterialsHubProps> = ({
  materials: initialMaterials,
  user,
  onAddMaterial,
  onSelectCourseForQuiz,
}) => {
  const isTutor = user?.role === 'admin';
  const [materialsList, setMaterialsList] = useState<DriveMaterialItem[]>(initialMaterials);
  const [selectedSubject, setSelectedSubject] = useState<string>('Semua');
  const [selectedType, setSelectedType] = useState<'all' | 'ppt' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Modals
  const [activePptModal, setActivePptModal] = useState<DriveMaterialItem | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<DriveMaterialItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  
  // New Material Form Modal (for Tutors)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('EKA101');
  const [newSubjectTitle, setNewSubjectTitle] = useState('Pengantar Akuntansi I');
  const [newType, setNewType] = useState<'ppt' | 'video'>('ppt');
  const [newChapter, setNewChapter] = useState('');
  const [newDurationOrPages, setNewDurationOrPages] = useState('');
  const [newDriveUrl, setNewDriveUrl] = useState(GOOGLE_DRIVE_FOLDER_URL);
  const [newDescription, setNewDescription] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const subjects = [
    'Semua',
    'Pengantar Akuntansi I',
    'Matematika Ekonomi & Bisnis',
    'Pengantar Ekonomi Makro',
    'Pengantar Ekonomi Mikro',
    'Bahasa Inggris',
    'Pengantar Manajemen'
  ];

  // Filtered materials
  const filteredMaterials = materialsList.filter(item => {
    if (selectedSubject !== 'Semua' && item.subjectTitle !== selectedSubject) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subjectTitle.toLowerCase().includes(q) ||
        item.courseCode.toLowerCase().includes(q) ||
        item.chapter.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyDriveUrl = () => {
    navigator.clipboard?.writeText(GOOGLE_DRIVE_FOLDER_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenPptModal = (item: DriveMaterialItem) => {
    setActivePptModal(item);
    setCurrentSlideIndex(0);
  };

  const handleClosePptModal = () => {
    setActivePptModal(null);
    setCurrentSlideIndex(0);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: DriveMaterialItem = {
      id: `drive-custom-${Date.now()}`,
      title: newTitle,
      courseCode: newCourseCode,
      subjectTitle: newSubjectTitle,
      type: newType,
      fileFormat: newType === 'ppt' ? 'PPTX' : 'MP4',
      chapter: newChapter || 'Materi Tambahan Semester 1',
      durationOrPages: newDurationOrPages || (newType === 'ppt' ? '12 Slide PPTX' : '25:00 Menit'),
      author: user?.name || 'Tim Pengajar FEB UNJ',
      authorRole: 'Koordinator Materi & Asisten Dosen',
      driveUrl: newDriveUrl || GOOGLE_DRIVE_FOLDER_URL,
      driveFolderUrl: GOOGLE_DRIVE_FOLDER_URL,
      uploadDate: 'Hari ini',
      fileSize: newType === 'ppt' ? '4.2 MB' : '185 MB',
      description: newDescription || 'Materi tambahan yang disinkronkan langsung dari Google Drive Repositori FEB.',
      keyTakeaways: [
        'Materi resmi yang diunggah dan terverifikasi oleh pengajar FEB UNJ.',
        'Dapat diakses langsung secara online maupun diunduh via Google Drive.',
      ],
      thumbnailUrl: newType === 'ppt'
        ? 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      slides: newType === 'ppt' ? [
        {
          slideNumber: 1,
          title: newTitle,
          points: [
            'Materi perkuliahan FEB terintegrasi repositori Google Drive.',
            'Disusun untuk mendukung bimbingan mandiri dan persiapan ujian UTS/UAS.',
          ],
          diagramExplanation: 'Slide pengantar materi kurikulum resmi semester ganjil 2026.',
        }
      ] : undefined
    };

    setMaterialsList(prev => [newItem, ...prev]);
    if (onAddMaterial) onAddMaterial(newItem);

    // Reset & close
    setNewTitle('');
    setNewChapter('');
    setNewDurationOrPages('');
    setNewDescription('');
    setIsAddModalOpen(false);

    setToastMessage(`✅ Materi "${newItem.title}" berhasil diintegrasikan ke website!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 border border-teal-500 text-slate-100 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">✕</button>
        </div>
      )}

      {/* 1. GOOGLE DRIVE INTEGRATION HERO BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-800/40 p-6 md:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold">
                <FolderOpen className="w-3.5 h-3.5 text-teal-400" />
                Google Drive Repositori Terhubung
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Folder ID: 1VYC-dn-ttoX7QqshGBwWprrNThN3BvRP
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight">
              Repositori Materi PPT & Video Pembelajaran FEB
            </h3>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Seluruh bahan tayang slide presentasi (PPT/PPTX) dan rekaman video kuliah dari Google Drive telah terintegrasi ke dalam sistem Aksel FEB. Mahasiswa dan pengajar dapat langsung memutar video, menelaah slide presentasi interaktif, atau membuka tautan sumber di Google Drive.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-teal-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                {materialsList.filter(m => m.type === 'ppt').length} Slide PPTX Siap Tayang
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-sky-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                {materialsList.filter(m => m.type === 'video').length} Video Pembelajaran Full HD
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka Google Drive Resmi</span>
            </a>

            <button
              type="button"
              onClick={handleCopyDriveUrl}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Link Drive Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Salin Tautan Drive</span>
                </>
              )}
            </button>

            {/* If Tutor: Add Material button */}
            {isTutor && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer mt-1"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Tautkan Materi Drive Baru</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Format Tabs (Semua / PPT / Video) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Format ({materialsList.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('ppt')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedType === 'ppt'
                  ? 'bg-amber-500 text-slate-950 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-amber-600" />
              <span>Slide PPT ({materialsList.filter(m => m.type === 'ppt').length})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedType === 'video'
                  ? 'bg-teal-700 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-teal-300" />
              <span>Video Kuliah ({materialsList.filter(m => m.type === 'video').length})</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi PPT, video, topik, atau bab..."
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-slate-400" />
            Mata Kuliah:
          </span>
          {subjects.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubject(sub)}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-teal-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MATERIALS GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white border border-slate-200 hover:border-teal-600/50 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Media Thumbnail with Overlay Badge */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                />
                
                {/* Type Badge */}
                <div className="absolute top-2.5 left-2.5">
                  {item.type === 'ppt' ? (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-heading font-bold text-[11px] shadow-sm flex items-center gap-1.5">
                      <Presentation className="w-3.5 h-3.5" />
                      <span>{item.fileFormat}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-teal-700 text-white font-heading font-bold text-[11px] shadow-sm flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      <span>Video Kuliah</span>
                    </span>
                  )}
                </div>

                {/* Duration / Pages Badge */}
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[11px] font-mono font-medium backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.durationOrPages}
                  </span>
                </div>

                {/* Big Center Play / Open Trigger for Quick Preview */}
                <button
                  type="button"
                  onClick={() => item.type === 'ppt' ? handleOpenPptModal(item) : setActiveVideoModal(item)}
                  className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title={item.type === 'ppt' ? 'Buka Presentasi PPT' : 'Putar Video Kuliah'}
                >
                  <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    {item.type === 'ppt' ? (
                      <Presentation className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    )}
                  </div>
                </button>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {item.courseCode}
                  </span>
                  <span>{item.uploadDate}</span>
                </div>

                <h4 
                  onClick={() => item.type === 'ppt' ? handleOpenPptModal(item) : setActiveVideoModal(item)}
                  className="font-heading font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2 cursor-pointer"
                >
                  {item.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>Oleh: <strong className="text-slate-800">{item.author}</strong></span>
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
              <a
                href={item.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-teal-800 flex items-center gap-1 py-1.5 transition-colors cursor-pointer"
                title="Buka file langsung di folder Google Drive resmi"
              >
                <FolderOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>Google Drive</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                type="button"
                onClick={() => item.type === 'ppt' ? handleOpenPptModal(item) : setActiveVideoModal(item)}
                className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                  item.type === 'ppt'
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
                    : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
              >
                {item.type === 'ppt' ? (
                  <>
                    <Presentation className="w-3.5 h-3.5 text-amber-700" />
                    <span>Buka Slide</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Tonton Video</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="font-heading font-bold text-slate-800 text-sm">
            Tidak ada materi yang cocok dengan pencarian
          </h4>
          <p className="text-xs text-slate-500">
            Coba ubah kata kunci atau pilih opsi filter "Semua Mata Kuliah".
          </p>
        </div>
      )}

      {/* 4. MODAL: INTERACTIVE PPT SLIDE PRESENTATION CAROUSEL */}
      {activePptModal && activePptModal.slides && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
            
            {/* Modal Header */}
            <div className="p-4 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                  <Presentation className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-amber-400 font-mono font-semibold">{activePptModal.courseCode}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300">{activePptModal.subjectTitle}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    {activePptModal.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePptModal.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Unduh slide presentasi asli atau buka di Google Drive"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  <span className="hidden sm:inline">Buka di Drive</span>
                </a>
                <button
                  type="button"
                  onClick={handleClosePptModal}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Slide Viewer Canvas (Simulated Slide Screen) */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6 bg-slate-950">
              
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-inner min-h-[340px] flex flex-col justify-between">
                
                {/* Top Slide Meta */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Slide {currentSlideIndex + 1} / {activePptModal.slides.length}
                  </span>
                  <span className="text-xs text-slate-400">
                    Materi Kuliah FEB UNJ • Semester Ganjil
                  </span>
                </div>

                {/* Slide Main Content */}
                <div className="space-y-4 my-auto">
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-white">
                    {activePptModal.slides[currentSlideIndex].title}
                  </h2>

                  <ul className="space-y-2.5 text-sm text-slate-200">
                    {activePptModal.slides[currentSlideIndex].points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-amber-400 font-bold text-base leading-none mt-1">▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Diagram / Note Box */}
                  {activePptModal.slides[currentSlideIndex].diagramExplanation && (
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-teal-300 space-y-1">
                      <div className="font-bold font-heading text-teal-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Catatan Visual & Konsep Kunci:</span>
                      </div>
                      <p className="leading-relaxed">
                        {activePptModal.slides[currentSlideIndex].diagramExplanation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Slide Bottom Bar */}
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span>Penyusun: {activePptModal.author} ({activePptModal.authorRole})</span>
                  <span>Aksel FEB • Sumber: Google Drive 1VYC-dn...</span>
                </div>

              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Slide Sebelumnya</span>
                </button>

                {/* Slide Pills indicator */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {activePptModal.slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-6 h-6 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        currentSlideIndex === idx
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentSlideIndex === activePptModal.slides.length - 1}
                  onClick={() => setCurrentSlideIndex(prev => Math.min(activePptModal.slides!.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Slide Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. MODAL: INTERACTIVE VIDEO LECTURE PLAYER */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
            
            {/* Header */}
            <div className="p-4 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-teal-700 text-white font-bold text-xs">
                  <Video className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-teal-400 font-mono">{activeVideoModal.courseCode} • {activeVideoModal.chapter}</span>
                  <h3 className="font-heading font-bold text-base text-white">
                    {activeVideoModal.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* Video Player Canvas */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg flex items-center justify-center">
                <img
                  src={activeVideoModal.thumbnailUrl}
                  alt={activeVideoModal.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />

                {/* Big Center Play Trigger */}
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="relative z-10 w-16 h-16 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105 cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </button>

                {/* Player Bottom Control Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-teal-400">1080p Full HD</span>
                    <span>•</span>
                    <span className="text-slate-300">{activeVideoModal.durationOrPages}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPlaybackSpeed(s => s === '1.0x' ? '1.5x' : s === '1.5x' ? '2.0x' : '1.0x')}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono cursor-pointer"
                    >
                      {playbackSpeed}
                    </button>
                    <a
                      href={activeVideoModal.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-teal-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Buka File Asli</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Video Takeaways */}
              <div className="space-y-2 text-xs">
                <h4 className="font-heading font-bold text-white text-sm">
                  Poin Pembahasan Video:
                </h4>
                <ul className="space-y-1.5 text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {activeVideoModal.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <a
                href={activeVideoModal.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>Lihat di Folder Google Drive 1VYC-dn...</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. MODAL: FORM TAMBAH MATERI GOOGLE DRIVE (KHUSUS PENGAJAR / TUTOR) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <FolderOpen className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Tautkan Materi Baru dari Google Drive
                  </h3>
                  <p className="text-xs text-slate-400">
                    Tambahkan bahan tayang PPT atau rekaman video kuliah ke website Aksel FEB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Judul Materi PPT / Video:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Slide PPT Bab 6: Neraca Lajur & Pembukuan Penutup"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Mata Kuliah:
                  </label>
                  <select
                    value={newSubjectTitle}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewSubjectTitle(title);
                      if (title.includes('Akuntansi')) setNewCourseCode('EKA101');
                      else if (title.includes('Matematika')) setNewCourseCode('EKQ101');
                      else if (title.includes('Makro')) setNewCourseCode('EKI102');
                      else if (title.includes('Mikro')) setNewCourseCode('EKI101');
                      else if (title.includes('Inggris')) setNewCourseCode('EKU101');
                      else setNewCourseCode('EKM101');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="Pengantar Akuntansi I">Pengantar Akuntansi I</option>
                    <option value="Matematika Ekonomi & Bisnis">Matematika Ekonomi & Bisnis</option>
                    <option value="Pengantar Ekonomi Makro">Pengantar Ekonomi Makro</option>
                    <option value="Pengantar Ekonomi Mikro">Pengantar Ekonomi Mikro</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Pengantar Manajemen">Pengantar Manajemen</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Format Konten:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'ppt' | 'video')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                  >
                    <option value="ppt">Slide Presentasi PPT (PPTX / Slides)</option>
                    <option value="video">Video Kuliah (MP4 / Webm)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Bab / Pertemuan:
                  </label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="Contoh: Bab 5: Jurnal Penyesuaian"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {newType === 'ppt' ? 'Jumlah Slide:' : 'Durasi Video:'}
                  </label>
                  <input
                    type="text"
                    value={newDurationOrPages}
                    onChange={(e) => setNewDurationOrPages(e.target.value)}
                    placeholder={newType === 'ppt' ? "Contoh: 14 Slide PPTX" : "Contoh: 28:30 Menit"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Tautan File / Folder Google Drive:
                </label>
                <input
                  type="url"
                  required
                  value={newDriveUrl}
                  onChange={(e) => setNewDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Tautan otomatis terhubung ke repositori Drive: <code>1VYC-dn-ttoX7QqshGBwWprrNThN3BvRP</code>
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Ringkasan & Poin Pembahasan:
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Tuliskan gambaran ringkas materi untuk mahasiswa bimbingan..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-bold text-xs shadow-md cursor-pointer"
                >
                  Simpan & Tautkan Materi
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
