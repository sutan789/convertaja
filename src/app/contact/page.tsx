export default function Contact() {
  return (
    <div className="min-h-screen bg-blue-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-full max-w-2xl h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Panel */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 tracking-tight">Hubungi Kami</h1>
            <p className="text-lg text-blue-100/80 mb-12 leading-relaxed">
              Kami siap membantu kebutuhan manajemen file Anda. Kirimkan pesan dan tim kami akan segera merespons.
            </p>

            <div className="space-y-6">
              {/* Contact Card 1 */}
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 flex items-center shadow-xl hover:border-blue-500/30 transition-all group">
                <div className="w-14 h-14 bg-blue-900/50 text-cyan-400 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-300">Email Dukungan</p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">sutnn789@gmail.com</p>
                </div>
              </div>

              {/* Contact Card 2 */}
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 flex items-center shadow-xl hover:border-blue-500/30 transition-all group">
                <div className="w-14 h-14 bg-blue-900/50 text-indigo-400 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-300">Waktu Respons</p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">Maksimal 24 jam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-white/10 shadow-2xl relative group">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[2.5rem] pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>

            <form className="relative space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">Nama Lengkap</label>
                  <input type="text" id="name" className="w-full p-4 bg-[#0a1128]/80 border border-blue-800/50 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-blue-500/40" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">Alamat Email</label>
                  <input type="email" id="email" className="w-full p-4 bg-[#0a1128]/80 border border-blue-800/50 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-blue-500/40" placeholder="nama@email.com" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-blue-200 mb-2">Subjek</label>
                <div className="relative">
                  <select id="subject" className="w-full p-4 bg-[#0a1128]/80 border border-blue-800/50 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer">
                    <option className="bg-[#0a1128] text-white">Pilih alasan menghubungi</option>
                    <option className="bg-[#0a1128] text-white">Bantuan Teknis</option>
                    <option className="bg-[#0a1128] text-white">Saran Fitur</option>
                    <option className="bg-[#0a1128] text-white">Lainnya</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-2">Pesan</label>
                <textarea id="message" rows={5} className="w-full p-4 bg-[#0a1128]/80 border border-blue-800/50 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none placeholder:text-blue-500/40" placeholder="Tuliskan pesan Anda secara detail..."></textarea>
              </div>

              <button type="button" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-1">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                Kirim Pesan
              </button>

              <p className="text-xs text-center text-blue-300/50 mt-4">
                Dengan mengirimkan pesan, Anda menyetujui Kebijakan Privasi kami.
              </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
