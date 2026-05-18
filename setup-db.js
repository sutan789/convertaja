const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  console.log("Menghubungkan ke MySQL XAMPP...");
  try {
    // Koneksi awal tanpa memilih database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // Default XAMPP password kosong
    });

    console.log("Membuat database 'convertaja' jika belum ada...");
    await connection.query("CREATE DATABASE IF NOT EXISTS convertaja");
    
    // Gunakan database convertaja
    await connection.query("USE convertaja");

    console.log("Membuat tabel 'users'...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Membuat akun default untuk testing
    const hash = await bcrypt.hash('password123', 10);
    try {
      await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        ['Admin ConvertAja', 'admin@convertaja.com', hash]
      );
      console.log("\n✅ Database dan Tabel berhasil dibuat!");
      console.log("🎉 Akun default berhasil dibuat:");
      console.log("   Email: admin@convertaja.com");
      console.log("   Password: password123");
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        console.log("\n✅ Database siap! (Akun default 'admin@convertaja.com' sudah ada sebelumnya)");
      } else {
        throw e;
      }
    }

    await connection.end();
  } catch (err) {
    console.error("\n❌ GAGAL: Pastikan XAMPP (Apache & MySQL) sudah berjalan (Start).");
    console.error(err.message);
  }
}

setupDatabase();
