import React, { useState } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Award, 
  Bell, 
  Video, 
  Lock, 
  Smartphone, 
  Laptop, 
  Download, 
  Sparkles, 
  ExternalLink,
  Edit3,
  Save,
  Check,
  AlertCircle,
  Clock,
  Eye
} from 'lucide-react';
import { UserProfile } from '../types';

interface StudentProfileSectionProps {
  user: UserProfile;
}

export const StudentProfileSection: React.FC<StudentProfileSectionProps> = ({ user }) => {
  // Tabs: 'identitas' | 'pengaturan' | 'langganan'
  const [activeTab, setActiveTab] = useState<'identitas' | 'pengaturan' | 'langganan'>('identitas');

  // Identitas state (supports editing)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSuccessToast, setProfileSuccessToast] = useState(false);
  const [fullName, setFullName] = useState(user.name + ' Wulandari');
  const [phoneNumber, setPhoneNumber] = useState('+62 812-3456-7890');
  const [emailAddress, setEmailAddress] = useState('wahyu.assri.wulandari@mail.ugm.ac.id');
  const [studyGoals, setStudyGoals] = useState('Meraih IPK > 3.85 pada Semester 1, lolos seleksi Asisten Dosen Pengantar Akuntansi I, dan aktif di Himpunan Mahasiswa Manajemen FEB.');

  // Pengaturan states
  const [settingsSuccessToast, setSettingsSuccessToast] = useState(false);
  const [notifWhatsAppMentoring, setNotifWhatsAppMentoring] = useState(true);
  const [notifNewModules, setNotifNewModules] = useState(true);
  const [notifQuizReminders, setNotifQuizReminders] = useState(true);
  const [notifWeeklyEmailRecap, setNotifWeeklyEmailRecap] = useState(true);

  const [videoQuality, setVideoQuality] = useState('1080p');
  const [defaultPlaybackSpeed, setDefaultPlaybackSpeed] = useState('1.0x');
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);

  const [highContrastFormulas, setHighContrastFormulas] = useState(true);
  const [showAutoTranscript, setShowAutoTranscript] = useState(true);

  // Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordToast, setPasswordToast] = useState(false);

  // Invoice Download Toast
  const [invoiceToast, setInvoiceToast] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    setProfileSuccessToast(true);
    setTimeout(() => setProfileSuccessToast(false), 3500);
  };

  const handleSaveSettings = () => {
    setSettingsSuccessToast(true);
    setTimeout(() => setSettingsSuccessToast(false), 3500);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    setInvoiceToast(invoiceId);
    setTimeout(() => setInvoiceToast(null), 3500);
  };

  return (
    <div id="section-profil" className="h-full flex flex-col overflow-hidden bg-slate-50">
      <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-teal-800 font-heading mb-1 flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-700" />
            <span>Profil Mahasiswa</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Pusat Akun & Kemahasiswaan FEB UNJ</span>
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Profil Mahasiswa
          </h2>
          <p className="font-body text-slate-500 text-xs md:text-sm mt-1 max-w-[75ch] leading-relaxed">
            Kelola data identitas akademik rencana studi (KRS), preferensi belajar & notifikasi WhatsApp, serta rincian paket Aksel Pro.
          </p>
        </div>

        {/* 3 Main Tabs: Identitas Mahasiswa | Pengaturan | Langganan */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200 mb-10 w-full sm:w-fit">
          <button
            id="tab-btn-identitas"
            type="button"
            onClick={() => setActiveTab('identitas')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'identitas'
                ? 'bg-white text-teal-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Identitas Mahasiswa</span>
          </button>

          <button
            id="tab-btn-pengaturan"
            type="button"
            onClick={() => setActiveTab('pengaturan')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'pengaturan'
                ? 'bg-white text-teal-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Pengaturan</span>
          </button>

          <button
            id="tab-btn-langganan"
            type="button"
            onClick={() => setActiveTab('langganan')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'langganan'
                ? 'bg-white text-teal-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Langganan</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 ml-1">
              Pro Aktif
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SUB-SECTION 1: IDENTITAS MAHASISWA */}
        {/* ========================================================================= */}
        {activeTab === 'identitas' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Feedback Toast */}
            {profileSuccessToast && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-sm text-emerald-900 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Data profil kemahasiswaan berhasil diperbarui dan tersinkronisasi ke sistem akademik Aksel FEB.</span>
              </div>
            )}

            {/* Top Identity Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-teal-700 text-white font-heading font-bold text-2xl flex items-center justify-center shadow-sm ring-4 ring-teal-100">
                  WA
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-heading font-bold text-2xl text-slate-900">
                      {fullName}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      Mahasiswa Aktif FEB 2026
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 font-medium">
                    NIM: <strong>{user.nim}</strong> • Fakultas Ekonomika dan Bisnis
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      {user.programStudi}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Semester {user.semester} (Ganjil 2026/2027)
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors shrink-0 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-slate-600" />
                <span>{isEditingProfile ? 'Batal Mengubah' : 'Edit Data Profil'}</span>
              </button>
            </div>

            {/* Academic Information Details (View & Edit Mode) */}
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h4 className="font-heading font-bold text-lg text-slate-900">Formulir Pembaruan Profil Mahasiswa</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ubah nama tampilan, kontak WhatsApp, email, dan target belajar pribadi Anda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nama Lengkap Mahasiswa
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nomor Induk Mahasiswa (NIM - Terkunci)
                    </label>
                    <input
                      type="text"
                      value={user.nim}
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-sm font-medium text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Kampus Terverifikasi
                    </label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Nomor WhatsApp (Untuk Reminder Mentoring)
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Target Akademik & Tujuan Belajar Semester 1
                  </label>
                  <textarea
                    rows={3}
                    value={studyGoals}
                    onChange={(e) => setStudyGoals(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-sm font-medium text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Data Akademik Inti */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    <span>Data Kemahasiswaan</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Fakultas & Universitas</span>
                      <span className="font-semibold text-slate-900">Fakultas Ekonomi dan Bisnis • UNJ</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Program Studi</span>
                      <span className="font-semibold text-slate-900">{user.programStudi} (Akreditasi Unggul)</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Tahun Angkatan</span>
                      <span className="font-semibold text-slate-900">{user.angkatan}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Jalur Penerimaan</span>
                      <span className="font-semibold text-slate-900">SNBP 2026 (Prestasi Akademik)</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Pembimbing & Beban SKS */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
                    <BookOpen className="w-4 h-4 text-teal-700" />
                    <span>Dosen PA & Beban SKS</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Dosen Pembimbing Akademik (DPA)</span>
                      <span className="font-semibold text-slate-900">Dr. Sri Mulyani, S.E., M.Acc., Ak., CA.</span>
                      <span className="text-xs text-slate-500 block mt-0.5">NIP: 197405122001122001</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Beban SKS Semester Ini</span>
                      <span className="font-semibold text-slate-900">20 SKS (6 Mata Kuliah Inti FEB)</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Proyeksi IPK Semester 1</span>
                      <span className="inline-flex items-center gap-1.5 font-bold text-teal-800">
                        <Award className="w-4 h-4 text-teal-700" />
                        3.82 / 4.00 (Target: 3.90)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Kontak & Komunikasi */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
                    <Mail className="w-4 h-4 text-teal-700" />
                    <span>Kontak Mahasiswa</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Email Institusi</span>
                      <span className="font-medium text-slate-900 break-all">{emailAddress}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Nomor WhatsApp</span>
                      <span className="font-medium text-slate-900">{phoneNumber}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Status Akun SSO</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mt-1 border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        SSO Kampus Terhubung
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Target & Rencana Belajar (Full-width) */}
                <div className="md:col-span-2 lg:col-span-3 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
                      Target & Motivasi Belajar Pribadi
                    </span>
                    <span className="text-xs text-teal-700 font-semibold">Tahun Ajaran 2026/2027</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{studyGoals}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-SECTION 2: PENGATURAN */}
        {/* ========================================================================= */}
        {activeTab === 'pengaturan' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Feedback Toast */}
            {settingsSuccessToast && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-sm text-emerald-900 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Pengaturan berhasil disimpan! Preferensi Anda langsung diterapkan ke pemutar video dan pengingat mentoring.</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Group 1: Notifikasi & Pengingat */}
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">Notifikasi & Pengingat Belajar</h4>
                    <p className="text-xs text-slate-500">Pemberitahuan bimbingan, video baru, dan tugas mingguan.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Pengingat Sesi Mentoring (WhatsApp)</div>
                      <div className="text-xs text-slate-600">Kirim tautan Google Meet 30 menit sebelum sesi dimulai.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={notifWhatsAppMentoring} 
                        onChange={(e) => setNotifWhatsAppMentoring(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Materi & Catatan Asdos Baru</div>
                      <div className="text-xs text-slate-600">Pemberitahuan saat modul kuliah atau rangkuman slide baru diunggah.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={notifNewModules} 
                        onChange={(e) => setNotifNewModules(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Pengingat Latihan Bank Soal UTS</div>
                      <div className="text-xs text-slate-600">Pemberitahuan untuk melatih 5 soal mandiri menjelang akhir pekan.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={notifQuizReminders} 
                        onChange={(e) => setNotifQuizReminders(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Laporan Evaluasi Mingguan (Email)</div>
                      <div className="text-xs text-slate-600">Rangkuman capaian jam belajar dan materi yang butuh penguatan.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={notifWeeklyEmailRecap} 
                        onChange={(e) => setNotifWeeklyEmailRecap(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Group 2: Preferensi Video & Akses Materi */}
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">Preferensi Pemutar Video & Unduhan</h4>
                    <p className="text-xs text-slate-500">Sesuaikan kualitas grafis dan kecepatan playback materi kuliah.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Kualitas Video Bawaan
                    </label>
                    <select
                      value={videoQuality}
                      onChange={(e) => setVideoQuality(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 focus:outline-hidden focus:border-teal-700"
                    >
                      <option value="1080p">1080p Full HD (Direkomendasikan untuk Wifi Kampus FEB)</option>
                      <option value="720p">720p HD (Standar Seimbang)</option>
                      <option value="480p">480p (Hemat Kuota Seluler)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Kecepatan Putar Bawaan
                    </label>
                    <select
                      value={defaultPlaybackSpeed}
                      onChange={(e) => setDefaultPlaybackSpeed(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 focus:outline-hidden focus:border-teal-700"
                    >
                      <option value="1.0x">1.0x (Kecepatan Normal)</option>
                      <option value="1.25x">1.25x (Fokus & Efisien)</option>
                      <option value="1.5x">1.5x (Review Cepat)</option>
                      <option value="2.0x">2.0x (Skimming Kilat)</option>
                    </select>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Putar Otomatis Bab Berikutnya</div>
                      <div className="text-xs text-slate-600">Lanjutkan video bab selanjutnya dalam playlist secara mulus.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={autoPlayNext} 
                        onChange={(e) => setAutoPlayNext(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Sinkronisasi Unduhan Offline</div>
                      <div className="text-xs text-slate-600">Simpan otomatis slide dan ringkasan catatan saat di jaringan kampus.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={offlineSync} 
                        onChange={(e) => setOfflineSync(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Group 3: Aksesibilitas & Tampilan */}
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">Tampilan & Aksesibilitas</h4>
                    <p className="text-xs text-slate-500">Kemudahan pembacaan tabel akuntansi dan transkrip materi.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Kontras Tinggi pada Tabel Jurnal & Rumus</div>
                      <div className="text-xs text-slate-600">Pertegas garis kolom debit-kredit dan simbol matematika kalkulus.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={highContrastFormulas} 
                        onChange={(e) => setHighContrastFormulas(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="space-y-0.5">
                      <div className="text-sm font-semibold text-slate-900">Tampilkan Transkripsi Teks Berjalan</div>
                      <div className="text-xs text-slate-600">Munculkan teks penjelasan dosen sinkron dengan menit video.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input 
                        type="checkbox" 
                        checked={showAutoTranscript} 
                        onChange={(e) => setShowAutoTranscript(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Group 4: Keamanan & Sesi Login */}
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">Keamanan Akun & Sesi Aktif</h4>
                    <p className="text-xs text-slate-500">Perlindungan akun dan riwayat perangkat yang terhubung.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 block">Sandi Akun Aksel FEB</span>
                      <span className="text-xs text-slate-500">Terakhir diperbarui: 1 September 2026</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordModal(true)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                    >
                      Ubah Kata Sandi
                    </button>
                  </div>

                  {/* Registered Devices */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                      Perangkat Terhubung
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <Laptop className="w-4 h-4 text-teal-700" />
                          <div>
                            <span className="font-semibold text-slate-900 block">MacBook Pro 14" • Safari</span>
                            <span className="text-slate-500">Kampus FEB UNJ • IP: 10.24.8.19</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Aktif Sekarang
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <Smartphone className="w-4 h-4 text-slate-500" />
                          <div>
                            <span className="font-semibold text-slate-900 block">iPhone 15 Pro • Aksel App</span>
                            <span className="text-slate-500">Yogyakarta • Aktif 2 jam lalu</span>
                          </div>
                        </div>
                        <span className="text-slate-500 text-[11px]">Terdaftar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Save Action */}
            <div className="flex items-center justify-end gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-600">Perubahan pengaturan disimpan secara aman di cloud profile Anda.</span>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-SECTION 3: LANGGANAN */}
        {/* ========================================================================= */}
        {activeTab === 'langganan' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Invoice Toast */}
            {invoiceToast && (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3 text-sm text-teal-900 font-medium">
                <Download className="w-5 h-5 text-teal-700 shrink-0" />
                <span>Invoice resmi <strong>{invoiceToast}</strong> berhasil diunduh dalam format PDF bertanda tangan digital FEB.</span>
              </div>
            )}

            {/* Main Subscription Status Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>STATUS: PAKET PRO AKTIF • TERVERIFIKASI MAHASISWA BARU FEB</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    Aksel FEB Pro — Semester 1 (Ganjil 2026/2027)
                  </h3>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    Akses penuh tanpa batas ke 6 modul kuliah inti, video pembelajaran komprehensif, 
                    bank soal mandiri, serta kuota klinik mentoring tak terbatas bersama asisten dosen senior.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-teal-100">
                    <div>
                      <span className="text-teal-300 block text-[11px] uppercase tracking-wider font-semibold">Masa Berlaku</span>
                      <span className="font-bold text-white text-sm">1 Sep 2026 – 28 Feb 2027</span>
                    </div>
                    <div className="border-l border-teal-700/60 pl-6">
                      <span className="text-teal-300 block text-[11px] uppercase tracking-wider font-semibold">Sisa Waktu Akses</span>
                      <span className="font-bold text-amber-300 text-sm">162 Hari Tersisa</span>
                    </div>
                    <div className="border-l border-teal-700/60 pl-6">
                      <span className="text-teal-300 block text-[11px] uppercase tracking-wider font-semibold">Nilai Paket</span>
                      <span className="font-bold text-white text-sm">Rp 299.000 / Semester (Subsidi FEB)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/15 flex flex-col items-center justify-center shrink-0 min-w-[220px]">
                  <div className="text-xs text-teal-200 font-semibold mb-1">Masa Aktif Semester 1</div>
                  <div className="text-3xl font-heading font-bold text-white mb-2">100%</div>
                  <div className="w-full bg-teal-950/60 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-amber-400 h-full w-[35%]" />
                  </div>
                  <span className="text-[11px] text-teal-200 text-center">
                    Terus aktif hingga Ujian Akhir Semester (UAS) Februari 2027
                  </span>
                </div>
              </div>
            </div>

            {/* Full Features Breakdown */}
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-heading font-bold text-lg text-slate-900 mb-6">
                Rincian Fasilitas & Hak Akses Paket Pro
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">6 Modul Kuliah Lengkap</div>
                    <p className="text-xs text-slate-600 mt-1">Akses materi Pengantar Akuntansi I, Mikroekonomi, Manajemen, Matematika Bisnis, dsb.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">50+ Video Pembelajaran HD</div>
                    <p className="text-xs text-slate-600 mt-1">Video konsep bab demi bab disertai bedah studi kasus yang sering diujikan di UTS.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Sesi Mentoring & Klinik Responsi</div>
                    <p className="text-xs text-slate-600 mt-1">Tatap muka daring interaktif via Google Meet setiap minggu bersama asdos terbaik.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Bank Soal & Pembahasan Kunci</div>
                    <p className="text-xs text-slate-600 mt-1">Latihan mandiri dengan rumus kunci, penjelasan terurai, dan strategi pengerjaan soal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Unduhan Slide & Ringkasan RPS</div>
                    <p className="text-xs text-slate-600 mt-1">Slide kuliah, tabel neraca lajur, dan lembar rumus kalkulus ringkas siap cetak.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Konsultasi Penjurusan Semester 3</div>
                    <p className="text-xs text-slate-600 mt-1">Bimbingan perencanaan konsentrasi minat studi (Keuangan, Pemasaran, HR, Operasional).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade & Semester 2 Options */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900">
                    Perpanjangan & Paket Lanjutan Semester 2
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Amankan akses belajar lebih awal untuk semester genap dengan harga subsidi mahasiswa baru.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Early Bird Maba Diskon 35%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plan Option 1 */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 hover:border-teal-700/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-heading">Paket Semester 2</span>
                      <span className="text-xs font-semibold text-slate-500">Mulai Maret 2027</span>
                    </div>
                    <h5 className="font-heading font-bold text-lg text-slate-900 mt-2">Aksel FEB Pro — Semester Genap</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Pengantar Akuntansi II, Ekonomi Makro, Teori Organisasi, dan Matematika Keuangan Lanjutan.
                    </p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-heading font-bold text-2xl text-slate-900">Rp 249.000</span>
                      <span className="text-xs text-slate-500 line-through">Rp 399.000</span>
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Hemat 38%</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Pemesanan paket Semester 2 telah dicatat. Invoice pemesanan awal akan dikirimkan ke email kampus Anda.')}
                    className="mt-6 w-full py-2.5 rounded-lg border border-teal-700 text-teal-800 hover:bg-teal-50 font-semibold text-xs transition-colors text-center cursor-pointer"
                  >
                    Klaim Diskon Semester 2
                  </button>
                </div>

                {/* Plan Option 2 */}
                <div className="p-6 rounded-xl bg-white border-2 border-teal-700 transition-all flex flex-col justify-between shadow-xs relative">
                  <span className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-teal-700 text-white font-bold text-[10px] uppercase tracking-wider">
                    Paling Populer
                  </span>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-heading">Paket Tahunan Ultimate</span>
                      <span className="text-xs font-semibold text-teal-700">Akses 12 Bulan Penuh</span>
                    </div>
                    <h5 className="font-heading font-bold text-lg text-slate-900 mt-2">Semester 1 & 2 + Persiapan Asisten Dosen</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Termasuk bootcamp bimbingan seleksi asisten dosen FEB, workshop pengolahan data SPSS/Stata, dan bimbingan IPK 4.00.
                    </p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-heading font-bold text-2xl text-slate-900">Rp 449.000</span>
                      <span className="text-xs text-slate-500 line-through">Rp 799.000</span>
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Hemat 44%</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Paket Ultimate 1 Tahun telah dipilih. Rincian upgrade dikirim ke email mahasiswa Anda.')}
                    className="mt-6 w-full py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors text-center cursor-pointer shadow-xs"
                  >
                    Upgrade ke Paket Ultimate
                  </button>
                </div>
              </div>
            </div>

            {/* Riwayat Pembayaran & Invoice */}
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading font-bold text-lg text-slate-900">
                  Riwayat Pembayaran & Bukti Kuitansi
                </h4>
                <span className="text-xs text-slate-500">Semua transaksi terekam otomatis</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">No. Invoice</th>
                      <th className="py-3 px-4">Deskripsi Paket</th>
                      <th className="py-3 px-4">Tanggal Transaksi</th>
                      <th className="py-3 px-4">Metode Bayar</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        #AKSEL-FEB-2026-0901-77
                      </td>
                      <td className="py-3.5 px-4">
                        Paket Aksel FEB Pro Semester 1 (Ganjil 2026)
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        1 September 2026
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        Bank Mandiri VA
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        Rp 299.000
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                          <Check className="w-3 h-3 text-emerald-700" />
                          Lunas
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDownloadInvoice('#AKSEL-FEB-2026-0901-77')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-teal-700 hover:text-teal-800 text-slate-700 font-semibold transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh PDF</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Modal Ubah Kata Sandi */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-heading font-bold text-slate-900">
                  <Lock className="w-5 h-5 text-teal-700" />
                  <span>Ubah Kata Sandi Akun</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs">
                {passwordToast && (
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Kata sandi berhasil diperbarui dengan standar enkripsi SSO.</span>
                  </div>
                )}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kata Sandi Lama
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan sandi saat ini"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kata Sandi Baru (Min. 8 Karakter)
                  </label>
                  <input
                    type="password"
                    placeholder="Sandi baru kombinasi huruf & angka"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    placeholder="Ulangi sandi baru"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordToast(true);
                    setTimeout(() => {
                      setPasswordToast(false);
                      setShowPasswordModal(false);
                    }, 1500);
                  }}
                  className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Simpan Kata Sandi Baru
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
