'use server';

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email dan password harus diisi' };
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as any[];

    if (users.length === 0) {
      return { error: 'Email tidak ditemukan' };
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: 'Password salah' };
    }

    // Set cookie jika sukses
    const cookieStore = await cookies();
    cookieStore.set('auth-token', user.id.toString(), {
      path: '/',
      maxAge: 86400, // 1 hari
      httpOnly: true,
      sameSite: 'lax',
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan sistem' };
  }
}

export async function registerUser(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  if (!name || !email || !password || !confirmPassword) {
    return { error: 'Semua kolom harus diisi' };
  }

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi password tidak cocok' };
  }

  try {
    // Cek apakah email sudah terdaftar
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((existingUsers as any[]).length > 0) {
      return { error: 'Email sudah terdaftar' };
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Insert user baru
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Terjadi kesalahan sistem saat mendaftar' };
  }
}

