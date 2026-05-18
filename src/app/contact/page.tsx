export default function Contact() {
  return (
    <div className="flex-1 bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Info Panel */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">Hubungi Kami</h1>
            <p className="text-lg text-gray-600 mb-12">
              Kami siap membantu kebutuhan manajemen file Anda. Kirimkan pesan dan tim kami akan segera merespons.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 flex items-center shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Dukungan</p>
                  <p className="text-xl font-bold text-gray-900">halo@convertaja.com</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 flex items-center shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Waktu Respons</p>
                  <p className="text-xl font-bold text-gray-900">Maksimal 24 jam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
                  <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="nama@email.com" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                <select id="subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                  <option>Pilih alasan menghubungi</option>
                  <option>Bantuan Teknis</option>
                  <option>Saran Fitur</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                <textarea id="message" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none" placeholder="Tuliskan pesan Anda secara detail..."></textarea>
              </div>

              <button type="button" className="w-full bg-primary text-white hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                Kirim Pesan
              </button>

              <p className="text-xs text-center text-gray-500">
                Dengan mengirimkan pesan, Anda menyetujui Kebijakan Privasi kami.
              </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
