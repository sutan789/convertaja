export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Kebijakan Privasi</h1>
      
      <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
        <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <p>
            ConvertAja dirancang dengan mengutamakan privasi Anda. Sebagian besar alat kami (seperti Gabung PDF, Pisahkan PDF, Gambar ke PDF, dan QR Code Generator) berjalan langsung di browser Anda (client-side).
            Ini berarti file Anda tidak pernah diunggah ke server kami.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Pemrosesan File</h2>
          <p>
            Untuk fitur yang memerlukan pemrosesan di server (seperti Kompres PDF, PDF ke Word, atau Word ke PDF di masa mendatang), file Anda diunggah melalui koneksi terenkripsi. 
            File tersebut hanya disimpan sementara untuk diproses, dan akan dihapus secara permanen dari server kami dalam waktu 1 jam setelah konversi selesai.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Keamanan Data</h2>
          <p>
            Kami menggunakan protokol keamanan standar industri (SSL/TLS) untuk melindungi data Anda selama transit. Namun, tidak ada metode transmisi di internet yang 100% aman.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookie dan Pelacakan</h2>
          <p>
            Kami dapat menggunakan cookie esensial untuk memastikan website berfungsi dengan baik dan cookie analitik dasar untuk memahami penggunaan website secara anonim guna meningkatkan layanan kami.
          </p>
        </section>
      </div>
    </div>
  );
}
