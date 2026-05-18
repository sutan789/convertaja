export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Syarat Penggunaan</h1>
      
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
        <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan menggunakan ConvertAja, Anda setuju untuk terikat oleh Syarat Penggunaan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Penggunaan Layanan</h2>
          <p>
            Layanan kami disediakan "sebagaimana adanya". Anda setuju untuk tidak menggunakan ConvertAja untuk tujuan ilegal atau melanggar hak kekayaan intelektual pihak lain.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Batasan Tanggung Jawab</h2>
          <p>
            ConvertAja tidak bertanggung jawab atas segala kerusakan langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami. Kami tidak menjamin bahwa layanan akan bebas dari kesalahan atau tidak terganggu.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Hak Cipta File</h2>
          <p>
            Anda mempertahankan semua hak kepemilikan atas file yang Anda proses menggunakan ConvertAja. Kami tidak mengklaim hak kepemilikan atas file atau data Anda.
          </p>
        </section>
      </div>
    </div>
  );
}
