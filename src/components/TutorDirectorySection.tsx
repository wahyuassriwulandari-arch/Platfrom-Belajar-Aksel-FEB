import React from 'react';
import { Users, Award, BookOpen, MessageSquare, Star, CheckCircle } from 'lucide-react';

export const TutorDirectorySection: React.FC = () => {
  const tutors = [
    {
      name: 'Nabila Zahra, S.Ak.',
      initials: 'NZ',
      department: 'Departemen Akuntansi',
      title: 'Asisten Dosen Pengantar Akuntansi I & II',
      gpa: '3.96',
      specialty: 'Jurnal Penyesuaian, Laporan Keuangan SAK, & Auditing',
      sessionsCompleted: 142,
      rating: '4.95',
    },
    {
      name: 'Fadhil Pratama, S.E.',
      initials: 'FP',
      department: 'Departemen Ilmu Ekonomi',
      title: 'Medalis Olimpiade Ekonomi & Tutor Senior Mikro',
      gpa: '3.92',
      specialty: 'Elastisitas Permintaan, Kurva Indiferensi, & Struktur Pasar',
      sessionsCompleted: 118,
      rating: '4.98',
    },
    {
      name: 'Sarah Amanda, S.E.',
      initials: 'SA',
      department: 'Departemen Manajemen',
      title: 'Alumnus Berprestasi & Management Trainee Global',
      gpa: '3.89',
      specialty: 'Fungsi Manajerial POAC, Desain Organisasi, & Strategi Bisnis',
      sessionsCompleted: 96,
      rating: '4.92',
    },
    {
      name: 'Kevin Jonathan, S.Si.',
      initials: 'KJ',
      department: 'Laboratorium Kuantitatif',
      title: 'Instruktur Lab Matematika Ekonomi & Statistika',
      gpa: '3.95',
      specialty: 'Kalkulus Diferensial Bisnis, Matriks Invers, & Uji Z-Score',
      sessionsCompleted: 164,
      rating: '4.96',
    },
  ];

  return (
    <section id="section-tutors" className="py-16 md:py-20 lg:py-24 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 font-heading">
            <Users className="w-4 h-4 text-teal-700" />
            <span>Mentor & Asisten Dosen Senior</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Belajar Langsung dari Kakak Tingkat Berprestasi
          </h2>
          <p className="font-body text-slate-700 text-base mt-2 max-w-[70ch] leading-[1.6]">
            Semua tutor di Aksel FEB melalui seleksi verifikasi ketat dengan IPK minimal 3.85 
            dan memiliki rekam jejak sebagai asisten dosen atau juara kompetisi akademik nasional.
          </p>
        </div>

        {/* Grid of Tutors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tutors.map((tutor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div>
                {/* Tutor Avatar & Initials */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-teal-800 text-white font-heading font-bold text-base flex items-center justify-center shrink-0">
                    {tutor.initials}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-teal-800 block">
                      {tutor.department}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-slate-900 truncate">
                      {tutor.name}
                    </h3>
                  </div>
                </div>

                {/* Role Badge */}
                <p className="text-xs text-slate-700 font-medium mb-4 leading-normal">
                  {tutor.title}
                </p>

                {/* Metrics */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs font-semibold">
                  <span className="text-slate-700">IPK Kumulatif:</span>
                  <span className="text-teal-800 font-bold font-heading text-sm">{tutor.gpa} / 4.00</span>
                </div>

                {/* Specialties */}
                <div className="text-xs text-slate-700 mb-6 font-body leading-[1.6]">
                  <strong className="text-slate-900 block mb-1 font-heading">Fokus Materi:</strong>
                  {tutor.specialty}
                </div>
              </div>

              {/* Consultation Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">{tutor.sessionsCompleted} Sesi Selesai</span>
                <button
                  type="button"
                  onClick={() => alert(`Mengirim pesan tanya materi langsung kepada ${tutor.name}. Sesi konsultasi akan dijadwalkan.`)}
                  className="text-teal-800 hover:text-teal-900 font-heading font-semibold hover:underline cursor-pointer"
                >
                  Tanya Materi →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
